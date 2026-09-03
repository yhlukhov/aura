'use client';

import { useState } from 'react';
import Image from 'next/image';

interface AmbientBannerProps {
  bannerUrl: string;
  title: string;
  categoryName: string;
  dateBadge?: string;
  isFeatured?: boolean;
}

export default function AmbientBanner({
  bannerUrl,
  title,
  categoryName,
  dateBadge,
  isFeatured,
}: AmbientBannerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full rounded-3xl overflow-visible my-4 group">
      {/* 1. Розмитий фоновий ореол (Ambient Glow) у тонах самого банера */}
      <div
        className="absolute -inset-2 sm:-inset-4 rounded-3xl opacity-35 sm:opacity-45 blur-2xl sm:blur-3xl -z-10 transition-opacity duration-700 pointer-events-none"
        style={{
          backgroundImage: `url(${bannerUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* 2. Основний контейнер зображення банера */}
      <div className="relative w-full aspect-[16/9] max-h-[520px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-white/60 bg-sand-dark/20">
        <Image
          src={bannerUrl}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1200px"
          className={`object-cover transition-transform duration-700 group-hover:scale-[1.02] ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
        />

        {/* Мʼяке затемнення знизу для збереження контрасту */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Плаваючі бейджі поверх банера */}
        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
          <span className="bg-black/40 backdrop-blur-md text-white text-xs font-medium px-3.5 py-1.5 rounded-full border border-white/20">
            {categoryName}
          </span>
          {isFeatured && (
            <span className="bg-gold text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-gold-glow flex items-center gap-1">
              <span>⭐</span> Топ подія
            </span>
          )}
        </div>

        {dateBadge && (
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-xs uppercase tracking-wider font-semibold opacity-90 block mb-1">
              Дата та час зустрічі
            </span>
            <span className="text-base sm:text-lg font-medium drop-shadow-sm">
              {dateBadge}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
