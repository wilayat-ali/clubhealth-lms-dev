'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

const CheckYourEmailPage = () => {
    const router = useRouter()
    const metaTitle = `Check Inbox | ${process.env.NEXT_PUBLIC_APP_NAME}`

    return (
        <div>
            <div className="flex w-full flex-col items-center justify-center">
                <title>{metaTitle}</title>
                <h2 className="text-foreground mb-2 font-medium">
                    Check your inbox
                </h2>
                <p className="text-secondary-foreground mb-6 text-center text-sm">
                    We have sent an email to
                    <a
                        href="mailto:user@example.com"
                        className="text-primary ml-1"
                    >
                        user@example.com
                    </a>
                    . Click the link in the email to reset your password.
                </p>
                <p className="text-secondary-foreground text-center text-sm">
                    If you didn’t see the email in your Inbox, check other
                    places, like your junk, spam, social or other folders before
                    submitting new request.
                </p>

                <Button
                    size="sm"
                    type="submit"
                    variant="default"
                    className="mt-6 h-10 w-full"
                    onClick={() => router.push('/set-password')}
                >
                    Didn’t received email? Try again
                </Button>
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
        </div>
    )
}

export default CheckYourEmailPage
