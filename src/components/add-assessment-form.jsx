'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { addAssessmentSchema } from '@/validations/add-assessment-schema'

const AddAssessmentForm = () => {
    const form = useForm({
        resolver: zodResolver(addAssessmentSchema),
        defaultValues: {
            title: 'Treatment Modalities & Basic Principles',
            subtitle: 'Final Assessment',
            shortDescription:
                'Test your understanding of the core principles and techniques covered in this module. This assessment consists of multiple-choice and single-choice questions designed to evaluate your knowledge.',
            passingScore: '85',
            shuffleQuestion: false,
            questionLimit: '10',
        },
    })

    const onSubmit = (values) => {
        // eslint-disable-next-line no-console
        console.log(values)
        // Handle form submission
    }

    const onSaveDraft = () => {
        const values = form.getValues()
        // eslint-disable-next-line no-console
        console.log('Saving draft:', values)
        // Handle saving draft
    }

    return (
        <div className="mx-auto w-full max-w-md rounded-md px-6 py-10">
            <h1 className="mb-4 text-xl font-medium">Add Assessment</h1>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <Label className="text-foreground text-sm font-medium">
                                    Title
                                </Label>
                                <FormControl>
                                    <Input
                                        placeholder="e.g., Treatment Modalities & Basic Principles"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="subtitle"
                        render={({ field }) => (
                            <FormItem>
                                <Label className="text-foreground text-sm font-medium">
                                    Subtitle
                                </Label>
                                <FormControl>
                                    <Input
                                        placeholder="e.g., Final Assessment"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="shortDescription"
                        render={({ field }) => (
                            <FormItem>
                                <Label className="text-foreground text-sm font-medium">
                                    Short description
                                </Label>
                                <FormControl>
                                    <Textarea
                                        placeholder="Describe what this assessment covers"
                                        className="min-h-[100px] resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="passingScore"
                        render={({ field }) => (
                            <FormItem>
                                <Label className="text-foreground text-sm font-medium">
                                    Passing Score (%)
                                </Label>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min="0"
                                        max="100"
                                        placeholder="e.g., 85"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="shuffleQuestion"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center space-x-2">
                                    <FormControl>
                                        <Switch
                                            id="shuffle-question"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            aria-readonly
                                        />
                                    </FormControl>
                                    <Label className="text-foreground text-sm font-medium">
                                        Shuffle the Questions
                                    </Label>
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="questionLimit"
                        render={({ field }) => (
                            <FormItem>
                                <Label className="text-foreground text-sm font-medium">
                                    Set a Limit on the Number of Questions for
                                    Learner
                                </Label>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min="1"
                                        placeholder="e.g., 10"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex gap-2 pt-2">
                        <Button
                            type="submit"
                            className="flex-1"
                            icon="check-check"
                        >
                            Publish
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            icon="save"
                            onClick={onSaveDraft}
                        >
                            Save Draft
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default AddAssessmentForm
