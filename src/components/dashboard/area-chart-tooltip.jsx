const AreaChartTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-card rounded-xl p-3">
                <p className="text-sm font-medium">{label}, 2025</p>
                <div className="mt-2 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-800" />
                        <p className="text-secondary-foreground text-sm">
                            {payload[0]?.value} minutes spent
                        </p>
                    </div>
                    {payload[1]?.value && (
                        <div className="flex items-center gap-2">
                            <div className="bg-brand-green h-2.5 w-2.5 rounded-full" />
                            <p className="text-secondary-foreground text-sm">
                                {payload[1].value} Chapters Completed
                            </p>
                        </div>
                    )}
                </div>
            </div>
        )
    }
    return null
}

export default AreaChartTooltip
