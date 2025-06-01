import { z } from 'zod'
import { addAssessmentMessages } from '@/validations/message'

export const addAssessmentSchema = z.object({
    title: z.string().min(1, { message: addAssessmentMessages.title }),
    subtitle: z.string().min(1, { message: addAssessmentMessages.subtitle }),
    shortDescription: z
        .string()
        .min(1, { message: addAssessmentMessages.shortDescription }),
    passingScore: z
        .string()
        .min(1, { message: addAssessmentMessages.passingScore.required })
        .refine(
            (val) =>
                !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100,
            { message: addAssessmentMessages.passingScore.invalid }
        ),
    shuffleQuestion: z.boolean().default(false),
    questionLimit: z
        .string()
        .min(1, { message: addAssessmentMessages.questionLimit.required })
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: addAssessmentMessages.questionLimit.invalid,
        }),
})
