import { z } from 'zod'
import { login, otp } from '@/validations/auth/message'

const REGEXP_ONLY_DIGITS_AND_CHARS =
    /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, { message: login.email.required })
        .email({ message: login.email.invalid }),
    password: z.string().min(1, { message: login.password.required }),
    remember: z.boolean().optional(),
})

export const otpSchema = z.object({
    otp: z
        .string()
        .length(6, { message: otp.length })
        .regex(REGEXP_ONLY_DIGITS_AND_CHARS, {
            message: otp.required,
        }),
})
