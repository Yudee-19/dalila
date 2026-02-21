import DiamondSourceBanner from "@/components/pages/diamond-source/Bannersection";
import DiamondSourceHero from "@/components/pages/diamond-source/Herosection";
import DiamondSourceshowcase from "@/components/pages/diamond-source/Showcase";
import DiamondSourceAdvantages from "@/components/pages/diamond-source/Advantage";
import DiamondContact from "@/components/pages/diamond-source/DiamondContact";
import { Metadata } from "next";
export const metadata: Metadata = {
    alternates: {
        canonical: "https://www.daliladiamonds.com/diamond-source",
    },
};
export default function Contact() {
    return (
        <>
            <main className="relative">
                <DiamondSourceBanner />
                <DiamondSourceHero />
                <DiamondSourceshowcase />
                <DiamondSourceAdvantages />
                <DiamondContact />
            </main>
        </>
    );
}
