import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const InstructorCard = React.memo(({ instructorCardData }) => {
    return (
        <div id="instructor">
            {instructorCardData?.map((item, instructorIndex) => (
                <div key={instructorIndex} className="flex gap-x-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={item.image} alt={item.name} />
                        <AvatarFallback>{item.name}</AvatarFallback>
                    </Avatar>
                    <div className="text-foreground mt-2 flex flex-col">
                        <div className="text-lg font-semibold">{item.name}</div>
                        <div className="text-secondary-foreground text-sm">
                            {item.designation}
                        </div>
                        <div className="mt-3 text-base">{item.description}</div>
                    </div>
                </div>
            ))}
        </div>
    )
})

export default InstructorCard
