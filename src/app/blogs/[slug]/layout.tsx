import { Metadata } from 'next';
import { cache } from 'react';
import { getBlogSlug } from '@/utils/helpers';

type Props = {
  params: Promise<{ slug: string }>;
};

type BlogSeoData = {
  title: string;
  description: string;
  url: string;
};

type BlogSchemaData = {
  headline: string;
  description: string;
  url: string;
  image: string;
};

type BackendBlog = {
  title: string;
  customSlug?: string;
  metaTitle?: string;
  metaDescription?: string;
  description?: string;
  content?: string;
  featuredImage?: string;
};

type BlogsApiResponse = {
  data?: BackendBlog[];
};

type BlogSeoSchemaEntry = {
  seo: BlogSeoData;
  schema: BlogSchemaData;
};

const SITE_BASE_URL = 'https://www.daliladiamonds.com';
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://dalila-inventory-service-dev.caratlogic.com';
const DEFAULT_IMAGE = `${SITE_BASE_URL}/dalila_img/Dalila_Logo.png`;
const DEFAULT_DESCRIPTION = 'Read our latest insights about diamonds and the diamond industry.';

function stripHtml(input: string): string {
  return input
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getBestDescription(blog: BackendBlog): string {
  if (blog.metaDescription && blog.metaDescription.trim()) {
    return blog.metaDescription.trim();
  }

  const plain = stripHtml(blog.description || blog.content || '');
  if (!plain) {
    return DEFAULT_DESCRIPTION;
  }

  return plain.length > 200 ? `${plain.slice(0, 197)}...` : plain;
}

const getBlogs = cache(async (): Promise<BackendBlog[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/blogs`, {
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as BlogsApiResponse;
    return Array.isArray(payload.data) ? payload.data : [];
  } catch {
    return [];
  }
});

const getBlogSeoSchemaBySlug = cache(async (): Promise<Record<string, BlogSeoSchemaEntry>> => {
  const blogs = await getBlogs();
  const entries: Record<string, BlogSeoSchemaEntry> = {};

  for (const blog of blogs) {
    const slug = getBlogSlug({ title: blog.title, customSlug: blog.customSlug }).replace(/^\/+|\/+$/g, '');
    const url = `${SITE_BASE_URL}/blogs/${slug}`;
    const title = blog.metaTitle?.trim() || blog.title || 'Blog Article - Dalila Diamonds';
    const description = getBestDescription(blog);

    entries[slug] = {
      seo: {
        title,
        description,
        url,
      },
      schema: {
        headline: blog.title || title,
        description,
        url,
        image: blog.featuredImage?.trim() || DEFAULT_IMAGE,
      },
    };
  }

  return entries;
});

export async function generateStaticParams() {
  const blogs = await getBlogs();

  return blogs.map((blog) => ({
    slug: getBlogSlug({ title: blog.title, customSlug: blog.customSlug }).replace(/^\/+|\/+$/g, ''),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, '');
  const blogEntries = await getBlogSeoSchemaBySlug();
  const matchedSeo = blogEntries[normalizedSlug]?.seo;

  if (matchedSeo) {
    return {
      title: matchedSeo.title,
      description: matchedSeo.description,
      alternates: {
        canonical: matchedSeo.url,
      },
      openGraph: {
        title: matchedSeo.title,
        description: matchedSeo.description,
        url: matchedSeo.url,
        siteName: 'Dalila Diamonds',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: matchedSeo.title,
        description: matchedSeo.description,
      },
    };
  }

  return {
    title: 'Blog Article - Dalila Diamonds',
    description: 'Read our latest insights about diamonds and the diamond industry.',
    alternates: {
      canonical: `https://www.daliladiamonds.com/blogs/${normalizedSlug}`,
    },
    openGraph: {
      title: 'Blog Article - Dalila Diamonds',
      description: 'Read our latest insights about diamonds and the diamond industry.',
      url: `https://www.daliladiamonds.com/blogs/${normalizedSlug}`,
      siteName: 'Dalila Diamonds',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog Article - Dalila Diamonds',
      description: 'Read our latest insights about diamonds and the diamond industry.',
    },
  };
}

export default async function BlogDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, '');
  const blogEntries = await getBlogSeoSchemaBySlug();
  const schemaConfig = blogEntries[normalizedSlug]?.schema;

  const blogPostingSchema = schemaConfig
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': schemaConfig.url,
        },
        headline: schemaConfig.headline,
        description: schemaConfig.description,
        image: schemaConfig.image,
        author: {
          '@type': 'Organization',
          name: 'Dalila Diamonds',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Dalila Diamonds',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.daliladiamonds.com/dalila_img/Dalila_Logo.png',
          },
        },
      }
    : null;

  return (
    <>
      {blogPostingSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
        />
      )}
      {children}
    </>
  );
}
