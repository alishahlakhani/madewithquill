import { prisma } from "@zero/utils/db";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
): Promise<Response> {
  const { name } = params;

  if (!name)
    return new Response("No name found in the request", { status: 400 });

  const dashboard = await prisma.dashboards.findFirstOrThrow({
    orderBy: {
      id: "asc",
    },
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
  });

  return Response.json(dashboard);
}
