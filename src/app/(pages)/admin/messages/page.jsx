'use client'

import { useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useBreadcrumbs } from '@/context/bread-crumb-context'
import ChatMessage from '@/components/inbox/chat'
import StickyPanel from '@/components/sticky-panel'
import InboxMessage from '@/components/inbox/message'
import NewMessageForm from '@/components/dialogs/new-message'
import dayjs, { dateNow } from '@/helper/dayjs'
import initialInboxMessages from '@/data/initial-inbox-message.json'
import initialChatMessages from '@/data/initial-chat-message.json'

const Message = () => {
    const { setBreadcrumbs } = useBreadcrumbs()
    const [messages, setMessages] = useState(initialInboxMessages)
    const [selectedMessageId, setSelectedMessageId] = useState(1)
    const [chatMessages, setChatMessages] = useState(initialChatMessages)
    const [newMessage, setNewMessage] = useState('')
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setBreadcrumbs([{ label: 'Messages' }])
    }, [])

    const handleSelectMessage = (selectedId) => {
        setMessages((prevMessages) =>
            prevMessages.map((msg) => ({
                ...msg,
                isActive: msg.id === selectedId,
            }))
        )
        setSelectedMessageId(selectedId)
    }

    // Handle sending a message
    const handleSendMessage = () => {
        if (!newMessage.trim()) return // Don’t send if message is empty
        const newChatMessage = {
            id: dateNow(),
            sender: 'Alex Johnson',
            img: '/images/avatar-1.jpg',
            time: dayjs().format('h:mm A'),
            message: newMessage,
            isStaff: false,
        }
        setChatMessages((prevChats) => ({
            ...prevChats,
            [selectedMessageId]: [
                ...(prevChats[selectedMessageId] || []),
                newChatMessage,
            ],
        }))
        setNewMessage('')
    }

    // Handle creating a new message thread
    const handleNewMessageSubmit = (formData) => {
        // Create a new message thread
        const newId = Math.max(...messages.map((msg) => msg.id)) + 1
        // Add to inbox messages
        const newInboxMessage = {
            id: newId,
            sender: 'Alex Johnsonasdas',
            time: dayjs().format('h:mm A'),
            subject: formData.messageType,
            message: formData.message,
            isActive: true,
        }

        // Add new message to inbox
        setMessages((prev) =>
            prev
                .map((msg) => ({ ...msg, isActive: false }))
                .concat(newInboxMessage)
        )

        // Create initial chat message
        const newChatMessage = {
            id: dateNow(),
            sender: 'Alex Johnson', // Use user name from auth context
            img: '/images/avatar-1.jpg',
            time: dayjs().format('h:mm A'),
            message: formData.message,
            isStaff: false,
        }

        // Add to chat messages
        setChatMessages((prev) => ({
            ...prev,
            [newId]: [newChatMessage],
        }))

        // Set as selected message
        setSelectedMessageId(newId)

        // Hide the form
    }

    const metaTitle = `Messages | ${process.env.NEXT_PUBLIC_APP_NAME} `

    return (
        <div className="flex flex-1 flex-col">
            <title>{metaTitle}</title>
            <div className="flex flex-1 overflow-hidden">
                {/* Inbox Sidebar */}
                <div className="bg-secondary-background flex h-[calc(100vh-72px)] w-[320px] shrink-0 flex-col border-r">
                    <StickyPanel className="flex flex-1 flex-col">
                        <InboxMessage
                            data={messages}
                            onSelectMessage={handleSelectMessage}
                            onNewMessage={() => setOpen(true)}
                        />
                    </StickyPanel>
                </div>

                {/* Chat Area */}
                <div className="flex h-[calc(100vh-72px)] w-full flex-col">
                    <div className="bg-muted flex-1 overflow-y-auto">
                        <ChatMessage
                            data={chatMessages[selectedMessageId] || []}
                        />
                    </div>

                    <div className="bg-muted mr-3 px-6">
                        <div className="mx-auto flex w-[768px] items-end gap-2 px-0 py-6">
                            <div className="flex-1">
                                <Input
                                    className="border-border bg-background placeholder:text-muted-foreground py-2.5"
                                    placeholder="Start typing your message"
                                    size="lg"
                                    value={newMessage}
                                    onChange={(e) =>
                                        setNewMessage(e.target.value)
                                    }
                                    onKeyDown={(e) =>
                                        e.key === 'Enter' && handleSendMessage()
                                    }
                                />
                            </div>
                            <Button
                                icon="send"
                                onClick={handleSendMessage}
                                className="text-background"
                                size="xl"
                            >
                                Send
                            </Button>
                        </div>
                    </div>
                </div>

                <NewMessageForm
                    trigger={open}
                    setOpen={setOpen}
                    onSubmit={handleNewMessageSubmit}
                />
            </div>
        </div>
    )
}

export default Message
