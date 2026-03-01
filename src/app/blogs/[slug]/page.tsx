"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Marcellus, Jost } from "next/font/google";
import { ArrowLeft, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import AnimatedContainer from "@/components/shared/AnimatedContainer";
import { blogApi, diamondApi, type Blog, type LimitedEditionDiamond } from "@/lib/api";
import { getBlogSlug } from "@/utils/helpers";
import DiamondDetailView from "@/components/DiamondDetailView";
import type { DiamondData } from "@/types/diamond.types";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [limitedEditionDiamonds, setLimitedEditionDiamonds] = useState<LimitedEditionDiamond[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedDiamond, setSelectedDiamond] = useState<LimitedEditionDiamond | null>(null);

  useEffect(() => {
    if (params.slug) {
      fetchBlogDetail(params.slug as string);
    }
    fetchLimitedEditionDiamonds();
  }, [params.slug]);

  // Auto-play carousel effect
  useEffect(() => {
    if (!isAutoPlaying || limitedEditionDiamonds.length <= 3) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => 
        (prev + 1) % Math.max(1, limitedEditionDiamonds.length - 2)
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, limitedEditionDiamonds.length]);

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

  const fetchLimitedEditionDiamonds = async () => {
    try {
      const response = await diamondApi.getLimitedEdition();
      if (response && response.success && response.data) {
        setLimitedEditionDiamonds(response.data.diamonds.slice(0, 8)); // Get first 8 diamonds
      }
    } catch (err) {
      console.error("Limited edition fetch error:", err);
    }
  };

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide(
      (prev) => (prev + 1) % Math.max(1, limitedEditionDiamonds.length - 2),
    );
    setTimeout(() => setIsAutoPlaying(true), 5000); // Resume auto-play after 5 seconds
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.max(1, limitedEditionDiamonds.length - 2)) %
        Math.max(1, limitedEditionDiamonds.length - 2),
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
      {/* Back Button */}
      <div className="container mx-auto max-w-5xl px-4 pt-40 pb-6">
        <button
          onClick={() => router.back()}
          className={`inline-flex items-center gap-2 text-[#c89e3a] hover:text-[#b8922e] font-medium transition-all ${jost.className} hover:gap-3`}
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      {/* Blog Content */}
      <article className="container mx-auto max-w-5xl px-4 pb-16">
        <AnimatedContainer direction="up">
          <div className="bg-white">
            <div className="max-w-4xl mx-auto">
              {/* Title */}
              <h1
                className={`text-3xl md:text-4xl lg:text-5xl text-[#1a1a1a] font-bold leading-tight mb-6 ${marcellus.className}`}
              >
                {blog.title}
              </h1>

              {/* Featured Image - After H1 */}
              {blog.featuredImage && (
                <div className="w-full h-72 md:h-[500px] overflow-hidden rounded-lg mb-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}

              {/* Blog Content (Rich Text HTML) */}
              <div
                className={`blog-content ${jost.className}`}
                dangerouslySetInnerHTML={{ __html: blog.content || blog.description }}
              />
            </div>
          </div>
        </AnimatedContainer>

        {/* Limited Edition Diamond Carousel */}
        {limitedEditionDiamonds.length > 0 && (
          <div className="mt-20">
            <div className="mb-10">
              <h2
                className={`text-3xl md:text-4xl text-[#1a1a1a] font-bold text-center ${marcellus.className}`}
              >
                Limited Edition
              </h2>
              <div className="w-20 h-1 bg-[#c89e3a] mx-auto mt-4"></div>
            </div>

            <div className="bg-white p-8 shadow-md border border-gray-200">
              <div className="flex items-center justify-between">
                <button
                  onClick={prevSlide}
                  className="p-3 bg-[#c89e3a] hover:bg-[#b8922e] transition-all duration-300 flex-shrink-0 z-10 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={limitedEditionDiamonds.length <= 3}
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                <div className="flex gap-6 flex-1 justify-center items-center overflow-hidden relative px-6">
                  {limitedEditionDiamonds.length > 0 ? (
                    <div 
                      className="flex gap-6 transition-all duration-700 ease-out"
                      style={{
                        transform: `translateX(-${currentSlide * (256 + 24)}px)` // 256px card width + 24px gap
                      }}
                    >
                      {limitedEditionDiamonds.map((diamond, index) => (
                        <button
                          key={diamond.STONE_NO || index}
                          onClick={() => setSelectedDiamond(diamond)}
                          className="bg-white p-6 w-64 flex-shrink-0 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer text-left border-2 border-gray-200 hover:border-[#c89e3a]"
                        >
                          <div className="bg-gray-50 p-6 mb-4 flex items-center justify-center">
                            {diamond.MP4 ? (
                              <video
                                className="w-36 h-36 object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                              >
                                <source src={diamond.MP4} type="video/mp4" />
                              </video>
                            ) : diamond.REAL_IMAGE ? (
                              <Image
                                src={diamond.REAL_IMAGE}
                                alt={diamond.STONE_NO}
                                width={144}
                                height={144}
                                className="w-36 h-36 object-cover"
                              />
                            ) : (
                              <div className="w-36 h-36 bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-400 text-sm">No Image</span>
                              </div>
                            )}
                          </div>
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
                  ) : (
                    <div className="text-center text-gray-500">
                      No limited edition diamonds available
                    </div>
                  )}
                </div>

                <button
                  onClick={nextSlide}
                  className="p-3 bg-[#c89e3a] hover:bg-[#b8922e] transition-all duration-300 flex-shrink-0 z-10 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={limitedEditionDiamonds.length <= 3}
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>
              
              {/* Carousel Indicators */}
              {limitedEditionDiamonds.length > 3 && (
                <div className="flex justify-center gap-2 mt-6">
                  {Array.from({ length: Math.ceil(limitedEditionDiamonds.length - 2) }).map((_, index) => (
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
      </article>

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
