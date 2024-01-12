"use client"
import { Bar, BarChart } from 'recharts';
import { CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';


type Props<DataType> = {
    xAxisField: string;
    yAxisField: string;
    data?: Array<DataType>;
}

export function BarChartContainer<DataType>(props: Props<DataType>) {
    const { data, xAxisField, yAxisField } = props


    return <BarChart width={1200} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisField} />
        <YAxis dataKey={yAxisField} />
        <Tooltip />
        <Bar dataKey={yAxisField} fill="var(--primary)" />
        {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
    </BarChart>
}
