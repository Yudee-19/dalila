"use client";
import Image from "next/image";
import { Marcellus } from "next/font/google";

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
});
export default function CertifiedBy() {
  const certifications = [
    {
      name: "IGI",
      image: "/dalila_img/client/client_1.png",
      size: { width: 180, height: 100, mobileWidth: 90, mobileHeight: 50 },
    },
    {
      name: "GIA",
      image: "/dalila_img/client/client_2.png",
      size: { width: 150, height: 85, mobileWidth: 75, mobileHeight: 42 },
    },
    {
      name: "HRD",
      image: "/dalila_img/client/client_3.png",
      size: { width: 260, height: 140, mobileWidth: 130, mobileHeight: 70 },
    },
  ];

  const slideStyle = {
    animation: "slide 15s linear infinite",
  };

  return (
    <div className="bg-white py-10 sm:py-16">
      <div className="container mx-auto px-2 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2
            className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-medium text-slate-900 mb-2 ${marcellus.className}`}
          >
            Certified By
          </h2>
        </div>

        {/* Sliding Logos Container */}
        <div className="relative overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

          {/* Sliding Track */}
          <div
            className="flex hover:[animation-play-state:paused]"
            style={slideStyle}
          >
            {/* First set of logos */}
            {certifications.map((cert, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-4 sm:mx-12 md:mx-16"
              >
                <div className="w-[90px] h-[50px] xs:w-[110px] xs:h-[60px] sm:w-[180px] sm:h-[100px] flex items-center justify-center">
                  <Image
                    src={cert.image}
                    alt={`${cert.name} certification`}
                    width={cert.size.mobileWidth}
                    height={cert.size.mobileHeight}
                    className="object-contain transition-all duration-300"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                    }}
                  />
                </div>
              </div>
            ))}

            {/* Duplicate set for seamless loop */}
            {certifications.map((cert, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-4 sm:mx-12 md:mx-16"
              >
                <div className="w-[90px] h-[50px] xs:w-[110px] xs:h-[60px] sm:w-[180px] sm:h-[100px] flex items-center justify-center">
                  <Image
                    src={cert.image}
                    alt={`${cert.name} certification`}
                    width={cert.size.mobileWidth}
                    height={cert.size.mobileHeight}
                    className="object-contain transition-all duration-300"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                    }}
                  />
                </div>
              </div>
            ))}

            {/* Third set for extra smooth loop */}
            {certifications.map((cert, index) => (
              <div
                key={`third-${index}`}
                className="flex-shrink-0 mx-4 sm:mx-12 md:mx-16"
              >
                <div className="w-[90px] h-[50px] xs:w-[110px] xs:h-[60px] sm:w-[180px] sm:h-[100px] flex items-center justify-center">
                  <Image
                    src={cert.image}
                    alt={`${cert.name} certification`}
                    width={cert.size.mobileWidth}
                    height={cert.size.mobileHeight}
                    className="object-contain transition-all duration-300"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </div>
  );
}
