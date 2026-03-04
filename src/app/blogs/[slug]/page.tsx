"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Marcellus, Jost } from "next/font/google";
import { ArrowLeft, Loader2, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import AnimatedContainer from "@/components/shared/AnimatedContainer";
import { blogApi, inventoryApi, type Blog } from "@/lib/api";
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

        // Normalize the slug from URL (remove leading/trailing slashes)
        const normalizedSlug = slug.replace(/^\/+|\/+$/g, '');
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
      console.log("Fetching inventory diamonds for blog...");
      // Fetch top 10 diamonds from inventory search API
      const response = await inventoryApi.searchDiamonds({
        page: 1,
        limit: 10
      });
      
      console.log("Inventory API response:", response);
      
      if (response && response.success) {
        // The inventory search API returns data as the array directly
        const diamonds = Array.isArray(response.data) ? response.data : [];
        console.log(`Total diamonds received: ${diamonds.length}`);
        
        // Filter diamonds that have images
        const diamondsWithImages = diamonds.filter((d: InventoryDiamond) => 
          d.REAL_IMAGE && d.REAL_IMAGE.trim()
        );
        console.log(`Loaded ${diamondsWithImages.length} inventory diamonds with images`);
        setInventoryDiamonds(diamondsWithImages);
        setDiamondsFetched(true);
      } else {
        console.error("Invalid response structure:", response);
        setDiamondsFetched(true);
      }
    } catch (err) {
      console.error("Inventory diamonds fetch error:", err);
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
      <div className="container mx-auto max-w-7xl px-4 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <aside className="lg:w-1/4 w-full">
            <AnimatedContainer direction="left">
              {/* Our Articles Section */}
              <div className="bg-white border border-gray-200 p-6 mb-6 shadow-sm sticky top-4">
                <h2
                  className={`text-2xl font-bold text-[#1a1a1a] mb-4 pb-3 border-b-2 border-[#c89e3a] ${marcellus.className}`}
                >
                  Our Articles
                </h2>
                {loading && allBlogs.length === 0 ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-[#c89e3a]" />
                  </div>
                ) : allBlogs.length === 0 ? (
                  <p className={`text-gray-600 text-sm ${jost.className}`}>
                    No articles available
                  </p>
                ) : (
                  <div className="space-y-4">
                    {allBlogs.slice(0, 8).map((articleItem) => (
                      <Link
                        key={articleItem._id}
                        href={`/blogs/${getBlogSlug(articleItem)}`}
                        scroll={false}
                        className={`group cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded transition-colors block ${
                          blog?._id === articleItem._id ? 'bg-amber-50' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h3
                            className={`text-sm group-hover:text-[#c89e3a] transition-colors line-clamp-2 flex-1 ${
                              blog?._id === articleItem._id 
                                ? 'text-[#c89e3a] font-semibold' 
                                : 'text-gray-700'
                            } ${jost.className}`}
                          >
                            {articleItem.title}
                          </h3>
                          <ArrowRight
                            size={16}
                            className={`group-hover:text-[#c89e3a] group-hover:translate-x-1 transition-all shrink-0 mt-0.5 ${
                              blog?._id === articleItem._id 
                                ? 'text-[#c89e3a]' 
                                : 'text-gray-400'
                            }`}
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Browse Our Inventory Section */}
              <div className="bg-linear-to-br from-slate-900 to-slate-800 p-6 shadow-lg sticky top-4">
                <h2
                  className={`text-xl font-bold text-white mb-3 ${marcellus.className}`}
                >
                  Browse Our Inventory
                </h2>
                <p className={`text-gray-300 text-sm mb-4 ${jost.className}`}>
                  Discover our exquisite collection of premium diamonds
                </p>
                <button
                  onClick={() => router.push("/inventory")}
                  className={`w-full bg-[#c89e3a] text-white py-2.5 px-4 hover:bg-[#b8922e] transition-colors flex items-center justify-center gap-2 group ${jost.className}`}
                >
                  <span className="font-semibold">View Inventory</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </AnimatedContainer>
          </aside>

          {/* Right Content Area - Blog Content */}
          <main id="blog-content-area" className="lg:w-3/4 w-full">

      {/* Blog Content */}
      <article className="pb-8">
        <AnimatedContainer direction="up">
          <div className="bg-white">
            <div className="max-w-4xl mx-auto">
              {/* Featured Image - At Top */}
              {/* {blog.featuredImage && (
                <div className="w-full h-72 md:h-[500px] overflow-hidden rounded-lg mb-8">
                 
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )} */}

             
              <h1
                className={`text-3xl md:text-4xl lg:text-5xl text-[#1a1a1a] font-bold leading-tight mb-6 ${marcellus.className}`}
              >
                {blog.title}
              </h1>

              {/* Blog Content (Rich Text HTML) */}
              <div
                className={`blog-content ${jost.className}`}
                dangerouslySetInnerHTML={{ __html: blog.content || blog.description }}
              />
            </div>
          </div>
        </AnimatedContainer>
      </article>

          </main>
        </div>
      </div>

      {/* Inventory Diamond Carousel - Full Width Outside Sidebar */}
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
            <p className="mt-4 text-gray-600">Loading diamonds...</p>
          </div>
        ) : inventoryDiamonds.length === 0 ? (
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600">No diamonds available at the moment.</p>
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
  );
}
