"use client"
import * as React from "react"
import { format } from "date-fns"
import { SelectRangeEventHandler } from "react-day-picker"

import { Button } from "@zero/components/ui/button"
import { Calendar } from "@zero/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@zero/components/ui/popover"
import { CalendarIcon, SaveIcon, TicketIcon } from "lucide-react"
import { cn } from "@zero/utils"

type Props = {
  date?: { from: Date, to: Date },
  className?: string,
  children?: React.ReactElement,
  onChange?: SelectRangeEventHandler
}

export function DateRangePicker(props: Props) {
  const { date, onChange, className = "", children } = props

  return (
    <div className={cn("grid gap-2 rounded-sm", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal bg-transparent hover:bg-background",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd y")} -{" "}
                  {format(date.to, "LLL dd y")}
                </>
              ) : (
                format(date.from, "LLL dd y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 py-4 px-2" align="start">
          {children}
          <Calendar
            className="border border-input rounded-sm "
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
