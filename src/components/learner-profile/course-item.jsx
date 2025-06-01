import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

const progressColorMap = {
    Completed: 'bg-brand-green',
    Ongoing: 'bg-status-gray',
}
const ProgressFillColor = (status) => progressColorMap[status] || 'bg-primary'

const CourseItem = ({ course }) => {
    return (
        <div className="bg-muted mb-2 rounded-lg p-4">
            <div className="mb-1 flex items-start justify-between">
                <h4 className="text-foreground text-sm font-medium">
                    {course.title}
                </h4>
                <Badge
                    className={cn(
                        'rounded-full text-xs font-normal',
                        course.status === 'Completed'
                            ? 'bg-brand-green'
                            : 'bg-brand-red'
                    )}
                >
                    {course.status}
                </Badge>
            </div>
            <div className="text-secondary-foreground mb-2 grid grid-cols-3 gap-x-4 text-sm">
                <p>
                    Start:{' '}
                    <span className="text-foreground">{course.startDate}</span>
                </p>
                <p>
                    End:{' '}
                    <span className="text-foreground">{course.endDate}</span>
                </p>
                <p>
                    Time Spent:{' '}
                    <span className="text-foreground">{course.timeSpent}</span>
                </p>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between text-xs">
                    <p className="text-foreground">{`${course.progress}% completed`}</p>
                    <p className="text-foreground">
                        {course.chapters} chapters
                    </p>
                </div>
                <Progress
                    value={course.progress}
                    fillColor={ProgressFillColor(course.status)}
                />
            </div>
        </div>
    )
}

export default CourseItem
