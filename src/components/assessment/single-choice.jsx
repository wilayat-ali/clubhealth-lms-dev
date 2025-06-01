// components/assessment/SingleChoice.tsx
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const SingleChoice = ({
    questionId,
    options,
    selected,
    onChange,
    viewMode = false,
}) => {
    return (
        <RadioGroup
            value={selected || ''}
            onValueChange={(val) => onChange(questionId, val)}
            className="space-y-0"
        >
            {options.map((opt, i) => (
                <div
                    key={i}
                    className={`bg-background flex items-center space-x-2 rounded-lg border p-2 ${
                        selected === opt ? 'border-primary' : 'border-border'
                    } ${viewMode ? 'cursor-default' : ''}`}
                >
                    <RadioGroupItem
                        value={opt}
                        id={`${questionId}-${i}`}
                        disabled={viewMode}
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
        </RadioGroup>
    )
}

export default SingleChoice
