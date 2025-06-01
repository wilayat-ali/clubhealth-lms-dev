'use client'
import Link from 'next/link'
import Image from 'next/image'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// export const metadata = {
//     title: '404 page not found',
// }

const NotFound = () => {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="relative">
                <div className="container-landing relative z-10">
                    <div className="mx-auto max-w-[850px] text-center">
                        <div className="relative flex items-center justify-center">
                            {/* Image Container */}
                            <Image
                                src="/404.svg"
                                width={300}
                                height={500}
                                alt="404 Image"
                                className="z-0"
                            />

                            {/* Text with white background positioned over image */}
                            <div className="absolute top-28 z-10">
                                <h1 className="text-secondary-foreground w-auto bg-white px-4 text-[58px]">
                                    404
                                </h1>
                            </div>
                        </div>

                        <h2 className="mt-5 mb-6 font-extrabold">
                            We looked everywhere and couldn&apos;t find that
                            page.
                        </h2>
                        <p className="text-secondary-foreground mb-8 text-xl">
                            This might be because: You have typed the web
                            address incorrectly, or the page you were looking
                            for may have been moved, updated or deleted.
                        </p>
                        <div>
                            <Link
                                href="/hire"
                                className={cn(
                                    'shadow-lg hover:no-underline',
                                    buttonVariants({
                                        variant: 'primary',
                                        size: 'xl',
                                    })
                                )}
                            >
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound
