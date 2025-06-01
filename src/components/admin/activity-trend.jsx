'use client'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import AreaChart from '@/components/charts/area-chart'
import AreaChartTooltip from '@/components/dashboard/area-chart-tooltip'
import FilterTabs from '@/components/course-filter-tabs'

import bestPerformingCoursesData from '@/data/activity-trend'

const ActivityTrendChart = ({ learningActivityData, title }) => {
    return (
        <Card className="w-full shadow-none">
            <CardHeader className="gap-0">
                <div className="w-full flex-col items-center text-start xl:flex-col xl:space-y-4 2xl:flex 2xl:flex-row 2xl:justify-between 2xl:space-y-0">
                    <CardTitle className="mb-2 text-lg font-semibold 2xl:mb-0">
                        {title}
                    </CardTitle>
                    <FilterTabs
                        filters={bestPerformingCoursesData}
                        defaultFilter="Time Spent"
                        className="bg-muted"
                    />
                </div>
            </CardHeader>
            <div>
                <div className="mx-4 mb-2 flex justify-between pl-1 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="bg-brand-green text-secondary-foreground h-2 w-2 rounded-full"></div>
                        <span className="text-secondary-foreground">
                            Time Spent
                        </span>
                    </div>
                </div>
                <div className="h-[350px] w-full">
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

export default ActivityTrendChart
