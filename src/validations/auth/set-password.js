import { z } from 'zod'
import { setPassword } from '@/validations/messages/set-password'

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/

export const setPasswordSchema = z
    .object({
        newPassword: z
            .string()
            .min(1, { message: setPassword.password.required })
            .max(12, { message: setPassword.password.length })
            .regex(strongPasswordRegex, {
                message: setPassword.password.invalid,
            }),

        confirmPassword: z
            .string()
            .min(1, { message: setPassword.password.confirmPasswordMatch }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        path: ['confirmPassword'],
        message: setPassword.password.confirmPasswordMatch,
    })
