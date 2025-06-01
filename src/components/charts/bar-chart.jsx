'use client'

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Cell,
    LabelList,
} from 'recharts'

const ProgressBarChart = ({
    data,
    barColor = '',
    valueFormatter = (v) => v,
    labelFormatter = (v) => v,
    labelTruncator = (text) => text,
    barSize = 40,
    valueKey = '',
    categoryKey = '',
    bottomSpace,
}) => {
    const computedMax = Math.max(...data.map((item) => item[valueKey]))

    return (
        <div className={`h-[315px] w-full`}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{
                        top: 0,
                        right: 50,
                        left: 0,
                        bottom: bottomSpace,
                    }}
                    barCategoryGap={12}
                >
                    <XAxis type="number" hide domain={[0, computedMax]} />
                    <YAxis
                        type="category"
                        dataKey={categoryKey}
                        width={0}
                        hide
                    />
                    <Bar
                        dataKey={valueKey}
                        barSize={barSize}
                        radius={[0, 4, 4, 0]}
                        fill={barColor}
                    >
                        <LabelList
                            dataKey={categoryKey}
                            position="insideLeft"
                            content={({ value, x, y, width }) => {
                                const maxLength = Math.floor(width / 8)
                                const truncated = labelTruncator(
                                    value,
                                    maxLength
                                )

                                return (
                                    <text
                                        x={x + 8}
                                        y={y + 24}
                                        fill="var(--color-forground)"
                                        fontSize="0.875rem"
                                        fontWeight={500}
                                        textAnchor="start"
                                    >
                                        {labelFormatter(truncated)}
                                    </text>
                                )
                            }}
                        />
                        <LabelList
                            dataKey={valueKey}
                            position="right"
                            formatter={(value) => valueFormatter(value)}
                            style={{
                                fill: '#000',
                                fontSize: 12,
                            }}
                        />
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ProgressBarChart
