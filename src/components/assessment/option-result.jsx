import { Check, CircleCheckBig, CircleX } from 'lucide-react'

const OptionResult = ({ option, type }) => {
    const renderRadioIcon = () => {
        if (option.selected) {
            return (
                <div className="border-border flex size-5 items-center justify-center rounded-full border-2">
                    <div className="bg-muted-foreground h-3.5 w-3.5 rounded-full" />
                </div>
            )
        }
        if (option.correct) {
            return (
                <div className="border-brand-green bg-brand-green flex size-5 items-center justify-center rounded-full border-2">
                    <Check className="text-background h-3.5 w-3.5" />
                </div>
            )
        }
        return <div className="border-border size-5 rounded-full border-2" />
    }

    const renderCheckboxIcon = () => {
        if (option.selected && option.correct) {
            return (
                <div className="border-border bg-muted flex size-5 items-center justify-center rounded border-2">
                    <Check className="text-secondary-foreground size-5" />
                </div>
            )
        }
        if (option.selected || option.correct) {
            return (
                <div className="border-border flex size-5 items-center justify-center rounded border-2" />
            )
        }
        return (
            <div className="border-muted-foreground size-5 rounded border-2" />
        )
    }

    return (
        <div className="bg-background flex h-10 items-center justify-between rounded-lg border px-3">
            <div className="flex items-center">
                <div className="mr-3 flex-shrink-0">
                    {type === 'single'
                        ? renderRadioIcon()
                        : renderCheckboxIcon()}
                </div>
                <span
                    className={`text-sm ${
                        option.selected ? 'text-muted-foreground' : ''
                    }`}
                >
                    {option.text}
                </span>
            </div>

            {option.selected && (
                <div className="ml-2">
                    {option.correct ? (
                        <CircleCheckBig className="text-background bg-brand-green size-5 rounded-full" />
                    ) : (
                        <CircleX className="text-background bg-brand-red size-5 rounded-full" />
                    )}
                </div>
            )}
        </div>
    )
}

export default OptionResult
