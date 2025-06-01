'use client'

import { useEffect, useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import CustomSelect from '@/components/custom-select'
import { learnerProfileSchema } from '@/validations/learner-profile-schema'

const learnerGroupOptions = [
    { label: 'Beginner Learners', value: 'Beginner Learners' },
    { label: 'Intermediate Learners', value: 'Intermediate Learners' },
    { label: 'Advanced Practitioners', value: 'Advanced Practitioners' },
]

const learnerStatusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Pending', value: 'pending' },
    { label: 'Blocked', value: 'blocked' },
]

const UpdateLearnerProfileDialog = ({ open, setOpen, learnerRowData }) => {
    const isEditMode = !!learnerRowData
    const [loading, setLoading] = useState(false)

    const form = useForm({
        resolver: zodResolver(learnerProfileSchema),
        defaultValues: {
            status: '',
            group: '',
        },
    })

    useEffect(() => {
        if (isEditMode && learnerRowData) {
            form.reset(learnerRowData)
        }
    }, [learnerRowData, isEditMode, form])

    const onSubmit = (data) => {
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                        Update Learner Profile
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        noValidate
                        className="grid w-full grid-cols-1 gap-4 md:grid-cols-2"
                    >
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <CustomSelect
                                            {...field}
                                            className="w-full"
                                            options={learnerStatusOptions}
                                            placeholder="Status"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="group"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Learner Group</FormLabel>
                                    <FormControl>
                                        <CustomSelect
                                            {...field}
                                            className="w-full"
                                            options={learnerGroupOptions}
                                            placeholder="Learner Group"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="col-span-2 flex items-center justify-end gap-2">
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button
                                    type="submit"
                                    variant="default"
                                    loading={loading}
                                    icon="check-check"
                                >
                                    {isEditMode ? 'Update' : 'Create'}
                                </Button>
                            </DialogFooter>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateLearnerProfileDialog
