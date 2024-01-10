import { Chart } from "@zero/components/charts";
import { GetChartByChartId, GetChartsByDashboardId, GetDashboardId } from "../action";

type DataType = {
  period: string;
  count: number;
}

export default async function DashboardView(props: { params: { dashboardId: string } }) {
  const { params: { dashboardId } } = props
  const dashboard = await GetDashboardId(dashboardId)
  const charts = await GetChartsByDashboardId(dashboardId);
  const chartData = await GetChartByChartId(charts[0].id);
  console.log(chartData)
  const data: Array<DataType> = chartData.data

  return (
    <section>
      <h1>Showing <strong>{`${charts.length} ${charts.length > 1 ? 'charts' : 'chart'}`}</strong> for <strong>{dashboard?.name}</strong> Dashboard</h1>
      <Chart<DataType>
        type="line"
        data={data}
        name={"Showing " + chartData.chart.name}
        xAxisField={chartData.chart.xAxisField}
        yAxisField={chartData.chart.yAxisField} />
      <Chart<DataType>
        type="bar"
        data={data}
        name={"Showing " + chartData.chart.name}
        xAxisField={chartData.chart.xAxisField}
        yAxisField={chartData.chart.yAxisField} />
    </section>
  )
}
