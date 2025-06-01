import React from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

const CourseHeader = React.memo(({ badge, heading, text, image }) => {
    return (
        <div>
            <div className="from-border to-background grid grid-cols-12 gap-10 bg-gradient-to-b p-10">
                <div className="col-span-6 flex flex-col justify-center">
                    <Badge className="bg-brand-blue rounded-full text-sm">
                        {badge}
                    </Badge>
                    <h2 className="text-foreground mt-4">{heading}</h2>
                    <p className="text-secondary-foreground mt-2">{text}</p>
                </div>
                <div className="relative col-span-6 aspect-[5/3] w-full">
                    <Image
                        src={image}
                        alt=""
                        fill
                        className="rounded-lg object-cover"
                        sizes="(max-width: 1024px) 100vw, 1000px"
                    />
                </div>
            </div>
        </div>
    )
})

export default CourseHeader
