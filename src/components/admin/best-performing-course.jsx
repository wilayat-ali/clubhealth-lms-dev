import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import BarChart from '@/components/charts/bar-chart'
import FilterTabs from '@/components/course-filter-tabs'

import bestPerformingCoursesData from '@/data/best-performing-courses'

const BestPerformingCourses = ({
    CoursesEngagementData,
    title,
    bottomSpace,
}) => {
    return (
        <Card className="w-full gap-4 shadow-none">
            <CardHeader className="gap-0">
                <div className="w-full flex-col items-center text-start xl:flex-col 2xl:flex 2xl:flex-row 2xl:justify-between 2xl:space-y-0">
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
            <CardContent>
                <div className="mb-2 flex items-center justify-between">
                    <span className="text-secondary-foreground text-sm">
                        Courses
                    </span>
                    <span className="text-secondary-foreground text-sm">
                        Time Spent
                    </span>
                </div>
                <div className="h-[315px] w-full">
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
                        Trending up by 5.2% this week
                    </p>
                    <p className="text-secondary-foreground text-sm">
                        You've spent about 5 hours per course.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

export default BestPerformingCourses
