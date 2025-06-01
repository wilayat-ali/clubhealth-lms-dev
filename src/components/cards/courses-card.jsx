'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, FileText } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Slugify from '@/helper/slugify'
import { Progress } from '../ui/progress'

const badgeClassMap = {
    completed: 'bg-brand-green',
    ongoing: 'bg-brand-red',
    pending: 'bg-brand-blue',
}

const buttonTextMap = {
    completed: 'Retake Course',
    ongoing: 'Continue Study',
    pending: 'Enroll Now',
}

const getBadgeClass = (status) =>
    badgeClassMap[status.toLowerCase()] || 'bg-muted'

const getButtonText = (status) =>
    buttonTextMap[status.toLowerCase()] || 'View Course'

const CoursesCard = ({
    image = '/images/placeholder.png',
    title = 'NA',
    description = 'No description available.',
    status = 'NA',
    onClick,
    isDashboard = false,
    locked = false,
}) => {
    return (
        <div className="bg-background border-border relative space-y-4 rounded-lg border p-4">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 314px) 100vw, 314px"
                    className="rounded-lg object-cover"
                    priority
                />
            </div>

            <div className="absolute top-6 right-6 flex items-center justify-center rounded-full">
                <Badge className={`${getBadgeClass(status)} rounded-full`}>
                    {status}
                </Badge>
            </div>
            <div className="gap-6">
                <p className="text-foreground truncate text-lg font-semibold">
                    {title}
                </p>
                <p className="text-foreground line-clamp-2 text-sm">
                    {description}
                </p>
            </div>

            {isDashboard && (
                <div className="mb-4 space-y-2">
                    <div className="flex justify-between">
                        <p className="text-secondary-foreground text-xs">
                            40% completed
                        </p>
                        <p className="text-secondary-foreground text-xs">
                            6/15 chapters
                        </p>
                    </div>
                    <Progress
                        value={60}
                        className="[&>div]:bg-brand-green w-[100%]"
                    />
                </div>
            )}
            {status.toLowerCase() === 'pending' ? (
                <div className="flex justify-between">
                    {locked ? (
                        <Button
                            className="bg-disable text-muted-foreground font-medium"
                            onClick={onClick}
                            icon="lock-keyhole"
                            iconStyle="!size-5"
                            disabled
                        >
                            Locked
                        </Button>
                    ) : (
                        <Button className="cursor-pointer" onClick={onClick}>
                            {getButtonText(status)}{' '}
                            <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                    )}

                    <Link href={`browse-courses/${Slugify(title)}`}>
                        <Button
                            className="bottom-2 cursor-pointer"
                            variant="outline"
                        >
                            <FileText className="h-4 w-4" />
                            View Details
                        </Button>
                    </Link>
                </div>
            ) : (
                <div>
                    <Link href={`browse-courses/${Slugify(title)}/learning`}>
                        <Button
                            className="cursor-pointer"
                            variant={
                                status.toLowerCase() === 'completed'
                                    ? 'outline'
                                    : 'default'
                            }
                        >
                            {getButtonText(status)}{' '}
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default CoursesCard
