import { prisma } from "@zero/utils/db";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { dashboardId: string } }
): Promise<Response> {
  const { dashboardId } = params;

  if (!dashboardId)
    return new Response("No dashboardId found in the request", { status: 400 });

  const chart = await prisma.charts.findFirstOrThrow({
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
