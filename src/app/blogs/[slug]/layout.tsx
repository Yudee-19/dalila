import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const normalizedSlug = slug.replace(/^\/+|\/+$/g, '');
  
  // Provide default metadata for build time
  // The actual page will still fetch and display correct data client-side
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

export default function BlogDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
