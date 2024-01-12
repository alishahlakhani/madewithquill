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

export async function GetChartData(sqlQuery: string): Promise<Array<any>> {
  return await prisma.$queryRawUnsafe(sqlQuery + "");
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
