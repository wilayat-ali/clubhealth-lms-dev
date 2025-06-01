import Image from 'next/image'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CertificationCard({
    title = '--',
    description = '--',
    onClick = () => {},
}) {
    return (
        <div className="bg-card border-border space-y-4 rounded-lg border p-4">
            <div className="space-y-1">
                <div className="text-foreground truncate text-lg font-semibold">
                    {title}
                </div>
                <span className="text-foreground line-clamp-2 text-sm">
                    {description}
                </span>
            </div>
            <div className="relative aspect-[437/310] w-full overflow-hidden rounded-lg">
                <Image
                    src="/images/certificate.png"
                    alt={title}
                    fill
                    className="rounded-lg object-cover"
                    sizes="(max-width: 469px) 100vw, 469px"
                    priority
                />
            </div>

            <Button onClick={onClick}>
                <Download className="size-5" />
                Download
            </Button>
        </div>
    )
}
