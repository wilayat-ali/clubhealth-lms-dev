'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import CustomSelect from '@/components/custom-select'
import DraggableDataTable from '@/components/draggable-data-table'
import AddCoursesDrawer from '@/components/drawers/add-courses-drawer'
import { useBreadcrumbs } from '@/context/bread-crumb-context'

const sampleCourses = [
    {
        id: '1',
        title: 'Treatment Modalities & Basic Principles',
        subtitle: 'Course 1',
        learnerGroup: 'All Groups',
        timeToComplete: '10h 30m',
        completed: 20,
        currentlyEnrolled: 25,
        status: 'active',
        lastUpdated: 'Apr 15, 2020',
    },
    {
        id: '2',
        title: 'Postural Principles',
        subtitle: 'Course 2',
        learnerGroup: 'Beginner Learners',
        timeToComplete: '6h 30m',
        completed: 18,
        currentlyEnrolled: 24,
        status: 'active',
        lastUpdated: 'Apr 14, 2020',
    },
    {
        id: '3',
        title: 'Rehab & Conditioning Training',
        subtitle: 'Course 3',
        learnerGroup: 'Beginner Learners',
        timeToComplete: '8h 20m',
        completed: 16,
        currentlyEnrolled: 32,
        status: 'active',
        lastUpdated: 'Apr 13, 2020',
    },
    {
        id: '4',
        title: 'Movement Principles',
        subtitle: 'Course 4',
        learnerGroup: 'Beginner Learners, Intermediate Learners',
        timeToComplete: '10h 30m',
        completed: 15,
        currentlyEnrolled: 27,
        status: 'active',
        lastUpdated: 'Apr 12, 2020',
    },
    {
        id: '5',
        title: 'The CH Rehab Model',
        subtitle: 'Course 5',
        learnerGroup: 'Advanced Practitioners',
        timeToComplete: '5h 30m',
        completed: 15,
        currentlyEnrolled: 28,
        status: 'draft',
        lastUpdated: 'Apr 11, 2020',
    },
    {
        id: '6',
        title: 'The CH Rehab Model',
        subtitle: 'Course 5',
        learnerGroup: 'Advanced Practitioners',
        timeToComplete: '5h 30m',
        completed: 15,
        currentlyEnrolled: 28,
        status: 'active',
        lastUpdated: 'Apr 11, 2020',
    },
    {
        id: '7',
        title: 'The CH Rehab Model',
        subtitle: 'Course 5',
        learnerGroup: 'Advanced Practitioners',
        timeToComplete: '5h 30m',
        completed: 15,
        currentlyEnrolled: 28,
        status: 'active',
        lastUpdated: 'Apr 11, 2020',
    },
]

const ManageCourses = () => {
    const { setBreadcrumbs } = useBreadcrumbs()
    const [courses, setCourses] = useState(sampleCourses)
    const [openDrawer, isDrawerOpen] = useState(false)

    useEffect(() => {
        setBreadcrumbs([
            {
                label: 'Manage Courses',
                href: '/admin/courses',
            },
        ])
    }, [])

    const dotColorMap = {
        active: 'bg-status-green',
        draft: 'bg-muted-foreground',
    }
    const statusDotColor = (status) => dotColorMap[status] || ''

    const handleDataReorder = (newData) => {
        setCourses(newData)
        console.log(
            'New order:',
            newData.map((item) => item.title)
        )
    }
    const columns = [
        {
            accessorKey: 'title',
            header: 'Title',
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.original.title}</div>
                    <div className="text-muted-foreground text-sm">
                        {row.original.subtitle}
                    </div>
                </div>
            ),
        },
        {
            accessorKey: 'learnerGroup',
            header: 'Learner Group',
            cell: ({ row }) => (
                <span className="text-sm">{row.getValue('learnerGroup')}</span>
            ),
        },
        {
            accessorKey: 'timeToComplete',
            header: 'Time to Complete',
            cell: ({ row }) => (
                <span className="text-sm">
                    {row.getValue('timeToComplete')}
                </span>
            ),
        },
        {
            accessorKey: 'completed',
            header: 'Completed',
            cell: ({ row }) => (
                <span className="text-sm">{row.getValue('completed')}</span>
            ),
        },
        {
            accessorKey: 'currentlyEnrolled',
            header: 'Currently Enrolled',
            cell: ({ row }) => (
                <span className="text-sm">
                    {row.getValue('currentlyEnrolled')}
                </span>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const status = row.getValue('status')
                return (
                    <Badge
                        variant="outline"
                        status={true}
                        className="rounded-full"
                        dotColor={statusDotColor(status)}
                    >
                        <span className="capitalize">{status}</span>
                    </Badge>
                )
            },
        },
        {
            accessorKey: 'lastUpdated',
            header: 'Last Updated',
            cell: ({ row }) => (
                <span className="text-sm">{row.getValue('lastUpdated')}</span>
            ),
        },
        {
            id: 'actions',
            header: '',
            cell: () => (
                <div className="flex items-center gap-1">
                    <Button variant="ghost" icon="eye" size="sm" />
                    <Button
                        variant="ghost"
                        icon="settings"
                        size="sm"
                        onClick={() => {
                            isDrawerOpen(true)
                        }}
                    />
                    <Link href="/admin/courses/id">
                        <Button variant="ghost" icon="edit" size="sm" />
                    </Link>
                </div>
            ),
        },
    ]

    return (
        <div className="container mx-auto py-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Manage Courses</h1>
                    <p className="text-muted-foreground">
                        You have {courses.length} active courses
                    </p>
                </div>
                <Button
                    icon="plus"
                    onClick={() => {
                        isDrawerOpen(true)
                    }}
                >
                    Add Course
                </Button>
            </div>

            <DraggableDataTable
                data={courses}
                columns={columns}
                searchKey="Search by name or keyword"
                showSearch={true}
                initialDisplayCount={15}
                loadMoreCount={5}
                onDataReorder={handleDataReorder}
            >
                <div className="text-foreground flex gap-3 p-2">
                    <CustomSelect
                        placeholder="Filter by Status"
                        size="sm"
                        options={[
                            { label: 'N/A', value: 'N/A' },
                            { label: 'Yes', value: 'Yes' },
                            { label: 'No', value: 'No' },
                        ]}
                        className="w-[170px] shadow-none data-[placeholder]:text-neutral-900"
                        iconStyle="text-neutral-800"
                        iconName="lock"
                    />
                    <CustomSelect
                        placeholder="Filter by Learner Group"
                        options={[
                            { label: 'N/A', value: 'N/A' },
                            { label: 'Yes', value: 'Yes' },
                            { label: 'No', value: 'No' },
                        ]}
                        size="sm"
                        className="w-[210px] shadow-none data-[placeholder]:text-neutral-900"
                        iconStyle="text-neutral-800"
                        iconName="users"
                    />
                </div>
            </DraggableDataTable>
            <AddCoursesDrawer open={openDrawer} onOpenChange={isDrawerOpen} />
        </div>
    )
}
export default ManageCourses
