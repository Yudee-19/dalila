"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const router = useRouter();

    const slides = [
        {
            image: "/dalila_img/banners/Banner-01.jpg",
            title: "Timeless Elegance",
            buttonPosition: "bottom-left",
            buttonLink: "/inventory",
        },
        {
            image: "/dalila_img/banners/Banner-02.jpg",
            title: "Modern Luxury",
            buttonPosition: "bottom-left",
            buttonLink: "/diamond-source",
        },
        {
            image: "/dalila_img/banners/new/Banner_03.jpg",
            title: "Exclusive Collection",
            buttonPosition: "center",
            buttonLink: "/sud",
        },
    ];

    const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 8000);

        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setIsTransitioning(true);
        setCurrentSlide((prev) => prev + 1);
    };

    const prevSlide = () => {
        setIsTransitioning(true);
        setCurrentSlide((prev) => prev - 1);
    };

    // Handle infinite loop reset
    useEffect(() => {
        if (currentSlide === slides.length + 1) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentSlide(1);
            }, 1000);
        } else if (currentSlide === 0) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentSlide(slides.length);
            }, 1000);
        }
    }, [currentSlide, slides.length]);

    const goToSlide = (index: number) => {
        setIsTransitioning(true);
        setCurrentSlide(index + 1);
    };

    const getActiveIndex = () => {
        if (currentSlide === 0) return slides.length - 1;
        if (currentSlide === slides.length + 1) return 0;
        return currentSlide - 1;
    };

    const handleExploreClick = (link: string) => {
        router.push(link);
    };

    const getButtonPositionClasses = (position: string, slideIndex: number) => {
        // Mobile-first responsive positions
        if (position === "center") {
            return "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-full";
        }
        if (slideIndex === 0) {
            return "absolute bottom-8 left-4 sm:bottom-16 sm:left-10 md:bottom-24 md:left-32";
        }
        if (slideIndex === 1) {
            return "absolute bottom-8 left-8 sm:bottom-16 sm:left-16 md:bottom-24 md:left-42";
        }
        return "absolute bottom-8 left-4 sm:bottom-16 sm:left-10 md:bottom-24 md:left-32";
    };

    return (
        <section className="relative w-full h-[320px] sm:h-[420px] md:h-[calc(90vh+8rem)] flex items-center overflow-x-hidden bg-white">
            {/* Background Carousel */}
            <div className="absolute inset-0 w-full h-full">
                <div
                    className={`flex h-full w-full ${isTransitioning ? "transition-transform duration-1000 ease-out" : ""}`}
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {extendedSlides.map((slide, index) => {
                        const actualIndex =
                            (index - 1 + slides.length) % slides.length;
                        const actualSlide = slides[actualIndex];

                        return (
                            <div
                                key={index}
                                className="relative min-w-full w-full h-[320px] sm:h-[420px] md:h-full flex-shrink-0"
                            >
                                <Image
                                    src={slide.image}
                                    alt={`Dalila Diamonds Banner ${actualIndex + 1}`}
                                    fill
                                    priority={index === 1}
                                    quality={85}
                                    sizes="100vw"
                                    className="object-cover"
                                />

                                <div className="absolute inset-0 bg-black/10 w-full h-full" />

                                {index > 0 && index <= slides.length && (
                                    <div
                                        className={getButtonPositionClasses(
                                            actualSlide.buttonPosition,
                                            actualIndex
                                        )}
                                    >
                                        <button
                                            onClick={() =>
                                                handleExploreClick(
                                                    actualSlide.buttonLink
                                                )
                                            }
                                            className="group z-20 px-3 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 bg-[#c89e3a] text-white font-semibold text-xs sm:text-sm md:text-base rounded transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer relative overflow-hidden"
                                            style={{ minWidth: 110 }}
                                        >
                                            <span className="relative z-10">
                                                Explore More
                                            </span>
                                            <span className="absolute inset-0 bg-[#b08932] transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-out origin-center"></span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute left-2 sm:left-4 md:-left-1 top-1/2 -translate-y-1/2 z-30 text-slate-900 rounded-full p-1 sm:p-2 transition-all hover:scale-110"
            >
                <ChevronLeft
                    strokeWidth={1}
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-14 md:h-11 text-[#c89e3a]"
                />
            </button>

            <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-2 sm:right-4 md:-right-1 top-1/2 -translate-y-1/2 z-30 text-slate-900 rounded-full p-1 sm:p-2 transition-all hover:scale-110"
            >
                <ChevronRight
                    strokeWidth={1}
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-14 md:h-11 text-[#c89e3a]"
                />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`w-2 h-2 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                            getActiveIndex() === index
                                ? "bg-amber-500 w-6 sm:w-8"
                                : "bg-white/60 hover:bg-white/80"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}
