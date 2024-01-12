import { AreaChartContainer } from "./area-chart";
import { LineChartContainer } from "./line-chart";
import { Charts } from "@prisma/client";
import { BarChartContainer } from "./bar-chart";
import { ComparePeriodsType, DefaultsType, GetChartData3 } from "@zero/app/dashboards/action";
import { format } from "date-fns";

const Charts = {
    line: {
        Component: LineChartContainer
    },
    area: {
        Component: AreaChartContainer
    },
    bar: {
        Component: BarChartContainer
    }
}

type Props = {
    styles?: React.CSSProperties;
    className?: string;
    [key: string]: any
} & Charts & DefaultsType


function ChartWrapper({ name, children, to, from }: { name: string, children: any, to: Date, from: Date, compare: keyof typeof ComparePeriodsType }) {
    let labelStart = format(from, "dd LLLL yyyy");
    let labelEnd = format(to, "dd LLLL yyyy");
    return <div className="shadow rounded-lg p-4 border w-fit bg-white hover:shadow-xl hover:-translate-y-0.5 transition-all transform text-center">
        {/* return <div className="shadow rounded-lg p-4 border w-fit bg-white hover:shadow-xl hover:-translate-y-0.5 transition-all transform text-center grayscale hover:grayscale-0 ease-out opacity-70 hover:opacity-100"> */}
        <p className="font-bold text-2xl mb-4">{name}</p>
        <div className="relative">
            {children}
            <div className="flex mt-2">
                <p className='grow text-start text-sm font-medium opacity-40'>{labelStart}</p>
                <p className='grow text-end text-sm font-medium opacity-40'>{labelEnd}</p>
            </div>
        </div>
    </div>
}
export async function Chart(props: Props) {
    const { styles, className, id, name, dashboardId, chartType, sqlQuery, xAxisField, yAxisField, dateField_table, dateField_field, from, to, compare, preset, ...other } = props;
    const data = await GetChartData3<Array<{ [key: 'date' | string]: string | Date }>>(id, to, from, compare);
    const data2 = await GetChartData3<Array<{ [key: 'date' | string]: string | Date }>>(id, to, from, compare, true);

    switch (chartType) {
        case "Line":
            return <div className="flex">
                {xAxisField}-{yAxisField}
                <ChartWrapper name={name} to={to} from={from} compare={compare}>
                    <LineChartContainer data={data} xAxisField={xAxisField} yAxisField={yAxisField} {...other} />
                </ChartWrapper>
                <ChartWrapper name={name} to={to} from={from} compare={compare}>
                    <LineChartContainer data={data2} xAxisField={xAxisField} yAxisField={yAxisField} {...other} />
                </ChartWrapper>
            </div>
        //     case "Bar":
        //         return <ChartWrapper name={name}>
        //             <BarChartContainer data={data.before} xAxisField={xAxisField} yAxisField={yAxisField} {...other} />
        //         </ChartWrapper>
        case "Area":
            <div className="flex">
                <ChartWrapper name={name} to={to} from={from} compare={compare}>
                    <AreaChartContainer data={data} xAxisField={xAxisField} yAxisField={yAxisField} {...other} />
                </ChartWrapper>
                <ChartWrapper name={name} to={to} from={from} compare={compare}>
                    <AreaChartContainer data={data2} xAxisField={xAxisField} yAxisField={yAxisField} {...other} />
                </ChartWrapper>
            </div>

        // return <ChartWrapper name={name}>
        //     <AreaChartContainer data={data.before} xAxisField={xAxisField} yAxisField={yAxisField} {...other} />
        // </ChartWrapper>
        default:
            <p>No Chart of type {chartType} found.</p>
    }
}
