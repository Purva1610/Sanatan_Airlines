function renderJsonLd(data) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export function BreadcrumbStructuredData({ origin, items }) {
  if (!origin || !items?.length) return null;

  return renderJsonLd({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: `${origin}${path}`,
    })),
  });
}

export function FaqStructuredData({ items }) {
  const questions = (items || [])
    .filter(([question, answer]) => typeof question === 'string' && typeof answer === 'string' && question.trim() && answer.trim())
    .map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    }));

  if (!questions.length) return null;

  return renderJsonLd({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions,
  });
}
