"use client"
import * as React from "react"
import { DateRange as DbDateRange } from "@prisma/client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { addDays, differenceInCalendarDays, format, getDaysInMonth, isFirstDayOfMonth, isLastDayOfMonth, isSameMonth, lastDayOfMonth, startOfMonth, subDays } from "date-fns";
import { cn } from "@zero/utils";
import { DateRange } from "react-day-picker";
import { ComparePeriodsType } from "@zero/app/dashboards/action";
import { useDashboardState } from "./dashboard-provider";
import { DateRangePicker } from "@zero/app/dashboards/[dashboardId]/components/date-range-picker";
import { SelectComparisonRange } from "@zero/app/dashboards/[dashboardId]/components/select-comparison-range";

export function ClientDashboardFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { state, setState } = useDashboardState();

  const touched_keys = Array.from(searchParams.keys());
  const touched = touched_keys.length > 0

  function handleChange(updatedObj: { [key: string]: string }, refresh = true) {
    const params = new URLSearchParams(searchParams.toString())
    Object.keys(updatedObj).forEach(k => params.set(k, updatedObj[k]))
    router.push(pathname + '?' + params.toString());
  }

  function handlePresetChange(newValue: string) {
    switch (newValue) {
      case DbDateRange.CURRENT_MONTH:
        handleFromToChange({
          to: addDays(startOfMonth(new Date()), getDaysInMonth(new Date()) - 1),
          from: startOfMonth(new Date()),
        });
        setState(old => ({ ...old, preset: newValue }))
        return;
      case DbDateRange.LAST_30_DAYS:
        handleFromToChange({
          to: new Date(),
          from: subDays(new Date(), 30)
        });
        setState(old => ({ ...old, preset: newValue }))
        return;
      case DbDateRange.LAST_90_DAYS:
        handleFromToChange({
          to: new Date(),
          from: subDays(new Date(), 90),
        });
        setState(old => ({ ...old, preset: newValue }))
        return
    }
  }

  function handleComparePeriodChange(newValue: string) {
    handleChange({ compare: newValue });
    setState(prev => ({ ...prev, compare: newValue as any }))
  }

  function refreshPresetState(to: Date, from: Date) {
    if (isFirstDayOfMonth(from) && isLastDayOfMonth(to) && isSameMonth(from, to)) {
      setState(prev => ({ ...prev, preset: DbDateRange.CURRENT_MONTH }))

    } else if (differenceInCalendarDays(to, from) === 30) {
      setState(prev => ({ ...prev, preset: DbDateRange.LAST_30_DAYS }))

    } else if (differenceInCalendarDays(to, from) === 90) {
      setState(prev => ({ ...prev, preset: DbDateRange.LAST_90_DAYS }))
    } else {
      setState(prev => ({ ...prev, preset: undefined }))

    }
  }

  function handleFromToChange(range?: DateRange): void {
    if (!range) {
      router.push(pathname);
      setState(prev => ({
        ...prev,
        from: new Date(format(new Date(), 'yyyy-MM-01')),
        to: lastDayOfMonth(new Date())
      }))
    } else if (!range.to) {
      handleChange({
        from: format(range!.from!, "dd-MM-yyyy"),
      });
      setState(prev => ({ ...prev, from: range!.from! }))
    } else {
      handleChange({
        to: format(range!.to!, "dd-MM-yyyy"),
        from: format(range!.from!, "dd-MM-yyyy"),
      });
      setState(prev => ({
        ...prev,
        to: range!.to!,
        from: range!.from!,
      }))
    }
    refreshPresetState(range!.to!, range!.from!)
  }

  function handleFormReset() {
    router.push(pathname);
    setState(prev => ({
      from: new Date(format(new Date(), 'yyyy-MM-01')),
      to: lastDayOfMonth(new Date()),
      preset: DbDateRange.CURRENT_MONTH,
      compare: "previous_period",
    }))
    // router.refresh()
  }

  return (
    <div className="flex gap-2 items-center">
      <DateRangePicker date={{
        from: state.from,
        to: state.to,
      }} onChange={handleFromToChange} className={cn({
        "outline outline-[0.5px] outline-primary": touched_keys.includes("from") || touched_keys.includes("to")
      })}>
        <SelectComparisonRange placeholder="Select from a preset range" range={DbDateRange} value={state.preset} showValueFn={(val => val.replaceAll(/_/g, " ").toLowerCase())} onChange={handlePresetChange} className={cn("mb-2", {
          "outline outline-[0.5px] outline-primary": touched_keys.includes("preset"),
          "normal-case": !state.preset
        })} />
      </DateRangePicker>

      <span className="text-nowrap text-sm opacity-50">compares to</span>
      <div className="relative w-[170px]">
        <SelectComparisonRange placeholder="Select a value" range={ComparePeriodsType} value={state.compare} onChange={handleComparePeriodChange} className={cn({
          "outline outline-[0.5px] outline-primary": touched_keys.includes("compare")
        })} />
        {touched && <span className="text-xs absolute -bottom-5 cursor-pointer opacity-40 hover:opacity-100 transition-all right-1 hover:underline" onClick={handleFormReset}>Reset Filters</span>}
      </div>
    </div>
  )
}
