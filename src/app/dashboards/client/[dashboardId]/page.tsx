"use client"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { format, lastDayOfMonth } from "date-fns";
import { Charts, Dashboards, DateRange } from "@prisma/client";
import { useEffect, useState } from "react";
import { Skeleton } from "@zero/components/ui/skeleton";
import { DashboardStateProvider } from "./components/dashboard-provider";
import { ClientSideCharts, LoadingChartUI } from "./components/client-side-charts";
import { ClientDashboardFilters } from "./components/client-dashboard-filters";
import { Button } from "@zero/components/ui/button";

export default function ViewDashboardPage() {
  const { dashboardId } = useParams<{ dashboardId: string }>()

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [dashboardState, setDashboardState] = useState<{
    dashboard: Dashboards | null,
    charts: Array<Charts>,
    loading: boolean
  }>({
    dashboard: null,
    charts: [],
    loading: true,
  })

  async function reloadDashboard() {
    const [charts, dashboard] = await Promise.all([
      fetch("/api/dashboard/charts/" + dashboardId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async resp => {
        if (!resp.ok) {
          // TODO:
        }
        return await resp.json()
      }),
      fetch("/api/dashboards/" + dashboardId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async resp => {
        if (!resp.ok) {
          // TODO:
        }
        return await resp.json()
      })
    ])

    setDashboardState({
      dashboard,
      charts,
      loading: false
    })
  }

  useEffect(() => {
    reloadDashboard();
  }, [])


  console.log(dashboardState)
  // let state: DefaultsType = {
  //   from: searchParams?.from ? new Date(parse(searchParams.from, 'dd-MM-yyyy', new Date())) : new Date(defaults.from),
  //   to: searchParams?.to ? new Date(parse(searchParams.to, 'dd-MM-yyyy', new Date())) : new Date(defaults.to),
  //   compare: searchParams?.compare ? searchParams.compare as keyof typeof ComparePeriodsType : defaults.compare,
  // }

  // if (isFirstDayOfMonth(state.from) && isLastDayOfMonth(state.to) && isSameMonth(state.from, state.to)) {
  //   state.preset = DateRange.CURRENT_MONTH
  // } else if (differenceInCalendarDays(state.to, state.from) === 30) {
  //   state.preset = DateRange.LAST_30_DAYS
  // } else if (differenceInCalendarDays(state.to, state.from) === 90) {
  //   state.preset = DateRange.LAST_90_DAYS
  // }

  // if (!dashboard)
  //   redirect("/dashboards");

  const LoadingDashboadUI = () => <>
    <div className="flex justify-between">
      <div className="flex flex-col gap-2">
        <Skeleton className="w-[280px] h-[25px] border" />
        <Skeleton className="w-[100px] h-[10px] border" />
      </div>

      <div className="flex flex-row gap-2 items-center">
        <Skeleton className="w-[280px] h-[45px] border" />
        <Skeleton className="w-[80px] h-[14px] border" />
        <Skeleton className="w-[170px] h-[45px] border" />
      </div>

    </div>
    <hr className="my-6 mb-8" />
    <div className="flex gap-2 my-2">
      <LoadingChartUI />
      <LoadingChartUI />
    </div>
  </>;

  const NoDashboardDataFound = () => <>
    <div className="flex gap-2 my-2 justify-center items-center">
      <div className="rounded-lg p-4 flex-col flex items-center justify-center bg-slate-50 transition-all border transform w-full">
        <span className='text-3xl'>😰</span>
        <h1 className='font-semibold text-black mt-4 mb-2 text-2xl'>Dashboard does not exist.</h1>
        <span className='font-semibold text-black/40 text-sm mb-2'>You can always create a new dashboard. Simply click the button below</span>
        <div className="flex gap-2 mt-3">
          <Button size={"sm"} variant={"outline"}>Create new</Button>
          <Button size={"sm"} variant={"link"}>or Learn more</Button>
        </div>
      </div>
    </div>
  </>;

  const NoChartsFound = () => <>
    <div className="flex gap-2 my-2 justify-center items-center">
      <div className="rounded-lg p-4 flex-col flex items-center justify-center bg-slate-50 transition-all border transform w-full">
        <span className='text-3xl'>🔗</span>
        <h1 className='font-semibold text-black mt-4 mb-2 text-2xl'>Dashboard does not have any charts.</h1>
        <span className='font-semibold text-black/40 text-sm mb-2'>You can always assign a charts to a dashboard. Simply click the button below</span>
        <div className="flex gap-2 mt-3">
          <Button size={"sm"} variant={"outline"}>Assign Charts</Button>
          <Button size={"sm"} variant={"link"}>or Learn more</Button>
        </div>
      </div>
    </div>
  </>;

  const { dashboard, charts } = dashboardState

  if (dashboardState.loading) return <LoadingDashboadUI />
  if (!dashboardState.loading && !dashboardState.dashboard) return <NoDashboardDataFound />

  return (
    <section>
      <DashboardStateProvider value={{
        from: new Date(format(new Date(), 'yyyy-MM-01')),
        to: lastDayOfMonth(new Date()),
        compare: "previous_period",
      }}>
        <div className="flex mb-6">
          <div className="grow">
            <h1 className="text-xl text-primary"><strong>{dashboard?.name}</strong> Dashboard</h1>
            <p className="text-sm text-slate-600">Showing <strong>{charts.length}</strong> {`${charts.length > 1 ? 'charts' : 'chart'}`}</p>
          </div>
          <ClientDashboardFilters />
        </div>
        <hr className="mb-8"></hr>
        {charts.length > 0 && <div className="flex gap-2 justify-between">
          {charts.map(chart => <ClientSideCharts
            key={chart.id}
            id={chart.id}
          />)}
        </div>}
        {charts.length === 0 && <NoChartsFound />}
      </DashboardStateProvider>
    </section >
  )
}
