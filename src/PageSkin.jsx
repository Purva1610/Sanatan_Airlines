import { getSkin } from './pageSkins.js';

/**
 * Wraps a page in its visual "skin". Purely presentational: renders a
 * `display: contents` element carrying data-attributes and CSS variables
 * that src/skins.css reads. Page content is passed through untouched.
 */
/* CSS backgrounds bypass next/image, so use the pre-built WebP (scripts/optimize-images.mjs). */
const webp = (src) => (typeof src === 'string' ? src.replace(/.(jpe?g|png)$/i, '.webp') : src);

export default function PageSkin({ route, children }) {
  const skin = getSkin(route);
  if (!skin) return children;
  const style = {
    display: 'contents',
    '--skin-img': `url("${webp(skin.img)}")`,
    '--skin-img2': `url("${webp(skin.img2)}")`,
    '--skin-img3': `url("${webp(skin.img3)}")`,
  };
  return (
    <div
      className="skin"
      data-skin={skin.id}
      data-hero={skin.hero}
      data-tone={skin.tone}
      data-cards={skin.cards}
      data-font={skin.font}
      data-motion={skin.motion}
      data-pattern={skin.pattern}
      data-align={skin.align}
      style={style}
    >
      {children}
    </div>
  );
}
