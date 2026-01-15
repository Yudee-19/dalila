"use client";
import Image from "next/image";
import Link from "next/link";
import { Marcellus, Jost } from "next/font/google";
import AnimatedContainer from "@/components/shared/AnimatedContainer";
const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export default function ContactBanner() {
  return (
    <section className="relative h-[36vh] xs:h-[44vh] sm:h-[60vh] md:h-[55vh] lg:h-[50vh] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/banner-dalila-contact.png"
          alt="About Us Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/80 to-slate-900" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 relative z-10 text-center py-8 sm:py-14">
        <AnimatedContainer direction="right">
          <div className="opacity-100">
            <h1
              className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide text-white mb-3 mt-8 sm:mt-30 whitespace-nowrap sm:whitespace-normal ${marcellus.className}`}
              style={{ lineHeight: 1.15 }}
            >
              CONTACT US
            </h1>
            <div className="w-2/3 sm:w-[35%] h-px bg-amber-400 mx-auto mb-6" />
            <p className="text-[#8E939C] text-xs xs:text-sm sm:text-base">
              Have a question or need assistance with your booking? Our
              dedicated team is<br /> available around the clock to provide
              you with prompt and friendly service.
            </p>
          </div>
        </AnimatedContainer>

        <div className="opacity-100 mt-4 sm:mt-6">
          <div className="flex flex-wrap items-center justify-center gap-2 text-gray-300 text-xs xs:text-sm md:text-base">
            <Link
              href="/"
              className={`hover:text-amber-400 transition-colors ${jost.className}`}
            >
              Home
            </Link>
            <span>›</span>
            <span>CONTACT US</span>
          </div>
        </div>
      </div>
    </section>
  );
}
