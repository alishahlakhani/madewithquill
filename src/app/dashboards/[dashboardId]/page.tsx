import { Chart } from "@zero/components/charts";
import { ComparePeriodsType, DefaultsType, GetChartsByDashboardId, GetDashboardId } from "../action";
import { redirect } from "next/navigation";
import { DashboardFilters } from "./components/dashboard-filters";
import { DateRange } from "@prisma/client";
import { format, lastDayOfMonth, parse } from "date-fns";

export default async function ViewDashboardPage(props: { params: { dashboardId: string }, searchParams: { [key: string]: string } }) {
  const { params: { dashboardId }, searchParams } = props
  const dashboard = await GetDashboardId(dashboardId);
  const charts = await GetChartsByDashboardId(dashboardId);

  const defaults: DefaultsType = {
    from: new Date(format(new Date(), 'yyyy-MM-01')),
    to: lastDayOfMonth(new Date()),
    preset: DateRange.CURRENT_MONTH,
    compare: "previous_period",
  }

  let state: Pick<DefaultsType, "from" | "to" | "compare"> = {
    from: searchParams?.from ? new Date(parse(searchParams.from, 'dd-MM-yyyy', new Date())) : new Date(defaults.from),
    to: searchParams?.to ? new Date(parse(searchParams.to, 'dd-MM-yyyy', new Date())) : new Date(defaults.to),
    compare: searchParams?.compare ? searchParams.compare as keyof typeof ComparePeriodsType : defaults.compare,
  }

  if (!dashboard)
    redirect("/dashboards");

  return (
    <section>
      <div className="flex mb-6">
        <div className="grow">
          <h1 className="text-xl text-primary"><strong>{dashboard?.name}</strong> Dashboard</h1>
          <p className="text-sm text-slate-600">Showing <strong>{charts.length}</strong> {`${charts.length > 1 ? 'charts' : 'chart'}`}</p>
        </div>
        <DashboardFilters state={state} touched={Object.keys(searchParams).length > 0} touched_keys={Object.keys(searchParams)} />
      </div>
      <hr className="mb-8"></hr>
      <div className="flex gap-2 justify-between">
        {charts.map(chart => <Chart
          key={chart.id}
          type={chart.chartType}
          id={chart.id}
          name={chart.name}
          dashboardId={chart.dashboardId}
          chartType={chart.chartType}
          sqlQuery={chart.sqlQuery}
          xAxisField={chart.xAxisField}
          yAxisField={chart.yAxisField}
          dateField_table={chart.dateField_table}
          dateField_field={chart.dateField_field}
        // from={searchParams.from || defaults.from}
        // to={searchParams.to || defaults.to}
        // preset={searchParams.preset || defaults.preset}
        // compare={searchParams.compare || defaults.compare}
        />)}
      </div>
    </section >
  )
}
