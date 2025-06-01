import SplitProgressBar from '@/components/split-progress-bar'

const DashboardStatCard = ({
    icon: Icon,
    label,
    value,
    description,
    showProgress,
}) => {
    return (
        <div className="bg-card border-border space-y-1 rounded-lg border p-4">
            <div className="flex gap-2">
                {Icon && (
                    <Icon size="18" className="text-secondary-foreground" />
                )}
                <p className="text-secondary-foreground line-clamp-1 shrink-1 text-sm">
                    {label}
                </p>
            </div>
            <div className="text-foreground text-3xl font-semibold">
                {value}
            </div>
            {description && (
                <p className="text-secondary-foreground line-clamp-2 pt-3 text-xs">
                    {description}
                </p>
            )}

            {showProgress && (
                <div className="mt-2 mb-1">
                    <SplitProgressBar
                        firstAttemptValue={50}
                        retakesValue={50}
                        startLabel="First attempt"
                        lastLabel="Retakes"
                    />
                </div>
            )}
        </div>
    )
}

export default DashboardStatCard
