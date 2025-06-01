'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Drawer, DrawerContent, DrawerFooter } from '@/components/ui/drawer'
import { addCourseSchema } from '@/validations/add-courses-schema'
import AddCourseForm from '@/components/manage-courses/add-courses-form'

export const coursesFilters = [
    'Overview',
    "What you'll learn",
    'Who should enroll',
]

const AddCoursesDrawer = ({ open, onOpenChange }) => {
    const [activeTab, setActiveTab] = useState('OverView')
    const form = useForm({
        resolver: zodResolver(addCourseSchema),
        defaultValues: {
            title: 'Treatment Modalities & Basic Principles',
            status: 'draft',
            prerequisite: 'none',
            shortDescription:
                'Master foundational rehabilitation principles and evidence-based treatment modalities to optimize patient recovery and prevent musculoskeletal dysfunction.',
            instructor: 'luis_libeiro',
            learnerGroups: 'beginner_learner',
            timeToComplete: '12-15-hours (self-paced)',
            certificateUponCompletion: 'yes',
            overview:
                'Dive into the fundamentals of healthcare by exploring key treatment modalities and principles. Learn how Club Health strips back the saturated world of healthcare to focus on evidence-based physiotherapy, rehab & conditioning, and clinical pilates - all designed to help patients move well and prevent musculoskeletal conditions.',
            whatYoullLearn: '',
            whoShouldEnroll: '',
        },
    })

    const certificateOption = [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
    ]

    const statusOption = [
        { label: 'Draft', value: 'draft' },
        { label: 'Active', value: 'active' },
        { label: 'Archieved', value: 'archived' },
    ]

    const prerequisiteOption = [
        { label: 'None', value: 'none' },
        { label: 'Course 1', value: 'course1' },
        { label: 'Course 2', value: 'course2' },
    ]

    const instructorOption = [
        { label: 'Luis Ribeiro', value: 'luis_libeiro' },
        { label: 'Melissa', value: 'melissa' },
        { label: 'John Anthony', value: 'john_anthony' },
    ]

    const learnerOption = [
        { label: 'Beginner Learners', value: 'beginner_learner' },
        { label: 'Advance Practitioners', value: 'advance_practitioners' },
        { label: 'Intermediate Learners', value: 'intermediate_anthony' },
    ]

    const coursesFilters = [
        'OverView',
        "What you'll learn",
        'Who should enroll',
    ]

    const onSubmit = (data) => {
        // eslint-disable-next-line no-console
        console.log('Form submitted:', data)
        onOpenChange(false)
    }

    return (
        <Drawer
            open={open}
            onOpenChange={onOpenChange}
            direction="right"
            className="h-screen max-h-screen flex-1 flex-col"
        >
            <DrawerContent>
                <ScrollArea className="h-[calc(100vh)]">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex h-full flex-col"
                        >
                            <AddCourseForm
                                form={form}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                statusOption={statusOption}
                                prerequisiteOption={prerequisiteOption}
                                instructorOption={instructorOption}
                                learnerOption={learnerOption}
                                certificateOption={certificateOption}
                                coursesFilters={coursesFilters}
                            />

                            {/* Footer */}
                            <DrawerFooter className="flex-row gap-3 p-10">
                                <Button
                                    type="submit"
                                    icon="check-check"
                                    className="flex-1"
                                >
                                    Submit & Continue
                                </Button>
                                <Button
                                    type="button"
                                    icon="arrow-left"
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => onOpenChange(false)}
                                >
                                    Cancel
                                </Button>
                            </DrawerFooter>
                        </form>
                    </Form>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    )
}

export default AddCoursesDrawer
