import { z } from 'zod'
import { contentMessages } from './message'

export const contentSchema = z.object({
    headline: z.string().optional(),
    photo: z.any().optional(),
    details: z.string().min(1, contentMessages.details.required),
})
