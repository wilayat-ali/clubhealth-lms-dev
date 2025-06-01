'use client'

import { useEffect } from 'react'

import { useBreadcrumbs } from '@/context/bread-crumb-context'
import CourseSection from '@/components/course-section'
import { Button } from '@/components/ui/button'
import LearningSidebar from '@/components/learning-sidebar'
import SectionHeader from '@/components/section-header'

import learningSidebarData from '@/data/learning-sidebar.json'
import learningSectionData from '@/data/learning-section.json'

const Learning = () => {
    const { setBreadcrumbs } = useBreadcrumbs()
    useEffect(() => {
        setBreadcrumbs([
            { label: 'Browse Courses', href: '/browse-courses' },
            {
                label: 'Treatment Modalities & Basic Principles',
                href: '/browse-courses/lower-limb-rehabilitation',
            },
            { label: 'Introduction & Philosophy' },
            { label: 'Introduction & Overview' },
        ])
    }, [])
    const metaTitle = `Learning | ${process.env.NEXT_PUBLIC_APP_NAME} `

    return (
        <div className="bg-secondary-background flex gap-x-4">
            <title>{metaTitle}</title>
            <div className="border-r-border w-full border-r">
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <SectionHeader video="https://www.youtube.com/embed/CYTGpcPz3dg" />
                    </div>
                </div>

                <div className="bg-muted">
                    <div className="mx-auto max-w-[768px] px-10 pt-2">
                        <CourseSection
                            courseSectionData={learningSectionData}
                            listClassName="mx-2 text-secondary-foreground"
                            courseRoadMapClassName="text-secondary-foreground"
                            continueStudy={true}
                        />
                        <Button
                            size="sm"
                            type="submit"
                            variant="default"
                            className="mt-7 mb-10 h-10"
                            icon="check-check"
                        >
                            Mark as Done
                        </Button>
                    </div>
                </div>
            </div>

            <div className="pe-4 pt-7 lg:w-[480px]">
                <LearningSidebar
                    learningSidebarData={learningSidebarData}
                    title="COURSE MATERIAL"
                    heading="Treatment Modalities & Basic Principles"
                />
            </div>
        </div>
    )
}

export default Learning
