import { prisma } from "@zero/utils/db";
import { NextRequest } from "next/server";

// Get all charts for a dashboard
export async function GET(
  request: NextRequest,
  { params }: { params: { dashboardId: string } }
): Promise<Response> {
  const { dashboardId } = params;

  if (!dashboardId)
    return new Response("No dashboardId found in the request", { status: 400 });

  const chart = await prisma.charts.findMany({
    orderBy: {
      dashboardId: "asc",
    },
    where: {
      dashboardId: {
        equals: dashboardId,
        mode: "insensitive",
      },
    },
  });

  return Response.json(chart);
}
