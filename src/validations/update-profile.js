import { z } from 'zod'
import { updateProfile } from '@/validations/message'

const nameRegex = /^[A-Za-z\s]+$/
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/

export const updateProfileSchema = z
    .object({
        firstName: z
            .string()
            .min(1, { message: updateProfile.firstName.required })
            .regex(nameRegex, { message: updateProfile.firstName.format }),

        lastName: z
            .string()
            .min(1, { message: updateProfile.lastName.required })
            .regex(nameRegex, { message: updateProfile.lastName.format }),

        profilePicture: z.any(),

        email: z
            .string()
            .min(1, { message: updateProfile.email.required })
            .email({ message: updateProfile.email.format }),

        oldPassword: z
            .string()
            .min(1, { message: updateProfile.password.oldPassword.required }),

        newPassword: z
            .string()
            .min(1, { message: updateProfile.password.newPassword.required })
            .min(8, { message: updateProfile.password.newPassword.length })
            .regex(strongPasswordRegex, {
                message: updateProfile.password.newPassword.format,
            }),

        confirmPassword: z.string().min(1, {
            message: updateProfile.password.confirmPassword.required,
        }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        path: ['confirmPassword'],
        message: updateProfile.password.confirmPassword.invalid,
    })
