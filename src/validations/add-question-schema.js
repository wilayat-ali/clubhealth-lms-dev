import { z } from 'zod'
import { addQuestionMessages } from '@/validations/message'

export const addQuestionSchema = z.object({
    questionType: z.enum(['single', 'multi'], {
        required_error: addQuestionMessages.questionTypeRequired,
    }),
    question: z.string().min(1, addQuestionMessages.questionRequired),
    options: z
        .array(
            z.object({
                id: z.number(),
                text: z.string().min(1, addQuestionMessages.optionTextRequired),
                isCorrect: z.boolean(),
            })
        )
        .min(2, addQuestionMessages.minOptions),
})
