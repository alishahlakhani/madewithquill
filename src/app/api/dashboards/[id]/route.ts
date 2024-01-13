import { prisma } from "@zero/utils/db";
import { NextRequest } from "next/server";

// Get dashboard details by dashboar id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  const { id } = params;

  if (!id) return new Response("No id found in the request", { status: 400 });

  const dashboard = await prisma.dashboards.findFirstOrThrow({
    orderBy: {
      id: "asc",
    },
    where: {
      id: {
        equals: id,
        mode: "insensitive",
      },
    },
  });

  return Response.json(dashboard);
}
