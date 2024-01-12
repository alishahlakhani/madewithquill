'use client'
import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

type Props = {
    yAxisField: string;
    xAxisField: string;
    data?: Array<any>;
}

export function LineChartContainer(props: Props) {
    const { data, yAxisField, xAxisField } = props

    const totalDataPointsCount: number = Array.isArray(data) ? data.length : 0;

    if (totalDataPointsCount === 0) {
        return <div className='flex justify-center h-60 items-center flex-col'>
            <span className='text-3xl'>⚠️</span>
            <span className=' font-semibold text-black/40 text-sm'>No data found</span>
        </div>
    }

    return <LineChart data={data} width={550} height={200} onClick={e => console.log(data)}>
        <Tooltip />
        <XAxis dataKey={"date"} interval={10 % 0} fontSize={12}></XAxis>
        <Line type="monotoneX" dataKey={yAxisField} fillOpacity={.4} strokeOpacity={1} strokeWidth={2} stroke="var(--secondary)" dot={false} />
        <Line type="monotoneX" dataKey={xAxisField} fillOpacity={.4} strokeOpacity={1} strokeWidth={2} stroke="var(--primary)" dot={false} />
    </LineChart>
}
