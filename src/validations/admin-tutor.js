import { z } from 'zod'
import { adminTutorMessages as msg } from '@/validations/message'

export const adminTutorSchema = z.object({
    firstName: z
        .string()
        .min(1, msg.firstNameRequired)
        .regex(/^[A-Za-z\s]+$/, msg.firstNameFormat),
    lastName: z
        .string()
        .min(1, msg.lastNameRequired)
        .regex(/^[A-Za-z\s]+$/, msg.lastNameFormat),
    email: z.string().min(1, msg.emailRequired).email(msg.emailFormat),
    role: z.string().min(1, msg.roleRequired),
    profilePicture: z
        .any()
        .optional()
        .refine(
            (file) => {
                if (!file) return true // optional
                return (
                    ['image/jpeg', 'image/png'].includes(file.type) &&
                    file.size <= 2 * 1024 * 1024
                )
            },
            {
                message: msg.profilePictureFormat,
                path: ['profilePicture'],
            }
        ),
    designation: z
        .string()
        .max(100, msg.designationLength)
        .optional()
        .or(z.literal('')),
    shortBio: z
        .string()
        .max(300, msg.shortBioLength)
        .optional()
        .or(z.literal('')),
})
