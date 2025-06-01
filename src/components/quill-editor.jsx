'use client'

import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

export default function Editor({ value, onChange, placeholder, id, error }) {
    const [mounted, setMounted] = useState(false)
    const editorId = id || `editor-${Math.random().toString(36).substr(2, 9)}`
    const containerRef = useRef(null)

    // Create a unique modules configuration for each editor instance
    const modules = {
        toolbar: {
            container: `#toolbar-${editorId}`,
        },
    }

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div
            className={`relative rounded border ${error ? 'border-destructive' : 'border-border'}`}
            ref={containerRef}
        >
            {/* Custom toolbar with unique ID */}
            <div id={`toolbar-${editorId}`} className="ql-toolbar ql-snow">
                <span className="ql-formats">
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                </span>
                <span className="ql-formats">
                    <button className="ql-list" value="bullet" />
                    <button className="ql-list" value="ordered" />
                </span>
                <span className="ql-formats">
                    <button className="ql-align" value="" />
                    <button className="ql-align" value="center" />
                    <button className="ql-align" value="right" />
                </span>
                <span className="ql-formats">
                    <button className="ql-link" />
                </span>
            </div>

            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                placeholder={placeholder}
                id={editorId}
            />
        </div>
    )
}
