// components/assessment/MultiChoice.tsx
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

const MultiChoice = ({
    questionId,
    options,
    selected,
    onChange,
    viewMode = false,
}) => {
    const toggleOption = (opt) => {
        if (viewMode) return
        const isSelected = selected.includes(opt)
        const updated = isSelected
            ? selected.filter((item) => item !== opt)
            : [...selected, opt]
        onChange(questionId, updated)
    }

    return (
        <div className="space-y-3">
            {options.map((opt, i) => (
                <div
                    key={i}
                    className={`bg-background flex items-center space-x-2 rounded-lg border p-2 ${
                        selected.includes(opt)
                            ? 'border-primary'
                            : 'border-border'
                    } ${viewMode ? 'cursor-default' : ''}`}
                >
                    <Checkbox
                        id={`${questionId}-${i}`}
                        checked={selected.includes(opt)}
                        onCheckedChange={() => toggleOption(opt)}
                        className="data-[state=checked]:text-secondary-background"
                    />
                    <Label
                        htmlFor={`${questionId}-${i}`}
                        className={`flex-grow text-sm ${
                            viewMode ? 'cursor-default' : 'cursor-pointer'
                        }`}
                    >
                        {String(opt)}
                    </Label>
                </div>
            ))}
            <p className="text-muted-foreground mt-2 text-xs">
                SELECT ALL THAT APPLY
            </p>
        </div>
    )
}

export default MultiChoice
