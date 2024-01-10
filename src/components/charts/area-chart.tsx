"use client"
import { cn } from '@zero/utils';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


type Props<DataType> = {
    styles?: React.CSSProperties;
    className?: string;
    data?: Array<DataType>
}

export function AreaChartContainer<DataType>(props: Props<DataType>) {
    const { data, styles, className } = props

    return <ResponsiveContainer width="100%" height={300} style={styles} className={cn("", className)}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" onClick={e => console.log(e)} />
        </AreaChart>
    </ResponsiveContainer>
}
