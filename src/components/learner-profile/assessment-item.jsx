import { Badge } from '@/components/ui/badge'
import CircleProgress from '@/components/circular-progress'
import { cn } from '@/lib/utils'

const statusColorMap = {
    Passed: 'var(--color-brand-green)',
    Failed: 'var(--color-brand-red)',
}

const getCircularProgressColor = (status) =>
    statusColorMap[status] ?? 'var(--color-brand-red)'

const AssessmentItem = ({ assessment }) => {
    return (
        <div className="bg-muted mb-3 rounded-lg border-b p-3 last:border-b-0">
            <div className="flex items-start gap-4">
                <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
                    <CircleProgress
                        value={assessment.score}
                        maxValue={100}
                        progressColor={getCircularProgressColor(
                            assessment.status
                        )}
                        trackColor="var(--color-muted)"
                        size="38px"
                    />
                </div>
                <div className="flex-1">
                    <div className="flex items-start justify-between">
                        <p className="text-foreground text-sm font-medium">
                            {assessment.title}
                        </p>
                        <Badge
                            className={cn(
                                'rounded-full text-xs font-medium',
                                assessment.status === 'Passed'
                                    ? 'bg-brand-green'
                                    : 'bg-brand-red'
                            )}
                        >
                            {assessment.status}
                        </Badge>
                    </div>
                    <div className="text-secondary-foreground mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                        <p>
                            Assessment:{' '}
                            <span className="text-foreground text-sm">
                                {assessment.type}
                            </span>
                        </p>
                        <p>
                            Attempt:{' '}
                            <span className="text-foreground text-sm">
                                {assessment.attempt}
                            </span>
                        </p>
                        <p>
                            Date:{' '}
                            <span className="text-foreground text-sm">
                                {assessment.date}
                            </span>
                        </p>
                        <p>
                            Time Taken:{' '}
                            <span className="text-foreground text-sm">
                                {assessment.timeTaken}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssessmentItem
