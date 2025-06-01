import Image from 'next/image'

import Carousels from '@/components/custom-carousel'

const AuthLayout = ({ children }) => {
    return (
        <div className="grid min-h-screen grid-cols-12">
            <div className="col-span-6">
                <Carousels />
            </div>
            <div className="col-span-6 flex flex-col justify-between">
                <div className="pt-[46px] pl-10 xl:pb-8 2xl:pb-8">
                    <Image
                        src="/club-health-logo.svg"
                        width={173}
                        height={28}
                        alt="Club Health Logo"
                    />
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-[500px]">{children}</div>
                </div>

                <div className="text-muted-foreground flex items-center justify-center pb-10 xl:pt-10 2xl:pt-0">
                    &copy; Club Health Ltd {new Date().getFullYear()}. All
                    Rights Reserved.
                </div>
            </div>
        </div>
    )
}

export default AuthLayout
