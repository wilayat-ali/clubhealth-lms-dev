'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const InviteLearnersDialog = ({ open, onOpenChange }) => {
    const [inviteLearners, setInviteLearners] = useState([
        {
            firstName: 'Amelia',
            lastName: 'Warner',
            group: 'Beginner Learners',
            email: 'amelia.warner@example.com',
        },
        {
            firstName: 'Ahmed',
            lastName: 'Hashim',
            group: 'Advanced Practitioners',
            email: 'ahmed.hashim@example.com',
        },
    ])

    const learnerGroups = [
        'Beginner Learners',
        'Intermediate Learners',
        'Advanced Practitioners',
    ]

    const addLearner = () => {
        setInviteLearners([
            ...inviteLearners,
            { firstName: '', lastName: '', group: '', email: '' },
        ])
    }

    const removeLearner = (index) => {
        const newLearners = [...inviteLearners]
        newLearners.splice(index, 1)
        setInviteLearners(newLearners)
    }

    const updateLearner = (index, field, value) => {
        const newLearners = [...inviteLearners]
        newLearners[index][field] = value
        setInviteLearners(newLearners)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[920px]">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                        Invite Learners
                    </DialogTitle>
                    {/* Added DialogDescription to prevent warning in console */}
                    <DialogDescription />
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-4 gap-4">
                        <p className="text-sm font-medium">First name</p>
                        <p className="text-sm font-medium">Last name</p>
                        <p className="text-sm font-medium">Learner Group</p>
                        <p className="text-sm font-medium">Email address</p>

                        {inviteLearners.map((learner, index) => (
                            <div key={index} className="contents">
                                <Input
                                    value={learner.firstName}
                                    onChange={(e) =>
                                        updateLearner(
                                            index,
                                            'firstName',
                                            e.target.value
                                        )
                                    }
                                    className="w-full"
                                    placeholder="Enter First Name"
                                />

                                <Input
                                    value={learner.lastName}
                                    onChange={(e) =>
                                        updateLearner(
                                            index,
                                            'lastName',
                                            e.target.value
                                        )
                                    }
                                    className="w-full"
                                    placeholder="Enter Last Name"
                                />

                                <Select
                                    value={learner.group}
                                    onValueChange={(value) =>
                                        updateLearner(index, 'group', value)
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {learnerGroups.map((group) => (
                                            <SelectItem
                                                key={group}
                                                value={group}
                                            >
                                                {group}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <div className="flex items-center gap-2">
                                    <Input
                                        value={learner.email}
                                        onChange={(e) =>
                                            updateLearner(
                                                index,
                                                'email',
                                                e.target.value
                                            )
                                        }
                                        className="w-full"
                                        type="email"
                                        placeholder="Enter Email"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeLearner(index)}
                                        className="bg-secondary-background shrink-0"
                                        icon="minus"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={addLearner}
                        className="bg-border mt-4 gap-1"
                        icon="plus"
                    >
                        Add More
                    </Button>

                    <DialogFooter className="mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Invite</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default InviteLearnersDialog
