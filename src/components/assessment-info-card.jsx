const AssessmentInfoCard = ({
    icon: Icon,
    label,
    value,
    valueColor = 'text-foreground',
}) => {
    return (
        <div className="bg-card border-border space-y-1 rounded-lg border p-4">
            <div className="flex items-center gap-2">
                {Icon && <Icon className="text-secondary-foreground size-5" />}
                <p className="text-secondary-foreground text-sm">{label}</p>
            </div>
            <div className={`text-3xl font-semibold ${valueColor}`}>
                {value}
            </div>
        </div>
    )
}

export default AssessmentInfoCard
