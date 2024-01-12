"use client"
import * as React from "react"
import { SelectComparisonRange } from "./select-comparison-range"
import { DateRange as DbDateRange } from "@prisma/client"
import { DateRangePicker } from "./date-range-picker";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { addDays, differenceInCalendarDays, differenceInDays, format, getDaysInMonth, isEqual, isFirstDayOfMonth, isLastDayOfMonth, lastDayOfMonth, parse, startOfMonth, subDays } from "date-fns";
import { cn } from "@zero/utils";
import { ComparePeriodsType, DefaultsType } from "../../action";
import { DateRange } from "react-day-picker";

type Props = {
  state: Pick<DefaultsType, "from" | "to" | "compare">,
  touched: boolean,
  touched_keys: Array<string>
}
export function DashboardFilters(props: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { state, touched, touched_keys } = props

  function handleChange(updatedObj: { [key: string]: string }, refresh = true) {
    const params = new URLSearchParams(searchParams.toString())
    Object.keys(updatedObj).forEach(k => params.set(k, updatedObj[k]))
    router.push(pathname + '?' + params.toString());
    if (refresh) router.refresh()
  }

  function handlePresetChange(newValue: string) {
    switch (newValue) {
      case DbDateRange.CURRENT_MONTH:
        handleFromToChange({
          to: addDays(startOfMonth(new Date()), getDaysInMonth(new Date()) - 1),
          from: startOfMonth(new Date()),
        });
        return;
      case DbDateRange.LAST_30_DAYS:
        handleFromToChange({
          to: new Date(),
          from: subDays(new Date(), 30)
        });
        return;
      case DbDateRange.LAST_90_DAYS:
        handleFromToChange({
          to: new Date(),
          from: subDays(new Date(), 90),
        });
        return
    }
  }

  function handleComparePeriodChange(newValue: string) {
    handleChange({ compare: newValue });
  }

  function handleFromToChange(range?: DateRange): void {
    if (!range) {
      router.push(pathname);
      router.refresh()
    } else if (!range.to) {
      handleChange({
        from: format(range!.from!, "dd-MM-yyyy"),
      });
    }
    else handleChange({
      to: format(range!.to!, "dd-MM-yyyy"),
      from: format(range!.from!, "dd-MM-yyyy"),
    });
  }

  function handleFormReset() {
    router.push(pathname);
    router.refresh()
  }

  let preset = undefined;

  if (isFirstDayOfMonth(state.from) && isLastDayOfMonth(state.to)) {
    preset = DbDateRange.CURRENT_MONTH
  } else if (differenceInCalendarDays(state.to, state.from) === 30) {
    preset = DbDateRange.LAST_30_DAYS
  } else if (differenceInCalendarDays(state.to, state.from) === 90) {
    preset = DbDateRange.LAST_90_DAYS
  }

  return (
    <div className="flex gap-2 items-center">
      <DateRangePicker date={{
        from: state.from,
        to: state.to,
      }} onChange={handleFromToChange} className={cn({
        "outline outline-[0.5px] outline-primary": touched_keys.includes("from") || touched_keys.includes("to")
      })}>
        <SelectComparisonRange placeholder="Select from a preset range" range={DbDateRange} value={preset} showValueFn={(val => val.replaceAll(/_/g, " ").toLowerCase())} onChange={handlePresetChange} className={cn("mb-2", {
          "outline outline-[0.5px] outline-primary": touched_keys.includes("preset"),
          "normal-case": !preset
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
