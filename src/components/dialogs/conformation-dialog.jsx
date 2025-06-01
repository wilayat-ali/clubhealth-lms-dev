import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const ConfirmationDialog = ({
    open,
    onOpenChange,
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    user = '',
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-sm p-6">
                <DialogHeader>
                    <DialogTitle className="text-foreground text-lg font-semibold">
                        {title}
                    </DialogTitle>
                    <DialogDescription className="text-foreground mt-2 text-sm">
                        {message}
                        {user && (
                            <span className="text-foreground font-semibold">
                                {' '}
                                "{user}"?
                            </span>
                        )}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="mt-6 flex justify-end gap-2">
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="text-sm"
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        size="lg"
                        className="bg-brand-red text-sm"
                        onClick={() => onOpenChange(false)}
                    >
                        {confirmLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmationDialog
