'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Dragable from '@/components/dragable/list'
import StickyPanel from '@/components/sticky-panel'
import ContentWrapper from '@/components/page/content-wrapper'
import AddAssessmentForm from '@/components/add-assessment-form'
import HeaderWithAction from '@/components/page/header-with-action'
import AddQuestionDrawer from '@/components/drawers/add-question-drawer'
import AssessmentViewDrawer from '@/components/drawers/assessment-view-drawer'
import { useBreadcrumbs } from '@/context/bread-crumb-context'
import assessmentQuestions from '@/data/assessment-questions.json'

const AddAssessment = () => {
    const { setBreadcrumbs } = useBreadcrumbs()
    const [isEditMode, setIsEditMode] = useState(false)
    const [openViewDrawer, setOpenViewDrawer] = useState(false)
    const [addQuestionDrawer, setAddQuestionDrawer] = useState(false)
    const [selectedQuestion, setSelectedQuestion] = useState(null)

    useEffect(() => {
        setBreadcrumbs([
            {
                label: 'Manage Assessments',
                href: '/admin/assessments',
            },
            { label: 'Add Assessment' },
        ])
    }, [])

    const handleAddQuestion = () => {
        setIsEditMode(false)
        setAddQuestionDrawer(true)
    }

    const handleEditQuestion = (item) => {
        setIsEditMode(true)
        setSelectedQuestion(item)
        setAddQuestionDrawer(true)
    }

    const metaTitle = `Add Assessments | ${process.env.NEXT_PUBLIC_APP_NAME} `

    return (
        <div className="flex">
            <title>{metaTitle}</title>
            <StickyPanel className="bg-secondary-background w-[480px] shrink">
                <AddAssessmentForm />
            </StickyPanel>
            <div className="w-full">
                <ContentWrapper size="xl">
                    <div className="space-y-4">
                        <HeaderWithAction
                            title="Question (10)"
                            buttonLabel="Preview"
                            buttonVariant="ghost"
                            buttonIcon="eye"
                            className="bg-border"
                            titleClassName="text-xl"
                            onButtonClick={() => setOpenViewDrawer(true)}
                        />

                        <Dragable
                            data={assessmentQuestions}
                            onEditClick={handleEditQuestion}
                        />

                        <Button
                            className="bg-border text-foreground mt-2 px-4"
                            variant="ghost"
                            icon="plus"
                            size="lg"
                            onClick={handleAddQuestion}
                        >
                            Add More
                        </Button>
                    </div>
                </ContentWrapper>
            </div>
            <AddQuestionDrawer
                open={addQuestionDrawer}
                onOpenChange={setAddQuestionDrawer}
                update={isEditMode}
                data={selectedQuestion}
            />
            <AssessmentViewDrawer
                open={openViewDrawer}
                onOpenChange={setOpenViewDrawer}
            />
        </div>
    )
}

export default AddAssessment
