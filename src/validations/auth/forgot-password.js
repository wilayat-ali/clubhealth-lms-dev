import { z } from 'zod'
import { forgotPassword } from '@/validations/auth/message'

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, { message: forgotPassword.email.required })
        .email({ message: forgotPassword.email.invalid }),
})
