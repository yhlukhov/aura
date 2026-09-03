'use client';

import { Search, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
  return (
    <section className="relative max-w-5xl mx-auto px-6 pt-12 sm:pt-20 pb-10 text-center">
      {/* М'яка декоративна аура */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amethyst/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amethyst-light text-amethyst-dark text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-amethyst" />
        <span>Живі онлайн-кола та практики</span>
      </div>

      <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-deep tracking-tight mb-6 leading-[1.12]">
        Знайди свій простір <br className="hidden sm:inline" />
        <span className="italic font-normal text-sage-dark">тиші, сили та зцілення</span>
      </h1>

      <p className="text-deep/70 text-base sm:text-lg max-w-2xl mx-auto font-light mb-10 leading-relaxed">
        Сеанси Рейкі, глибинні медитації, звукотерапія та дихальні практики з провідниками. Приєднуйся онлайн у затишку власного дому.
      </p>

      {/* Пошуковий рядок */}
      <div className="max-w-xl mx-auto relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Пошук практики, імені майстра або теми (рейкі, чаші, чакри)..."
            className="w-full pl-12 pr-10 py-4 rounded-full bg-white/90 backdrop-blur border border-sand shadow-sm hover:border-sage/50 focus:outline-none focus:ring-2 focus:ring-sage/30 text-sm transition"
          />
          <Search className="w-5 h-5 text-deep-muted absolute left-4 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 text-xs text-deep-muted hover:text-deep transition"
            >
              Очистити
            </button>
          )}
        </div>

        {/* Швидкі підказки для пошуку */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-deep-muted">
          <span>Часто шукають:</span>
          {['Рейкі', 'Чаші', 'Заспокоєння', 'Донейшн', 'Чакри'].map((tag) => (
            <button
              key={tag}
              onClick={() => onSearchChange(tag)}
              className="underline hover:text-sage-dark transition cursor-pointer"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
