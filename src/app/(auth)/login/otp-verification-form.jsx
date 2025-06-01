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
import { Button } from '@/components/ui/button'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp'
import { REGEXP_ONLY_DIGITS } from 'input-otp'

import { otpSchema } from '@/validations/auth/login'

const OtpVerificationForm = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const form = useForm({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: '',
        },
    })

    const onSubmit = (data) => {
        const role = localStorage.getItem('userRole')

        if (role === 'admin') {
            router.push('/admin')
        } else {
            router.push('/')
        }
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
                    name="otp"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <Label>OTP Code</Label>
                            <FormControl>
                                <div className="w-full">
                                    <InputOTP
                                        maxLength={6}
                                        pattern={REGEXP_ONLY_DIGITS}
                                        value={field.value}
                                        onChange={field.onChange}
                                    >
                                        <InputOTPGroup className="flex h-9 w-full justify-between">
                                            {[...Array(6)].map((_, i) => (
                                                <InputOTPSlot
                                                    key={i}
                                                    index={i}
                                                    placeholder="X"
                                                    className="input-otp-slot text-foreground h-full w-full text-sm"
                                                />
                                            ))}
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
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
                    Continue
                </Button>
            </form>
        </Form>
    )
}
export default OtpVerificationForm
