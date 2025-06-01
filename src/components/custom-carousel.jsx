'use client'

import Image from 'next/image'
import Fade from 'embla-carousel-fade'

import Autoplay from 'embla-carousel-autoplay'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel'
import CarouselData from '@/data/carousel-data.json'

const CustomCarousel = () => {
    return (
        <Carousel
            plugins={[
                Fade(),
                Autoplay({ delay: 5000, stopOnInteraction: true }),
            ]}
            opts={{
                align: 'start',
                loop: true,
            }}
            className="w-full"
        >
            <CarouselContent>
                {CarouselData.map((src, index) => (
                    <CarouselItem key={index} className="ml-auto w-full">
                        <div className="h-screen w-full">
                            <Image
                                src={src.image}
                                alt="Banner"
                                fill
                                className="bg-border"
                            />

                            <div className="absolute right-10 bottom-10">
                                <Image
                                    src="/club-health-icon.svg"
                                    width={42}
                                    height={64}
                                    alt=""
                                />
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}
CustomCarousel.displayName = 'CustomCarousel'

export default CustomCarousel
