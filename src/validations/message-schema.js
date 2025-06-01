import * as z from 'zod'

import { message } from '@/validations/message'

export const messageSchema = z.object({
    messageType: z.string().min(1, { message: message.messageType.required }),

    course: z.any(),

    subject: z
        .string()
        .min(1, { message: message.subject.required })
        .min(3, { message: message.subject.minLength })
        .max(100, { message: message.subject.maxLength }),

    message: z
        .string()
        .min(1, { message: message.message.required })
        .min(5, { message: message.message.minLength })
        .max(1000, { message: message.message.maxLength }),
})
