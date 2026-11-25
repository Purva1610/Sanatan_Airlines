# Official Reference Standards

Implementation and acceptance decisions should use these primary sources:

- [Google Search Central: Understanding Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [W3C: Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/)
- [Google Search Central: SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

Trend articles may inform options, but they must not replace primary requirements or project-specific acceptance criteria.

## Performance

Google defines the Core Web Vitals targets below:

| Metric | Good target |
| --- | --- |
| Largest Contentful Paint (LCP) | 2.5 seconds or less |
| Interaction to Next Paint (INP) | 200 milliseconds or less |
| Cumulative Layout Shift (CLS) | 0.1 or less |

Acceptance must use real-user field evidence where available, plus representative laboratory tests. Avoid sacrificing accessibility or content clarity for visual effect.

## Accessibility

The project acceptance target is WCAG 2.2 Level AA. Testing should cover:

- Keyboard operation and visible focus
- Semantic heading and landmark structure
- Form names, labels, instructions and error identification
- Text and non-text contrast
- Target size and spacing
- Focus not obscured
- Motion and reduced-motion behavior
- Screen-reader navigation
- Desktop, tablet, mobile and zoom behavior

WCAG conformance must be verified against the current W3C recommendation and published as a test summary. It should not be represented as a full certification until an independent or documented audit supports that conclusion.

## SEO

Public pages should follow the Google Search Central SEO Starter Guide:

- Give crawlers access to the rendered public content and resources.
- Use descriptive, unique titles and concise descriptions.
- Use readable URLs and meaningful internal links.
- Use canonical URLs and avoid duplicate public routes.
- Generate an accurate XML sitemap for indexable pages.
- Use robots directives to exclude private or noindex pages.
- Provide useful content and avoid misleading or unsupported claims.
- Use structured data only where it accurately represents the page.

## Design Direction

Trends should be adopted only when they improve clarity, trust, conversion or usability:

- Editorial layouts and restrained modular grids
- Strong, readable typography
- Mobile-first content hierarchy
- Purposeful, finite micro-interactions
- Accessible-by-default components
- No decorative motion that obscures content or impairs control operation
- Responsive media with appropriate sizes, formats and alternative text

These standards should be checked during Figma review, implementation review, QA and UAT rather than applied only after deployment.
