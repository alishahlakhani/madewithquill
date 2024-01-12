import { raw } from "sql-template-tag";
import { ChartType, Charts, Dashboards, DateRange } from "@prisma/client";
import { prisma } from "@zero/utils/db";
import {
  differenceInCalendarDays,
  format,
  isAfter,
  isEqual,
  subDays,
  subMonths,
} from "date-fns";

export const ComparePeriodsType = {
  previous_period: "Previous period",
  "90d": "Previous 90 days",
  "30d": "Previous 30 days",
  previous_month: "Previous month",
};

export type DefaultsType = {
  to: Date;
  from: Date;
  preset?: DateRange;
  compare: keyof typeof ComparePeriodsType;
};

export async function GetDashboards(): Promise<Array<Dashboards>> {
  return prisma.dashboards.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function GetChartsByDashboardId(
  dashboardId: string
): Promise<Array<Charts>> {
  return prisma.charts.findMany({
    orderBy: {
      id: "asc",
    },
    where: {
      dashboardId: {
        equals: dashboardId,
      },
    },
  });
}

export async function GetDashboardId(id: string): Promise<Dashboards | null> {
  return prisma.dashboards.findFirst({
    orderBy: {
      id: "asc",
    },
    where: {
      id: {
        equals: id,
      },
    },
  });
}

export async function GetChartData(
  sqlQuery: string,
  table: string,
  field: string,
  type: ChartType,
  from: Date,
  to: Date,
  compare: keyof typeof ComparePeriodsType
): Promise<Array<any>> {
  const fakeQl = `SELECT
    to_char(days, 'DD Month') AS "period",
    COALESCE(COUNT("T1Customers"."createdAt"), 0)::int AS "count",
    COALESCE(STRING_AGG(COALESCE("id"::TEXT, ''), '; '), '') AS "ids"
  FROM
    generate_series(
      '2023-01-01'::date,
      '2023-12-01'::date,
      interval '1 day'
    ) AS days
  LEFT JOIN
    "T1Customers" ON date_trunc('day', "T1Customers"."createdAt") = days
  GROUP BY
    days
  ORDER BY
    days;`;

  const startDate = "2023-01-01";
  const endDate = "2025-01-01";

  const simpleQueryForLineChart = (
    start: string,
    end: string,
    table: string,
    field: string,
    sql: string
  ) => `
        ${sql} WHERE "${table}"."${field}" BETWEEN '${start}' AND '${end}';
  `;

  switch (type) {
    case "Line":
      const sql1 = simpleQueryForLineChart(
        startDate,
        endDate,
        table,
        field,
        sqlQuery
      );
      const sql2 = simpleQueryForLineChart(
        format(subMonths(new Date(startDate), 6), "dd-MM-yyyy"),
        format(subMonths(new Date(endDate), 6), "dd-MM-yyyy"),
        table,
        field,
        sqlQuery
      );
      const [current, before] = await prisma.$transaction([
        prisma.$queryRawUnsafe(sql1 + ""),
        prisma.$queryRawUnsafe(sql2 + ""),
      ]);
  }
  return await prisma.$queryRawUnsafe(fakeQl + "");
  // return await prisma.$queryRawUnsafe(
  //   sqlQuery
  //     .toString()
  //     .replaceAll("$table", `"${table}"`)
  //     .replaceAll("$field", `"${field}"`)
  //     .replaceAll("$to", to)
  //     .replaceAll("$from", from)
  // );
  // return await prisma.$queryRawUnsafe(sqlQuery + "", table, field);
}

export async function GetChartData2(
  sqlQuery: string,
  table: string,
  field: string,
  type: ChartType,
  from: Date,
  to: Date,
  compare: keyof typeof ComparePeriodsType,
  xAxisField: string,
  yAxisField: string
): Promise<Array<any>> {
  const startDate = "2023-01-01";
  const endDate = "2025-01-01";

  const simpleQueryForLineChart = (
    start: string,
    end: string,
    table: string,
    field: string,
    sql: string
  ) => `
        ${sql} WHERE "${table}"."${field}" BETWEEN '${start}' AND '${end}' ORDER BY
        "${table}"."${field}";
  `;

  switch (type) {
    case "Line":
      const sql1 = simpleQueryForLineChart(
        startDate,
        endDate,
        table,
        field,
        sqlQuery
      );
      const sql2 = simpleQueryForLineChart(
        format(subMonths(new Date(startDate), 6), "dd-MM-yyyy"),
        format(subMonths(new Date(endDate), 6), "dd-MM-yyyy"),
        table,
        field,
        sqlQuery
      );
      const [current, before] = (await prisma.$transaction([
        prisma.$queryRawUnsafe(sql1 + ""),
        prisma.$queryRawUnsafe(sql2 + ""),
      ])) as any;

      return (current as Array<any>)
        .map((v) => ({ [xAxisField]: v }))
        .concat(before.map((v: any) => ({ [yAxisField]: v })));
    default:
      return [];
  }
}

export async function GetChartData3<Type>(
  id: string,
  to: Date,
  from: Date,
  compare: keyof typeof ComparePeriodsType,
  getRawData: boolean = false
): Promise<Array<Type>> {
  const chart = await prisma.charts.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  });

  if (!chart) {
    return [];
  }

  const {
    chartType,
    sqlQuery,
    xAxisField,
    name,
    yAxisField,
    dateField_table,
    dateField_field,
  } = chart;

  if (chartType !== "Line") return [];
  if (
    !chartType ||
    !sqlQuery ||
    !yAxisField ||
    !dateField_table ||
    !dateField_field
  ) {
    return [];
  }

  let addPreviousDays = 0;
  switch (compare) {
    case "30d":
      addPreviousDays = 30;
      break;
    case "90d":
      addPreviousDays = 90;
      break;
    case "previous_month":
      addPreviousDays = differenceInCalendarDays(from, subMonths(from, 1));
      break;
    case "previous_period":
      addPreviousDays = differenceInCalendarDays(to, from);
      break;
  }

  const previousPeriodFromDate = subDays(from, addPreviousDays);
  const dateDiffCount = differenceInCalendarDays(to, from);
  const isLessThan2Weeks = dateDiffCount > 0 && dateDiffCount <= 14;
  const isLessThanMonth = dateDiffCount > 14 && dateDiffCount <= 31;
  const isMoreThanMonthLessThanAQuarter =
    dateDiffCount > 31 && dateDiffCount <= 90;
  const isLessThan3Year = dateDiffCount > 90 && dateDiffCount <= 365 * 3;

  const bucketBy = isLessThan2Weeks
    ? "day"
    : isLessThanMonth
    ? "day"
    : isMoreThanMonthLessThanAQuarter
    ? "week"
    : isLessThan3Year
    ? "month"
    : "year";
  const formattedCompareFromDate = format(previousPeriodFromDate, "yyyy-MM-dd");
  const formattedFromDate = format(from, "yyyy-MM-dd");
  const formattedToDate = format(to, "yyyy-MM-dd");

  const query = `
  WITH DateSeries AS (
    SELECT
      generate_series(date_trunc('${bucketBy}', '${formattedCompareFromDate}'::date), '${formattedToDate}'::date, interval '1 ${bucketBy}')::date AS date
  )
  SELECT
    TO_CHAR(ds.date, 'DD FMMonth YYYY') AS date,
    COALESCE(COUNT(current_subquery."${dateField_field}"), 0)::int AS ${xAxisField},
    COALESCE(COUNT(compared_subquery."${dateField_field}"), 0)::int AS ${yAxisField}
  FROM
    DateSeries ds
  LEFT JOIN
    (
      SELECT * FROM "T1Transactions"
      WHERE "${dateField_field}" BETWEEN '${formattedFromDate}' AND '${formattedToDate}'
    ) AS current_subquery
  ON
    ds.date = date_trunc('${bucketBy}', current_subquery."${dateField_field}")
  LEFT JOIN
    (
      SELECT * FROM "T1Transactions"
      WHERE "${dateField_field}" BETWEEN '${formattedCompareFromDate}' AND '${formattedFromDate}'
    ) AS compared_subquery
  ON
    ds.date = date_trunc('${bucketBy}', compared_subquery."${dateField_field}")
  GROUP BY
    ds.date
  ORDER BY
    ds.date;
    `;

  const data = await prisma.$queryRawUnsafe(raw(query.toString()).sql);

  if (
    !data ||
    !Array.isArray(data) ||
    (Array.isArray(data) && data.length === 0)
  ) {
    return [];
  }

  console.log({
    bucketBy,
    addPreviousDays: addPreviousDays,
    compare,
    dateDiffCount: dateDiffCount,
    formattedCompareFromDate,
    formattedToDate,
    dataPoints: data.length,
    ...chart,
  });

  return data;

  if (getRawData) {
    return data.map((d) => {
      // is current data.
      if (isAfter(d.date, from) || isEqual(d.date, from)) {
        return {
          date: d.date,
          [yAxisField]: d[yAxisField],
        } as Type;
      } else {
        return {
          date: d.date,
          [xAxisField]: d[yAxisField],
        } as Type;
      }
    });
  }

  switch (compare) {
    case "30d":
    case "90d":
    case "previous_month":
      return data
        .filter((d) => isAfter(d.date, from) || isEqual(d.date, from))
        .map((d, index) => {
          console.log(format(d.date, "LLL dd y"));
          return {
            date: format(d.date, "LLL dd y"),
            [yAxisField]: d[yAxisField],
            [xAxisField]: data[index][yAxisField],
          } as Type;
        });
    case "previous_period":
      return data
        .filter((d) => isAfter(d.date, from) || isEqual(d.date, from))
        .map((d, index) => {
          console.log(format(d.date, "LLL dd y"));
          return {
            date: format(d.date, "LLL dd y"),
            [yAxisField]: d[yAxisField],
            [xAxisField]: data[index][yAxisField],
          } as Type;
        });
  }
}
