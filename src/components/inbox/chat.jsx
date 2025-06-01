import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import NoRecordFound from '@/components/no-record-found'

const Chat = ({ data }) => {
    return (
        <>
            {/* Chat Header */}
            <div className="bg-background sticky top-0 z-10 flex">
                <div className="flex h-11 items-center px-5">
                    <p className="text-foreground text-base font-semibold">
                        Clarification on Treatment Techniques{' '}
                    </p>
                </div>
            </div>

            {/* Messages */}
            {data?.length === 0 ? (
                <div className="flex h-[calc(80vh-10px)] items-center justify-center">
                    <Card className="h-[400px] w-[400px]">
                        <CardContent>
                            <NoRecordFound
                                imageSrc="/no-message-found.svg"
                                imageWidth="250"
                                imageHeight="200"
                                heading="No Messages"
                                description="Messages Inbox Empty"
                            />
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className="flex-1 px-6 pt-6">
                    <div className="mx-auto flex w-full max-w-[768px] flex-col gap-4">
                        {data.map((message) => (
                            <Card
                                key={message.id}
                                className={`border-none p-0 shadow-none ${
                                    message.isStaff
                                        ? 'bg-background'
                                        : 'bg-secondary-light'
                                }`}
                            >
                                <CardContent className="flex flex-col gap-4 p-4">
                                    <div className="flex w-full items-center gap-1.5">
                                        <Avatar
                                            variant="square"
                                            className="h-8 w-8 rounded-none"
                                        >
                                            <AvatarImage
                                                src={message.img}
                                                alt={message.sender}
                                            />
                                            <AvatarFallback>
                                                {message.sender
                                                    .split(' ')
                                                    .map((n) => n[0])
                                                    .join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="text-foreground flex-1 text-sm font-semibold">
                                            {message.sender}
                                        </span>
                                        <span className="text-secondary-foreground text-sm font-normal whitespace-nowrap">
                                            {message.time}
                                        </span>
                                    </div>
                                    <p className="text-secondary-foreground text-sm">
                                        {message.message}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default Chat
