import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormMessage,
} from '@/components/ui/form'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import CustomSelect from '@/components/custom-select'

import messsageOptions from '@/data/message-options.json'
import courseOptions from '@/data/course-options.json'
import { messageSchema } from '@/validations/message-schema'

const NewMessageForm = ({ onSubmit, trigger, setOpen }) => {
    const form = useForm({
        resolver: zodResolver(messageSchema),
        defaultValues: {
            messageType: '',
            course: '',
            subject: '',
            message: '',
        },
    })

    const handleSubmit = (data) => {
        onSubmit({
            messageType: data.messageType,
            course: data.course,
            subject: data.subject,
            message: data.message,
        })
        form.reset()
        setOpen(false)
    }
    return (
        <Dialog open={trigger} onOpenChange={() => setOpen(false)}>
            <DialogContent
                className="sm:max-w-[512px]"
                aria-describedby={undefined}
            >
                <DialogHeader className="">
                    <div className="text-foreground mb-2 text-lg font-semibold">
                        New Message
                    </div>
                    <DialogTitle />
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)}>
                            <div className="mb-4 grid grid-cols-2 gap-x-4">
                                <div className="col-span-1">
                                    <FormField
                                        control={form.control}
                                        name="messageType"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <Label className="text-foreground text-sm font-medium">
                                                    Message Type
                                                </Label>
                                                <FormControl>
                                                    <CustomSelect
                                                        className="bg-background w-full"
                                                        value={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        options={
                                                            messsageOptions
                                                        }
                                                        placeholder="General question"
                                                        size="sm"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="col-span-1">
                                    <FormField
                                        control={form.control}
                                        name="course"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <div className="x flex justify-between text-sm">
                                                    <div className="text-foreground font-medium">
                                                        Course
                                                    </div>
                                                </div>
                                                <FormControl>
                                                    <CustomSelect
                                                        className="bg-background w-full"
                                                        value={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        options={courseOptions}
                                                        placeholder="Select an option"
                                                        size="sm"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="subject"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label className="text-foreground text-sm font-medium">
                                            Subject
                                        </Label>
                                        <FormControl>
                                            <Input
                                                className="bg-background"
                                                placeholder="Write a subject"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label className="text-foreground mt-4 block text-sm font-medium">
                                            Message
                                        </Label>
                                        <FormControl>
                                            <Textarea
                                                className="bg-background min-h-24 resize-none"
                                                placeholder="Start typing your first message"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="mt-4 flex items-center justify-end gap-x-2">
                                <DialogFooter className="sm:justify-start">
                                    <DialogClose asChild>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="md"
                                        >
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>

                                <Button
                                    icon="send"
                                    size="lg"
                                    type="submit"
                                    className="px-4 font-medium"
                                >
                                    Send
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
export default NewMessageForm
