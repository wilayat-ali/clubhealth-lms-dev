'use client'

import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import CustomSelect from '@/components/custom-select'
import { coursesAssessmentSchema } from '@/validations/courses-assessment-schema'

const assessmentOptions = [
    { label: 'Final Assessment', value: 'final assessment' },
    { label: 'Exercise Selection', value: 'exercise selection' },
]

const AddAssessmentDialog = ({
    open,
    onOpenChange,
    onSubmitHandler,
    isEdit,
}) => {
    const [loading, setLoading] = useState(false)

    const form = useForm({
        resolver: zodResolver(coursesAssessmentSchema),
        defaultValues: {
            type: '',
        },
    })

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            await onSubmitHandler(data)
            form.reset()
            onOpenChange(false)
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error adding assessment:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? 'Update Module' : 'Add Assessment'}
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Assessment</Label>
                                    <FormControl>
                                        <CustomSelect
                                            {...field}
                                            className="w-full"
                                            options={assessmentOptions}
                                            placeholder="Select Assessment"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" loading={loading}>
                                {isEdit ? 'Update' : 'Add'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddAssessmentDialog
