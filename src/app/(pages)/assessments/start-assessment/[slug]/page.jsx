'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useBreadcrumbs } from '@/context/bread-crumb-context'
import assessmentQuestions from '@/data/assessment-questions.json'
import QuestionForm from '@/components/assessment/question-form'

const StartAssessment = () => {
    const router = useRouter()
    const { setBreadcrumbs } = useBreadcrumbs()
    const [responses, setResponses] = useState({})

    useEffect(() => {
        setBreadcrumbs([
            { label: 'Assessments', href: '/assessments' },
            { label: 'Treatment Modalities & Basic Principles' },
        ])
    }, [])

    const handleChangeOption = (questionId, value) => {
        setResponses((prev) => ({ ...prev, [questionId]: value }))
    }

    const handleSubmitAssessment = () => {
        router.push(
            '/assessments/result/Treatment Modalities & Basic Principles'
        )
    }

    const metaTitle = `Start Assessment | ${process.env.NEXT_PUBLIC_APP_NAME} `

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-4">
            <title>{metaTitle}</title>
            <div className="my-10 w-full max-w-3xl">
                <h2 className="text-foreground text-xl font-medium">
                    Final Assessment
                </h2>
                <h1 className="text-foreground mt-2 mb-4 text-3xl font-medium">
                    Treatment Modalities & Basic Principles
                </h1>
                <p className="text-secondary-foreground mb-8 text-base">
                    Test your understanding of the core principles and
                    techniques covered in this module. This assessment consists
                    of multiple-choice and single-choice questions designed to
                    evaluate your knowledge.
                </p>

                <div className="space-y-8">
                    {assessmentQuestions.map((q, index) => (
                        <QuestionForm
                            key={q.id}
                            question={{
                                ...q,
                                question: `${index + 1}. ${q.question}`,
                            }}
                            response={responses[q.id]}
                            onChange={handleChangeOption}
                        />
                    ))}
                </div>

                <div className="mt-10">
                    <Button
                        className="text-base"
                        onClick={handleSubmitAssessment}
                        icon="check-check"
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default StartAssessment
