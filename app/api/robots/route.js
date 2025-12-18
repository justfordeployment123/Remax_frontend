export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '/';

  const robotsRules = {
    '/': 'index, follow',
    '/admin': 'noindex, nofollow',
    '/account': 'noindex, nofollow',
    '/login': 'noindex, nofollow',
    '/find-agent': 'index, follow',
    '/property-search': 'index, follow',
    '/buying-guide': 'index, follow',
    '/selling-guide': 'index, follow',
    '/rental-guide': 'index, follow',
    '/commercial': 'index, follow',
    '/luxury': 'index, follow',
    '/articles-advice': 'index, follow',
    '/about-us': 'index, follow',
    '/contact-us': 'index, follow',
    '/homes-for-sale': 'index, follow',
    '/rental-search': 'index, follow',
    '/property': 'index, follow',
  };

  const rule = robotsRules[page] || 'index, follow';

  return new Response(null, {
    headers: {
      'X-Robots-Tag': rule,
    },
  });
}
