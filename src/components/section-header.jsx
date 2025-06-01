import React from 'react'

const SectionHeader = React.memo(({ video }) => {
    const nocookieVideo = video?.replace('youtube.com', 'youtube-nocookie.com')
    return (
        <iframe
            src={nocookieVideo}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-[500px] w-full"
        />
    )
})

export default SectionHeader
