"use client"
import { Area, AreaChart } from 'recharts';


type Props = {
    yAxisField: string;
    xAxisField: string;
    originalData?: Array<any>;
    compareData?: Array<any>;
}

export function AreaChartContainer(props: Props) {
    const { originalData, compareData, yAxisField } = props

    const totalDataPointsCount: number = Array.isArray(originalData) ? originalData.length : 0;

    if (totalDataPointsCount === 0) {
        return <div className='flex justify-center h-60 items-center flex-col'>
            <span className='text-3xl'>⚠️</span>
            <span className=' font-semibold text-black/40 text-sm'>No data found</span>
        </div>
    }

    return <div className='relative'>
        {compareData && <AreaChart data={compareData} width={550} height={200} onClick={() => console.log(compareData)}>
            <defs>
                <linearGradient id="colorL1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.3} />
                </linearGradient>
            </defs>
            <Area type="monotoneX" dataKey={yAxisField} fillOpacity={.4} strokeOpacity={1} strokeWidth={2} animationDuration={2500} stroke="#43434330" dot={false} fill="url(#colorL2)" />
        </AreaChart>}
        <AreaChart data={originalData} width={550} height={200} onClick={() => console.log(originalData)} className='z-10' style={{
            position: "absolute",
            bottom: 0
        }}>
            <defs>
                <linearGradient id="colorL1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.3} />
                </linearGradient>
            </defs>
            <Area type="monotoneX" dataKey={yAxisField} fillOpacity={.4} strokeOpacity={1} strokeWidth={2} animationDuration={2500} fill="url(#colorL1)" stroke="var(--primary)" dot={p => {
                const { width, height, cx, cy, r, index } = p
                if (index === originalData?.length! - 1)
                    return <svg height={height + cy} width={width + cx}>
                        <circle cx={cx} cy={cy} r={r} fill="var(--primary)" />
                    </svg>
                return <></>
            }} />
        </AreaChart>
    </div>
}
