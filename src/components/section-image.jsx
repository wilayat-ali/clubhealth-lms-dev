import Image from 'next/image'
import React from 'react'

const SectionImage = React.memo(({ image }) => {
    return (
        <div>
            <Image
                src={image}
                alt="Philosophy"
                width={1000}
                height={1000}
                className="mt-4"
            />
        </div>
    )
})

export default SectionImage
