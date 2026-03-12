import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogs & Articles - Dalila Diamonds | Diamond Industry Insights',
  description: 'Explore expert insights, industry trends, and educational articles about diamonds. Learn about diamond quality, certification, and the latest in the diamond industry.',
  alternates: {
    canonical: 'https://www.daliladiamonds.com/blogs',
  },
  openGraph: {
    title: 'Blogs & Articles - Dalila Diamonds',
    description: 'Explore expert insights, industry trends, and educational articles about diamonds.',
    url: 'https://www.daliladiamonds.com/blogs',
    siteName: 'Dalila Diamonds',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blogs & Articles - Dalila Diamonds',
    description: 'Explore expert insights, industry trends, and educational articles about diamonds.',
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
