'use client';

import { usePathname, useRouter } from 'next/navigation';
import { i18n, type Locale } from '@/i18n-config';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';

export function LanguageSwitcher() {
  const pathName = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const handleSwitch = (locale: string) => {
    router.push(redirectedPathName(locale as Locale));
  };

  const currentLocale = pathName.split('/')[1] as Locale;

  if (!isClient) {
    return <div className="w-[80px] h-10 rounded-md bg-muted animate-pulse" />;
  }

  return (
    <Select onValueChange={handleSwitch} defaultValue={currentLocale}>
      <SelectTrigger className="w-[80px]">
        <SelectValue placeholder="Lang" />
      </SelectTrigger>
      <SelectContent>
        {i18n.locales.map(locale => {
          return (
            <SelectItem key={locale} value={locale}>
              {locale.toUpperCase()}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
