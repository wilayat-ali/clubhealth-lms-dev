const ContentWrapper = ({ children, size = 'default', className = '' }) => {
    const sizeClasses = {
        sm: 'p-4',
        default: 'p-10',
        md: 'p-6',
        lg: 'p-16',
        xl: 'px-8 py-10',
    }

    return (
        <div className={`w-full ${sizeClasses[size]} ${className}`}>
            {children}
        </div>
    )
}

export default ContentWrapper
