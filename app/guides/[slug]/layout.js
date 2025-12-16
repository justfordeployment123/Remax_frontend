import { notFound } from 'next/navigation';

async function getGuideArticle(slug) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/guide-articles/slug/${slug}`,
      { 
        next: { revalidate: 3600 } // Revalidate every hour
      }
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching guide for metadata:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const article = await getGuideArticle(params.slug);
  
  if (!article) {
    return {
      title: 'Guide Not Found | RE/MAX HUB Dubai',
      description: 'The guide you are looking for could not be found.'
    };
  }

  const titleTemplate = `${article.title} | RE/MAX HUB Dubai Guides`;
  const description = article.metaDescription || article.summary;
  const ogImage = article.ogImage || article.heroImage;
  const url = `https://remaxhub.ae/guides/${article.slug}`;

  return {
    title: titleTemplate,
    description: description,
    keywords: article.tags?.join(', ') || `${article.category}, Dubai real estate, guide`,
    canonical: url,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: article.ogTitle || article.title,
      description: article.ogDescription || description,
      type: 'article',
      url: url,
      images: [
        {
          url: ogImage || 'https://remaxhub.ae/og-default.jpg',
          width: 1200,
          height: 630,
          alt: article.title
        }
      ],
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: article.author?.firstName ? [`${article.author.firstName} ${article.author.lastName}`] : undefined,
      tags: article.tags || []
    },
    twitter: {
      card: 'summary_large_image',
      title: article.ogTitle || article.title,
      description: article.ogDescription || description,
      images: [ogImage || 'https://remaxhub.ae/og-default.jpg']
    }
  };
}

export default function Layout({ children }) {
  return children;
}
