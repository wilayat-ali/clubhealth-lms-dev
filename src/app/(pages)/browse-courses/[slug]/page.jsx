'use client'

import { useCallback, useEffect, useState } from 'react'

import { useBreadcrumbs } from '@/context/bread-crumb-context'
import CourseHeader from '@/components/course-header'
import KeyDetailSidebar from '@/components/key-details-sidebar'
import InstructorCard from '@/components/instructor-card'
import CourseTabs from '@/components/course-tabs'
import CourseSection from '@/components/course-section'

import courseTabsData from '@/data/course-detail-tabs.json'
import keyDetailsData from '@/data/key-details-sidebar.json'
import instructorCardData from '@/data/instructor-card.json'
import courseSectionData from '@/data/course-section.json'

const BrowseCoursePage = () => {
    const { setBreadcrumbs } = useBreadcrumbs()
    useEffect(() => {
        setBreadcrumbs([
            { label: 'Browse Courses', href: '/browse-courses' },
            { label: 'Treatment Modalities & Basic Principles' },
        ])
    }, [])

    const [activeTab, setActiveTab] = useState('Overview')

    const metaTitle = `${process.env.NEXT_PUBLIC_APP_NAME} | Course Detail`

    const handleTabClick = useCallback((tabName) => {
        setActiveTab(tabName)
    }, [])

    return (
        <div className="bg-secondary-background flex gap-x-4">
            <title>{metaTitle}</title>
            <div className="border-r-border w-full border-r">
                <CourseHeader
                    badge="Pending"
                    heading="Treatment Modalities & Basic Principles"
                    text="Master foundational rehabilitation principles and
                            evidence-based treatment modalities to optimize
                            patient recovery and prevent musculoskeletal
                            dysfunction."
                    image="/detail/detail.png"
                />

                <div className="border-y-border bg-background sticky top-17.5 flex h-12 items-center border-y px-9">
                    <div className="bg-background my-1">
                        <CourseTabs
                            courseTabsData={courseTabsData}
                            handleTabClick={handleTabClick}
                            activeTab={activeTab}
                        />
                    </div>
                </div>

                <div className="bg-muted">
                    <div className="mx-auto max-w-[768px] px-10 pt-2">
                        <CourseSection
                            courseSectionData={courseSectionData}
                            listClassName="text-foreground"
                        />
                        <div className="pb-10">
                            <h3 className="text-foreground pt-7 pb-4 text-xl font-semibold">
                                Instructor
                            </h3>
                            <InstructorCard
                                instructorCardData={instructorCardData}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="pe-4 pt-7 lg:w-[480px]">
                <KeyDetailSidebar keyDetailsData={keyDetailsData} />
            </div>
        </div>
    )
}

export default BrowseCoursePage
