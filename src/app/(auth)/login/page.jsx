'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import LoginForm from './form'
import OtpVerificationForm from './otp-verification-form'
import { SupportDialog } from '@/components/dialogs/support-dialog'

const LoginPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [openSupportDialog, setOpenSupportDialog] = useState(false)
    const heading = isLoggedIn ? 'OTP verification' : 'Login to your account'
    const description = isLoggedIn
        ? 'Please check your email for the code we sent to user@example.com'
        : 'Enter your account credentials below to login'
    const metaTitle = `${isLoggedIn ? 'OTP Verifications' : 'Login'}  | ${process.env.NEXT_PUBLIC_APP_NAME} `

    return (
        <div className="w-full flex-col items-center justify-center px-4">
            <title>{metaTitle}</title>
            <h2 className="text-foreground leading-3xl mb-2 h-auto min-h-[24px] w-[480px] text-center text-3xl font-bold">
                {heading}
            </h2>
            <p className="text-secondary-foreground leading-sm mb-6 text-center text-sm font-normal tracking-normal">
                {description}
            </p>

            {isLoggedIn ? (
                <OtpVerificationForm />
            ) : (
                <LoginForm setIsLoggedIn={setIsLoggedIn} />
            )}

            <div className="text-foreground mt-6 w-full text-center text-sm font-medium">
                {isLoggedIn ? (
                    <>
                        <span>Not received OTP code yet?</span>
                        <Button
                            variant="customLink"
                            className="text-primary decoration-primary text-md mx-1 p-0 font-medium underline hover:opacity-80"
                        >
                            Resend OTP Code
                        </Button>
                    </>
                ) : (
                    <>
                        <span>Don&apos;t have an account?</span>
                        <Button
                            onClick={() => setOpenSupportDialog(true)}
                            variant="customLink"
                            className="text-primary decoration-primary mx-1 h-auto p-0 underline hover:opacity-80"
                            type="button"
                        >
                            Contact Us
                        </Button>
                    </>
                )}
            </div>
            <SupportDialog
                trigger={openSupportDialog}
                setOpen={setOpenSupportDialog}
            />
        </div>
    )
}

export default LoginPage
