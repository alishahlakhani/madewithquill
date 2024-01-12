import { AreaChartContainer } from "./area-chart";
import { LineChartContainer } from "./line-chart";
import { Charts } from "@prisma/client";
import { BarChartContainer } from "./bar-chart";
import { GetChartData } from "@zero/app/dashboards/action";

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
} & Charts


function ChartWrapper({ name, children }: { name: string, children: any }) {
    return <div className="shadow rounded-lg p-4 border w-fit bg-white hover:shadow-xl hover:-translate-y-0.5 transition-all transform text-center grayscale hover:grayscale-0 ease-out opacity-70 hover:opacity-100">
        <p className="font-bold text-3xl">{name}</p>
        {children}
    </div>
}
export async function Chart(props: Props) {
    const { styles, className, id, name, dashboardId, chartType, sqlQuery, xAxisField, yAxisField, dateField_table, dateField_field, ...other } = props;
    const data = await GetChartData(sqlQuery);

    switch (chartType) {
        case "Line":
            return <ChartWrapper name={name}>
                <LineChartContainer data={data} xAxisField={xAxisField} yAxisField={yAxisField} {...other} />
            </ChartWrapper>
        case "Bar":
            return <ChartWrapper name={name}>
                <BarChartContainer data={data} xAxisField={xAxisField} yAxisField={yAxisField} {...other} />
            </ChartWrapper>
        case "Area":
            return <ChartWrapper name={name}>
                <AreaChartContainer data={data} xAxisField={xAxisField} yAxisField={yAxisField} {...other} />
            </ChartWrapper>
        default:
            <p>No Chart of type {chartType} found.</p>
    }
}
