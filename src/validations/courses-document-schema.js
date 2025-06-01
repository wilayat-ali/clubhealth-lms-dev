import { z } from 'zod'
import { documentMessages } from './message'

export const documentSchema = z.object({
    file: z.any().refine((file) => file instanceof File || file?.name, {
        message: documentMessages.file.required,
    }),
    title: z.string().optional(),
    details: z.string().optional(),
})
