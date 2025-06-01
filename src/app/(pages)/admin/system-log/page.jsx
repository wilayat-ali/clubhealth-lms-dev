'use client'

import React, { useEffect } from 'react'

import { useBreadcrumbs } from '@/context/bread-crumb-context'
import SystemLogTable from '@/components/admin/system-log-table'
import ContentWrapper from '@/components/page/content-wrapper'
import HeaderWithAction from '@/components/page/header-with-action'

const SystemLogPage = () => {
    const { setBreadcrumbs } = useBreadcrumbs()

    useEffect(() => {
        setBreadcrumbs([{ label: 'System Log' }])
    }, [])

    const metaTitle = `System Log | ${process.env.NEXT_PUBLIC_APP_NAME} `
    return (
        <div className="flex w-full">
            <title>{metaTitle}</title>
            <ContentWrapper size="xl">
                <HeaderWithAction
                    title="System Log"
                    titleClassName="text-[24px] w-full"
                    className="bg-border"
                    buttonLabel="Download"
                    buttonVariant="outline"
                    buttonIcon="download"
                    onButtonClick={() => {}}
                />
                <SystemLogTable />
            </ContentWrapper>
        </div>
    )
}

export default SystemLogPage
