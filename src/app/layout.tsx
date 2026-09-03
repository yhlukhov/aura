import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'cyrillic-ext'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AURA ✦ Простір онлайн-медитацій та духовних практик',
  description: 'Знайди свій простір тиші, гармонії та зцілення. Онлайн-сеанси рейкі, медитації, звукотерапія та дихальні практики з найкращими майстрами.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col selection:bg-sage-light selection:text-sage-dark">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t border-sand bg-sand-light/60 py-10 px-6 text-center text-xs text-deep-muted">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sage text-lg">✦</span>
              <span className="font-serif text-xl font-bold tracking-wider text-deep">AURA</span>
              <span className="text-[11px] text-deep-muted ml-1">© 2026 Простір живих онлайн-практик</span>
            </div>
            <p className="text-[11px] text-deep-muted">
              Зроблено з любовʼю до внутрішнього спокою • Україна, Львів & Онлайн
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
