'use client'

import Image from 'next/image'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const CompletionistDialog = ({ open, onClose, image }) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="p-6 sm:max-w-[320px]">
                <div className="">
                    <DialogHeader className="flex flex-row items-center justify-center">
                        <DialogTitle className="text-foreground text-lg font-semibold">
                            Completionist
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="text-foreground mt-2 text-center text-sm">
                        This badge is presented for successfully finishing an
                        entire module. Your commitment to seeing things through
                        is truly commendable, Amelia!
                    </DialogDescription>
                    <div className="mt-6 flex justify-center">
                        <Image
                            src={image || '/images/completionist.png'}
                            alt="Completionist Badge"
                            width={200}
                            height={186}
                            className="object-contain"
                        />
                    </div>
                    <div className="mt-6">
                        <p className="text-secondary-foreground text-center text-sm">
                            Presented on the April 8, 2025
                        </p>
                    </div>
                    <div className="mt-6 flex flex-col gap-3 pt-2 sm:flex-row">
                        <Button
                            onClick={onClose}
                            className="w-full"
                            variant="outline"
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CompletionistDialog
