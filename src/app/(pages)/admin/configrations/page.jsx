'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import ContentWrapper from '@/components/page/content-wrapper'
import HeaderWithAction from '@/components/page/header-with-action'
import CertificateSection from '@/components/configrations/certificate-section'
import HelpSupportSection from '@/components/configrations/help-support-section'
import LearnerGroupsSection from '@/components/configrations/learner-groups-section'
import { configrationSchema } from '@/validations/configrations-schema'
import { useBreadcrumbs } from '@/context/bread-crumb-context'

const ConfigurationsPage = () => {
    const { setBreadcrumbs } = useBreadcrumbs()

    const form = useForm({
        resolver: zodResolver(configrationSchema),
        defaultValues: {
            authorisedBy: 'Luis Ribeiro',
            designation: 'Founder, Club Health Academy',
            signature: null,
            contactEmail: 'support@clubhealth.uk',
            contactPhone: '+44(0)7392477708',
        },
    })

    const [learnerGroups, setLearnerGroups] = useState([
        'Beginner Learners',
        'Intermediate Learners',
        'Advanced Practitioners',
        'Foundation Track',
        'Professional Development Track',
        'Custom Group',
    ])

    useEffect(() => {
        setBreadcrumbs([{ label: 'Configurations' }])
    }, [setBreadcrumbs])

    const updateLearnerGroup = (index, value) => {
        const updated = [...learnerGroups]
        updated[index] = value
        setLearnerGroups(updated)
    }

    const removeLearnerGroup = (index) => {
        if (index < 3) return
        setLearnerGroups(learnerGroups.filter((_, i) => i !== index))
    }

    const addGroup = () => setLearnerGroups([...learnerGroups, ''])

    const handleUpdateConfiguration = (formData) => {
        // eslint-disable-next-line no-console
        console.log(formData)
        // TODO: Implement configuration update logic here
    }

    const metaTitle = `Configurations | ${process.env.NEXT_PUBLIC_APP_NAME}`

    return (
        <div>
            <title>{metaTitle}</title>
            <ContentWrapper size="xl">
                <div className="px-4 sm:px-6 lg:px-8">
                    <HeaderWithAction
                        title="Configurations"
                        titleClassName="text-[24px]"
                        className="bg-border"
                        showButton={false}
                    />

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(
                                handleUpdateConfiguration
                            )}
                        >
                            <CertificateSection form={form} />
                            <LearnerGroupsSection
                                groups={learnerGroups}
                                updateGroup={updateLearnerGroup}
                                removeGroup={removeLearnerGroup}
                                addGroup={addGroup}
                            />
                            <HelpSupportSection form={form} />

                            <div className="pb-10">
                                <Button type="submit" icon="check-check">
                                    Update
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default ConfigurationsPage
