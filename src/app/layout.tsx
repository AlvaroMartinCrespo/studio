import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FirebaseClientProvider } from '@/firebase/client-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'DevFolio - Álvaro Martín Crespo, Frontend Developer',
  description: 'Portfolio de Álvaro Martín Crespo, un desarrollador frontend especializado en React, Next.js y Tailwind CSS.',
};

const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/about', label: 'Sobre mí' },
    { href: '/projects', label: 'Proyectos' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contacto' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <FirebaseClientProvider>
            <Header navLinks={navLinks} />
            <main>{children}</main>
            <Footer 
              text="Desarrollador Frontend especializado en crear experiencias web modernas."
              copyright="© 2024 Álvaro Martín Crespo. Todos los derechos reservados."
            />
            <Toaster />
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
