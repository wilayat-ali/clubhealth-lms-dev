'use client'

import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const AssessmentQuestionForm = ({ form, options, updateFormOptions }) => {
    return (
        <div className="space-y-4">
            <FormField
                control={form.control}
                name="questionType"
                render={({ field }) => (
                    <FormItem className="space-y-1">
                        <FormLabel className="text-foreground mt-6 text-sm font-medium">
                            Question Type
                        </FormLabel>
                        <FormControl>
                            <RadioGroup
                                className="flex gap-4"
                                onValueChange={(value) => {
                                    field.onChange(value)
                                    if (value === 'single') {
                                        const resetOptions = options.map(
                                            (opt) => ({
                                                ...opt,
                                                isCorrect: false,
                                            })
                                        )
                                        updateFormOptions(resetOptions)
                                    }
                                }}
                                value={field.value}
                            >
                                <FormItem className="flex items-center space-x-2">
                                    <FormControl>
                                        <RadioGroupItem
                                            value="single"
                                            className="m-0"
                                        />
                                    </FormControl>
                                    <FormLabel className="text-foreground text-sm font-medium">
                                        Single Choice
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2">
                                    <FormControl>
                                        <RadioGroupItem
                                            value="multi"
                                            className="m-0"
                                        />
                                    </FormControl>
                                    <FormLabel className="text-foreground text-sm font-medium">
                                        Multi Choice
                                    </FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                    <FormItem className="space-y-1">
                        <Label>Question</Label>
                        <FormControl>
                            <Textarea
                                className="h-[104px]"
                                placeholder="Enter your question"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

export default AssessmentQuestionForm
