'use client'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';


type Props<DataType> = {
    xAxisField?: string;
    yAxisField?: string;
    data?: Array<DataType>;
}

export function LineChartContainer<DataType>(props: Props<DataType>) {
    const { data, xAxisField, yAxisField } = props
    return <LineChart width={1000} height={600} data={data} onClick={e => console.log(e)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisField} label={xAxisField} />
        <YAxis dataKey={yAxisField} />
        {/* <Legend /> */}
        <Tooltip />
        <Line type="monotone" dataKey={yAxisField} stroke="#8884d8" />
        {/* <Line type="monotone" dataKey="" stroke="#82ca9d" /> */}
    </LineChart>


}
