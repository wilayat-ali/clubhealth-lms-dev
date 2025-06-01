'use client'

import { useState } from 'react'

import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import CustomAccordion from '@/components/custom-accordion'

const LearningSidebar = ({ learningSidebarData, title, heading }) => {
    const [openAccordion, setOpenAccordion] = useState(1)
    const [progress, setProgress] = useState(10)

    return (
        <div className="sticky top-26">
            <p className="mb-3 max-w-[320px] text-xl font-medium">{heading}</p>
            <div className="text-muted-foreground mb-2 flex justify-between text-xs">
                <div>{progress}% completed</div>
                <div>1/6 module</div>
            </div>

            <Progress
                value={progress}
                className="[&>div]:bg-brand-green mb-2 w-full"
            />
            <p className="text-muted-foreground pb-3 text-xs">{title}</p>

            <Separator />

            <CustomAccordion
                openAccordion={openAccordion}
                setOpenAccordion={setOpenAccordion}
                learningSidebarData={learningSidebarData}
            />
        </div>
    )
}

export default LearningSidebar
