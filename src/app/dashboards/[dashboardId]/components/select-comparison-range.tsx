"use client"
import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zero/components/ui/select"
import { cn } from "@zero/utils";

type Props = {
  range: {
    [key: string]: string;
  };
  showValueFn?: (value: string) => string;
  value?: string;
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
}

export function SelectComparisonRange(props: Props) {
  const { range, value, onChange, placeholder = "Select a value", showValueFn = (s: string) => s, className = "" } = props;

  function handleOnSelect(newValue: string) {
    onChange && onChange(newValue)
  }

  return (
    <Select value={value} onValueChange={handleOnSelect}>
      <SelectTrigger className={cn("capitalize text-nowrap", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.keys(range).map((key: string) => {
            return <SelectItem className="capitalize" key={key} value={key}>{(showValueFn && showValueFn(range[key]) || range[key])}</SelectItem>
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
