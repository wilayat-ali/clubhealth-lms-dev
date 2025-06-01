import SetPasswordForm from './form'

const SetPasswordPage = () => {
    const metaTitle = `Set Password | ${process.env.NEXT_PUBLIC_APP_NAME}`

    return (
        <div className="flex w-full flex-col items-center justify-center">
            <title>{metaTitle}</title>
            <h2 className="text-foreground mb-2 font-medium">
                Set new password
            </h2>
            <p className="text-secondary-foreground mb-6 text-sm">
                Create a password for your account.
            </p>

            <SetPasswordForm />
        </div>
    )
}

export default SetPasswordPage
