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

export async function GetChartData<Type>(
  id: string,
  to: Date,
  from: Date,
  compare: keyof typeof ComparePeriodsType
): Promise<{ chart: Charts | null; data: Array<Type> }> {
  const chart = await prisma.charts.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
  });

  if (!chart) {
    return { chart: null, data: [] };
  }

  const {
    chartType,
    sqlQuery,
    xAxisField,
    yAxisField,
    dateField_table,
    dateField_field,
  } = chart;

  if (
    !chartType ||
    !sqlQuery ||
    !yAxisField ||
    !xAxisField ||
    !dateField_table ||
    !dateField_field
  ) {
    return { chart: null, data: [] };
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
    SELECT generate_series('${formattedCompareFromDate}'::date, '${formattedToDate}'::date, interval '1 ${bucketBy}')::date AS date
  )
  SELECT
    ds.date AS ${xAxisField},
    COALESCE(SUM("T1Transactions"."grossSalesVolume"), 0) AS ${yAxisField},
    ARRAY_AGG(ROW_TO_JSON("${dateField_table}".*)) AS data
  FROM
    DateSeries ds
  LEFT JOIN
    "${dateField_table}" ON ds.date = date_trunc('${bucketBy}', "${dateField_table}"."${dateField_field}")
  WHERE
    ds.date BETWEEN '${formattedCompareFromDate}' AND '${formattedToDate}'
  GROUP BY
    ${xAxisField}
  ORDER BY
    ${xAxisField};
    `;
  const data = await prisma.$queryRawUnsafe<Array<Type>>(
    raw(query.toString()).sql
  );

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

  return { chart, data };
}
