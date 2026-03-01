import AboutBanner from "@/components/pages/aboutus/Bannersection";
import AboutHero from "@/components/pages/aboutus/Herosection";
import Legacy from "@/components/pages/aboutus/Legacy";
import Aboutshowcase from "@/components/pages/aboutus/Showcase";
import CertifiedBy from "@/components/pages/homecomponents/Certified";
import DiamondExperience from "@/components/pages/homecomponents/experience";
import AboutMilestone from "@/components/pages/aboutus/MileStone";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "About Us | Dalila Diamonds – Top B2B Diamond Supplier",
    description: "Learn about Dalila Diamonds — trusted B2B diamond supplier in Belgium with expert sourcing, quality assurance, and exceptional service for global businesses.",
    alternates: {
        canonical: "https://www.daliladiamonds.com/aboutUs",
    },
};
export default function AboutPage() {
    return (
        <>
            <main className="relative">
                <AboutBanner />
                <AboutHero />
                <DiamondExperience />
                <Legacy />
                <AboutMilestone />
                <Aboutshowcase />
                <CertifiedBy />
            </main>
        </>
    );
}
