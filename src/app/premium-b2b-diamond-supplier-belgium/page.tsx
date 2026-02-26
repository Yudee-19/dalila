import { Marcellus, Jost } from "next/font/google";
import SeoPageBanner from "@/components/pages/seopage/SeoPageBanner";
import SeoPageShowcase, { ShowcaseSection } from "@/components/pages/seopage/SeoPageShowcase";
import SeoPageContent, { ContentSection } from "@/components/pages/seopage/SeoPageContent";

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

export default function PremiumB2BDiamondSupplierPage() {
  // Trusted B2B Diamond Supplier Introduction
  const trustedSupplierSection: ContentSection[] = [
    {
      title: "Dalila Diamonds | Trusted B2B Diamond Sourcing from Antwerp",
      content: "Dalila Diamonds is a premium B2B diamond supplier based in Antwerp, Belgium — the historic and globally recognized heart of the international diamond trade.\n\nWe specialize in supplying certified natural diamonds to jewelers, manufacturers, wholesalers, luxury retailers, and investment buyers worldwide. Our business is built on trust, transparency, precision sourcing, and long-term strategic partnerships.\n\nEvery diamond we deliver represents not only brilliance and rarity, but reliability and professional integrity backed by decades of expertise in the global diamond market.",
    },
  ];

  // Initial Image Sections
  const initialSections: ShowcaseSection[] = [
    {
      label: "EXECUTIVE OVERVIEW",
      heading: "Premium B2B Diamond<br />Supplier in Belgium",
      description:
        "<p class='mb-4'>Dalila Diamonds is a premium B2B diamond supplier based in Antwerp, Belgium — the historic and globally recognized heart of the international diamond trade.</p><p class='mb-4'>We specialize in supplying certified natural diamonds to jewelers, manufacturers, wholesalers, luxury retailers, and investment buyers worldwide.</p><p class='mb-4'>Our business is built on trust, transparency, precision sourcing, and long-term strategic partnerships. Every diamond we deliver represents not only brilliance and rarity, but reliability and professional integrity.</p><p>With decades of family expertise and a global sourcing network, we ensure consistent quality, competitive pricing, and secure international logistics.</p>",
      imageSrc: "/b2b/looseround.WEBP",
      imageAlt: "Dalila Diamonds Antwerp",
      imagePosition: "right",
    },
    {
      label: "ABOUT DALILA DIAMONDS",
      heading: "Strategic Sourcing Partner<br />for Professional Buyers",
      description:
        "<p class='mb-4'>Dalila Diamonds was founded with a clear mission: to simplify diamond sourcing for professional B2B buyers.</p><p class='mb-4'>We understand that in the diamond industry, reliability and consistency are critical. Production schedules, inventory planning, and customer expectations depend on accurate grading, competitive pricing, and secure supply.</p><p class='mb-4'>Operating from Antwerp provides us direct access to one of the world's largest polished diamond inventories and established diamond exchanges. This allows us to work closely with manufacturers and primary suppliers, ensuring better pricing structures and priority access to premium goods.</p><p>We are not a transactional trading company — we are a strategic sourcing partner committed to supporting your long-term growth.</p>",
      imageSrc: "/b2b/business-partnership.jpg",
      imageAlt: "Diamond sourcing solutions",
      imagePosition: "left",
    },
  ];

  // 50+ Years of Family Expertise
  const familyExpertiseSection: ContentSection[] = [
    {
      title: "50+ Years of Multi-Generational Diamond Expertise",
      content: "Behind Dalila Diamonds stands a multi-generational legacy of over 50 years in the diamond industry. This heritage is not just history — it's active expertise that delivers tangible value to our B2B clients every day.",
      bulletPoints: [
        "Deep Knowledge of Diamond Grading & Valuation — Our family has spent decades mastering the nuances of the 4Cs, certification standards, and market valuation. We can assess quality instantly and negotiate fair pricing.",
        "Strong Global Supplier Relationships — Relationships in the diamond industry take years to build. Our family connections across Antwerp, Mumbai, Tel Aviv, and New York provide priority access to premium inventory.",
        "Market Pricing Insight & Intelligence — We've witnessed multiple market cycles. This experience allows us to advise clients on timing, pricing trends, and investment-grade opportunities.",
        "Skilled Negotiation Capabilities — Decades of sourcing experience have refined our negotiation skills, allowing us to secure better terms and pricing for our clients.",
        "Ethical & Responsible Trading Principles — Our family reputation is built on integrity. We've maintained ethical sourcing standards since the beginning, long before it became an industry requirement.",
        "Trust Within Antwerp's Diamond Community — Reputation in Antwerp's diamond bourse is earned over generations. Our standing provides access to exclusive inventories and favorable conditions that newer entrants cannot access.",
      ],
    },
  ];

  // Why Antwerp Matters Section
  const antwerpAuthoritySection: ContentSection[] = [
    {
      title: "Why Antwerp Matters in Global Diamond Trade",
      content: "Antwerp has been the heart of the global diamond industry for over five centuries. Today, it remains the world's largest diamond trading center, with approximately 84% of all rough diamonds and 50% of polished diamonds passing through the city annually.\n\nDalila Diamonds operates within this historic ecosystem, offering buyers access to trusted sourcing networks, transparent pricing mechanisms, and consistent supply reliability that only Antwerp can provide.\n\nOur presence in Belgium allows us to maintain close relationships with cutters, polishers, laboratories, and international logistics partners — ensuring efficient procurement, certification, and delivery for professional buyers worldwide.\n\nWhen you work with a Belgium-based supplier, you're not just buying diamonds — you're accessing centuries of trade infrastructure, expertise, and trust.",
    },
  ];

  // Certification & Quality Sections
  const certificationSections: ShowcaseSection[] = [
    {
      label: "CERTIFIED DIAMONDS & LABORATORY STANDARDS",
      heading: "International Laboratory<br />Certification Standards",
      description:
        "<p class='mb-4'>We supply diamonds certified by leading international gemological laboratories including GIA, IGI, HRD, and AGS.</p><p class='mb-4'>Certification ensures independent verification of:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Carat weight</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Color grade</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Clarity grade</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Cut quality</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Proportions and symmetry</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Fluorescence levels</span></li></ul><p class='mb-4'>This guarantees transparency, consistency, and trust throughout your supply chain.</p><p>We provide diamonds suitable for both commercial manufacturing and high-value luxury markets, all backed by internationally recognized certification.</p>",
      imageSrc: "/b2b/diamant-certificat-GIA.webp",
      imageAlt: "Certified diamonds",
      imagePosition: "left",
    },
    {
      label: "OUR DIAMOND COLLECTION",
      heading: "Complete Range of<br />Certified Natural Diamonds",
      description:
        "<p class='mb-4'>Dalila Diamonds supplies polished natural diamonds across all major shapes including Round Brilliant, Princess, Cushion, Emerald, Oval, Pear, Radiant, Marquise, Asscher, and Heart.</p><p class='mb-4'>Available across all quality grades:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Commercial goods (SI–I clarity, H–K color)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Triple Excellent cut diamonds</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>No fluorescence diamonds</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Premium colorless stones (D–F)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>High clarity diamonds (IF–VVS)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Large certified solitaires (2ct+)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Investment-grade diamonds</span></li></ul><p>We also supply calibrated melee and precisely matched layouts for production jewelry manufacturing.</p>",
      imageSrc: "/b2b/diamond-slp-cover-mobile.webp",
      imageAlt: "Diamond collection",
      imagePosition: "right",
    },
  ];

  // Our Professional Process Section
  const processSection: ContentSection[] = [
    {
      title: "Our Professional Diamond Procurement Process",
      content: "We follow a structured, transparent procurement process designed to minimize risk and maximize value for B2B buyers:",
      bulletPoints: [
        "Requirement Analysis — We begin by understanding your exact specifications: shape, carat range, color, clarity, cut quality, certification preference, and budget parameters.",
        "Strategic Global Sourcing — Our network activates across Antwerp exchanges, trusted manufacturers, and international suppliers to locate diamonds matching your criteria.",
        "Laboratory Certification Verification — Every diamond undergoes certification authentication. We verify report numbers, laser inscriptions, and grading consistency.",
        "Quality Inspection & Grading Review — Our gemologists conduct independent inspection for proportions, symmetry, polish, fluorescence, and visual appeal to ensure quality standards.",
        "Secure International Dispatch — Once approved, diamonds are packaged, insured, and shipped via specialized logistics partners with full tracking and customs support.",
        "Post-Delivery Support — We provide ongoing support for any verification, documentation, or future sourcing requirements.",
      ],
    },
  ];

  // Services Sections
  const servicesSections: ShowcaseSection[] = [
    {
      label: "S2S – SECURE TO SOURCE",
      heading: "Structured Diamond<br />Procurement Solution",
      description:
        "<p class='mb-4'>Secure To Source (S2S) is our core B2B procurement solution designed for jewelers, wholesalers, and manufacturers seeking reliability and reduced sourcing risk.</p><p class='mb-4'>S2S provides:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Direct access to Antwerp inventories</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Certified stones with full documentation</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Competitive wholesale pricing</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Full quality control verification</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Insured international logistics</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Transparent documentation and invoicing</span></li></ul><p>This service is ideal for businesses requiring consistent supply, predictable pricing, and long-term partnership stability.</p>",
      imageSrc: "/b2b/stos.jpg",
      imageAlt: "Secure sourcing process",
      imagePosition: "left",
    },
    {
      label: "DS4U – DIAMOND SOURCE FOR YOU",
      heading: "Customized Sourcing<br />for Rare Requirements",
      description:
        "<p class='mb-4'>Diamond Source For You (DS4U) is our fully customized sourcing program for specific, rare, or high-value diamond requirements that require specialized search and procurement.</p><p class='mb-4'>Clients request:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Exact carat ranges and weight specifications</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Specific color and clarity combinations</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Matched pairs for earrings and layouts</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Bridal collections with consistent grading</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Rare fancy shapes and cuts</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>High-value investment-grade stones (5ct+)</span></li></ul><p>Our global sourcing network activates to locate, verify, negotiate, and securely deliver stones matching your precise criteria within agreed timelines.</p>",
      imageSrc: "/b2b/close-up.jpg",
      imageAlt: "Custom diamond sourcing",
      imagePosition: "right",
    },
  ];

  // Sell Your Diamonds Service Section
  const sellDiamondsSection: ContentSection[] = [
    {
      title: "SYD — Sell Your Diamonds: Professional Buyback Service",
      content: "Sell Your Diamonds (SYD) is our professional diamond purchasing and buyback service for B2B sellers, estates, liquidation scenarios, and inventory optimization needs.",
      bulletPoints: [
        "Loose Certified Diamonds (All Sizes) — We purchase individual stones and parcels from 0.30ct to 10ct+, with valid GIA, IGI, HRD, or AGS certification.",
        "High-Value Solitaires & Rare Stones — Exceptional stones with investment-grade characteristics, rare color grades (D-E-F), or superior clarity (IF-VVS) receive premium valuations.",
        "Investment-Grade Diamonds — We actively purchase diamonds held for investment purposes, providing liquidity and transparent pricing based on current market indices.",
        "Diamond Jewelry & Mounted Stones — We purchase fine jewelry pieces and can extract and revalue loose stones separately for maximum return.",
        "Estate Pieces & Collections — Family estates, vintage collections, and inherited jewelry receive professional evaluation and fair market pricing.",
        "Professional Evaluation Process — Certification verification, laser inscription check, independent gemological inspection, and transparent pricing based on Rapaport and IDEX benchmarks.",
        "Secure Payment via Bank Transfer — Once agreement is reached, payment is executed via secure international bank transfer with full documentation.",
      ],
    },
  ];

  // Ethical & Quality Standards Section
  const ethicsQualitySection: ContentSection[] = [
    {
      title: "Ethical Sourcing & Quality Control",
      content: "Dalila Diamonds strictly complies with international diamond trade regulations and responsible sourcing frameworks. Our commitment to ethics and quality is non-negotiable.",
      bulletPoints: [
        "Kimberley Process Certification — All diamonds originate from conflict-free sources with full KP compliance and documentation.",
        "Anti-Money Laundering (AML) Compliance — We follow strict AML regulations and Know Your Customer (KYC) procedures for all B2B transactions.",
        "International Trade Compliance — Full adherence to customs regulations, export controls, and sanctions screening.",
        "Responsible Supply Chain Practices — We work exclusively with verified suppliers committed to ethical labor and environmental standards.",
        "Rigorous Quality Inspection — Every diamond undergoes certification authentication, proportion review, fluorescence confirmation, and final visual inspection before dispatch.",
      ],
    },
  ];

  // Logistics & Market Sections
  const logisticsMarketSections: ShowcaseSection[] = [
    {
      label: "GLOBAL LOGISTICS & SECURE SHIPPING",
      heading: "Secure International<br />Shipping Solutions",
      description:
        "<p class='mb-4'>We provide fully insured international shipping through specialized diamond logistics partners with proven security protocols.</p><p class='mb-4'>Our logistics services include:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Tamper-proof secure packaging</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Full insurance coverage at declared value</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Customs documentation and duty calculation</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Express global delivery (24-72 hours)</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Real-time tracking and communication</span></li></ul><p>Our logistics solutions protect high-value assets throughout international transportation, ensuring secure delivery to your location worldwide.</p>",
      imageSrc: "/b2b/flight.jpg",
      imageAlt: "Global shipping",
      imagePosition: "right",
    },
    {
      label: "MARKET EXPERTISE & PRICING STRATEGY",
      heading: "Competitive Pricing<br />Strategy & Market Analysis",
      description:
        "<p class='mb-4'>The diamond market is dynamic and influenced by global supply, demand, mining output, and pricing indices such as IDEX and Rapaport.</p><p class='mb-4'>We continuously monitor:</p><ul class='list-none space-y-2 mb-4 ml-0'><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Wholesale market fluctuations and pricing trends</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Supply chain availability and inventory levels</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Global demand trends across regions</span></li><li class='flex items-start'><span class='text-[#c89e3a] text-lg font-bold mr-2 mt-1'>•</span><span>Currency movements (USD/EUR/INR)</span></li></ul><p>This market intelligence allows us to provide accurate, competitive B2B pricing aligned with current market conditions, helping you maintain profitability and competitiveness.</p>",
      imageSrc: "/b2b/diamondsourceforyou.jpg",
      imageAlt: "Market pricing strategy",
      imagePosition: "left",
    },
  ];

  // Why Choose Us Section
  const whyChooseUsSection: ContentSection[] = [
    {
      title: "Why Global Buyers Choose Dalila Diamonds",
      content: "Professional diamond buyers worldwide trust Dalila Diamonds as their strategic sourcing partner for certified natural diamonds. Here's why:",
      bulletPoints: [
        "Located in Antwerp, Belgium — Operating in the heart of the global diamond trade provides unmatched access to inventory, laboratories, and logistics infrastructure.",
        "Strict International Certification Standards — We supply only diamonds certified by GIA, IGI, HRD, and AGS, ensuring transparency and quality consistency.",
        "Transparent Wholesale Pricing Structure — No hidden markups. Our pricing reflects current market conditions with fair margins for sustainable partnership.",
        "50+ Years of Multi-Generational Expertise — Decades of family knowledge in grading, valuation, negotiation, and ethical trade practices.",
        "Long-Term Partnership Model — We focus on building lasting relationships, not one-time transactions. Priority access, flexible terms, and dedicated support.",
        "Secure Global Logistics Network — Fully insured international shipping with specialized carriers, customs support, and real-time tracking.",
        "Ethical & Compliant Trade Practices — Full compliance with Kimberley Process, AML regulations, and responsible sourcing standards.",
        "Comprehensive Service Portfolio — From standard procurement (S2S) to custom sourcing (DS4U) to diamond buyback (SYD), we support every B2B need.",
      ],
    },
  ];
  // Contact Information Section
  const contactSection: ContentSection[] = [
    {
      title: "Connect with Dalila Diamonds",
      content: "Ready to establish a reliable diamond sourcing partnership? Contact our team in Antwerp to discuss your specific requirements, pricing, inventory access, and long-term collaboration opportunities.",
      bulletPoints: [
        "Company Name: Dalila Diamonds",
        "Physical Address: Hoveniersstraat 30, Box 105, Suite 326, 2018 Antwerp, Belgium",
        "Primary Phone: +32 3 613 94 74",
        "Mobile/WhatsApp: +32 487 93 93 51",
        "Business Email: business@daliladiamonds.com",
        "Office Hours: Monday–Friday, 9:00 AM – 6:00 PM CET (By appointment for international clients)",
        "Languages: English, Dutch, French, Hindi, Hebrew",
      ],
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <SeoPageBanner
        title="Premium B2B Diamond Supplier in Belgium"
        category="Business"
        breadcrumb="Dalila Diamonds | Trusted Diamond Sourcing from Antwerp"
      />
      <SeoPageContent sections={trustedSupplierSection} />
      <SeoPageShowcase sections={initialSections} />
      <SeoPageContent sections={familyExpertiseSection} />
      <SeoPageContent sections={antwerpAuthoritySection} />
      <SeoPageShowcase sections={certificationSections} />
      <SeoPageContent sections={processSection} />
      <SeoPageShowcase sections={servicesSections} />
      <SeoPageContent sections={sellDiamondsSection} />
      <SeoPageContent sections={ethicsQualitySection} />
      <SeoPageShowcase sections={logisticsMarketSections} />
      <SeoPageContent sections={whyChooseUsSection} />
      <SeoPageContent sections={contactSection} />
    </div>
  );
}
