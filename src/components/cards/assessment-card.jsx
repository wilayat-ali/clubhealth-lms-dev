import Link from 'next/link'
import { ChartPie, AlarmClockCheck, IterationCw } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const badgeClassMap = {
    passed: 'bg-brand-green',
    failed: 'bg-brand-red',
    pending: 'bg-brand-blue',
}

const buttonTextMap = {
    passed: 'Retake',
    failed: 'Retake',
    pending: 'Start Assessment',
}

const getBadgeClass = (status) =>
    badgeClassMap[status.toLowerCase()] || 'bg-muted'

const getButtonText = (status) =>
    buttonTextMap[status.toLowerCase()] || 'Start Assessment'

const StatsCard = ({ icon: Icon, label, value }) => (
    <div className="flex flex-col justify-between p-4">
        <div className="flex items-center space-x-2">
            <Icon className="text-secondary-foreground size-5" />
            <span className="text-secondary-foreground truncate text-sm font-medium">
                {label}
            </span>
        </div>
        <p
            className={`truncate text-2xl ${value ? 'text-foreground font-semibold' : 'text-secondary-foreground'}`}
        >
            {value || '--'}
        </p>
    </div>
)

const AssessmentCard = ({
    title = '--',
    description = '--',
    status = 'NA',
    stats = { score: '--', timeTaken: '--', attempts: '0' },
    onDownloadCertificateClick = () => {},
}) => {
    const statusLower = status.toLowerCase()

    const statusActions = {
        pending: () => (
            <Link href="/assessments/start-assessment/2">
                <Button
                    className="cursor-pointer"
                    icon="arrow-right"
                    iconPosition="right"
                >
                    {getButtonText(status)}
                </Button>
            </Link>
        ),
        failed: () => (
            <div className="flex justify-between">
                <Link href="/assessments/start-assessment/2">
                    <Button
                        className="cursor-pointer"
                        icon="arrow-right"
                        iconPosition="right"
                    >
                        {getButtonText(status)}
                    </Button>
                </Link>
                <Link href="/assessments/result/2">
                    <Button
                        className="cursor-pointer"
                        variant="outline"
                        icon="file-chart-pie"
                    >
                        Result
                    </Button>
                </Link>
            </div>
        ),
        passed: () => (
            <div className="flex justify-between">
                <Link href="/assessments/start-assessment/2">
                    <Button
                        className="cursor-pointer"
                        icon="arrow-right"
                        iconPosition="right"
                    >
                        {getButtonText(status)}
                    </Button>
                </Link>
                <div className="flex gap-2">
                    <Link href="/assessments/result/2">
                        <Button
                            className="cursor-pointer"
                            variant="outline"
                            icon="file-chart-pie"
                        >
                            Result
                        </Button>
                    </Link>
                    <Button
                        className="cursor-pointer"
                        onClick={onDownloadCertificateClick}
                        variant="outline"
                        icon="download"
                    >
                        Certificate
                    </Button>
                </div>
            </div>
        ),
    }

    const ActionButtons = statusActions[statusLower]

    return (
        <div className="bg-card relative space-y-4 rounded-lg p-4 shadow-xs">
            <Badge
                className={`${getBadgeClass(status)} hover:bg-primary cursor-default rounded-full font-normal`}
            >
                {status}
            </Badge>
            <div className="text-foreground text-truncate font-semibold">
                {title}
            </div>
            <p className="text-foreground line-clamp-2 text-sm">
                {description}
            </p>

            <div className="border-border divide-border grid h-[88px] w-full grid-cols-3 divide-x overflow-hidden rounded-lg border">
                <StatsCard icon={ChartPie} label="Score" value={stats?.score} />
                <StatsCard
                    icon={AlarmClockCheck}
                    label="Time Taken"
                    value={stats.timeTaken}
                />
                <StatsCard
                    icon={IterationCw}
                    label="Attempts"
                    value={stats.attempts}
                />
            </div>

            {ActionButtons && <ActionButtons />}
        </div>
    )
}

export default AssessmentCard
