import 'server-only';
import type { Locale } from '@/i18n-config';

// The 'any' type is used here to dynamically import the dictionaries, 
// which is a common practice in i18n setups.
const dictionaries: Record<Locale, () => Promise<any>> = {
  en: () => import('@/dictionaries/en.json').then(module => module.default),
  es: () => import('@/dictionaries/es.json').then(module => module.default),
};

export const getDictionary = async (locale: Locale) => {
  // Check if the requested locale is supported. If not, default to English.
  const loader = dictionaries[locale] ?? dictionaries.en;
  return loader();
};
