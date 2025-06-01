'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogFooter,
} from '@/components/ui/dialog'
import AchievementItem from '@/components/dashboard/achievement-item'
import { achievements } from '@/data/dashboard-data'

const ViewAchievementDialogue = ({ open, onOpenChange }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="sm:max-w-[512px]"
                aria-describedby={undefined}
            >
                <DialogHeader className="flex flex-row items-center justify-between">
                    <div className="flex flex-col">
                        <DialogTitle className="text-foreground truncate text-lg font-semibold">
                            Achievements
                        </DialogTitle>
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
                        <div className="mt-4 flex items-center justify-end gap-x-2">
                            <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
export default ViewAchievementDialogue
