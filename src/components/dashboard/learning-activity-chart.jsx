'use client'

import { Card, CardHeader } from '@/components/ui/card'
import AreaChart from '@/components/charts/area-chart'
import AreaChartTooltip from '@/components/dashboard/area-chart-tooltip'

const LearningActivityChart = ({ learningActivityData, title }) => {
    return (
        <Card className="w-full shadow-none">
            <CardHeader className="text-foreground -mb-3 text-lg font-semibold">
                {title}
            </CardHeader>
            <div>
                <div className="mx-3 mb-2 flex justify-between pr-4 pl-1 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="bg-brand-green text-secondary-foreground size-3 rounded-full" />
                        <span className="text-secondary-foreground">
                            Time Spent
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-secondary-foreground">
                            Chapters Completed
                        </span>
                        <div className="bg-brand-blue text-secondary-foreground size-3 rounded-full" />
                    </div>
                </div>
                <div className="h-[368px]">
                    <AreaChart
                        data={learningActivityData}
                        xKey="date"
                        yAxes={[
                            {
                                yAxisId: 'left',
                                orientation: 'left',
                                domain: [0, 90],
                                ticks: [0, 15, 30, 45, 60, 75, 90],
                                tickFormatter: (value) => `${value}m`,
                                axisLine: false,
                                tickLine: false,
                                tick: { fontSize: 12 },
                            },
                            {
                                yAxisId: 'right',
                                orientation: 'right',
                                domain: [0, 12],
                                ticks: [0, 2, 4, 6, 8, 10, 12],
                                axisLine: false,
                                tickLine: false,
                                tick: { fontSize: 12 },
                            },
                        ]}
                        areas={[
                            {
                                yAxisId: 'left',
                                type: 'linear',
                                dataKey: 'timeSpent',
                                stroke: 'var(--brand-green)',
                                fillOpacity: 1,
                                fill: 'url(#timeSpentGradient)',
                            },
                            {
                                yAxisId: 'right',
                                type: 'linear',
                                dataKey: 'chaptersCompleted',
                                stroke: 'var(--brand-blue)',
                                fillOpacity: 1,
                                fill: 'url(#chaptersCompletedGradient)',
                            },
                        ]}
                        gradients={[
                            {
                                id: 'timeSpentGradient',
                                stops: [
                                    {
                                        offset: '0%',
                                        stopColor: 'var(--brand-green)',
                                        stopOpacity: 0.8,
                                    },
                                    {
                                        offset: '100%',
                                        stopColor:
                                            'var(--secondary-background)',
                                        stopOpacity: 0.4,
                                    },
                                ],
                            },
                            {
                                id: 'chaptersCompletedGradient',
                                stops: [
                                    {
                                        offset: '0%',
                                        stopColor: 'var(--brand-blue)',
                                        stopOpacity: 0.8,
                                    },
                                    {
                                        offset: '100%',
                                        stopColor:
                                            'var(--secondary-background)',
                                        stopOpacity: 0.1,
                                    },
                                ],
                            },
                        ]}
                        customTooltip={<AreaChartTooltip />}
                    />
                </div>
            </div>
        </Card>
    )
}

export default LearningActivityChart
