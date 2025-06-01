import { DynamicIcon } from 'lucide-react/dynamic'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

const CustomAccordion = (
    ({ openAccordion, setOpenAccordion, learningSidebarData }) => {
        return (
            <Accordion
                type="single"
                collapsible
                className="w-full"
                value={openAccordion}
                onValueChange={(val) => {
                    if (val === 1 || val === null) setOpenAccordion(val)
                }}
            >
                {learningSidebarData.map((item, index) => {
                    const currentValue = index + 1
                    const isOpen = openAccordion === currentValue
                    const isDisabled = currentValue !== 1

                    return (
                        <AccordionItem key={index} value={currentValue}>
                            <AccordionTrigger
                                className={cn(
                                    'cursor-pointer pe-3 [&>svg]:hidden',
                                    isDisabled && 'pointer-events-none'
                                )}
                            >
                                <div className="grid w-full grid-cols-12 items-center gap-x-2 text-left">
                                    <div className="col-span-1">
                                        <DynamicIcon
                                            name={item?.icon}
                                            className={cn(
                                                'size-5',
                                                isOpen
                                                    ? 'text-foreground'
                                                    : 'text-secondary-foreground'
                                            )}
                                        />
                                    </div>
                                    <span
                                        className={cn(
                                            'col-span-10 text-sm font-semibold',
                                            isOpen
                                                ? 'text-foreground'
                                                : 'text-secondary-foreground'
                                        )}
                                    >
                                        {item.name}
                                    </span>
                                    <span className="col-span-1">
                                        {isOpen ? (
                                            <DynamicIcon
                                                name={item?.chevDownIcon}
                                                className="text-muted-foreground h-4 w-4"
                                            />
                                        ) : (
                                            <DynamicIcon
                                                name={item?.lockIcon}
                                                className="text-muted-foreground h-4 w-4"
                                            />
                                        )}
                                    </span>
                                </div>
                            </AccordionTrigger>
                            {item?.options?.map((optionItem, optionIndex) => (
                                <AccordionContent
                                    key={optionIndex}
                                    className="group text-foreground hover:bg-border flex cursor-pointer items-center rounded-md py-2 pe-3 pl-7"
                                >
                                    <div className="flex w-full items-center justify-between gap-x-1 text-sm">
                                        <div className="max-w-[260px] truncate">
                                            {optionItem}
                                        </div>
                                        <div>
                                            <DynamicIcon
                                                name={item?.circleDashedIcon}
                                                className="text-muted-foreground hidden h-4 w-4 group-hover:block"
                                            />
                                        </div>
                                    </div>
                                </AccordionContent>
                            ))}
                        </AccordionItem>
                    )
                })}
            </Accordion>
        )
    }
)

export default CustomAccordion
