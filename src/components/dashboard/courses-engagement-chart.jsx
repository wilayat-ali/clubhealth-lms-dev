import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import BarChart from '@/components/charts/bar-chart'

const CoursesEngagementChart = ({
    CoursesEngagementData,
    title,
    bottomSpace,
}) => {
    return (
        <Card className="w-full gap-4 shadow-none">
            <CardHeader className="text-foreground gap-0 text-lg font-semibold">
                {title}
            </CardHeader>
            <CardContent>
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-secondary-foreground text-sm">
                        Courses
                    </span>
                    <span className="text-secondary-foreground text-sm">
                        Time Spent
                    </span>
                </div>
                <div className="h-[315px] w-full 2xl:h-[315px]">
                    <BarChart
                        data={CoursesEngagementData}
                        barColor="var(--color-secondary-100)"
                        valueKey="hours"
                        categoryKey="course"
                        valueFormatter={(h) =>
                            `${Math.floor(h)}h ${Math.round((h % 1) * 60)}m`
                        }
                        labelTruncator={(text, len) =>
                            text.length > len
                                ? text.slice(0, len - 3) + '...'
                                : text
                        }
                        bottomSpace={bottomSpace}
                    />
                </div>

                <div className="mt-0 space-y-1">
                    <p className="text-sm font-medium">
                        Overall you have spent total 30h 10m
                    </p>
                    <p className="text-secondary-foreground text-sm">
                        You've spent average about 5 hours per course.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

export default CoursesEngagementChart
