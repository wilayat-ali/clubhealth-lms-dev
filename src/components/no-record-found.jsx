import Image from 'next/image'

const NoRecordFound = ({
    imageSrc = '/no-data-found.svg',
    imageWidth = 200,
    imageHeight = 200,
    heading,
    description,
}) => (
    <div className="flex flex-col items-center justify-center space-y-4">
        {/* Image */}
        <Image
            src={imageSrc}
            width={imageWidth}
            height={imageHeight}
            alt={heading}
            className="z-0"
        />

        {/* Text below image */}
        <h3 className="text-muted-foreground mt-10 w-auto bg-white text-center text-[20px] font-bold">
            {heading}
        </h3>
        <p className="text-muted-foreground mb-8 text-center text-sm font-normal">
            {description}
        </p>
    </div>
)

export default NoRecordFound
