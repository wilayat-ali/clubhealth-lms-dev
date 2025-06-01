'use client'

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import {
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
    arrayMove,
} from '@dnd-kit/sortable'
import {
    restrictToVerticalAxis,
    restrictToWindowEdges,
} from '@dnd-kit/modifiers'
import { CSS } from '@dnd-kit/utilities'

export const SortableItem = ({ item, render }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: item.id,
        disabled: item.locked,
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div ref={setNodeRef} style={style}>
            {render({ item, attributes, listeners })}
        </div>
    )
}

const SortableList = ({ items, onChange, renderItem }) => {
    const sensors = useSensors(useSensor(PointerSensor))

    const handleDragEnd = ({ active, over }) => {
        if (!over || active.id === over.id) return

        // Find the dragged item
        const activeItem = items.find((item) => item.id === active.id)

        // If the dragged item is locked, don't allow movement
        if (activeItem.locked) return

        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        // Create a new array with the updated order
        const updated = arrayMove([...items], oldIndex, newIndex)

        onChange(updated)
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
        >
            <SortableContext
                items={items.map((i) => i.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-4">
                    {items.map((item) => (
                        <SortableItem
                            key={item.id}
                            item={item}
                            render={renderItem}
                        />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    )
}

export default SortableList
