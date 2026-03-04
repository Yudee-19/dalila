import { Marcellus, Jost } from "next/font/google";
import SellDiamondBanner from "@/components/pages/resources/SellDiamondBanner";
import ResourceSidebar from "@/components/pages/resources/ResourceSidebar";
import SeoPageShowcase, { ShowcaseSection } from "@/components/pages/seopage/SeoPageShowcase";
import { ContentSection } from "@/components/pages/seopage/SeoPageContent";
import { Metadata } from "next";
import AnimatedContainer from "@/components/shared/AnimatedContainer";

export const metadata: Metadata = {
    title: "Sell Your Diamond Safely in Belgium | Dalila Diamonds",
    description: "Sell your diamond safely with Dalila Diamonds in Belgium — trusted B2B buyer offering secure transactions, fair value, and expert service for businesses.",
    alternates: {
        canonical: "https://www.daliladiamonds.com/sell-your-diamond-safely",
    },
};

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

export default function SellYourDiamondSafelyPage() {

  // Why Selling Diamonds Requires Care
  const whySellingSection: ContentSection[] = [
    {
      title: "Why Selling Diamonds Requires Care and Planning",
      content: "Selling a diamond isn't like selling an old phone or a piece of furniture. It's more like selling a tiny treasure—valuable, emotional, and sometimes confusing to price.\n\nWhether it's an engagement ring, heirloom jewelry, or a loose stone, you want the process to be smooth, secure, and profitable.\n\nMany people worry: Will I get the right price? Is the buyer trustworthy? Is it safe to sell online?\n\nThe good news? With the right preparation and a trusted buyer like Dalila Diamonds, selling your diamond can be simple and stress-free.",
    },
  ];

  // Understanding Diamond Value
  const understandingValueSection: ContentSection[] = [
    {
      title: "Understanding the Real Value of Your Diamond",
      content: "Every diamond's value depends on the famous 4Cs:\n\nCut – Determines sparkle and brilliance\n\nColor – The less color, the higher the value\n\nClarity – Fewer inclusions mean better quality\n\nCarat – The weight of the diamond\n\nThink of the 4Cs like a diamond's report card. The stronger the grades, the higher the resale value.\n\nMarket Demand and Pricing Trends: Diamond prices aren't fixed forever. Market demand, design trends, and global supply chains influence resale value. For example, classic round diamonds usually sell faster than unusual cuts.",
    },
  ];

  // Choosing a Trusted Buyer
  const trustedBuyerSection: ContentSection[] = [
    {
      title: "Choosing a Trusted Diamond Buyer",
      content: "A trustworthy buyer should offer:",
      bulletPoints: [
        "Transparent pricing process",
        "Professional evaluation",
        "Secure shipping or in-person inspection",
        "Clear payment terms",
        "Positive customer reputation",
      ],
    },
  ];

  // Risks of Unverified Buyers
  const risksSection: ContentSection[] = [
    {
      title: "Risks of Selling to Unverified Buyers",
      content: "Selling to unknown individuals or unverified dealers can lead to:",
      bulletPoints: [
        "Underpricing",
        "Payment delays",
        "Fraud risks",
        "No documentation",
      ],
    },
  ];

  // Diamond Value Showcase Sections
  const valueSections: ShowcaseSection[] = [
    {
      label: "UNDERSTANDING DIAMOND VALUE",
      heading: "Understanding the Real<br />Value of Your Diamond",
      description:
        "<p class='mb-4'><strong>The 4Cs Explained</strong></p><p class='mb-4'>Every diamond's value depends on the famous 4Cs:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Cut</strong> – Determines sparkle and brilliance</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Color</strong> – The less color, the higher the value</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Clarity</strong> – Fewer inclusions mean better quality</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Carat</strong> – The weight of the diamond</span></li></ul><p class='mb-4'>Think of the 4Cs like a diamond's report card. The stronger the grades, the higher the resale value.</p><p><strong>Market Demand and Pricing Trends</strong></p><p>Diamond prices aren't fixed forever. Market demand, design trends, and global supply chains influence resale value. For example, classic round diamonds usually sell faster than unusual cuts.</p>",
      imageSrc: "/selllSafe/loose.jpg",
      imageAlt: "Diamond 4Cs evaluation",
      imagePosition: "left",
    },
    {
      label: "CHOOSING A TRUSTED BUYER",
      heading: "Choosing a Trusted<br />Diamond Buyer",
      description:
        "<p class='mb-4'><strong>Signs of a Reliable Diamond Company</strong></p><p class='mb-4'>A trustworthy buyer should offer:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Transparent pricing process</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Professional evaluation</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Secure shipping or in-person inspection</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Clear payment terms</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Positive customer reputation</span></li></ul><p class='mb-4'>A premium company explains how they calculate value instead of giving vague offers.</p><p class='mb-4'><strong>Risks of Selling to Unverified Buyers</strong></p><p class='mb-4'>Selling to unknown individuals or unverified dealers can lead to:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Underpricing</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Payment delays</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Fraud risks</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>No documentation</span></li></ul><p>If a deal sounds too quick or too good to be true, it probably is.</p>",
      imageSrc: "/selllSafe/sell-diamonds.jpg",
      imageAlt: "Trusted diamond buyer selection",
      imagePosition: "right",
    },
  ];

  // Preparing Your Diamond Section
  const preparingSection: ContentSection[] = [
    {
      title: "Preparing Your Diamond Before Selling",
      content: "Before selling, gather all necessary documentation to increase buyer confidence and boost your selling price.\n\nCollect Certificates and Documents: Original purchase invoice, diamond grading certificate (GIA, IGI, etc.), warranty papers, and previous appraisals. These documents increase buyer confidence and can boost your selling price.\n\nClean and Inspect Your Jewelry: Presentation matters. A professionally cleaned diamond looks brighter and more appealing. Even a simple gentle cleaning at home can improve its appearance.\n\nInspect the setting for damage. Loose prongs or scratches may affect valuation. Professional inspection ensures you get accurate pricing.",
    },
  ];

  // Selling Process Section
  const sellingProcessSection: ContentSection[] = [
    {
      title: "Step-by-Step Process to Sell Your Diamond",
      content: "Selling your diamond should feel easy — not stressful. Here's how a professional process works.\n\nStep 1 – Submit Your Details: Start by sharing basic information about your diamond (type of jewelry, carat size, certification, photos). This helps experts estimate preliminary value.\n\nStep 2 – Professional Evaluation: Next comes the detailed inspection. Experts examine authenticity, quality grading, market demand, and condition of the piece. This ensures a fair and accurate valuation.\n\nStep 3 – Transparent Offer: After evaluation, you receive a clear offer based on real market value — no hidden deductions or last-minute surprises. You can accept or decline. No pressure.\n\nStep 4 – Secure Payment: Once accepted, payment is processed securely through verified banking channels. Fast, safe, and documented.",
    },
  ];

  // Why Dalila Diamonds
  const whyDalilaSection: ContentSection[] = [
    {
      title: "Why Dalila Diamonds is a Premium Diamond Supplier",
      content: "Global Industry Network: A strong global network allows diamond companies to offer competitive prices. Buyers connected with international jewelers and retailers can resell diamonds efficiently, which means better offers for sellers.\n\nTrusted by Retailers and Jewelers: Being recognized as a premium diamond supplier for B2B business in Brazil means working with:",
      bulletPoints: [
        "Jewelry retailers",
        "Diamond wholesalers",
        "Manufacturers",
        "Luxury brands",
      ],
    },
  ];

  // Online Selling Benefits
  const onlineSellingSection: ContentSection[] = [
    {
      title: "Benefits of Selling Diamonds Online vs Offline",
      content: "Selling online through a trusted company offers:",
      bulletPoints: [
        "Convenience from home",
        "Professional remote evaluation",
        "Access to global buyers",
        "Faster offers",
        "Secure insured shipping",
      ],
    },
  ];

  // Why Dalila Diamonds & Online Selling Showcase Sections
  const servicesSections: ShowcaseSection[] = [
    {
      label: "WHY DALILA DIAMONDS",
      heading: "Why Dalila Diamonds is<br />a Premium Diamond Supplier",
      description:
        "<p class='mb-4'><strong>Global Industry Network</strong></p><p class='mb-4'>A strong global network allows diamond companies to offer competitive prices. Buyers connected with international jewelers and retailers can resell diamonds efficiently, which means better offers for sellers.</p><p class='mb-4'><strong>Trusted by Retailers and Jewelers</strong></p><p class='mb-4'>Being recognized as a premium diamond supplier for B2B business in Brazil means working with:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Jewelry retailers</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Diamond wholesalers</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Manufacturers</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Luxury brands</span></li></ul><p>This professional demand ensures consistent valuation standards and fair market pricing.</p>",
      imageSrc: "/selllSafe/step_4.png",
      imageAlt: "Dalila Diamonds global network",
      imagePosition: "left",
    },
    {
      label: "ONLINE VS OFFLINE SELLING",
      heading: "Benefits of Selling<br />Diamonds Online vs Offline",
      description:
        "<p class='mb-4'>Selling online through a trusted company offers:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Convenience from home</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Professional remote evaluation</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Access to global buyers</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Faster offers</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Secure insured shipping</span></li></ul><p>Offline selling may feel traditional, but it often limits you to local buyers and fewer price comparisons.</p>",
      imageSrc: "/selllSafe/recieve_your_payment.png",
      imageAlt: "Online diamond selling advantages",
      imagePosition: "right",
    },
  ];

  // Safety Tips Section
  const safetyTipsSection: ContentSection[] = [
    {
      title: "Safety Tips When Selling High-Value Jewelry",
      content: "Protect yourself and your valuable diamond with these essential safety guidelines.\n\nAvoid Cash-Only Deals: Large cash transactions are risky and often untraceable. Always prefer bank transfers, verified payment receipts, and written agreements.\n\nVerify Company Credentials: Before selling, check website authenticity, read customer reviews, confirm physical office presence, and ensure secure communication.\n\nUse Insured Shipping: If sending your diamond, always use fully insured and tracked shipping services. Never send valuables without proper insurance coverage.\n\nA genuine diamond company never hides its details and provides transparent communication throughout the process.",
    },
  ];

  // Common Mistakes Section
  const commonMistakesSection: ContentSection[] = [
    {
      title: "Common Mistakes to Avoid When Selling Diamonds",
      content: "Many sellers lose money due to simple errors that can easily be avoided.\n\nSelling without certification – Always get your diamond certified by recognized labs like GIA or IGI for better pricing.\n\nAccepting the first offer immediately – Compare multiple offers to understand true market value.\n\nNot researching market value – Know what similar diamonds are selling for before accepting any offer.\n\nIgnoring buyer reputation – Always verify the buyer's credentials and read reviews from other sellers.\n\nRushing due to urgency – Patience can significantly increase your final price. Don't let time pressure force a bad deal.",
    },
  ];

  // Getting the Best Price Section
  const bestPriceSection: ContentSection[] = [
    {
      title: "How to Get the Best Price for Your Diamond",
      content: "Maximize your diamond's value with smart timing and strategic approach.\n\nTiming the Sale: Demand rises during wedding seasons, festive periods, and high jewelry retail cycles. Selling during strong demand can improve offers.\n\nComparing Multiple Offers: Always compare at least 2–3 quotes. This helps you understand realistic market value and avoid underpricing.\n\nPresent Complete Documentation: Having all certificates, purchase receipts, and appraisals ready increases buyer confidence and can boost your price by 15-20%.\n\nProfessional Cleaning: A well-maintained, clean diamond photographs better and makes a stronger impression during evaluation.",
    },
  ];

  // Who Can Sell Diamonds
  const whoCanSellSection: ContentSection[] = [
    {
      title: "Who Can Sell Diamonds to Dalila Diamonds",
      content: "Almost anyone can sell:",
      bulletPoints: [
        "Individuals with old jewelry",
        "People upgrading rings",
        "Families selling heirlooms",
        "Investors liquidating assets",
        "Retailers clearing inventory",
      ],
    },
  ];

  // Types of Diamonds
  const typesOfDiamondsSection: ContentSection[] = [
    {
      title: "Selling Engagement Rings, Heirlooms, and Loose Diamonds",
      content: "Different types of diamonds require different evaluation approaches:",
      bulletPoints: [
        "Engagement rings – Value depends on stone + setting",
        "Heirlooms – Antique value may increase price",
        "Loose diamonds – Easier to grade and often faster to sell",
      ],
    },
  ];

  // Who Can Sell & Types of Diamonds Showcase Sections
  const sellerSections: ShowcaseSection[] = [
    {
      label: "WHO CAN SELL DIAMONDS",
      heading: "Who Can Sell<br />Diamonds to Dalila Diamonds",
      description:
        "<p class='mb-4'>Almost anyone can sell:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Individuals with old jewelry</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>People upgrading rings</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Families selling heirlooms</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Investors liquidating assets</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Retailers clearing inventory</span></li></ul><p>Every diamond has value when assessed professionally.</p>",
      imageSrc: "/selllSafe/step_2.png",
      imageAlt: "Who can sell diamonds",
      imagePosition: "left",
    },
    {
      label: "TYPES OF DIAMONDS",
      heading: "Selling Engagement Rings,<br />Heirlooms, and Loose Diamonds",
      description:
        "<p class='mb-4'>Different types of diamonds require different evaluation approaches:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Engagement rings</strong> – Value depends on stone + setting</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Heirlooms</strong> – Antique value may increase price</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span><strong>Loose diamonds</strong> – Easier to grade and often faster to sell</span></li></ul><p>Professional buyers consider both emotional and market worth.</p>",
      imageSrc: "/selllSafe/diamondwork.png",
      imageAlt: "Different types of diamond jewelry",
      imagePosition: "right",
    },
  ];

  // Final Checklist Section
  const finalChecklistSection: ContentSection[] = [
    {
      title: "Final Checklist Before Selling Your Diamond",
      content: "Before finalizing the sale, confirm all these essential points.\n\n✓ Certification ready – Your diamond grading certificate from GIA, IGI, or other recognized labs.\n\n✓ Photos taken – Clear, high-quality images from multiple angles showing the diamond's brilliance.\n\n✓ Jewelry cleaned – Professional cleaning or gentle home cleaning completed.\n\n✓ Buyer verified – Company credentials, reviews, and reputation checked thoroughly.\n\n✓ Payment method confirmed – Secure bank transfer or verified payment system agreed upon.\n\n✓ Offer reviewed carefully – Compare with market values and other offers received.",
    },
  ];

  // Conclusion Section
  const conclusionSection: ContentSection[] = [
    {
      title: "Sell Your Diamond Safely and Seamlessly",
      content: "Make your diamond selling experience smooth, secure, and rewarding.\n\nSelling your diamond doesn't have to be complicated or risky. With the right preparation, understanding of value, and a trusted professional buyer, the process can be smooth, secure, and rewarding.\n\nWhether you're selling an engagement ring, heirloom, or loose stone, choosing a reliable company ensures transparency, fair pricing, and safe payment.\n\nIf you want a hassle-free experience backed by industry trust and global demand, working with a recognized premium diamond supplier for B2B business in Brazil like Dalila Diamonds can make all the difference.\n\nSell smart, stay safe, and let your diamond find its next brilliant story.",
    },
  ];

  // FAQs Section
  const faqsSection: ContentSection[] = [
    {
      title: "Frequently Asked Questions",
      content: "Q: How do I know my diamond's resale value?\n\nA: A professional evaluation considering the 4Cs, certification, and current market demand determines accurate resale value.\n\nQ: Is it safe to sell diamonds online?\n\nA: Yes, if you choose a verified company offering insured shipping, transparent valuation, and secure payments.\n\nQ: Do I need a certificate to sell my diamond?\n\nA: Not mandatory, but certification increases trust and usually results in a higher price.\n\nQ: How long does the selling process take?\n\nA: With a professional buyer, it can take from a few days to a week, depending on evaluation and payment processing.\n\nQ: Can I sell broken or old diamond jewelry?\n\nA: Yes. Even damaged settings or old designs hold value because the diamond itself is evaluated.",
    },
  ];

  // Helper function to render content sections
  const renderContentSection = (section: ContentSection) => {
    return (
      <div className="mb-12">
        <AnimatedContainer direction="up">
          <div className="bg-white">
            {/* Decorative Top Border */}
            <div className="w-24 h-1.5 bg-linear-to-r from-[#c89e3a] to-[#e4c75f] mb-6 rounded-full"></div>
            
            <h2
              className={`text-3xl md:text-4xl lg:text-4xl font-bold text-[#1a1a1a] mb-6 leading-tight ${marcellus.className}`}
            >
              {section.title}
            </h2>
            
            {section.content && (
              <div
                className={`text-gray-700 text-base md:text-lg leading-relaxed mb-6 whitespace-pre-line ${jost.className}`}
              >
                {section.content}
              </div>
            )}

            {section.bulletPoints && section.bulletPoints.length > 0 && (
              <ul className={`space-y-4 ${jost.className}`}>
                {section.bulletPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700 text-base md:text-lg leading-relaxed">
                    <span className="text-[#c89e3a] mt-1 font-bold text-xl shrink-0">•</span>
                    <span className="flex-1">{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </AnimatedContainer>
      </div>
    );
  };

  return (
    <div className={`${marcellus.variable} ${jost.variable} bg-white min-h-screen`}>
      <SellDiamondBanner />
      
      {/* Initial Content Section with Sidebar */}
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Sidebar */}
          <aside className="lg:w-56 w-full shrink-0">
            <AnimatedContainer direction="left">
              <div className="sticky top-4">
                <ResourceSidebar currentPage="sell-diamond" />
              </div>
            </AnimatedContainer>
          </aside>

          {/* Right Content Area */}
          <main className="flex-1 w-full">
            <article className="pb-8">
              {renderContentSection(whySellingSection[0])}
            </article>
          </main>
        </div>
      </div>

      {/* Full Width Content Sections */}
      <div className="w-full">
        <SeoPageShowcase sections={valueSections} />
        <div className="container mx-auto max-w-7xl px-4 py-8">
          {renderContentSection(preparingSection[0])}
          {renderContentSection(sellingProcessSection[0])}
        </div>
        <SeoPageShowcase sections={servicesSections} />
        <div className="container mx-auto max-w-7xl px-4 py-8">
          {renderContentSection(safetyTipsSection[0])}
          {renderContentSection(commonMistakesSection[0])}
          {renderContentSection(bestPriceSection[0])}
        </div>
        <SeoPageShowcase sections={sellerSections} />
        <div className="container mx-auto max-w-7xl px-4 py-8">
          {renderContentSection(finalChecklistSection[0])}
          {renderContentSection(conclusionSection[0])}
          {renderContentSection(faqsSection[0])}
        </div>
      </div>
    </div>
  );
}
