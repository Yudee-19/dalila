"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import { Marcellus, Jost } from "next/font/google";
import { ArrowLeft, Loader2, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import { blogApi, type Blog } from "@/lib/api";
import { getBlogSlug } from "@/utils/helpers";
import DiamondDetailView from "@/components/DiamondDetailView";
import type { DiamondData } from "@/types/diamond.types";

interface InventoryDiamond {
  _id: string;
  STONE_NO: string;
  SHAPE: string;
  CARATS: string;
  COLOR: string;
  CLARITY: string;
  CUT: string;
  POL: string;
  SYM: string;
  LAB: string;
  REAL_IMAGE: string;
  MP4?: string;
  NET_RATE?: string;
  DISC_PER?: string;
  NET_VALUE?: string;
  RAP_PRICE?: string;
  DEPTH_PER?: string;
  TABLE_PER?: string;
  MEASUREMENTS?: string;
  REPORT_NO?: string;
  FLOUR?: string;
  LOCATION?: string;
}
import ArticlesBanner from "@/components/pages/blogs/ArticlesBanner";

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

export default function BlogDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inventoryDiamonds, setInventoryDiamonds] = useState<InventoryDiamond[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedDiamond, setSelectedDiamond] = useState<InventoryDiamond | null>(null);
  const [diamondsFetched, setDiamondsFetched] = useState(false);

  useEffect(() => {
    if (params.slug) {
      fetchBlogDetail(params.slug as string);
      // Scroll to content area smoothly when article changes
      const contentElement = document.getElementById('blog-content-area');
      if (contentElement) {
        contentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [params.slug]);

  // Fetch diamonds only once
  useEffect(() => {
    if (!diamondsFetched) {
      fetchInventoryDiamonds();
    }
  }, [diamondsFetched]);

  // Debug: Log inventory diamonds state changes
  useEffect(() => {
    console.log("Inventory diamonds state updated:", {
      count: inventoryDiamonds.length,
      fetched: diamondsFetched,
      diamonds: inventoryDiamonds.slice(0, 2) // Log first 2 for debugging
    });
  }, [inventoryDiamonds, diamondsFetched]);

  // Auto-play carousel effect
  useEffect(() => {
    if (!isAutoPlaying || inventoryDiamonds.length <= 3) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => 
        (prev + 1) % Math.max(1, inventoryDiamonds.length - 2)
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, inventoryDiamonds]);

  // Update document title and meta tags when blog loads
  useEffect(() => {
    if (blog) {
      // Update page title
      document.title = blog.metaTitle || blog.title || "Blog";
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          blog.metaDescription || blog.h2Subtitle || blog.title
        );
      }
      
      // Update Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute("content", blog.metaTitle || blog.title);
      }
      
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute(
          "content",
          blog.metaDescription || blog.h2Subtitle || blog.title
        );
      }
      
      if (blog.featuredImage) {
        const ogImage = document.querySelector('meta[property="og:image"]');
        if (ogImage) {
          ogImage.setAttribute("content", blog.featuredImage);
        }
      }
    }
  }, [blog]);

  const fetchBlogDetail = async (slug: string) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('========== BLOG SLUG MATCHING DEBUG ==========');
      console.log('URL Slug received:', slug);
      
      // Clean the slug by removing any query parameters (e.g., ?_rsc=xxx)
      const cleanSlug = slug.split('?')[0].split('#')[0];
      console.log('Cleaned slug:', cleanSlug);
      
      // Fetch all blogs using existing API
      const response = await blogApi.getAll({
        page: 1,
        limit: 1000, // Get all blogs
        sortBy: "createdAt",
        sortOrder: "desc",
      });

      console.log('API Response:', response);
      console.log('Total blogs fetched:', response?.data?.length || 0);

      if (response && response.data) {
        // Store all blogs for sidebar
        setAllBlogs(response.data);
        
        // Log all blogs with their slugs for debugging
        console.log('All blogs with their slugs:');
        response.data.forEach((blog, index) => {
          const blogSlug = blog.customSlug && blog.customSlug.trim() 
            ? blog.customSlug.replace(/^\/+|\/+$/g, '')
            : blog.title.toString().toLowerCase().trim()
                .replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
                .replace(/-+/g, '-').replace(/^-+|-+$/g, '');
          console.log(`  ${index + 1}. "${blog.title}" -> slug: "${blogSlug}", customSlug: "${blog.customSlug || 'none'}"`);
        });

        // Normalize the cleaned slug from URL (remove leading/trailing slashes)
        const normalizedSlug = cleanSlug.replace(/^\/+|\/+$/g, '');
        console.log('Normalized URL slug:', normalizedSlug);
        
        // Find the blog that matches the slug
        const foundBlog = response.data.find((blog) => {
          // Check if blog has a non-empty customSlug
          if (blog.customSlug && blog.customSlug.trim()) {
            // Normalize customSlug (remove leading/trailing slashes)
            const normalizedCustomSlug = blog.customSlug.replace(/^\/+|\/+$/g, '');
            const matches = normalizedCustomSlug === normalizedSlug;
            console.log(`Checking customSlug for "${blog.title}":`, {
              customSlug: normalizedCustomSlug,
              urlSlug: normalizedSlug,
              matches
            });
            // If blog has customSlug, ONLY match against customSlug (not title)
            return matches;
          }
          
          // No customSlug or empty customSlug - generate slug from title and compare
          const generatedSlug = blog.title
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
          
          const matches = generatedSlug === normalizedSlug;
          console.log(`Checking title slug for "${blog.title}":`, {
            generatedSlug,
            urlSlug: normalizedSlug,
            matches
          });
          return matches;
        });

        console.log('Found blog:', foundBlog ? foundBlog.title : 'NONE');
        console.log('==============================================');

        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          console.error('No matching blog found for slug:', normalizedSlug);
          setError("Blog not found");
        }
      } else {
        console.error('No response data');
        setError("Blog not found");
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      setError("Failed to load blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchInventoryDiamonds = async () => {
    try {
      console.log("Fetching featured diamonds for blog from safe endpoint...");
      
      // Fetch diamonds from the safe public endpoint
      const response = await fetch(
        'https://dalila-inventory-service-dev.caratlogic.com/api/diamonds/safe?page=1&limit=10'
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Safe API response:", data);
      
      if (data && data.success && Array.isArray(data.data)) {
        const diamonds = data.data;
        console.log(`Total diamonds received: ${diamonds.length}`);
        
        // Filter diamonds that have images
        const diamondsWithImages = diamonds.filter((d: InventoryDiamond) => 
          d.REAL_IMAGE && d.REAL_IMAGE.trim()
        );
        console.log(`Loaded ${diamondsWithImages.length} featured diamonds with images`);
        setInventoryDiamonds(diamondsWithImages);
        setDiamondsFetched(true);
      } else {
        console.error("Invalid response structure:", data);
        // Still set as fetched even if no data, so the section shows
        setInventoryDiamonds([]);
        setDiamondsFetched(true);
      }
    } catch (err) {
      console.error("Featured diamonds fetch error:", err);
      // Set as fetched even on error, so the section shows with message
      setInventoryDiamonds([]);
      setDiamondsFetched(true);
    }
  };

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide(
      (prev) => (prev + 1) % Math.max(1, inventoryDiamonds.length - 2),
    );
    setTimeout(() => setIsAutoPlaying(true), 5000); // Resume auto-play after 5 seconds
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.max(1, inventoryDiamonds.length - 2)) %
        Math.max(1, inventoryDiamonds.length - 2),
    );
    setTimeout(() => setIsAutoPlaying(true), 5000); // Resume auto-play after 5 seconds
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#c89e3a] animate-spin" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto max-w-4xl px-4 pt-40">
          <div className="text-center">
            <h1
              className={`text-3xl md:text-4xl text-[#2d2d2d] mb-4 ${marcellus.className}`}
            >
              {error || "Blog not found"}
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://www.daliladiamonds.com/blogs/${params.slug}`} />
      </Head>
      
      <div className="bg-white min-h-screen">
        {/* Banner Section */}
        <ArticlesBanner />
      
      {/* Back Button */}
      <div className="container mx-auto max-w-7xl px-4 pt-8 pb-6">
        <button
          onClick={() => router.back()}
          className={`inline-flex items-center gap-2 text-[#c89e3a] hover:text-[#b8922e] font-medium transition-all ${jost.className} hover:gap-3`}
        >
          <ArrowLeft size={18} />
          Back to Articles
        </button>
      </div>

      {/* Main Content Section with Sidebar */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 items-start">
          {/* Left Sidebar - Sticky on Desktop */}
          <aside className="sticky-sidebar">
            {/* Our Articles Section */}
            <div className="mb-6">
              <h3 className={`text-xl font-bold text-[#2d2d2d] mb-5 ${marcellus.className}`}>
                Our Articles
              </h3>
              {allBlogs.length === 0 ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-[#c89e3a]" />
                </div>
              ) : (
                <ul className="space-y-4">
                  {allBlogs.map((articleItem, index) => (
                    <li key={articleItem._id}>
                      <Link
                        href={`/blogs/${getBlogSlug(articleItem)}`}
                        className={`text-left hover:text-[#c89e3a] transition-colors group w-full flex items-start justify-between gap-3 py-1 ${
                          blog?._id === articleItem._id ? 'text-[#c89e3a]' : 'text-gray-700'
                        }`}
                      >
                        <span className={`text-base flex-1 ${index === 0 ? '' : 'line-clamp-2'} ${jost.className}`}>
                          {articleItem.title}
                        </span>
                        <ArrowRight
                          size={16}
                          className={`shrink-0 -mt-0.5 transition-transform group-hover:translate-x-1 ${
                            blog?._id === articleItem._id 
                              ? 'text-[#c89e3a]' 
                              : 'text-gray-400 group-hover:text-[#c89e3a]'
                          }`}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Find Us Section */}
            <div className="mb-6">
              <div className="bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] text-white p-6 shadow-lg">
                <h3 className={`text-xl font-bold mb-4 ${marcellus.className}`}>
                  Find Us
                </h3>
                <div className={`space-y-3 text-sm text-gray-200 ${jost.className}`}>
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#c89e3a] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-white mb-1">Dalila Diamonds</p>
                      <p className="leading-relaxed">
                        Hoveniersstraat 30, Box - 105<br />
                        Suite 326, 2018 Antwerpen<br />
                        Belgium
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#c89e3a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:business@daliladiamonds.com" className="hover:text-[#c89e3a] transition-colors">
                      business@daliladiamonds.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#c89e3a] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:+32487939351" className="hover:text-[#c89e3a] transition-colors">
                      +32 487 93 93 51
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Browse Our Inventory Section */}
            <div>
              <div className="bg-[#c89e3a] text-white p-6 shadow-lg">
                <h3 className={`text-xl font-bold mb-3 ${marcellus.className}`}>
                  Browse Our Inventory
                </h3>
                <p className={`text-sm mb-4 text-white/90 ${jost.className}`}>
                  Discover our exquisite collection of premium diamonds
                </p>
                <button
                  onClick={() => router.push("/inventory")}
                  className={`w-full bg-white text-[#2d2d2d] py-2.5 px-4 hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 group font-semibold ${jost.className}`}
                >
                  <span>View Inventory</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          </aside>

          {/* Right Content Area - Blog Article */}
          <article className="flex-1">
            <h1 className={`text-3xl md:text-4xl lg:text-5xl text-[#1a1a1a] font-bold leading-tight mb-6 ${marcellus.className}`}>
              {blog.title}
            </h1>

            {/* Blog Content (Rich Text HTML) */}
            <div
              className={`blog-content ${jost.className}`}
              dangerouslySetInnerHTML={{ __html: blog.content || blog.description }}
            />
          </article>
        </div>
      </section>

      {/* Inventory Diamond Carousel - Full Width Outside Sidebar - Always Visible */}
      <div className="w-full py-16 bg-gray-50">
        <div className="mb-10">
          <h2
            className={`text-3xl md:text-4xl text-[#1a1a1a] font-bold text-center ${marcellus.className}`}
          >
            Featured Diamonds
          </h2>
          <div className="w-20 h-1 bg-[#c89e3a] mx-auto mt-4"></div>
        </div>

        {!diamondsFetched ? (
          <div className="container mx-auto px-4 text-center">
            <Loader2 className="w-12 h-12 text-[#c89e3a] animate-spin mx-auto" />
            <p className={`mt-4 text-gray-600 ${jost.className}`}>Loading diamonds...</p>
          </div>
        ) : inventoryDiamonds.length === 0 ? (
          <div className="container mx-auto px-4 text-center">
            <p className={`text-gray-600 text-lg ${jost.className}`}>
              No featured diamonds available at the moment. Please check back later or{" "}
              <button
                onClick={() => router.push('/inventory')}
                className="text-[#c89e3a] hover:text-[#b8922e] underline font-semibold"
              >
                browse our full inventory
              </button>
              .
            </p>
          </div>
        ) : (
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="bg-white p-6 md:p-10 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <button
                  onClick={prevSlide}
                  className="p-2 md:p-3 bg-[#c89e3a] hover:bg-[#b8922e] transition-all duration-300 shrink-0 z-10 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={inventoryDiamonds.length <= 3}
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </button>

                <div className="flex gap-4 md:gap-6 flex-1 justify-center items-center overflow-hidden relative px-2 md:px-6">
                  <div 
                    className="flex gap-4 md:gap-6 transition-all duration-700 ease-out"
                    style={{
                      transform: `translateX(-${currentSlide * (256 + 24)}px)` // 256px card width + 24px gap
                    }}
                  >
                    {inventoryDiamonds.map((diamond, index) => (
                        <button
                          key={diamond.STONE_NO || index}
                          onClick={() => setSelectedDiamond(diamond)}
                          className="bg-white p-4 md:p-6 w-56 md:w-64 shrink-0 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer text-left border-2 border-gray-200 hover:border-[#c89e3a]"
                        >
                          {/* Diamond Image */}
                          <div className="bg-gray-50 p-4 md:p-6 mb-4 flex items-center justify-center min-h-36 md:min-h-40 relative">
                            <div className="relative w-32 h-32 md:w-36 md:h-36">
                              <Image
                                src={diamond.REAL_IMAGE}
                                alt={diamond.STONE_NO || 'Diamond'}
                                fill
                                className="object-contain"
                                unoptimized
                              />
                            </div>
                          </div>
                          
                          {/* Diamond Details */}
                          <div className="text-center space-y-2">
                            <div className={`flex justify-center gap-2 text-sm font-semibold text-gray-900 ${jost.className}`}>
                              <span>{diamond.SHAPE}</span>
                              <span>{diamond.CARATS}</span>
                              <span>{diamond.COLOR}</span>
                              <span>{diamond.CLARITY}</span>
                            </div>
                            <div className={`flex justify-center gap-2 text-xs text-gray-600 ${jost.className}`}>
                              <span>{diamond.CUT || "N/A"}</span>
                              <span>{diamond.POL}</span>
                              <span>{diamond.SYM}</span>
                              <span>{diamond.LAB}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>

                <button
                  onClick={nextSlide}
                  className="p-2 md:p-3 bg-[#c89e3a] hover:bg-[#b8922e] transition-all duration-300 shrink-0 z-10 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={inventoryDiamonds.length <= 3}
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </button>
              </div>
              
              {/* Carousel Indicators */}
              {inventoryDiamonds.length > 3 && (
                <div className="flex justify-center gap-2 mt-6">
                  {Array.from({ length: Math.ceil(inventoryDiamonds.length - 2) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setCurrentSlide(index);
                        setTimeout(() => setIsAutoPlaying(true), 5000);
                      }}
                      className={`h-2 transition-all duration-500 ease-out ${
                        currentSlide === index 
                          ? 'w-8 bg-[#c89e3a]' 
                          : 'w-2 bg-gray-300 hover:bg-gray-400 hover:w-4'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Diamond Detail View Modal */}
      {selectedDiamond && (
        <DiamondDetailView
          diamond={selectedDiamond as unknown as DiamondData}
          onClose={() => setSelectedDiamond(null)}
        />
      )}
    </div>
    </>
  );
}
