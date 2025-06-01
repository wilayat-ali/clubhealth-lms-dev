import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Messages({ data, onSelectMessage, onNewMessage }) {
    return (
        <div className="flex flex-1 flex-col">
            <div className="border-border bg-secondary-background sticky top-0 flex flex-col gap-3 border-b p-4">
                <div className="flex items-center justify-between">
                    <p className="text-foreground text-base font-medium">
                        Inbox
                    </p>
                    <Button
                        icon="plus"
                        variant="primary"
                        className="bg-primary text-white/95"
                        onClick={onNewMessage}
                    >
                        New Message
                    </Button>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="relative">
                        <Input
                            className="bg-background placeholder:text-muted-foreground py-1.5 pl-10"
                            placeholder="Type to search"
                        />
                        <div className="text-muted-foreground absolute top-1/2 left-3 size-5 -translate-y-1/2 transform">
                            <Search size={18} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto">
                {data.map((message) => (
                    <div
                        key={message.id}
                        onClick={() => onSelectMessage(message.id)}
                        className={`flex cursor-pointer flex-col gap-2 border-b p-4 ${
                            message.isActive ? 'bg-background' : ''
                        }`}
                    >
                        <div className="text-foreground flex items-center justify-between">
                            <span
                                className={`text-sm font-normal ${
                                    message.isActive
                                        ? 'text-foreground'
                                        : 'text-secondary-foreground'
                                }`}
                            >
                                {message.sender}
                            </span>
                            <span
                                className={`text-xs ${
                                    message.isActive
                                        ? 'text-foreground'
                                        : 'text-secondary-foreground'
                                }`}
                            >
                                {message.time}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <p
                                className={`line-clamp-1 text-sm font-medium ${message.isActive ? 'text-primary' : 'text-foreground'}`}
                            >
                                {message.subject}
                            </p>
                        </div>
                        <p
                            className={`text-xs font-medium ${
                                message.isActive
                                    ? 'text-foreground'
                                    : 'text-secondary-foreground'
                            } line-clamp-2`}
                        >
                            {message.message}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
