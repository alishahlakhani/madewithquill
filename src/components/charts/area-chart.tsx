"use client"
import { Area, AreaChart, Tooltip, XAxis } from 'recharts';


type Props = {
    xAxisField: string;
    yAxisField: string;
    data?: Array<any>;
}

export function AreaChartContainer(props: Props) {
    const { data, xAxisField, yAxisField } = props

    const totalDataPointsCount: number = Array.isArray(data) ? data.length - 1 : 0;
    const labelStart = data?.[0]?.[xAxisField];
    const labelEnd = data?.[data?.length - 1]?.[xAxisField];

    if (totalDataPointsCount === 0) {
        return <div className='flex justify-center h-60 items-center flex-col'>
            <span className='text-3xl'>⚠️</span>
            <span className=' font-semibold text-black/40 text-sm'>No data found</span>
        </div>
    }

    return <div className="relative">
        <p className='absolute bottom-0 text-sm font-medium opacity-40'>{labelStart}</p>
        <AreaChart data={data} width={550} height={200} onClick={e => console.log(e)}>
            <defs>
                <linearGradient id="colorL1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
            </defs>
            <Tooltip />
            <XAxis dataKey={xAxisField} tickLine={false} axisLine={false} tick={false} />
            <Area type="monotoneX" dataKey={yAxisField} fillOpacity={.4} strokeOpacity={1} fill="url(#colorL1)" stroke="var(--primary)" />
        </AreaChart>
        <p className='absolute bottom-0 right-0 text-sm font-medium opacity-40'>{labelEnd}</p>
    </div>
}
