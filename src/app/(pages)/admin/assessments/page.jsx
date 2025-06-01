'use client'

import { useEffect } from 'react'
import ContentWrapper from '@/components/page/content-wrapper'
import AssessmentTable from '@/components/admin/assessment-table'
import HeaderWithAction from '@/components/page/header-with-action'
import { useBreadcrumbs } from '@/context/bread-crumb-context'

const AssessmentPage = () => {
    const { setBreadcrumbs } = useBreadcrumbs()

    useEffect(() => {
        setBreadcrumbs([{ label: 'Manage Assessments' }])
    }, [])

    const metaTitle = `Assessments | ${process.env.NEXT_PUBLIC_APP_NAME} `

    return (
        <div className="flex w-full">
            <title>{metaTitle}</title>
            <ContentWrapper size="xl">
                <HeaderWithAction
                    title="Manage Assessments"
                    description="You have 14 active assessments"
                    buttonLabel="Add Assessment"
                    buttonVariant="default"
                    buttonIcon="plus"
                    link="/admin/assessments/add-assessment/123"
                />
                <AssessmentTable />
            </ContentWrapper>
        </div>
    )
}

export default AssessmentPage
