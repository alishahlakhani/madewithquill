'use client'
import { Line, LineChart } from 'recharts';

type Props = {
    yAxisField: string;
    xAxisField: string;
    originalData?: Array<any>;
    compareData?: Array<any>;
}

export function LineChartContainer(props: Props) {
    const { originalData, compareData, yAxisField } = props

    const totalDataPointsCount: number = Array.isArray(originalData) ? originalData.length : 0;

    if (totalDataPointsCount === 0) {
        return <div className='flex justify-center h-60 items-center flex-col'>
            <span className='text-3xl'>⚠️</span>
            <span className=' font-semibold text-black/40 text-sm'>No data found</span>
        </div>
    }

    return <div className='relative'>
        {compareData && <LineChart data={compareData} width={550} height={200} onClick={() => console.log(compareData)}>
            <Line type="linear" dataKey={yAxisField} strokeOpacity={.7} strokeWidth={2} animationDuration={2500} stroke="#43434330" dot={false} />
        </LineChart>}
        <LineChart data={originalData} width={550} height={200} onClick={() => console.log(originalData)} className='z-10' style={{
            position: "absolute",
            bottom: 0
        }}>
            <Line type="linear" dataKey={yAxisField} fillOpacity={.4} strokeOpacity={1} strokeWidth={2} animationDuration={2500} stroke="var(--primary)" dot={p => {
                const { width, height, cx, cy, r, index } = p
                if (index === originalData?.length! - 1)
                    return <svg height={height + cy} width={width + cx}>
                        <circle cx={cx} cy={cy} r={r} fill="var(--primary)" />
                    </svg>
                return <></>
            }} />
        </LineChart>

    </div>
}
