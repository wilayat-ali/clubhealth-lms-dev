import { z } from 'zod'
import { addCourseMessages } from './message'

export const addCourseSchema = z.object({
    title: z.string().min(1, addCourseMessages.title),
    status: z.string().min(1, addCourseMessages.status),
    prerequisite: z.string().min(1, addCourseMessages.prerequisite),
    shortDescription: z
        .string({
            required_error: addCourseMessages.shortDescription.required,
        })
        .min(20, addCourseMessages.shortDescription.min)
        .max(300, addCourseMessages.shortDescription.max),
    instructor: z.string().min(1, addCourseMessages.instructor),
    learnerGroups: z.string().min(1, addCourseMessages.learnerGroups),
    timeToComplete: z.string().min(1, addCourseMessages.timeToComplete),
    certificateUponCompletion: z
        .string()
        .min(1, addCourseMessages.certificateUponCompletion),
    file: z.any().refine((file) => file instanceof File || file?.name, {
        message: addCourseMessages.file,
    }),
    overview: z.string().optional(),
    whatYoullLearn: z.string().optional(),
    whoShouldEnroll: z.string().optional(),
})
