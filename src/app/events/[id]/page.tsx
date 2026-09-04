'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { mockEvents } from '@/data/mockEvents';
import AmbientBanner from '@/components/AmbientBanner';
import RegistrationModal from '@/components/RegistrationModal';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Video, 
  Share2, 
  Check, 
  Sparkles,
  Send,
  Heart
} from 'lucide-react';

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = mockEvents.find((e) => e.id === params.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!event) {
    notFound();
  }

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-32">
      {/* Навігація назад */}
      <div className="flex items-center justify-between mb-4 text-xs">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-deep-muted hover:text-sage-dark transition font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>До всіх подій</span>
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-sand hover:border-sage text-deep-muted hover:text-deep transition"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-sage" />
              <span className="text-sage font-medium">Посилання скопійовано!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Поділитися</span>
            </>
          )}
        </button>
      </div>

      {/* 1. БАНЕР ОРГАНІЗАТОРА З ЕФЕКТОМ AMBIENT GLOW */}
      <AmbientBanner
        bannerUrl={event.bannerUrl}
        title={event.title}
        categoryName={event.categoryName}
      />

      {/* 2. ЗАГОЛОВОК ТА ШВИДКА ІНФО-СТРІЧКА */}
      <div className="mt-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-sage-dark uppercase tracking-wider">
          <span>{event.categoryName}</span>
          <span>•</span>
          <span>{event.platform}</span>
          <span>•</span>
          <span>Київський час</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-deep leading-tight">
          {event.title}
        </h1>

        {/* Картки швидких деталей */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
          <div className="p-3.5 rounded-2xl bg-white/80 border border-sand">
            <span className="text-[11px] text-deep-muted block flex items-center gap-1 mb-1">
              <Calendar className="w-3.5 h-3.5 text-sage" /> Дата зустрічі
            </span>
            <span className="text-sm font-semibold text-deep">{event.date}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/80 border border-sand">
            <span className="text-[11px] text-deep-muted block flex items-center gap-1 mb-1">
              <Clock className="w-3.5 h-3.5 text-sage" /> Час та тривалість
            </span>
            <span className="text-sm font-semibold text-deep">{event.time} ({event.durationMinutes} хв)</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/80 border border-sand">
            <span className="text-[11px] text-deep-muted block flex items-center gap-1 mb-1">
              <Video className="w-3.5 h-3.5 text-sage" /> Формат трансляції
            </span>
            <span className="text-sm font-semibold text-deep">{event.platform}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/80 border border-sand">
            <span className="text-[11px] text-deep-muted block flex items-center gap-1 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-gold" /> Умови участі
            </span>
            <span className="text-sm font-semibold text-sage-dark">{event.priceFormatted}</span>
          </div>
        </div>
      </div>

      {/* 3. ОСНОВНИЙ КОНТЕНТ ПОДІЇ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        
        {/* Ліва частина: опис, програма, підготовка */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Про практику */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur border border-sand space-y-4">
            <h2 className="font-serif text-2xl font-bold text-deep flex items-center gap-2">
              <span className="text-sage">✦</span> Про практику
            </h2>
            <div className="text-deep/80 text-sm sm:text-base leading-relaxed whitespace-pre-line font-light">
              {event.description}
            </div>
          </div>

          {/* Програма зустрічі */}
          {event.programSteps && event.programSteps.length > 0 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur border border-sand space-y-4">
              <h2 className="font-serif text-2xl font-bold text-deep">
                Програма сесії
              </h2>
              <div className="space-y-3">
                {event.programSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-deep/80">
                    <span className="w-6 h-6 rounded-full bg-sage-light text-sage-dark font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Блок «Що підготувати» */}
          <div className="p-6 sm:p-8 rounded-3xl bg-sage-light/40 border border-sage/20 space-y-4">
            <div className="flex items-center gap-2 text-sage-dark">
              <Heart className="w-5 h-5 fill-sage/20" />
              <h3 className="font-serif text-xl font-bold">
                Що підготувати для комфортної практики:
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {event.preparationTips.map((tip, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 border border-sage/10 text-xs sm:text-sm text-deep/80 shadow-2xs"
                >
                  <span className="text-xl">{tip.icon}</span>
                  <span>{tip.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Права колонка: Майстер та швидкі контакти */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white/90 backdrop-blur border border-sand space-y-4 shadow-sm sticky top-24">
            <span className="text-[11px] uppercase tracking-wider text-deep-muted font-semibold block">
              Провідник практики
            </span>

            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-sage/20 shadow-sm shrink-0">
                <Image
                  src={event.master.avatar}
                  alt={event.master.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-deep">
                  {event.master.name}
                </h3>
                <p className="text-xs text-sage-dark font-medium mt-0.5">
                  {event.master.title}
                </p>
              </div>
            </div>

            {event.master.bio && (
              <p className="text-xs text-deep/70 leading-relaxed font-light pt-2 border-t border-sand">
                {event.master.bio}
              </p>
            )}

            {event.master.telegram && (
              <a
                href={`https://t.me/${event.master.telegram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-sand/60 hover:bg-sand text-xs font-medium text-deep transition"
              >
                <Send className="w-3.5 h-3.5 text-sage-dark" />
                <span>Звʼязатися: {event.master.telegram}</span>
              </a>
            )}

            {/* Кнопка реєстрації на десктопі */}
            <div className="pt-4 border-t border-sand space-y-2">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-xs text-deep-muted">Внесок:</span>
                <span className="font-serif text-2xl font-bold text-sage-dark">
                  {event.priceFormatted}
                </span>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3.5 rounded-full bg-sage text-white font-medium text-sm hover:bg-sage-dark transition shadow-md shadow-sage/20 flex items-center justify-center gap-2"
              >
                <span>Зареєструватися</span>
                <span className="text-xs">✦</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 4. НИЖНЯ ФІКСОВАНА ПАНЕЛЬ (Sticky Mobile Bar) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden glass-panel border-t border-sand p-4 px-6">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-deep-muted block">Вартість:</span>
            <span className="font-serif text-xl font-bold text-sage-dark">
              {event.priceFormatted}
            </span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 py-3 px-6 rounded-full bg-sage text-white text-xs sm:text-sm font-semibold hover:bg-sage-dark transition shadow-sm"
          >
            Взяти участь у практиці
          </button>
        </div>
      </div>

      {/* МОДАЛЬНЕ ВІКНО ЗАПИСУ */}
      <RegistrationModal
        event={event}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
