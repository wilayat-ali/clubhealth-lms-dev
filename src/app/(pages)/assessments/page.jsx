'use client'

import { useEffect } from 'react'

import { useBreadcrumbs } from '@/context/bread-crumb-context'
import AssessmentCard from '@/components/cards/assessment-card'
import PageHeader from '@/components/page-header'

import assessmentData from '@/data/assessment-data.json'

export default function Assesment() {
    const { setBreadcrumbs } = useBreadcrumbs()
    useEffect(() => {
        setBreadcrumbs([{ label: 'Assessments' }])
    }, [])

    const metaTitle = `Assessments | ${process.env.NEXT_PUBLIC_APP_NAME} `
    return (
        <div className="p-10">
            <title>{metaTitle}</title>
            <PageHeader
                title="Assessments"
                description="Track your progress and challenge your knowledge with assessments designed to reinforce your learning."
            />
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 2xl:grid-cols-3">
                {assessmentData?.map((item, index) => (
                    <AssessmentCard
                        key={`assessment-card-${index}`}
                        {...item}
                    />
                ))}
            </div>
        </div>
    )
}
