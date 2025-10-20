import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { cn } from '@/lib/utils';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { getDictionary } from '@/lib/dictionaries';
import { Locale, i18n } from '../../i18n-config';

export const metadata: Metadata = {
  title: 'DevFolio - Álvaro Martín Crespo, Frontend Developer',
  description: 'The professional portfolio of Álvaro Martín Crespo, a frontend developer specializing in building scalable interfaces with Next.js and Tailwind CSS.',
  authors: [{ name: 'Álvaro Martín Crespo' }],
  creator: 'Álvaro Martín Crespo',
  keywords: ['frontend developer', 'next.js', 'react', 'tailwind css', 'portfolio'],
  openGraph: {
    title: 'DevFolio - Álvaro Martín Crespo, Frontend Developer',
    description: 'The professional portfolio of Álvaro Martín Crespo, a frontend developer specializing in building scalable interfaces with Next.js and Tailwind CSS.',
    url: 'https://tu-portfolio.com', // Replace with your actual domain
    siteName: 'DevFolio',
    type: 'website',
    images: [
      {
        url: 'https://tu-portfolio.com/og/default.png', // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: 'DevFolio by Álvaro Martín Crespo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevFolio - Álvaro Martín Crespo, Frontend Developer',
    description: 'The professional portfolio of Álvaro Martín Crespo, a frontend developer specializing in building scalable interfaces with Next.js and Tailwind CSS.',
    creator: '@tu', // Replace with your Twitter handle
    images: ['https://tu-portfolio.com/og/default.png'], // Replace with your actual OG image URL
  },
};

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(params.lang);
  const navLinks = [
    { href: '/', label: dictionary.navLinks.home },
    { href: '/projects', label: dictionary.navLinks.projects },
    { href: '/blog', label: dictionary.navLinks.blog },
    { href: '/about', label: dictionary.navLinks.about },
    { href: '/contact', label: dictionary.navLinks.contact },
  ];

  const copyrightText = dictionary.footer.copyright.replace('{year}', new Date().getFullYear().toString());

  return (
    <html lang={params.lang} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Álvaro Martín Crespo',
              url: 'https://tu-portfolio.com',
              sameAs: [
                'https://github.com/tu',
                'https://linkedin.com/in/tu',
              ],
              jobTitle: 'Frontend Developer',
            }),
          }}
        />
      </head>
      <body className={cn('font-body antialiased min-h-screen flex flex-col')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <Header navLinks={navLinks} lang={params.lang} />
            <main className="flex-grow">{children}</main>
            <Footer text={dictionary.footer.builtWith} copyright={copyrightText}/>
            <Toaster />
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
