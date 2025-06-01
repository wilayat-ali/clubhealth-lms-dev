'use client'

import { useEffect } from 'react'

import { useBreadcrumbs } from '@/context/bread-crumb-context'
import CertificationCard from '@/components/cards/certification-card'
import certificationData from '@/data/certification-data.json'
import PageHeader from '@/components/page-header'

export default function Certifications() {
    const { setBreadcrumbs } = useBreadcrumbs()
    useEffect(() => {
        setBreadcrumbs([{ label: 'Certifications' }])
    }, [])

    const metaTitle = `Certifications | ${process.env.NEXT_PUBLIC_APP_NAME} `
    return (
        <div className="p-10">
            <title>{metaTitle}</title>
            <PageHeader
                title="Certifications"
                description="View and download all the certificates you've earned as proof of your achievements."
            />

            <div className="my-10">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 2xl:grid-cols-3">
                    {certificationData?.map((card, index) => (
                        <CertificationCard
                            key={`certification-card-${index}`}
                            {...card}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
