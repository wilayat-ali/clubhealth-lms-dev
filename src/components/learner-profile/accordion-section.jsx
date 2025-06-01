import {
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'

const AccordionSection = ({ title, count, value, children }) => {
    return (
        <AccordionItem value={value} className="border-b">
            <AccordionTrigger className="cursor-pointer py-4 hover:no-underline">
                <div className="flex w-full items-center gap-2">
                    <span className="text-foreground text-lg font-medium">
                        {title}
                    </span>
                    <Badge className="rounded-full px-2.5">{count}</Badge>
                </div>
            </AccordionTrigger>
            <AccordionContent className="pt-0">{children}</AccordionContent>
        </AccordionItem>
    )
}

export default AccordionSection
