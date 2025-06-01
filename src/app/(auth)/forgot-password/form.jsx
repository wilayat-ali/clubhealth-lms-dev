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

import { forgotPasswordSchema } from '@/validations/auth/forgot-password'

const ForgotPasswordForm = ({ setEmailCheck }) => {
    const [loading, setLoading] = useState(false)

    const form = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    })

    const onSubmit = (data) => {
        form?.reset()
        setEmailCheck(true)
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
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <Label>Email</Label>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="me@example.com"
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
                    Request reset link
                </Button>
            </form>
        </Form>
    )
}

export default ForgotPasswordForm
