'use client'

import { useState } from 'react'

import { ChevronDownIcon, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import DragableList from '@/components/dragable'
import AddModuleDialog from '@/components/dialogs/add-module-dialog'
import AddAssessmentDialog from '@/components/dialogs/add-assessment-dialog'

const CoursesSidebar = ({
    courseStructure,
    handleCourseStructureReorder,
    handleSectionItemsReorder,
    setAddModuleOpen,
    setAddAssessmentOpen,
}) => {
    const [moduleOpen, setModuleOpen] = useState(false)
    const [assessmentOpen, setAssessmentOpen] = useState(false)
    return (
        <ScrollArea className="h-full">
            <div className="border-border mx-6 border-b py-4">
                <h1 className="text-xl font-semibold">
                    Treatment Modalities & Basic Principles
                </h1>
                <p className="text-muted-foreground mt-3 ml-2 text-sm font-medium uppercase">
                    COURSE MATERIAL
                </p>
            </div>

            <div className="p-4">
                <DragableList
                    items={courseStructure}
                    onChange={handleCourseStructureReorder}
                    renderItem={({ item, attributes, listeners }) => (
                        <div className="group border-border mx-2 flex items-start border-b">
                            <div className="p-2 pr-1">
                                <GripVertical
                                    size={18}
                                    className="text-muted-foreground cursor-grab active:cursor-grabbing"
                                    {...attributes}
                                    {...listeners}
                                />
                            </div>

                            <Accordion type="multiple" className="flex-1">
                                <AccordionItem
                                    value={item.id}
                                    className="border-none"
                                >
                                    <div className="flex items-center justify-between pr-2">
                                        <AccordionTrigger
                                            className="cursor-pointer px-0 py-2 hover:no-underline"
                                            hideChevron
                                        >
                                            <span className="text-left text-sm font-medium">
                                                {item.title}
                                            </span>
                                        </AccordionTrigger>

                                        <div className="flex items-center gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-muted-foreground size-6"
                                                icon="edit"
                                                onClick={() =>
                                                    setAddModuleOpen(true)
                                                }
                                            />
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-muted-foreground size-6"
                                                icon="trash-2"
                                            />

                                            <AccordionPrimitive.Trigger asChild>
                                                <button className="flex size-6 items-center justify-center transition-transform data-[state=open]:rotate-180">
                                                    <ChevronDownIcon className="text-muted-foreground size-4" />
                                                </button>
                                            </AccordionPrimitive.Trigger>
                                        </div>
                                    </div>

                                    <AccordionContent>
                                        {item.children?.length > 0 && (
                                            <DragableList
                                                items={item.children}
                                                onChange={(reorderedItems) =>
                                                    handleSectionItemsReorder(
                                                        item.id,
                                                        reorderedItems
                                                    )
                                                }
                                                renderItem={({
                                                    item: sectionItem,
                                                    attributes:
                                                        sectionAttributes,
                                                    listeners: sectionListeners,
                                                }) => (
                                                    <div className="hover:bg-secondary-background mt-2 flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            <div className="mr-1">
                                                                <GripVertical
                                                                    size={18}
                                                                    className="text-muted-foreground cursor-grab active:cursor-grabbing"
                                                                    {...sectionAttributes}
                                                                    {...sectionListeners}
                                                                />
                                                            </div>
                                                            <span className="text-sm">
                                                                {
                                                                    sectionItem.title
                                                                }
                                                            </span>
                                                        </div>

                                                        <div className="mr-2 flex items-center gap-1 group-data-[state=closed]:hidden group-data-[state=open]:flex">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="text-muted-foreground size-6"
                                                                icon="edit"
                                                                onClick={() =>
                                                                    setAssessmentOpen(
                                                                        true
                                                                    )
                                                                }
                                                            />
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="text-muted-foreground size-6"
                                                                icon="trash-2"
                                                            />
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                icon="chevron-right"
                                                                className="text-muted-foreground size-6"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            />
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    )}
                />

                <div className="mt-4 flex gap-2">
                    <Button
                        variant="ghost"
                        className="bg-border"
                        icon="plus"
                        onClick={() => setAddModuleOpen(true)}
                    >
                        Add Module
                    </Button>
                    <Button
                        variant="ghost"
                        className="bg-border"
                        icon="plus"
                        onClick={() => setAddAssessmentOpen(true)}
                    >
                        Add Assessment
                    </Button>
                </div>
            </div>
            <AddModuleDialog
                open={moduleOpen}
                onOpenChange={setModuleOpen}
                isEdit={true}
            />
            <AddAssessmentDialog
                open={assessmentOpen}
                onOpenChange={setAssessmentOpen}
                isEdit={true}
            />
        </ScrollArea>
    )
}

export default CoursesSidebar
