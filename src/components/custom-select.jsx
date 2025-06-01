import clsx from 'clsx'
import { DynamicIcon } from 'lucide-react/dynamic'
import {
    SelectTrigger,
    Select,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select'

const sizeClasses = {
    default: 'min-h-[36px] text-sm rounded-[6px] px-3 py-1',
    md: 'min-h-[40px] text-sm px-3 rounded-[6px] py-[10px]',
    lg: 'min-h-[48px] text-base px-4 py-2.5 rounded-md',
    sm: 'min-h-[32px] text-[13px] rounded-[6px] px-3 py-1',
}

const CustomSelect = ({
    value,
    onChange,
    options,
    placeholder = 'Select',
    size = 'default',
    prefixText = '',
    className,
    'aria-invalid': ariaInvalid,
    iconName,
    iconSize = 16,
    iconStyle = '',
}) => {
    return (
        <Select defaultValue={value} onValueChange={onChange}>
            <SelectTrigger
                aria-invalid={ariaInvalid}
                className={clsx(
                    sizeClasses[size],
                    className,
                    'flex cursor-pointer items-center justify-start gap-2',
                    'aria-invalid:ring-destructive/20 aria-invalid:border-destructive'
                )}
            >
                {iconName && (
                    <DynamicIcon
                        name={iconName}
                        className={clsx('text-muted-foreground', iconStyle)}
                        size={iconSize}
                    />
                )}
                {prefixText && (
                    <span className="text-secondary-foreground font-normal">
                        {prefixText}
                    </span>
                )}
                <SelectValue
                    className="!text-foreground text-left"
                    placeholder={placeholder}
                />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem
                        key={option.value}
                        value={option.value}
                        className="hover:bg-border px-4 py-2"
                    >
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default CustomSelect
