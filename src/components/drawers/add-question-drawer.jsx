'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { ScrollArea } from '@/components/ui/scroll-area'
import AssessmentOptionForm from '@/components/assessment-option-form'
import AssessmentQuestionForm from '@/components/assessment-question-form'
import { addQuestionSchema } from '@/validations/add-question-schema'

const AddQuestionDrawer = ({ open, onOpenChange }) => {
    const [options, setOptions] = useState([
        { id: 1, text: '', isCorrect: false },
        { id: 2, text: '', isCorrect: false },
    ])

    const form = useForm({
        resolver: zodResolver(addQuestionSchema),
        defaultValues: {
            questionType: 'single',
            question: '',
            options: options,
        },
    })

    const updateFormOptions = (newOptions) => {
        setOptions(newOptions)
        form.setValue('options', newOptions)
    }

    const onSubmit = (data) => {
        const hasCorrectOption = data.options.some((option) => option.isCorrect)

        if (!hasCorrectOption) {
            // eslint-disable-next-line no-console
            console.log('atleast one option must be correct')
            return
        }
        // eslint-disable-next-line no-console
        console.log('Form submitted:', data)
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
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex h-screen flex-col p-6 pl-8">
                                <DrawerHeader>
                                    <div className="flex items-center justify-between">
                                        <DrawerTitle>Add Question</DrawerTitle>
                                    </div>
                                    <DrawerDescription />
                                </DrawerHeader>

                                <AssessmentQuestionForm
                                    form={form}
                                    options={options}
                                    updateFormOptions={updateFormOptions}
                                />

                                <AssessmentOptionForm form={form} />

                                {/* Footer */}
                                <DrawerFooter className="mt-auto flex w-full flex-row justify-end">
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        icon="check-check"
                                        size="lg"
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full"
                                        icon="arrow-left"
                                        size="lg"
                                        onClick={() => onOpenChange(false)}
                                    >
                                        Cancel
                                    </Button>
                                </DrawerFooter>
                            </div>
                        </form>
                    </Form>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    )
}

export default AddQuestionDrawer
