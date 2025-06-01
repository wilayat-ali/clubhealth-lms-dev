'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '../ui/scroll-area'
import CourseFilterTabs from '../course-filter-tabs'
import ContentForm from '../manage-courses/content-form'
import VideoForm from '../manage-courses/video-form'
import DocumentForm from '../manage-courses/document-form'
import { contentSchema } from '@/validations/courses-content-schema'
import { videoSchema } from '@/validations/courses-video-schema'
import { documentSchema } from '@/validations/courses-document-schema'

const contentFilters = ['Content', 'Video or Photo', 'Document']

const AddContentDrawer = ({ open, onOpenChange }) => {
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState('Content')

    // Forms
    const contentForm = useForm({
        resolver: zodResolver(contentSchema),
        defaultValues: {
            headline: 'Treatment Modalities & Basic Principles',
            photo: null,
            details:
                'Dive into the fundamentals of healthcare by exploring key treatment modalities and principles. Learn how Club Health strips back the saturated world of healthcare to focus on evidence-based physiotherapy, rehab & conditioning, and clinical pilates—all designed to help patients move well and prevent musculoskeletal conditions.',
        },
    })

    const videoForm = useForm({
        resolver: zodResolver(videoSchema),
        defaultValues: {
            file: null,
            caption: '',
        },
    })

    const documentForm = useForm({
        resolver: zodResolver(documentSchema),
        defaultValues: {
            file: null,
            title: 'Course Outline',
            details:
                'Discover the details of our product roadmap and what exciting offerings await you in this course.',
        },
    })

    const handleSubmitByTab = () => {
        if (activeTab === 'Content') {
            contentForm.handleSubmit((data) => onSubmit(data))()
        } else if (activeTab === 'Video or Photo') {
            videoForm.handleSubmit((data) => onSubmit(data))()
        } else if (activeTab === 'Document') {
            documentForm.handleSubmit((data) => onSubmit(data))()
        }
    }

    const onSubmit = (data) => {
        // eslint-disable-next-line no-console
        console.log(data)
        setLoading(true)
        try {
            // Reset appropriate form
            if (activeTab === 'Content') {
                contentForm.reset()
            } else if (activeTab === 'Video or Photo') {
                videoForm.reset()
            } else if (activeTab === 'Document') {
                documentForm.reset()
            }

            onOpenChange(false)
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error adding content:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Drawer
            open={open}
            onOpenChange={onOpenChange}
            direction="right"
            className="h-screen max-h-screen flex-1 flex-col"
        >
            <DrawerContent>
                <ScrollArea className="h-[calc(100vh)]">
                    <div className="flex h-screen flex-col p-6 pl-8">
                        <DrawerHeader>
                            <div className="flex items-center justify-between font-semibold">
                                <DrawerTitle>Add Content</DrawerTitle>
                            </div>
                            <DrawerDescription />
                        </DrawerHeader>

                        <div className="mt-6 flex-1 overflow-y-auto">
                            <CourseFilterTabs
                                filters={contentFilters}
                                onFilterChange={(value) => setActiveTab(value)}
                                defaultFilter="Content"
                                tabsListClassName="bg-muted"
                            />

                            {activeTab === 'Content' && (
                                <div className="mt-6">
                                    <ContentForm
                                        form={contentForm}
                                        onSubmit={onSubmit}
                                        loading={loading}
                                    />
                                </div>
                            )}

                            {activeTab === 'Video or Photo' && (
                                <div className="mt-6">
                                    <VideoForm
                                        form={videoForm}
                                        onSubmit={onSubmit}
                                        loading={loading}
                                    />
                                </div>
                            )}

                            {activeTab === 'Document' && (
                                <div className="mt-6">
                                    <DocumentForm
                                        form={documentForm}
                                        onSubmit={onSubmit}
                                        loading={loading}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Footer Submit/Cancel */}
                        <DrawerFooter className="mt-auto flex w-full flex-row justify-end gap-2">
                            <Button
                                type="button"
                                className="w-full"
                                icon="plus"
                                size="lg"
                                onClick={handleSubmitByTab}
                                disabled={loading}
                            >
                                {loading ? 'Adding...' : 'Add'}
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                icon="arrow-left"
                                size="lg"
                                onClick={() => onOpenChange(false)}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                        </DrawerFooter>
                    </div>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    )
}

export default AddContentDrawer
