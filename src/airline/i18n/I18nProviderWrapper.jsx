'use client';
/**
 * Thin client wrapper so the RSC root layout can include I18nProvider.
 * Import this in app/layout.tsx — it makes useI18n() work on every page.
 */
import { I18nProvider } from './I18nContext.jsx';

export default function I18nProviderWrapper({ children }) {
  return <I18nProvider>{children}</I18nProvider>;
}
