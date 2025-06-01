import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import FileUpload from '../upload'

const VideoForm = ({ form, onSubmit }) => {
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-6 space-y-6"
            >
                <FormField
                    control={form.control}
                    name="file"
                    render={({
                        field: { onChange },
                        fieldState: { error },
                    }) => (
                        <FormItem>
                            <FormControl>
                                <FileUpload
                                    onFileSelect={onChange}
                                    error={!!error}
                                    showPreview={false}
                                    accept={{
                                        'video/mp4': [],
                                        'image/png': [],
                                        'image/jpeg': [],
                                        'image/jpg': [],
                                        'image/gif': [],
                                    }}
                                    multiple={false}
                                    maxSize={50 * 1024 * 1024}
                                    helperText="Supported: MP4, JPG, JPEG, PNG, GIF."
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <div className="x flex justify-between text-sm">
                                <div className="text-foreground font-medium">
                                    Caption
                                </div>
                                <div className="text-secondary-foreground">
                                    Optional
                                </div>
                            </div>
                            <FormControl>
                                <Input placeholder="Enter caption" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

export default VideoForm
