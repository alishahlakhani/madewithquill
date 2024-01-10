"use client"
import React from "react";
import { AreaChartContainer } from "./area-chart";
import { LineChartContainer } from "./line-chart";
import { ResponsiveContainer } from "recharts";
import { cn } from "@zero/utils";
import { Charts } from "@prisma/client";

const Charts = {
    line: {
        Component: LineChartContainer
    },
    bar: {
        Component: AreaChartContainer
    }
}

type Props<DataType> = {
    type: keyof typeof Charts;
    data: Array<DataType>;
    styles?: React.CSSProperties;
    className?: string;
    name: string,
    xAxisField: string,
    yAxisField: string,
    [key: string]: any
} & Partial<Charts>

function ChartWrapper({ name, children }: { name: string, children: any }) {
    return <div className="shadow p-4 border">
        <p className="font-bold text-3xl text-center">{name}</p>
        {children}
    </div>
}
export function Chart<DataType = any>(props: Props<DataType>) {
    const { type, data, styles, className, name, xAxisField, yAxisField, ...other } = props;

    switch (type) {
        case "line":
            return <ChartWrapper name={name}>
                <LineChartContainer<DataType> data={data} xAxisField={xAxisField} yAxisField={yAxisField} {...other} />
            </ChartWrapper>
        case "bar":
            return <ChartWrapper name={name}>
                <AreaChartContainer<DataType> data={data} xAxisField={xAxisField} yAxisField={yAxisField} {...other} />
            </ChartWrapper>
        default:
            <p>No Chart of type {type} found.</p>
        // return <AreaChartContainer<DataType> data={data}></AreaChartContainer>
    }
}
