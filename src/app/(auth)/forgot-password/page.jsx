'use client'

import Link from 'next/link'
import { useState } from 'react'

import ForgotPasswordForm from './form'
import CheckYourEmailPage from './check-your-email'

const ForgotPasswordPage = () => {
    const [emailCheck, setEmailCheck] = useState(false)

    if (emailCheck) {
        return <CheckYourEmailPage />
    }

    return (
        <div className="w-full flex-col items-center justify-center">
            <title>{`Forgot Password | ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
            <h2 className="text-foreground mb-2 text-center font-medium">
                Forgot your password
            </h2>
            <p className="text-secondary-foreground mb-6 text-sm">
                Please enter the email you&apos;d like your password reset
                information sent to.
            </p>

            <ForgotPasswordForm setEmailCheck={setEmailCheck} />

            <div className="mt-6 w-full text-center text-sm font-medium">
                <span className="text-foreground">Back to</span>
                <Link
                    href="/login"
                    className="text-primary mx-1 cursor-pointer underline"
                >
                    Login
                </Link>
            </div>
        </div>
    )
}

export default ForgotPasswordPage
