import { cn } from '@/lib/utils'
const StickyPanel = ({ children, className }) => {
    return (
        <div
            className={cn(
                'sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto',
                className
            )}
        >
            {children}
        </div>
    )
}

export default StickyPanel
