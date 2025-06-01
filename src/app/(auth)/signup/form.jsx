'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Info } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import FileUpload from '@/components/upload'

import { signupSchema } from '@/validations/auth/signup'
import { ScrollArea } from '@/components/ui/scroll-area'

const SignupForm = () => {
    const [loading, setLoading] = useState(false)

    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            profile: '',
            newPassword: '',
            confirmPassword: '',
        },
    })

    const onSubmit = (data) => {
        form?.reset()
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
                className="w-full"
            >
                <ScrollArea className="-mr-28 h-[calc(100vh-380px)] pr-28">
                    <div className="flex gap-x-4">
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

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="mt-4">
                                <Label>Email address</Label>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Enter your email address"
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
                            name="profile"
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
                            Create Password
                        </p>
                    </div>

                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <Label>New password</Label>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Create your new account password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription className="flex items-center gap-1 text-xs">
                                    <Info className="h-3 w-3" />
                                    Your password need to be minimum of 12
                                    characters.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem className="mt-4">
                                <Label>Confirm Password</Label>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Type your new account password again"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        size="sm"
                        type="submit"
                        variant="default"
                        loading={loading}
                        className="mt-4 h-10 w-full"
                    >
                        Confirm & Continue
                    </Button>
                </ScrollArea>
            </form>
        </Form>
    )
}

export default SignupForm
