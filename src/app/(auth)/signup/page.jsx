import SignupForm from './form'

const SignupPage = () => {
    const metaTitle = `Signup | ${process.env.NEXT_PUBLIC_APP_NAME}`

    return (
        <div className="flex w-full flex-col justify-center px-4">
            <title>{metaTitle}</title>
            <h2 className="text-foreground mb-2 text-center">
                Welcome to
                <span className="block">Club Health Academy</span>
            </h2>

            <p className="text-secondary-foreground mb-6 text-sm">
                Please complete your profile and create a password for your
                account.
            </p>

            <SignupForm />
        </div>
    )
}

export default SignupPage
