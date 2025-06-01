'use client'

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'

const ProgressAreaChart = ({
    data,
    areas = [],
    xKey = 'date',
    yAxes = [],
    height = 350,
    margin = { top: 5, right: -10, left: -10, bottom: 5 },
    customTooltip = null,
    gradients = [],
}) => {
    return (
        <div className={`h-[${height}px] w-full`}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={margin}>
                    {gradients.map(({ id, stops }) => (
                        <defs key={id}>
                            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                                {stops.map((stop, i) => (
                                    <stop key={i} {...stop} />
                                ))}
                            </linearGradient>
                        </defs>
                    ))}

                    <CartesianGrid vertical={false} stroke="#e5e7eb" />

                    <XAxis
                        dataKey={xKey}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                        tickMargin={20}
                        padding={{ left: 10, right: 10 }}
                    />

                    {yAxes.map((axis, i) => (
                        <YAxis key={i} {...axis} />
                    ))}

                    <Tooltip content={customTooltip} />

                    {areas.map((area, i) => (
                        <Area key={i} {...area} />
                    ))}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ProgressAreaChart
