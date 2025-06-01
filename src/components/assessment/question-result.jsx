import { Badge } from '@/components/ui/badge'
import { CircleCheckBig, CircleX } from 'lucide-react'
import OptionResult from './option-result'

const QuestionResult = ({ question }) => {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <h3 className="text-foreground mb-4 list-inside text-base font-semibold">
                    {question.id}. {question.question}
                </h3>
                <Badge
                    className={`group ml-2 rounded-full px-3 py-0.5 ${
                        question.isCorrect
                            ? 'bg-brand-green text-background'
                            : 'bg-brand-red text-background'
                    } hover:text-border flex items-center`}
                >
                    {question.isCorrect ? (
                        <>
                            <CircleCheckBig className="text-background group-hover:text-background h-3.5 w-3.5" />
                            <span className="cursor-default text-sm">
                                Correct
                            </span>
                        </>
                    ) : (
                        <>
                            <CircleX className="text-background group-hover:text-background h-3.5 w-3.5" />
                            <span className="cursor-default text-sm">
                                Wrong
                            </span>
                        </>
                    )}
                </Badge>
            </div>

            <div className="space-y-2">
                {question.options.map((opt, idx) => (
                    <OptionResult key={idx} option={opt} type={question.type} />
                ))}
            </div>
        </div>
    )
}

export default QuestionResult
