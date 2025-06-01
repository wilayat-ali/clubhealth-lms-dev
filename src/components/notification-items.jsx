import { DynamicIcon } from 'lucide-react/dynamic'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import NoRecordFound from '@/components/no-record-found'

import { cn } from '@/lib/utils'

const NotificationList = ({ data = [], onActionClick, onMarkAllRead }) => {
    if (data.length === 0) {
        return (
            <div className="flex h-[calc(70vh-10px)] items-center justify-center">
                <NoRecordFound
                    imageSrc="/no-notification-found.svg"
                    heading="No Notifications"
                    description="Notification Inbox Empty"
                />
            </div>
        )
    }

    return (
        <ScrollArea className="mt-7 h-[calc(100vh-106px)]">
            <div className="w-full pr-6 pb-6">
                <div className="flex items-center justify-between">
                    <p className="text-foreground text-sm font-medium">
                        You have new notifications
                    </p>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-foreground hover:bg-muted h-8 px-2 text-sm font-medium"
                        onClick={onMarkAllRead}
                    >
                        Mark all read
                    </Button>
                </div>

                <div className="mt-6">
                    {data.map((item, index) => (
                        <div key={index}>
                            <div className="flex gap-2">
                                <div>
                                    <DynamicIcon name={item.icon} size={22} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <p className="text-foreground text-sm font-medium">
                                            {item.title}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-secondary-foreground text-xs">
                                                {item.date}
                                            </span>
                                            <div
                                                className={`size-2 rounded-full ${
                                                    !item.isRead
                                                        ? 'bg-brand-red'
                                                        : 'bg-border'
                                                }`}
                                            ></div>
                                        </div>
                                    </div>

                                    <p className="text-secondary-foreground mt-1 text-sm">
                                        {item.description}
                                    </p>

                                    {item.actionLabel && (
                                        <Button
                                            variant="outline"
                                            className="mt-[10px]"
                                            onClick={() =>
                                                onActionClick?.(
                                                    item.actionLabel
                                                )
                                            }
                                        >
                                            {item.actionLabel}
                                        </Button>
                                    )}

                                    <Separator
                                        className={cn(
                                            'my-4',
                                            index === data.length - 1
                                                ? 'hidden'
                                                : ''
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ScrollArea>
    )
}

export default NotificationList
