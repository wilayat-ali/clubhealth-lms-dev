import { Button } from '@/components/ui/button'
import { useFieldArray } from 'react-hook-form'
import {
    FormField,
    FormItem,
    FormControl,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const AssessmentOptionForm = ({ form }) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'options',
    })

    return (
        <div className="mx-auto my-4 w-full max-w-2xl space-y-2">
            <div className="grid grid-cols-[1fr_auto_auto] items-center space-y-1">
                <p className="text-sm font-medium">Option</p>
                <p className="pr-18 text-sm font-medium">Is Correct</p>
            </div>

            {fields.map((field, index) => (
                <FormField
                    key={field.id}
                    control={form.control}
                    name={`options.${index}.text`}
                    render={({ field: controlledField }) => (
                        <FormItem className="mt-2 grid grid-cols-[1fr_auto_auto] items-center">
                            <FormControl>
                                <Input
                                    placeholder="Enter option"
                                    {...controlledField}
                                    className="w-full"
                                />
                            </FormControl>
                            <div className="flex items-center space-x-4">
                                <RadioGroup
                                    onValueChange={(value) => {
                                        form.setValue(
                                            `options.${index}.isCorrect`,
                                            value === 'yes'
                                        )
                                    }}
                                    defaultValue={
                                        form.getValues(
                                            `options.${index}.isCorrect`
                                        )
                                            ? 'yes'
                                            : 'no'
                                    }
                                    className="flex items-center space-x-4"
                                >
                                    <div className="flex gap-2">
                                        <div className="flex items-center space-x-1">
                                            <RadioGroupItem
                                                value="yes"
                                                id={`yes-${field.id}`}
                                            />
                                            <label
                                                htmlFor={`yes-${field.id}`}
                                                className="text-sm"
                                            >
                                                Yes
                                            </label>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <RadioGroupItem
                                                value="no"
                                                id={`no-${field.id}`}
                                            />
                                            <label
                                                htmlFor={`no-${field.id}`}
                                                className="text-sm"
                                            >
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </div>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                icon="trash-2"
                                onClick={() => remove(index)}
                                disabled={fields.length <= 2}
                                className="bg-border size-9 rounded-md"
                            />

                            <FormMessage />
                        </FormItem>
                    )}
                />
            ))}

            <Button
                type="button"
                variant="ghost"
                icon="plus"
                onClick={() => append({ text: '', isCorrect: false })}
                className="bg-border"
            >
                Add More
            </Button>
        </div>
    )
}

export default AssessmentOptionForm
