const SplitProgressBar = ({
    firstAttemptValue,
    retakesValue,
    className,
    startLabel,
    lastLabel,
}) => {
    const total = firstAttemptValue + retakesValue
    const firstAttemptPercentage =
        total > 0 ? (firstAttemptValue / total) * 100 : 0

    return (
        <div className={`${className} mb-1`}>
            <div className="relative h-2 w-full overflow-hidden rounded-full">
                <div
                    className="bg-brand-green h-full rounded-l-full"
                    style={{ width: `${firstAttemptPercentage}%` }}
                />

                <div
                    className="bg-brand-red absolute top-0 right-0 h-full rounded-r-full"
                    style={{
                        width: `${100 - firstAttemptPercentage}%`,
                    }}
                />
            </div>
            <div className="text-secondary-foreground mt-2 flex justify-between text-xs">
                <div>{startLabel}</div>
                <div>{lastLabel}</div>
            </div>
        </div>
    )
}

export default SplitProgressBar
