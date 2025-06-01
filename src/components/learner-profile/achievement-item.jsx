import Image from 'next/image'

const AchievementItem = ({ achievement }) => {
    return (
        <div className="bg-muted mb-4 w-[209px] rounded-lg border-b p-4 last:border-b-0">
            <div className="flex flex-col items-center">
                <Image
                    src="/images/quiz-master.png"
                    alt={achievement.title}
                    width={98}
                    height={94}
                    className="object-contain"
                />
                <h4 className="text-foreground mt-4 truncate text-center text-sm font-semibold">
                    {achievement.title}
                </h4>
                <p className="text-foreground mt-1 text-center text-sm">
                    {achievement.date}
                </p>
            </div>
        </div>
    )
}

export default AchievementItem
