import { AreaChartContainer } from "./area-chart";
import { ComparePeriodsType, DefaultsType, GetChartData } from "@zero/app/dashboards/action";
import { differenceInCalendarDays, format, isAfter, isBefore, isEqual } from "date-fns";
import { cn } from "@zero/utils";
import { Button } from "../ui/button";
import { LineChartContainer } from "./line-chart";

type Props = {
    styles?: React.CSSProperties;
    className?: string;
    id: string;
} & DefaultsType

export async function Chart(props: Props) {
    const { styles, className, from, to, compare, preset, id, ...other } = props;
    let { chart, data } = await GetChartData<Array<any>>(id, to, from, compare);

    const ChartNotfound = () => <div className="rounded-lg p-4 flex-col flex items-center justify-center bg-slate-50 transition-all border transform w-full">
        <span className='text-3xl'>😰</span>
        <span className='font-semibold text-black/40 text-sm mb-2'>Chart does not exist.</span>
        <Button size={"sm"} variant={"outline"}>Create new</Button>
    </div>

    if (!chart) return <ChartNotfound />

    const { xAxisField, yAxisField, chartType, name } = chart
    let originalData = data.filter((d: any) => isAfter(d[xAxisField], from) || isEqual(d[xAxisField], from))
    let compareData = data.filter((d: any) => isBefore(d[xAxisField], from));
    compareData = compareData.slice(0, Math.min(originalData.length, compareData.length));
    originalData = originalData.slice(0, Math.min(originalData.length, compareData.length));

    const calculateAggregateValue = (values: Array<number>) => {
        return values.reduce((partialSum, a) => partialSum + a, 0);
    }

    const aggregateOriginalValue = calculateAggregateValue(originalData.map(od => od[yAxisField as any]))
    const aggregateCompareValue = calculateAggregateValue(compareData.map(cd => cd[yAxisField as any]))
    const aggregateVariance = 100 * Math.abs((aggregateOriginalValue - aggregateCompareValue) / ((aggregateOriginalValue + aggregateCompareValue) / 2));;
    const aggregateLabel = "$";

    switch (chartType) {
        case "Line":
            return <div className="flex">
                <ChartWrapper name={name} to={to} from={from} compare={compare} aggregateOriginal={aggregateOriginalValue} aggregateCompare={aggregateCompareValue} aggregateLabel={aggregateLabel} aggregateVariance={aggregateVariance}>
                    <LineChartContainer originalData={originalData} compareData={compareData} xAxisField={xAxisField} yAxisField={yAxisField}  {...other} />
                </ChartWrapper>
            </div>
        //     case "Bar":
        //         return <ChartWrapper name={name}>
        //             <BarChartContainer data={data.before} xAxisField={xAxisField} yAxisField={yAxisField} {...other} />
        //         </ChartWrapper>
        case "Area":
            return <div className="flex">
                <ChartWrapper name={name} to={to} from={from} compare={compare} aggregateOriginal={aggregateOriginalValue} aggregateCompare={aggregateCompareValue} aggregateLabel={aggregateLabel} aggregateVariance={aggregateVariance}>
                    <AreaChartContainer originalData={originalData} compareData={compareData} xAxisField={xAxisField} yAxisField={yAxisField} {...other} />
                </ChartWrapper>
            </div>

        default:
            return <ChartNotfound />
    }
}

function ChartWrapper(wrapperProps: { name: string, children: any, to: Date, from: Date, compare: keyof typeof ComparePeriodsType, aggregateOriginal?: number, aggregateCompare?: number, aggregateVariance?: number, aggregateLabel?: string }) {
    const { name, children, to, from, aggregateOriginal, aggregateCompare, aggregateVariance, aggregateLabel = "" } = wrapperProps;

    let daysDiff = differenceInCalendarDays(to, from);
    let labelStart = format(from, daysDiff > 365 ? "dd LLL yyyy" : "dd LLL");
    let labelEnd = format(to, daysDiff > 365 ? "dd LLL yyyy" : "dd LLL");

    return <div className="shadow rounded-lg p-4 border w-fit bg-white hover:shadow-xl hover:-translate-y-0.5 transition-all transform cursor-pointer group">
        <div className="flex gap-2 mb-2 items-center">
            <p className="font-bold text-base text-slate-600">{name}</p>
            {aggregateVariance && aggregateVariance !== 0 && <span className={cn("font-semibold text-xs rounded px-1 py-1", {
                "bg-success text-green-700": aggregateVariance > 0,
                "bg-destructive/30 text-red-700": aggregateVariance < 0,
            })}>{`${aggregateVariance > 0 ? "+" : ""}${aggregateVariance.toFixed(1)}`}%</span>}
        </div>
        {aggregateOriginal && aggregateCompare && <div className="flex items-center mb-2 justify-between font-semibold ">
            <p className="text-xl text-primary">{aggregateLabel}{aggregateOriginal.toLocaleString()}</p>
            <p className=" text-lg text-slate-400">{aggregateLabel}{aggregateCompare.toLocaleString()}</p>
        </div>}
        <div className="relative">
            {children}
            <div className="flex mt-2 py-1 border-t">
                <p className='grow text-start text-sm font-medium opacity-40'>{labelStart}</p>
                <p className='grow text-end text-sm font-medium opacity-40'>{labelEnd}</p>
            </div>
        </div>
        <div className="relative py-2">
            <p className="text-xs text-slate-300 font-semibold uppercase text-center w-full group-hover:inline hidden absolute transition-all underline">Click for breakdown</p>
        </div>
    </div>
}

