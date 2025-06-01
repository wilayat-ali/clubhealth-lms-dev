'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
import { Separator } from '@/components/ui/separator'
import FileUpload from '@/components/upload'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTitle,
} from '@/components/ui/dialog'

import { updateProfileSchema } from '@/validations/update-profile'

const UpdateProfile = ({ open, onOpenChange }) => {
    const [loading, setLoading] = useState(false)

    const form = useForm({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            profilePicture: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    })

    const onSubmit = () => {
        form?.reset()
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent aria-describedby="" className="md:max-w-[512px]">
                <div className="text-foreground -mb-2 text-lg font-semibold">
                    Update Profile
                </div>
                <DialogTitle />

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        noValidate
                        className="w-full"
                    >
                        <div className="grid grid-cols-2 gap-x-4">
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
                                                    placeholder="Enter your first name"
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
                                                    placeholder="Enter your last name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="mt-4">
                                    <Label>Email address</Label>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="cursor-pointer">
                            <FormField
                                control={form.control}
                                name="profilePicture"
                                render={({
                                    field: { onChange },
                                    fieldState: { error },
                                }) => (
                                    <FormItem className="mt-4 flex flex-col">
                                        <Label>Profile Picture</Label>
                                        <FormControl>
                                            <FileUpload
                                                onFileSelect={onChange}
                                                error={!!error}
                                                showPreview={false}
                                                accept={{
                                                    'image/png': [],
                                                    'image/jpeg': [],
                                                }}
                                                multiple={false}
                                                maxSize={5 * 1024 * 1024}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="relative my-8">
                            <Separator />
                            <p className="bg-background text-muted-foreground absolute inset-x-0 top-1/2 mx-auto w-fit -translate-y-1/2 px-1 text-sm">
                                Change Password
                            </p>
                        </div>

                        <FormField
                            control={form.control}
                            name="oldPassword"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <Label>Old password</Label>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter old password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="mt-4 grid grid-cols-2 gap-x-4">
                            <div className="col-span-1">
                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <Label>New password</Label>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Enter new password"
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
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <Label>Confirm Password</Label>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Re-enter new password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-end gap-x-2">
                            <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="lg"
                                    >
                                        Cancel
                                    </Button>
                                </DialogClose>
                            </DialogFooter>

                            <Button
                                size="lg"
                                type="submit"
                                variant="default"
                                loading={loading}
                                className="font-medium"
                            >
                                Update
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfile
