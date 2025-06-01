'use client'

import { useEffect, useState } from 'react'

import { GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DragableList from '@/components/dragable'
import AddModuleDialog from '@/components/dialogs/add-module-dialog'
import AddContentDrawer from '@/components/drawers/add-content-drawer'
import AddAssessmentDialog from '@/components/dialogs/add-assessment-dialog'
import StickyPanel from '@/components/sticky-panel'
import HeaderWithAction from '@/components/page/header-with-action'
import CoursesSidebar from '@/components/manage-courses/courses-sidebar'
import { useBreadcrumbs } from '@/context/bread-crumb-context'
import courseStructureData from '@/data/course-structure.json'
import courseContentItemData from '@/data/courses-content-items.json'

const CourseManagement = () => {
    const { setBreadcrumbs } = useBreadcrumbs()
    const [addModuleOpen, setAddModuleOpen] = useState(false)
    const [addContentOpen, setAddContentOpen] = useState(false)
    const [addAssessmentOpen, setAddAssessmentOpen] = useState(false)
    // Content items for the selected section
    const [contentItems, setContentItems] = useState(courseContentItemData)
    const [courseStructure, setCourseStructure] = useState(courseStructureData)

    useEffect(() => {
        setBreadcrumbs([
            {
                label: 'Manage Courses',
                href: '/admin/courses',
            },
            { label: 'Treatment Modalities & Basic Principles' },
        ])
    }, [])

    // Handle course structure reordering
    const handleCourseStructureReorder = (reorderedItems) => {
        setCourseStructure(reorderedItems)
    }

    // Handle section items reordering within a chapter
    const handleSectionItemsReorder = (chapterId, reorderedItems) => {
        setCourseStructure((prev) =>
            prev.map((chapter) =>
                chapter.id === chapterId
                    ? { ...chapter, children: reorderedItems }
                    : chapter
            )
        )
    }

    // Handle content items reordering
    const handleContentItemsReorder = (reorderedItems) => {
        setContentItems(reorderedItems)
    }

    return (
        <div className="flex flex-col">
            <title>{`Add Courses | ${process.env.NEXT_PUBLIC_APP_NAME} `}</title>
            <div className="flex">
                {/* Left Column - Course Structure */}
                <StickyPanel className="bg-secondary-background w-[480px] shrink overflow-hidden">
                    <CoursesSidebar
                        courseStructure={courseStructure}
                        handleCourseStructureReorder={
                            handleCourseStructureReorder
                        }
                        handleSectionItemsReorder={handleSectionItemsReorder}
                        setAddModuleOpen={setAddModuleOpen}
                        setAddAssessmentOpen={setAddAssessmentOpen}
                    />
                </StickyPanel>

                {/* Right Column - Content */}
                <div className="flex-1 p-6">
                    <HeaderWithAction
                        title="Introduction & Overview"
                        buttonLabel="Preview"
                        buttonVariant="ghost"
                        buttonIcon="eye"
                        className="bg-border"
                        titleClassName="text-xl"
                        onButtonClick={() => {}}
                    />

                    <DragableList
                        items={contentItems}
                        onChange={handleContentItemsReorder}
                        renderItem={({ item, attributes, listeners }) => (
                            <div className="border-border bg-background rounded-md">
                                <div className="flex items-center gap-3 p-4">
                                    {/* Drag handle */}
                                    <div className="flex items-center justify-center">
                                        <GripVertical
                                            size={18}
                                            {...attributes}
                                            {...listeners}
                                            className="text-foreground cursor-grab active:cursor-grabbing"
                                        />
                                    </div>

                                    {/* Content info */}
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">
                                            {item.title}
                                        </p>
                                        <p className="text-muted-foreground text-xs">
                                            {item.type === 'video'
                                                ? 'Video'
                                                : item.type === 'content-block'
                                                  ? 'Content Block'
                                                  : 'Document'}
                                        </p>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            icon="edit"
                                            className="text-muted-foreground"
                                            iconStyle="!size-5"
                                            onClick={() =>
                                                setAddContentOpen(true)
                                            }
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            icon="trash-2"
                                            className="text-muted-foreground"
                                            iconStyle="!size-5"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    />

                    <Button
                        variant="outline"
                        className="mt-4"
                        icon="plus"
                        onClick={() => setAddContentOpen(true)}
                    >
                        Add More
                    </Button>
                </div>
            </div>

            {/* Dialogs and Drawers */}
            <AddModuleDialog
                open={addModuleOpen}
                onOpenChange={setAddModuleOpen}
            />

            <AddAssessmentDialog
                open={addAssessmentOpen}
                onOpenChange={setAddAssessmentOpen}
            />

            <AddContentDrawer
                open={addContentOpen}
                onOpenChange={setAddContentOpen}
            />
        </div>
    )
}

export default CourseManagement
