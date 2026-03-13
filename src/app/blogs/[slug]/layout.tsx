import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

type BlogSeoConfig = {
  title: string;
  description: string;
  url: string;
};

type BlogSchemaConfig = {
  headline: string;
  description: string;
  url: string;
  image: string;
};

const BLOG_SEO_CONFIG: Record<string, BlogSeoConfig> = {
  'how-are-diamonds-formed-dalila-diamond': {
    title: 'How Are Diamonds Formed? Natural Diamond Formation Guide',
    description:
      'Learn how diamonds are formed deep inside the Earth under extreme heat and pressure. Discover the natural process behind diamond creation and their journey to the surface.',
    url: 'https://www.daliladiamonds.com/blogs/how-are-diamonds-formed-dalila-diamond',
  },
  'diamond-sizes-in-mm-complete-ct-to-mm-diamond-conversion-guide': {
    title: 'Diamond Sizes in MM: Complete Carat to MM Conversion Guide',
    description:
      'Explore diamond sizes in mm with our complete carat to mm conversion guide. Learn how diamond carat weight relates to actual size and choose the perfect diamond.',
    url: 'https://www.daliladiamonds.com/blogs/diamond-sizes-in-mm-complete-ct-to-mm-diamond-conversion-guide',
  },
  'top-5-popular-diamond-trading-markets-around-the-world': {
    title: 'Top 5 Popular Diamond Trading Markets Around the World',
    description:
      'Discover the top 5 global diamond trading markets including Antwerp, Dubai, and Mumbai. Learn where diamonds are bought, sold, and traded worldwide.',
    url: 'https://www.daliladiamonds.com/blogs/top-5-popular-diamond-trading-markets-around-the-world',
  },
  'diamond-price-guide': {
    title: 'Diamond Price Guide: Factors That Affect Diamond Prices',
    description:
      'Complete diamond price guide explaining the 4Cs, market trends, and factors that influence diamond value to help you understand how diamonds are priced.',
    url: 'https://www.daliladiamonds.com/blogs/diamond-price-guide',
  },
};

const BLOG_SCHEMA_CONFIG: Record<string, BlogSchemaConfig> = {
  'how-are-diamonds-formed-dalila-diamond': {
    headline: 'How Are Diamonds Formed? Natural Diamond Formation Guide',
    description:
      'Learn how diamonds are formed deep inside the Earth under extreme heat and pressure. Discover the natural process behind diamond creation and their journey to the surface.',
    url: 'https://www.daliladiamonds.com/blogs/how-are-diamonds-formed-dalila-diamond',
    image: 'https://www.daliladiamonds.com/dalila_img/Dalila_Logo.png',
  },
  'diamond-sizes-in-mm-complete-ct-to-mm-diamond-conversion-guide': {
    headline: 'Diamond Sizes in MM: Complete Carat to MM Conversion Guide',
    description:
      'Explore diamond sizes in mm with a complete carat to mm conversion guide. Learn how diamond carat weight relates to actual size and measurements.',
    url: 'https://www.daliladiamonds.com/blogs/diamond-sizes-in-mm-complete-ct-to-mm-diamond-conversion-guide',
    image: 'https://www.daliladiamonds.com/dalila_img/Dalila_Logo.png',
  },
  'top-5-popular-diamond-trading-markets-around-the-world': {
    headline: 'Top 5 Popular Diamond Trading Markets Around the World',
    description:
      'Discover the top diamond trading markets around the world including Antwerp, Dubai, Mumbai, Israel, and Shanghai and their role in the global diamond industry.',
    url: 'https://www.daliladiamonds.com/blogs/top-5-popular-diamond-trading-markets-around-the-world',
    image: 'https://www.daliladiamonds.com/dalila_img/Dalila_Logo.png',
  },
  'diamond-price-guide': {
    headline: 'Diamond Price Guide: Factors That Affect Diamond Prices',
    description:
      'Complete diamond price guide explaining the 4Cs, market trends, and factors that influence diamond value and pricing.',
    url: 'https://www.daliladiamonds.com/blogs/diamond-price-guide',
    image: 'https://www.daliladiamonds.com/dalila_img/Dalila_Logo.png',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, '');
  const matchedSeo = BLOG_SEO_CONFIG[normalizedSlug];

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
  const schemaConfig = BLOG_SCHEMA_CONFIG[normalizedSlug];

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
