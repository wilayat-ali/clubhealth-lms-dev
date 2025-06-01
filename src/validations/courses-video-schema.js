import { z } from 'zod'
import { videoMessages } from './message'

export const videoSchema = z.object({
    file: z.any().refine((file) => file instanceof File || file?.name, {
        message: videoMessages.file.required,
    }),
    caption: z.string().optional(),
})
