// validations/learnerProfileSchema.ts
import { z } from 'zod'
import { learnerProfileMessages as msg } from '@/validations/message'

export const learnerProfileSchema = z.object({
    status: z.string().min(1, msg.statusRequired),
    group: z.string().min(1, msg.groupRequired),
})
