'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '../ui/label'

const LearnerGroupsSection = ({
    groups,
    updateGroup,
    removeGroup,
    addGroup,
}) => {
    return (
        <section className="bg-background mb-7 w-full rounded-lg p-10 shadow-sm xl:max-w-xl 2xl:max-w-2xl">
            <div className="text-foreground mb-4 text-lg font-semibold">
                Learner Groups
            </div>
            <div className="mt-7 space-y-3">
                <Label className="font-medium">Group Title </Label>
                {groups.map((group, index) => (
                    <div
                        key={index}
                        className="mt-4 flex flex-col items-start gap-2 sm:grid sm:grid-cols-12 sm:items-center sm:gap-4"
                    >
                        <div className="w-full sm:col-span-11">
                            <Input
                                value={group}
                                onChange={(e) =>
                                    updateGroup(index, e.target.value)
                                }
                                placeholder="Group Title"
                                className="w-full"
                            />
                        </div>
                        <Button
                            variant={index > 2 ? 'outline' : 'ghost'}
                            size="icon"
                            icon="trash-2"
                            iconStyle="!size-5"
                            disabled={index < 3}
                            onClick={() => removeGroup(index)}
                            className={`${index < 3 ? 'bg-border' : ''}`}
                        />
                    </div>
                ))}
            </div>

            <Button
                variant="ghost"
                onClick={addGroup}
                icon="plus"
                className="bg-border mt-3"
            >
                Add More
            </Button>
        </section>
    )
}

export default LearnerGroupsSection
