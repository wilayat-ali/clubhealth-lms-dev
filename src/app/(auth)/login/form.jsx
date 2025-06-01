'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
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
import { Checkbox } from '@/components/ui/checkbox'

import { loginSchema } from '@/validations/auth/login'

const LoginForm = ({ setIsLoggedIn }) => {
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        },
    })

    const onSubmit = (data) => {
        const userRole =
            data.email === 'admin@example.com' ? 'admin' : 'learner'
        localStorage.setItem('userEmail', data.email)
        localStorage.setItem('userRole', userRole)
        setIsLoggedIn(true)
    }

    const forgetPassword = () => {
        router.push('/forgot-password')
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
                            <Label className="leading-sm text-sm font-medium">
                                Email
                            </Label>
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

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="mt-4">
                            <Label className="leading-sm flex justify-between text-sm font-medium">
                                <div className="text-foreground">Password</div>
                                <Link
                                    href="/forgot-password"
                                    className="text-foreground cursor-pointer font-normal underline"
                                >
                                    Forgot your password?
                                </Link>
                            </Label>

                            <div className="relative">
                                <FormControl>
                                    <Input
                                        {...field}
                                        type={show ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        className="pr-10 hover:bg-transparent"
                                    />
                                </FormControl>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setShow(!show)}
                                    className="hover:bg-background absolute top-[2px] right-1 h-8 w-8 p-0"
                                >
                                    {!show ? (
                                        <Image
                                            src="/icons/eye-off.svg"
                                            alt="Hide password"
                                            width={16}
                                            height={16}
                                        />
                                    ) : (
                                        <Eye className="size-5" />
                                    )}
                                </Button>
                            </div>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="remember"
                    render={({ field }) => (
                        <FormItem className="mt-4 flex items-center">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    id="remember"
                                    className="!text-background"
                                />
                            </FormControl>
                            <Label
                                htmlFor="remember"
                                className="text-foreground text-sm font-normal"
                            >
                                Remember me
                            </Label>
                        </FormItem>
                    )}
                />

                <Button
                    size="sm"
                    type="submit"
                    variant="default"
                    loading={loading}
                    className="mt-4 h-10 w-full text-sm font-medium"
                >
                    Login
                </Button>
            </form>
        </Form>
    )
}

export default LoginForm
