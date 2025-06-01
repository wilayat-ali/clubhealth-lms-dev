const PageHeader = ({ title, description, fontClass }) => {
    return (
        <div className="col-span-2 space-y-2">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="text-secondary-foreground text-sm">{description}</p>
        </div>
    )
}

export default PageHeader
