'use client'

import { useState } from 'react'
import { GripVertical, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DragableList from '@/components/dragable/index'

const StepManager = ({
    data,
    onEditClick = () => {},
    onDeleteClick = () => {},
}) => {
    const [steps, setSteps] = useState(data)

    return (
        <DragableList
            items={steps}
            onChange={setSteps}
            renderItem={({ item, attributes, listeners, index }) => (
                <div className="border-border bg-background items-center rounded-lg px-4 py-[10px]">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <span className="flex size-10 items-center justify-center">
                                {item.locked ? (
                                    <Lock className="text-muted-foreground size-5" />
                                ) : (
                                    <GripVertical
                                        className="text-muted-foreground size-5 cursor-grab ring-0 outline-0"
                                        {...attributes}
                                        {...listeners}
                                    />
                                )}
                            </span>
                            <div className="space-y-1">
                                <div className="text-foreground truncate text-sm font-medium">
                                    {item.question}
                                </div>
                                <div className="text-secondary-foreground text-xs capitalize">
                                    {item.type}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                icon="square-pen"
                                iconStyle="!size-6 text-muted-foreground"
                                className="size-10"
                                onClick={() => onEditClick(item, index)}
                            />
                            <Button
                                variant="ghost"
                                icon="trash-2"
                                iconStyle="!size-6 text-muted-foreground"
                                className="size-10"
                                onClick={() => onDeleteClick(item, index)}
                            />
                        </div>
                    </div>
                </div>
            )}
        />
    )
}

export default StepManager
