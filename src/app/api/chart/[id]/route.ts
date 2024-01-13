import { ComparePeriodsType, GetChartData } from "@zero/app/dashboards/action";
import { parse } from "date-fns";
import { NextRequest } from "next/server";

// Get chart by chart ID
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  const { id } = params;

  if (!id) return new Response("No id found in the request", { status: 400 });
  const { to, from, compare } = (await request.json()) as {
    to: string;
    from: string;
    compare: keyof typeof ComparePeriodsType;
  };

  const chartData = await GetChartData(
    id,
    parse(to, "dd-MM-yyyy", new Date()),
    parse(from, "dd-MM-yyyy", new Date()),
    compare
  );

  return Response.json(chartData);
}
