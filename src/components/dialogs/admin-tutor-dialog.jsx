'use client'
import { useEffect, useState } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel,
} from '@/components/ui/form'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import FileUpload from '@/components/upload'
import CustomSelect from '@/components/custom-select'
import { zodResolver } from '@hookform/resolvers/zod'
import { adminTutorSchema } from '@/validations/admin-tutor'
const roleOptions = [
    { label: 'Admin', value: 'admin' },
    { label: 'Tutor', value: 'tutor' },
]
const AdminTutorDialog = ({
    open,
    onOpenChange,
    rowData = null,
    onSubmitHandler,
}) => {
    const [loading, setLoading] = useState(false)
    const isEdit = !!rowData
    const form = useForm({
        resolver: zodResolver(adminTutorSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            profilePicture: '',
            designation: '',
            shortBio: '',
        },
    })
    useEffect(() => {
        if (isEdit && rowData) {
            form.reset({
                firstName: rowData.firstName,
                lastName: rowData.lastName,
                email: rowData.email,
                role: rowData.role?.toLowerCase() || '',
                profilePicture: rowData.avatar ?? '',
                designation: rowData.designation ?? '',
                shortBio: rowData.shortBio ?? '',
            })
        }
    }, [rowData, isEdit, form])
    const onSubmit = async (data) => {
        setLoading(true)
        try {
            await onSubmitHandler(data)
            form.reset()
            onOpenChange(false)
        } catch (error) {
        } finally {
            setLoading(false)
        }
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                aria-describedby=""
                className="!max:h-[650px] md:max-w-[512px]"
            >
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? 'Edit Admin/Tutor' : 'Add Admin/Tutor'}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        noValidate
                        className="w-full"
                    >
                        <ScrollArea className="h-[500px]">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="col-span-1">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <Label>First name</Label>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter first name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <Label>Last name</Label>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter last name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label>Email address</Label>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="Enter email address"
                                                        {...field}
                                                        disabled={isEdit}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Role</FormLabel>
                                                <FormControl>
                                                    <CustomSelect
                                                        {...field}
                                                        className="w-full"
                                                        options={roleOptions}
                                                        placeholder="Select role"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <FormField
                                        control={form.control}
                                        name="profilePicture"
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <FormItem className="flex flex-col">
                                                <Label>Profile Picture</Label>
                                                <FormControl>
                                                    <FileUpload
                                                        onFileSelect={onChange}
                                                        error={!!error}
                                                        showPreview={true}
                                                        initialPreview={value}
                                                        accept={{
                                                            'image/png': [],
                                                            'image/jpeg': [],
                                                        }}
                                                        multiple={false}
                                                        maxSize={
                                                            5 * 1024 * 1024
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <FormField
                                        control={form.control}
                                        name="designation"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <Label>Designation</Label>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="Founder, Club Health"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <FormField
                                        control={form.control}
                                        name="shortBio"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <Label>Short Bio</Label>
                                                <FormControl>
                                                    <Textarea
                                                        className="h-32"
                                                        placeholder="Start typing short bio"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </ScrollArea>
                        <div className="col-span-2 mt-4 flex items-center justify-end gap-2">
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
                                >
                                    {isEdit ? 'Update' : 'Create'}
                                </Button>
                            </DialogFooter>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default AdminTutorDialog
