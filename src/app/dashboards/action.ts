import { Charts, Dashboards } from "@prisma/client";
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
    where: {
      dashboardId,
    },
    orderBy: {
      id: "asc",
    },
  });
}
