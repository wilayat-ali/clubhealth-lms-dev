'use client'

import { useEffect, useState } from 'react'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import CourseFilterTabs from '@/components/course-filter-tabs'
import CoursesCard from '@/components/cards/courses-card'
import PageHeader from '@/components/page-header'
import EnrollNow from '@/components/dialogs/enroll-now'

import { useBreadcrumbs } from '@/context/bread-crumb-context'
import { coursesData, coursesFilters } from '@/data/courses-data'

export default function BrowseCourses({
    initialDisplayCount = 5,
    loadMoreCount = 5,
}) {
    const [displayCount, setDisplayCount] = useState(initialDisplayCount)
    const { setBreadcrumbs } = useBreadcrumbs()
    const [enrollNowOpen, setEnrollNowOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setBreadcrumbs([{ label: 'Browse Courses' }])
    }, [])

    const handleLoadMore = () => {
        if (isLoading) return

        setIsLoading(true)
        setTimeout(() => {
            setDisplayCount((prev) => prev + loadMoreCount)
            setIsLoading(false)
        }, 500)
    }

    const displayedJobs = coursesFilters.slice(0, displayCount)

    const handleTabFilterChange = (value) => {}

    const metaTitle = `Browse Courses | ${process.env.NEXT_PUBLIC_APP_NAME} `

    return (
        <div className="p-10">
            <title>{metaTitle}</title>
            <div className="grid grid-cols-7 gap-10">
                <div className="col-span-7 xl:col-span-2 2xl:col-span-3">
                    <PageHeader
                        title="Browse Courses"
                        description="Explore a wide range of courses designed to enhance your skills and knowledge."
                    />
                </div>

                <div className="col-span-7 flex items-center xl:col-span-5 xl:justify-end 2xl:col-span-4">
                    <div className="flex justify-center gap-3">
                        <div className="relative w-72">
                            <Input
                                className="border-border bg-background py-1.5 pl-10 text-sm focus-visible:ring-[1px]"
                                placeholder="Search course by title or keyword"
                            />
                            <div className="text-muted-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2 transform">
                                <Search size={18} />
                            </div>
                        </div>

                        <CourseFilterTabs
                            filters={displayedJobs}
                            handleTabFilterChange={handleTabFilterChange}
                            defaultFilter="All Courses"
                        />
                    </div>
                </div>
            </div>

            <div className="my-10">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {coursesData?.map((course, index) => (
                        <CoursesCard
                            key={`course-card-${index}`}
                            {...course}
                            onClick={() => setEnrollNowOpen(true)}
                        />
                    ))}
                </div>
            </div>

            <div className="flex justify-center">
                <div className="mt-3 flex justify-center">
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-sm"
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        icon="arrow-down"
                    >
                        {isLoading ? 'Loading...' : 'Load More'}
                    </Button>
                </div>
            </div>
            {enrollNowOpen && (
                <EnrollNow
                    trigger={enrollNowOpen}
                    setEnrollNowOpen={setEnrollNowOpen}
                />
            )}
        </div>
    )
}
