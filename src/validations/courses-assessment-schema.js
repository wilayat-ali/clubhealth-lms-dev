import { z } from 'zod'
import { assessmentMessages } from './message'

export const coursesAssessmentSchema = z.object({
    type: z.string().min(1, assessmentMessages.type.required),
})
