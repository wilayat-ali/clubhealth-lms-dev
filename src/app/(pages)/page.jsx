'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import {
    Library,
    Pointer,
    LandPlot,
    AlarmClock,
    Gauge,
    Medal,
    ArrowRight,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import DashboardStatCard from '@/components/dashboard/dashboard-stat-card'
import { useBreadcrumbs } from '@/context/bread-crumb-context'
import CoursesCard from '@/components/cards/courses-card'
import PageHeader from '@/components/page-header'
import CoursesEngagementChart from '@/components/dashboard/courses-engagement-chart'
import LearningActivityChart from '@/components/dashboard/learning-activity-chart'
import CompletionistDialog from '@/components/dialogs/completionist-dialog'
import AchievementItem from '@/components/dashboard/achievement-item'
import {
    coursesData,
    dashboardStats,
    achievements,
    learningActivityData,
    CoursesEngagementData,
} from '@/data/dashboard-data.js'
import ViewAchievementDialogue from '@/components/dialogs/view-achievement-dialog'

export const iconMap = {
    'Enrolled Courses': Library,
    'Ongoing Courses': Pointer,
    'Completed Courses': LandPlot,
    'Learning Hours': AlarmClock,
    'Avg. Score': Gauge,
    'Total Certificates': Medal,
}

const Dashboard = () => {
    const { setBreadcrumbs } = useBreadcrumbs()
    const [isCompletionistDialogOpen, setIsCompletionistDialogOpen] =
        useState(false)
    const [completionistImage, setCompletionistImage] = useState('')
    const [openAchievementDialog, setOpenAchievementDialog] = useState(false)

    useEffect(() => {
        setBreadcrumbs([{ label: 'Dashboard' }])
    }, [])

    const openCompletionistDialog = (image) => {
        setCompletionistImage(image)
        setIsCompletionistDialogOpen(true)
    }

    const closeCompletionistDialog = () => {
        setIsCompletionistDialogOpen(false)
    }
    return (
        <div className="p-10">
            <title>{`Dashboard | ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
            <div className="flex h-15 gap-2">
                <div className="bg-border relative h-15 w-15 rounded-full">
                    <Image
                        src="/images/welcome.png"
                        alt="welcome-icon"
                        fill
                        className="object-contain p-3"
                    />
                </div>
                <PageHeader
                    // fontClass="font-[gotham HTF]"
                    title="Welcome back, Amelia!"
                    description="Check out your current stats and explore new modules to further your skills."
                />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
                {dashboardStats.map((stat, index) => {
                    const Icon = iconMap[stat.label] || Library
                    return (
                        <DashboardStatCard
                            key={`stat-${index}`}
                            icon={Icon}
                            label={stat.label}
                            value={stat.value}
                        />
                    )
                })}
            </div>

            <div className="mt-6 overflow-hidden">
                <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-2 sm:gap-6 2xl:grid-cols-3">
                    <div className="col-span-1">
                        <LearningActivityChart
                            learningActivityData={learningActivityData}
                            title="Learning Activities"
                        />
                    </div>
                    <div className="col-span-1">
                        <CoursesEngagementChart
                            CoursesEngagementData={CoursesEngagementData}
                            title="Course Engagement"
                            bottomSpace={30}
                        />
                    </div>
                    <div className="bg-card border-barder rounded-lg border p-4 sm:col-span-2 2xl:col-span-1">
                        <div className="flex items-center justify-between">
                            <div className="text-xl font-semibold">
                                Achievements
                            </div>
                            <Button
                                variant="customLink"
                                size="default"
                                onClick={() => setOpenAchievementDialog(true)}
                            >
                                View All{' '}
                                <ArrowRight className="text-foreground h-4 w-4" />
                            </Button>
                        </div>
                        <div className="mt-4 space-y-3 max-[1600px]:grid max-[1600px]:grid-cols-3 max-[1600px]:gap-x-4">
                            {achievements.map((achievement, index) => (
                                <AchievementItem
                                    key={index}
                                    title={achievement.title}
                                    date={achievement.date}
                                    description={achievement.description}
                                    image={achievement.image}
                                    openCompletionistDialog={() =>
                                        openCompletionistDialog(
                                            achievement.image
                                        )
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <PageHeader
                    title="Your Enrolled Courses"
                    description="View your currently enrolled courses along with their progress."
                />
                <Link href="/browse-courses">
                    <Button variant="customLink" size="default">
                        View All{' '}
                        <ArrowRight className="text-foreground h-4 w-4" />
                    </Button>
                </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {coursesData?.map((course, index) => (
                    <CoursesCard
                        key={`course-card-${index}`}
                        {...course}
                        isDashboard={true}
                    />
                ))}
            </div>
            <CompletionistDialog
                open={isCompletionistDialogOpen}
                onClose={closeCompletionistDialog}
                image={completionistImage}
            />
            <ViewAchievementDialogue
                open={openAchievementDialog}
                onOpenChange={setOpenAchievementDialog}
            />
        </div>
    )
}

export default Dashboard
