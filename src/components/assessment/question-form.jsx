import MultiChoice from './multi-choice'
import SingleChoice from './single-choice'

const QuestionForm = ({ question, response, onChange, viewMode }) => {
    const { id, type, question: text, options } = question

    return (
        <div>
            <p className="text-foreground mb-4 list-inside text-base font-semibold">
                {text}
            </p>

            {type === 'single choice' ? (
                <SingleChoice
                    questionId={id}
                    options={options}
                    selected={response}
                    onChange={onChange}
                    viewMode={viewMode}
                />
            ) : (
                <MultiChoice
                    questionId={id}
                    options={options}
                    selected={response || []}
                    onChange={onChange}
                    viewMode={viewMode}
                />
            )}
        </div>
    )
}

export default QuestionForm
