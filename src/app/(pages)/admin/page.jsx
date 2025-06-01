'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import {
    AlarmClockCheck,
    FilePenLine,
    Gauge,
    LandPlot,
    Library,
    Medal,
    Users,
} from 'lucide-react'

import DashboardStatCard from '@/components/dashboard/dashboard-stat-card'
import { useBreadcrumbs } from '@/context/bread-crumb-context'
import { Button } from '@/components/ui/button'
import CustomSelect from '@/components/custom-select'
import PageHeader from '@/components/page-header'
import BestPerformingCourses from '@/components/admin/best-performing-course'
import CoursesEngagementChart from '@/components/dashboard/courses-engagement-chart'
import ActivityTrendChart from '@/components/admin/activity-trend'
import RistLearnerPieChart from '@/app/(pages)/admin/dashboard/pie-chart'
import { CoursesEngagementData } from '@/data/dashboard-data.js'
import TopLearners from '@/app/(pages)/admin/dashboard/top-learners'

import dashboardStats from '@/data/admin-dashboard-stats.json'
import activityTrendCartData from '@/data/admin-activity-trend.json'
import atRiskLearnersChartData from '@/data/at-risk-learner-chart.json'
import dashboardMetricsData from '@/data/admin-dashboard-metrics.json'

const DashboardPage = () => {
    const { setBreadcrumbs } = useBreadcrumbs()
    const iconMap = {
        'Assessment Retake Rate': FilePenLine,
        'Average Time to Course Completion': Library,
    }

    const iconStat = {
        'Active Learners': Users,
        'Course Enrollments': Library,
        'Course Completion Rate': LandPlot,
        'Learning Hours / Learner': AlarmClockCheck,
        'Avg. Assessment Score': Gauge,
        'Certificates Issued': Medal,
    }

    useEffect(() => {
        setBreadcrumbs([{ label: 'Dashboard' }])
    }, [])

    return (
        <div className="p-10">
            <title>{`Dashboard | ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
            <div className="flex h-15 justify-between gap-2">
                <PageHeader
                    title="Dashboard"
                    description="Here you can monitor student engagement, course progress, and overall platform performance."
                />
                <div className="flex gap-x-2">
                    <CustomSelect
                        placeholder="Filter by Course"
                        options={[
                            { label: 'N/A', value: 'N/A' },
                            { label: 'Yes', value: 'Yes' },
                            { label: 'No', value: 'No' },
                        ]}
                        size="default"
                        className="bg-background w-[170px]"
                        iconName="library"
                    />

                    <CustomSelect
                        placeholder="Last 1 month"
                        options={[
                            { label: 'N/A', value: 'N/A' },
                            { label: 'Yes', value: 'Yes' },
                            { label: 'No', value: 'No' },
                        ]}
                        size="default"
                        className="bg-background w-[170px]"
                        iconName="calendar"
                    />
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
                {dashboardStats.map((item, index) => {
                    const Icon = iconStat[item.label] || Library

                    return (
                        <div key={index}>
                            <DashboardStatCard
                                icon={Icon}
                                label={item.label}
                                value={item.value}
                                description={item.description}
                                showProgress={item.showProgress}
                                className="size-5"
                            />
                        </div>
                    )
                })}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-x-5">
                <div className="col-span-1">
                    <ActivityTrendChart
                        learningActivityData={activityTrendCartData}
                        title="Activity Trend"
                    />
                </div>

                <div className="col-span-1">
                    <BestPerformingCourses
                        CoursesEngagementData={CoursesEngagementData}
                        title="Best-Performing Courses"
                        bottomSpace={30}
                    />
                </div>
            </div>

            <div className="mt-10 grid grid-cols-12 gap-6">
                <div className="bg-background rounded-lg border p-4 shadow-xs xl:col-span-4 2xl:col-span-3">
                    <p className="mb-5 text-lg font-semibold">
                        At-Risk Learners
                    </p>
                    <RistLearnerPieChart
                        data={atRiskLearnersChartData}
                        riskPercentage="25%"
                        riskValue="At High Risk"
                    />
                    <div className="text-foreground mt-5 text-sm">
                        <p className="line-clamp-1 font-medium">
                            25% learners are considered to be at high risk.
                        </p>
                        <p className="text-secondary-foreground mt-1 line-clamp-2">
                            87 students are at high risk because they aren't
                            dedicating enough time to their studies.
                        </p>
                    </div>
                </div>

                <div className="bg-background rounded-lg border shadow-xs xl:col-span-8 2xl:col-span-6">
                    <div className="flex items-center justify-between p-4">
                        <p className="text-foreground text-lg">Top Learners</p>
                        <Link href="/admin">
                            <Button
                                size="lg"
                                type="button"
                                variant="link"
                                icon="arrow-right"
                                className="px-0 xl:!h-4 2xl:!h-7"
                                iconPosition="right"
                            >
                                View All
                            </Button>
                        </Link>
                    </div>

                    <TopLearners />
                </div>
                <div className="rounded-lg xl:col-span-4 2xl:col-span-3">
                    {dashboardMetricsData.map((item, index) => {
                        const Icon = iconMap[item.label] || Library

                        return (
                            <div key={index} className="mb-4">
                                <DashboardStatCard
                                    icon={Icon}
                                    label={item.label}
                                    value={item.value}
                                    description={item.description}
                                    showProgress={item.showProgress}
                                    className="size-5"
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
