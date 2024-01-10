import { Charts, Dashboards, Prisma } from "@prisma/client";
import { prisma } from "@zero/utils/db";

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
      dashboardId,
    },
  });
}

export async function GetChartByChartId(id: string): Promise<any> {
  const chart = await prisma.charts.findFirst({
    orderBy: {
      id: "asc",
    },
    where: {
      id,
    },
  });
  console.log("sqlQuery", `=>${chart?.sqlQuery}<=`);
  const queryResults = await prisma.$queryRawUnsafe(chart?.sqlQuery + "");
  console.log(queryResults);
  return { data: queryResults, chart };
}

export async function GetDashboardId(id: string): Promise<Dashboards | null> {
  return prisma.dashboards.findFirst({
    orderBy: {
      id: "asc",
    },
    where: {
      id,
    },
  });
}
