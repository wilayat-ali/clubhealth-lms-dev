import Image from 'next/image'

const AchievementItem = ({
    title,
    date,
    description,
    image,
    openCompletionistDialog,
}) => {
    return (
        <div
            onClick={openCompletionistDialog}
            className="bg-secondary-background hover:bg-muted flex w-full cursor-pointer items-center gap-4 rounded-lg p-4 transition"
        >
            <div className="relative h-[94px] w-[98px] flex-shrink-0 max-[1600px]:h-[80px]">
                <Image
                    src={image}
                    alt={title}
                    width={98}
                    height={94}
                    className="h-full w-full object-contain"
                />
            </div>
            <div className="flex flex-1 flex-col overflow-hidden">
                <div className="flex items-start justify-between max-[1600px]:items-baseline max-[1600px]:items-center">
                    <p className="text-lg font-semibold">{title}</p>
                    <span className="text-secondary-foreground text-xs whitespace-nowrap">
                        {date}
                    </span>
                </div>
                <p className="text-secondary-foreground mt-1 text-sm">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default AchievementItem
