'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

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

import { setPasswordSchema } from '@/validations/auth/set-password'

const SetPasswordForm = () => {
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(setPasswordSchema),
        defaultValues: {
            newPassword: '',
            confirmPassword: '',
        },
    })

    const onSubmit = (data) => {
        form?.reset()
        router.push("/login")
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
                className="w-full"
            >
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
                                    infoMessage="Your password needs to be a minimum of 12 characters."
                                />
                            </FormControl>
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
            </form>
        </Form>
    )
}

export default SetPasswordForm
