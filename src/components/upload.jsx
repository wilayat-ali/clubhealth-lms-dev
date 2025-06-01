'use client'

import { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { ImageIcon, AlertCircle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const FileUpload = ({
    onFileSelect,
    className,
    error,
    helperText,
    showPreview,
    accept,
    multiple,
    maxSize,
    fallbackImage,
    helperTextClassName,
    helperTextIcon = true,
}) => {
    const [files, setFiles] = useState([])
    const [previews, setPreviews] = useState([])
    const [fileError, setFileError] = useState(null)

    useEffect(() => {
        return () => {
            previews.forEach((url) => URL.revokeObjectURL(url))
        }
    }, [previews])

    const onDrop = useCallback(
        (acceptedFiles, fileRejections) => {
            if (fileRejections.length > 0) {
                const reason = fileRejections[0].errors[0]?.message
                setFiles([])
                setPreviews([])
                setFileError(reason || 'Invalid file')
                return
            }

            if (!acceptedFiles.length) return

            setFiles(acceptedFiles)
            setPreviews(
                acceptedFiles
                    .filter((file) => file.type.startsWith('image/'))
                    .map((file) => URL.createObjectURL(file))
            )
            setFileError(null)

            onFileSelect?.(multiple ? acceptedFiles : acceptedFiles[0])
        },
        [onFileSelect, multiple]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        multiple,
        maxSize,
    })

    return (
        <div className="space-y-1">
            <div className="flex gap-2">
                {/* Dropzone */}
                <div
                    {...getRootProps()}
                    className={cn(
                        'active:border-primary border-border relative flex h-9 w-full cursor-pointer items-center rounded-[6px] border shadow-xs transition-all',
                        isDragActive ? 'border-primary' : '',
                        showPreview ? 'max-w-[calc(100%-40px)]' : '',
                        fileError || error
                            ? 'border-primary'
                            : 'border-border border',
                        className
                    )}
                >
                    <input {...getInputProps()} />
                    <button
                        type="button"
                        className="h-10 cursor-pointer py-2 pl-3 text-sm"
                    >
                        Choose file
                    </button>
                    <span className="text-secondary-foreground flex-1 truncate px-3 text-sm">
                        {files.length > 0
                            ? files.map((f) => f.name).join(', ')
                            : 'No file chosen'}
                    </span>
                </div>

                {/* Preview Section */}
                {showPreview && (
                    <div
                        className={cn(
                            'bg-muted relative flex shrink-0 items-center justify-center overflow-hidden rounded-[6px]',
                            fallbackImage ? 'h-[35px] w-[104px]' : 'size-9' // 👈 wider if signature
                        )}
                    >
                        {previews.length > 0 ? (
                            <Image
                                src={previews[0]}
                                alt="Preview"
                                fill
                                className="rounded-md object-cover"
                            />
                        ) : fallbackImage ? (
                            <Image
                                src={fallbackImage}
                                alt="Default Avatar"
                                fill
                                className="bg-background object-cover"
                            />
                        ) : (
                            <ImageIcon size={22} />
                        )}
                    </div>
                )}
            </div>

            {/* Helper Text */}
            {helperText && (
                <p className="text-muted-foreground mt-2 flex items-center gap-1.5 text-xs">
                    <Info size={16} />
                    {helperText}
                </p>
            )}

            {/* Error Message */}
            {fileError && (
                <p className="flex items-center gap-1 text-xs">
                    <AlertCircle size={14} /> {fileError}
                </p>
            )}
        </div>
    )
}

export default FileUpload
