import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

const dotColorMap = {
    Pending: 'bg-status-gray',
    Active: 'bg-status-green',
}
const statusDotColor = (status) => dotColorMap[status] || ''

const LearnerProfileHeader = ({ learner }) => {
    return (
        <div className="mb-6 flex justify-between align-baseline">
            <div className="flex items-center gap-2">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                        src="/images/learner-profile.png"
                        alt={learner.name}
                        width={48}
                        height={48}
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-5">
                        <h3 className="text-foreground text-sm font-medium">
                            {learner.name}
                        </h3>
                        <Badge
                            variant="outline"
                            className="text-foreground rounded-full border-neutral-900 text-[12.5px] font-medium tracking-wider"
                        >
                            {learner.level}
                        </Badge>
                    </div>
                    <p className="text-secondary-foreground text-sm">
                        {learner.email}
                    </p>
                </div>
            </div>

            <div className="mb-4 flex items-center justify-between gap-2">
                <p className="text-secondary-foreground text-sm">
                    Member since {learner.memberSince}
                </p>
                <Badge
                    variant="outline"
                    status={true}
                    dotColor={statusDotColor(learner.status)}
                    className="rounded-full"
                >
                    <div className="text-foreground rounded-full border-neutral-900 text-[13px] font-medium tracking-widest">
                        {learner.status}
                    </div>
                </Badge>
            </div>
        </div>
    )
}

export default LearnerProfileHeader
