import { z } from 'zod'
import { moduleMessages } from './message'

export const moduleSchema = z.object({
    title: z.string().min(1, moduleMessages.title.required),
    description: z.string().optional(),
    estimatedTime: z.string().min(1, moduleMessages.estimatedTime.required),
})
