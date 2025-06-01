import { z } from 'zod'
import { signup } from '@/validations/auth/message'

const nameRegex = /^[A-Za-z\s]+$/
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/
const ACCEPTED_IMAGE_TYPES = ['jpeg', 'png']

export const signupSchema = z
    .object({
        firstName: z
            .string()
            .min(1, { message: signup.firstName.required })
            .regex(nameRegex, { message: signup.firstName.invalid }),

        lastName: z
            .string()
            .min(1, { message: signup.lastName.required })
            .regex(nameRegex, { message: signup.lastName.invalid }),

        email: z.string().min(1, { message: signup.email.required }).email({
            message: signup.email.invalid,
        }),

        profile: z.any().refine(
            (file) => {
                if (!file) return true

                const files = Array.isArray(file) ? file : [file]

                return files.every((f) => {
                    const fileType = f?.type?.split('/')[1]
                    return ACCEPTED_IMAGE_TYPES.includes(fileType)
                })
            },
            { message: signup.image.invalidType }
        ),

        newPassword: z
            .string()
            .min(1, { message: signup.password.required })
            .min(12, { message: signup.password.length })
            .regex(strongPasswordRegex, {
                message: signup.password.invalid,
            }),

        confirmPassword: z
            .string()
            .min(1, { message: signup.password.confirmPasswordMatch }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        path: ['confirmPassword'],
        message: signup.password.confirmPasswordMatch,
    })
