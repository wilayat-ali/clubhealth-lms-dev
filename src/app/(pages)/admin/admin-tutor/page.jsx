'use client'

import { useEffect, useState } from 'react'

import ContentWrapper from '@/components/page/content-wrapper'
import HeaderWithAction from '@/components/page/header-with-action'
import AdminAndTutorTable from '@/components/admin/admin-tutor-table'
import AdminTutorDialog from '@/components/dialogs/admin-tutor-dialog'
import { useBreadcrumbs } from '@/context/bread-crumb-context'

const AdminAndTutor = () => {
    const { setBreadcrumbs } = useBreadcrumbs()
    const [isAdminTutorModalOpen, setAdminTutorModalOpen] = useState(false)

    useEffect(() => {
        setBreadcrumbs([{ label: 'Manage Admin & Tutors' }])
    }, [])

    const handleAdminTutorModal = () => {
        setAdminTutorModalOpen(true)
    }

    const metaTitle = `Admin & Tutors | ${process.env.NEXT_PUBLIC_APP_NAME} `

    return (
        <div className="flex w-full">
            <title>{metaTitle}</title>
            <ContentWrapper size="xl">
                <HeaderWithAction
                    title="Manage Admin & Tutors"
                    titleClassName="text-[24px]"
                    description="You currently have 14 active admin and tutors."
                    buttonLabel="Add Admin & Tutors"
                    buttonIcon="plus"
                    buttonVariant="default"
                    onButtonClick={handleAdminTutorModal}
                />
                <AdminAndTutorTable />
            </ContentWrapper>
            <AdminTutorDialog
                open={isAdminTutorModalOpen}
                onOpenChange={setAdminTutorModalOpen}
            />
        </div>
    )
}

export default AdminAndTutor
