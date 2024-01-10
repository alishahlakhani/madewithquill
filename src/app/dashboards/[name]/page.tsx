import { AreaChartContainer } from "@zero/components/charts/area-chart"
import { LineChartContainer } from "@zero/components/charts/line-chart"
import { prisma } from "@zero/utils/db";

type DataType = {
  date: string;
  value: number;
}

export default async function DashboardView(props: { params: { name: string } }) {
  const { params: { name } } = props
  const r = await prisma.t1Transactions.findMany({
    where: {
      customerId: "C15",
      productId: "P21"
    },
    orderBy: {
      id: "asc",
    },
  });
  console.log(r);

  const data: Array<DataType> = [
    { date: '2023-01-01', value: 100 },
    { date: '2023-01-02', value: 150 },
    { date: '2023-01-03', value: 120 },
    { date: '2023-01-04', value: 200 },
    { date: '2023-01-05', value: 160 },
    { date: '2023-01-06', value: 210 },
    { date: '2023-01-07', value: 180 },
  ]

  return (
    <section>
      <h1>Showing {name} dashboard</h1>
      <AreaChartContainer<DataType> data={data}></AreaChartContainer>
      <LineChartContainer />
    </section>
  )
}
