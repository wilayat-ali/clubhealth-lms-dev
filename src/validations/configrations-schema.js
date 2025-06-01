import { z } from 'zod'
import { configrations } from '@/validations/message'

export const configrationSchema = z.object({
    authorisedBy: z
        .string()
        .min(1, { message: configrations.authorisedBy.required }),
    designation: z
        .string()
        .min(1, { message: configrations.signature.required }),
    signature: z.any(),
    contactEmail: z
        .string()
        .min(1, { message: configrations.contactEmail.required })
        .email({ message: configrations.contactEmail.format }),
    contactPhone: z
        .string()
        .min(1, { message: configrations.contactPhone.required }),
})
