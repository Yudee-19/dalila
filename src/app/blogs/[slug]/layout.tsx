import { Metadata } from 'next';
import { blogApi } from '@/lib/api';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    // Fetch all blogs to find the matching one
    const response = await blogApi.getAll({
      page: 1,
      limit: 1000,
      sortBy: "createdAt",
      sortOrder: "desc",
    });

    if (response && response.data) {
      // Normalize the slug from URL
      const normalizedSlug = slug.replace(/^\/+|\/+$/g, '');
      
      // Find the blog that matches the slug
      const blog = response.data.find((blog) => {
        if (blog.customSlug && blog.customSlug.trim()) {
          const normalizedCustomSlug = blog.customSlug.replace(/^\/+|\/+$/g, '');
          return normalizedCustomSlug === normalizedSlug;
        }
        
        const generatedSlug = blog.title
          .toString()
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-+|-+$/g, '');
        
        return generatedSlug === normalizedSlug;
      });

      if (blog) {
        return {
          title: blog.metaTitle || blog.title,
          description: blog.metaDescription || blog.h2Subtitle || blog.title,
          alternates: {
            canonical: `https://www.daliladiamonds.com/blogs/${normalizedSlug}`,
          },
          openGraph: {
            title: blog.metaTitle || blog.title,
            description: blog.metaDescription || blog.h2Subtitle || blog.title,
            url: `https://www.daliladiamonds.com/blogs/${normalizedSlug}`,
            siteName: 'Dalila Diamonds',
            type: 'article',
            images: blog.featuredImage ? [blog.featuredImage] : [],
          },
          twitter: {
            card: 'summary_large_image',
            title: blog.metaTitle || blog.title,
            description: blog.metaDescription || blog.h2Subtitle || blog.title,
            images: blog.featuredImage ? [blog.featuredImage] : [],
          },
        };
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  // Fallback metadata
  return {
    title: 'Blog Article - Dalila Diamonds',
    description: 'Read our latest insights about diamonds and the diamond industry.',
    alternates: {
      canonical: `https://www.daliladiamonds.com/blogs/${slug}`,
    },
  };
}

export default function BlogDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
