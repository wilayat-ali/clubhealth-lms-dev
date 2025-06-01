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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { moduleSchema } from '@/validations/module-schema'

const AddModuleDialog = ({ open, onOpenChange, onSubmitHandler, isEdit }) => {
    const [loading, setLoading] = useState(false)

    const form = useForm({
        resolver: zodResolver(moduleSchema),
        defaultValues: {
            title: 'Treatment Techniques',
            description:
                'Hands-on approaches including soft tissue manipulation, joint mobilisation, and percussion therapy.',
            estimatedTime: '2 Hours',
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
            console.error('Error adding module:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? 'Update Module' : 'Add Module'}
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Title</Label>
                                    <FormControl>
                                        <Input
                                            placeholder="Add Title"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Short Description</Label>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Short Description"
                                            className="min-h-[80px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="estimatedTime"
                            render={({ field }) => (
                                <FormItem>
                                    <Label>Estimated Learning Time</Label>
                                    <FormControl>
                                        <Input
                                            placeholder="Estimated Time"
                                            {...field}
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

export default AddModuleDialog
