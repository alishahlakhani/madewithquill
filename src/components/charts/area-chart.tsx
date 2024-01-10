"use client"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


type Props<DataType> = {
    xAxisField: string;
    yAxisField: string;
    data?: Array<DataType>;
}

export function AreaChartContainer<DataType>(props: Props<DataType>) {
    const { data, xAxisField, yAxisField } = props


    return <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }} onClick={e => console.log(e)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxisField} />
            <YAxis dataKey={yAxisField} />
            <Tooltip />
            <Area type="monotone" dataKey={yAxisField} stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
    </ResponsiveContainer>
}
