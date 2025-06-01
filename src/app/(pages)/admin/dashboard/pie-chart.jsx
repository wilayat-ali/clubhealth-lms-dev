'use client'

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const RiskLearnersPieChart = ({ data, riskPercentage, riskValue }) => {
    const pieBarColor = (pain) =>
        pain === 25
            ? 'var(--brand-red)'
            : pain >= 30 && pain <= 44
              ? 'var(--brand-blue)'
              : 'var(--brand-green)'
    return (
        <div className="relative w-full overflow-visible xl:h-[200px] 2xl:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius="75%"
                        outerRadius="103%"
                        dataKey="value"
                        nameKey="name"
                        paddingAngle={0}
                        stroke="none"
                    >
                        {data.map((item, index) => (
                            <Cell key={index} fill={pieBarColor(item.value)} />
                        ))}
                    </Pie>

                    <Tooltip
                        formatter={(value, name) => [`${value}%`, name]}
                        contentStyle={{
                            fontSize: '12px',
                            borderRadius: '6px',
                            backgroundColor: '#ffffff',
                            color: '#000000',
                        }}
                        wrapperStyle={{
                            zIndex: 50,
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-foreground text-2xl font-semibold sm:text-3xl">
                    {riskPercentage}
                </span>
                <span className="text-secondary-foreground text-sm">
                    {riskValue}
                </span>
            </div>
        </div>
    )
}

export default RiskLearnersPieChart
