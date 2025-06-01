'use client'

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'
import QuestionForm from '@/components/assessment/question-form'
import assessmentQuestions from '@/data/assessment-questions.json'

const AssessmentViewDrawer = ({ open, onOpenChange }) => {
    return (
        <Drawer open={open} onOpenChange={onOpenChange} direction="right">
            <DrawerContent>
                <ScrollArea className="h-[calc(100vh)]">
                    <div className="m-6 h-full">
                        <DrawerHeader className="mb-2">
                            <div className="flex items-center justify-between">
                                <DrawerTitle className="text-xl font-bold">
                                    Preview Assessment
                                </DrawerTitle>
                            </div>
                            <DrawerDescription />
                        </DrawerHeader>

                        <div className="bg-muted w-full overflow-auto rounded-md p-10">
                            <div className="w-full max-w-3xl">
                                <h2 className="text-foreground text-xl font-medium">
                                    Final Assessment
                                </h2>
                                <h1 className="text-foreground mt-2 mb-4 text-3xl font-medium">
                                    Treatment Modalities & Basic Principles
                                </h1>
                                <p className="text-secondary-foreground mb-8 text-base">
                                    Test your understanding of the core
                                    principles and techniques covered in this
                                    module. This assessment consists of
                                    multiple-choice and single-choice questions
                                    designed to evaluate your knowledge.
                                </p>

                                <div className="space-y-8">
                                    {assessmentQuestions.map((q, index) => (
                                        <QuestionForm
                                            key={q.id}
                                            viewMode={true}
                                            question={{
                                                ...q,
                                                question: `${index + 1}. ${q.question}`,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    )
}

export default AssessmentViewDrawer
