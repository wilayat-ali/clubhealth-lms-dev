'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'
import { ChartPie, Zap, IterationCw, AlarmClockCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import AssessmentInfoCard from '@/components/assessment-info-card'
import QuestionResult from '@/components/assessment/question-result'
import rawCardsData from '@/data/assessment-info-cards-data.json'
import assessmentResultData from '@/data/assessment-result-data.json'
import { useBreadcrumbs } from '@/context/bread-crumb-context'

const iconMap = {
    ChartPie,
    Zap,
    IterationCw,
    AlarmClockCheck,
}

const AssessmentResult = () => {
    const { setBreadcrumbs } = useBreadcrumbs()
    useEffect(() => {
        setBreadcrumbs([
            { label: 'Assessments', href: '/assessments' },
            { label: 'Treatment Modalities & Basic Principles' },
        ])
    }, [])

    const assessmentInfoCardsData = rawCardsData.map((item) => ({
        ...item,
        icon: iconMap[item.icon] || null,
    }))

    const metaTitle = `Assessment Result | ${process.env.NEXT_PUBLIC_APP_NAME} `

    return (
        <div className="flex min-h-screen flex-col items-center justify-between">
            <title>{metaTitle}</title>
            <div className="my-10 w-full max-w-3xl space-y-6">
                <div className="space-y-2">
                    <p className="text-foreground text-xl font-semibold">
                        Assessment Complete
                    </p>
                    <div className="relative h-[26px] w-46">
                        <Image
                            src="/images/welldone.png"
                            alt="Celebration"
                            fill
                            className="inline-block align-middle"
                        />
                    </div>

                    <p className="text-secondary-foreground mt-4 text-base">
                        You've completed the assessment for "
                        {assessmentResultData.title}."
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {assessmentInfoCardsData.map(
                        ({ icon, label, value, valueColor }, idx) => (
                            <AssessmentInfoCard
                                key={idx}
                                icon={icon}
                                label={label}
                                value={value}
                                valueColor={valueColor}
                            />
                        )
                    )}
                </div>

                <div className="space-y-7">
                    {assessmentResultData.questions.map((q) => (
                        <QuestionResult key={q.id} question={q} />
                    ))}
                </div>

                <div className="mt-8 flex justify-between gap-4">
                    <Link href="/assessments">
                        <Button icon="arrow-right">Finish</Button>
                    </Link>
                    <Button
                        variant="outline"
                        icon="download"
                        iconPosition="right"
                    >
                        Certificate
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AssessmentResult
