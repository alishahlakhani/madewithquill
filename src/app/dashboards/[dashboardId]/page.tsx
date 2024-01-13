import { Chart } from "@zero/components/charts";
import { ComparePeriodsType, DefaultsType, GetChartsByDashboardId, GetDashboardId } from "../action";
import { redirect } from "next/navigation";
import { DashboardFilters } from "./components/dashboard-filters";
import { differenceInCalendarDays, format, isFirstDayOfMonth, isLastDayOfMonth, isSameMonth, lastDayOfMonth, parse } from "date-fns";
import { DateRange } from "@prisma/client";

export default async function ViewDashboardPage(props: { params: { dashboardId: string }, searchParams: { [key: string]: string } }) {
  const { params: { dashboardId }, searchParams } = props
  const dashboard = await GetDashboardId(dashboardId);
  const charts = await GetChartsByDashboardId(dashboardId);

  const defaults: DefaultsType = {
    from: new Date(format(new Date(), 'yyyy-MM-01')),
    to: lastDayOfMonth(new Date()),
    compare: "previous_period",
  }

  let state: DefaultsType = {
    from: searchParams?.from ? new Date(parse(searchParams.from, 'dd-MM-yyyy', new Date())) : new Date(defaults.from),
    to: searchParams?.to ? new Date(parse(searchParams.to, 'dd-MM-yyyy', new Date())) : new Date(defaults.to),
    compare: searchParams?.compare ? searchParams.compare as keyof typeof ComparePeriodsType : defaults.compare,
  }

  if (isFirstDayOfMonth(state.from) && isLastDayOfMonth(state.to) && isSameMonth(state.from, state.to)) {
    state.preset = DateRange.CURRENT_MONTH
  } else if (differenceInCalendarDays(state.to, state.from) === 30) {
    state.preset = DateRange.LAST_30_DAYS
  } else if (differenceInCalendarDays(state.to, state.from) === 90) {
    state.preset = DateRange.LAST_90_DAYS
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
          id={chart.id}
          from={state.from}
          to={state.to}
          compare={state.compare}
          preset={state.preset}
        />)}
      </div>
    </section >
  )
}
