'use client'

import { useEffect, useState } from 'react'

import LearnerTable from '@/components/admin/learner-table'
import HeaderWithAction from '@/components/page/header-with-action'
import InviteLearnersDialog from '@/components/dialogs/invite-learners-dialog'
import ContentWrapper from '@/components/page/content-wrapper'
import { useBreadcrumbs } from '@/context/bread-crumb-context'

const LearnerPage = () => {
    const { setBreadcrumbs } = useBreadcrumbs()
    const [learnerDialogOpen, setLearnerDialogOpen] = useState(false)

    useEffect(() => {
        setBreadcrumbs([{ label: 'Manage Learners' }])
    }, [])

    const metaTitle = `Learner | ${process.env.NEXT_PUBLIC_APP_NAME} `

    return (
        <div className="flex w-full">
            <title>{metaTitle}</title>
            <ContentWrapper size="xl">
                <HeaderWithAction
                    title="Manage Learners"
                    titleClassName='text-[24px]'
                    description="You currently have 350 active learners."
                    buttonLabel="Invite Learners"
                    buttonVariant="default"
                    buttonIcon="user-plus"
                    onButtonClick={() => setLearnerDialogOpen(true)}
                />
                <LearnerTable />
            </ContentWrapper>
            <InviteLearnersDialog
                open={learnerDialogOpen}
                onOpenChange={setLearnerDialogOpen}
            />
        </div>
    )
}

export default LearnerPage
