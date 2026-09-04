'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Image as ImageIcon, CheckCircle, Eye } from 'lucide-react';
import EventCard from '@/components/EventCard';
import AmbientBanner from '@/components/AmbientBanner';
import { EventItem, EventCategory, PriceType } from '@/types/event';

// Естетичні пресети банерів для майстрів
const bannerPresets = [
  {
    name: 'Коло Рейкі & Енергія',
    url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Свічка та вечірня тиша',
    url: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Співочі чаші та звукові вібрації',
    url: 'https://images.unsplash.com/photo-1511295742362-92c96b124e52?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Світанок та дихання',
    url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Квіти та жіноче коло',
    url: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function CreateEventPage() {
  const [title, setTitle] = useState('Гармонізація енергетичного простору та спокій');
  const [category, setCategory] = useState<EventCategory>('reiki');
  const [categoryName, setCategoryName] = useState('🌿 Рейкі');
  const [date, setDate] = useState('10 вересня');
  const [time, setTime] = useState('19:00 (Київ)');
  const [durationMinutes, setDurationMinutes] = useState(75);
  const [platform, setPlatform] = useState('Zoom');
  const [platformUrl, setPlatformUrl] = useState('https://zoom.us/j/my-spiritual-event');
  const [priceType, setPriceType] = useState<PriceType>('donation');
  const [priceFormatted, setPriceFormatted] = useState('Вільний донейшн');
  const [bannerUrl, setBannerUrl] = useState(bannerPresets[0].url);
  const [description, setDescription] = useState(
    'Запрошуємо у безпечне коло зцілення та відновлення внутрішньої сили. Практика допоможе зняти напругу та наповнитися чистим світлом.'
  );
  const [masterName, setMasterName] = useState('Марія Світло');
  const [masterTitle, setMasterTitle] = useState('Майстер Рейкі, цілителька');

  const [previewTab, setPreviewTab] = useState<'card' | 'banner'>('card');
  const [isSuccess, setIsSuccess] = useState(false);

  // Створюємо динамічний обʼєкт для прев'ю
  const previewEvent: EventItem = {
    id: 'preview-1',
    title: title || 'Назва вашої практики',
    slug: 'preview-event',
    category,
    categoryName,
    date: date || 'Дата',
    time: time || 'Час',
    durationMinutes,
    platform,
    platformUrl,
    priceType,
    priceFormatted,
    bannerUrl,
    description,
    preparationTips: [
      { icon: '🎧', text: 'Навушники для чистого звуку' },
      { icon: '🕯', text: 'Свічка або пахощі' },
    ],
    master: {
      id: 'preview-m',
      name: masterName || 'Імʼя провідника',
      title: masterTitle || 'Спеціалізація',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    },
  };

  const handleCategoryChange = (cat: EventCategory, name: string) => {
    setCategory(cat);
    setCategoryName(name);
  };

  const handlePriceChange = (type: PriceType, label: string) => {
    setPriceType(type);
    setPriceFormatted(label);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-28">
      {/* Назад */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-deep-muted hover:text-sage-dark transition font-medium mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Повернутися до каталогу</span>
      </Link>

      <div className="mb-10">
        <span className="text-xs uppercase tracking-wider font-semibold text-sage-dark block mb-1">
          Кабінет організатора
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-deep">
          Створити та просувати онлайн-подію
        </h1>
        <p className="text-xs sm:text-sm text-deep-muted mt-2 max-w-xl">
          Додайте інформацію про вашу практику та подивіться у реальному часі, як банер і картка відображатимуться для учасників.
        </p>
      </div>

      {isSuccess ? (
        <div className="max-w-md mx-auto text-center py-16 p-8 rounded-3xl bg-white border border-sand shadow-lg space-y-4">
          <div className="w-16 h-16 bg-sage-light text-sage-dark rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-deep">
            Подію успішно створено!
          </h2>
          <p className="text-xs text-deep/75 leading-relaxed">
            Вашу подію <strong>«{title}»</strong> додано до черги публікацій. Завдяки вибраним промо-налаштуванням вона отримає виділення та високу видимість.
          </p>
          <div className="pt-4 flex flex-col gap-2">
            <Link
              href="/"
              className="w-full py-3 rounded-full bg-sage text-white text-xs font-semibold hover:bg-sage-dark transition"
            >
              Перейти на головну сторінку
            </Link>
            <button
              onClick={() => setIsSuccess(false)}
              className="text-xs text-deep-muted hover:text-deep transition py-2"
            >
              Створити ще одну подію
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* ЛІВА ЧАСТИНА: ФОРМА ВВЕДЕННЯ */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
            
            {/* 1. Назва та категорія */}
            <div className="p-6 rounded-3xl bg-white/80 backdrop-blur border border-sand space-y-4">
              <h3 className="font-serif text-xl font-bold text-deep">
                1. Основна інформація
              </h3>

              <div>
                <label className="block text-xs font-semibold text-deep mb-1.5">
                  Назва онлайн-практики *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Наприклад: Коло Рейкі: Відновлення життєвої сили"
                  className="w-full px-4 py-3 rounded-xl bg-linen border border-sand focus:outline-none focus:ring-2 focus:ring-sage/40 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-deep mb-2">
                  Тематика практики *
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'reiki' as EventCategory, name: '🌿 Рейкі' },
                    { id: 'meditation' as EventCategory, name: '🧘 Медитації' },
                    { id: 'energy' as EventCategory, name: '🔮 Енергопрактики' },
                    { id: 'sound' as EventCategory, name: '🔔 Звукотерапія' },
                    { id: 'breath' as EventCategory, name: '🌬 Дихання' },
                    { id: 'women_circle' as EventCategory, name: '🌸 Жіночі кола' },
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id, cat.name)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                        category === cat.id
                          ? 'bg-deep text-white shadow-xs'
                          : 'bg-linen border border-sand hover:border-sage text-deep/70'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Банер організатора */}
            <div className="p-6 rounded-3xl bg-white/80 backdrop-blur border border-sand space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-deep flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-sage" />
                  2. Банер події
                </h3>
                <span className="text-[11px] text-sage-dark font-medium">Рекомендовано 16:9</span>
              </div>

              <p className="text-xs text-deep-muted">
                Оберіть із готової естетичної галереї або вкажіть пряме посилання на ваш банер:
              </p>

              {/* Готові пресети */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                {bannerPresets.map((preset, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setBannerUrl(preset.url)}
                    className={`relative aspect-[16/9] rounded-xl overflow-hidden border-2 transition ${
                      bannerUrl === preset.url
                        ? 'border-sage ring-2 ring-sage/30 scale-[1.02]'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-xs text-[10px] text-white p-1 truncate">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-deep mb-1.5 mt-2">
                  Або посилання на власне зображення (URL)
                </label>
                <input
                  type="url"
                  value={bannerUrl}
                  onChange={(e) => setBannerUrl(e.target.value)}
                  placeholder="https://example.com/banner.jpg"
                  className="w-full px-4 py-2.5 rounded-xl bg-linen border border-sand focus:outline-none focus:ring-2 focus:ring-sage/40 text-xs font-mono"
                />
              </div>
            </div>

            {/* 3. Час, платформа, вартість */}
            <div className="p-6 rounded-3xl bg-white/80 backdrop-blur border border-sand space-y-4">
              <h3 className="font-serif text-xl font-bold text-deep">
                3. Деталі участі та посилання
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-deep mb-1">Дата</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="10 вересня"
                    className="w-full px-3 py-2 rounded-xl bg-linen border border-sand text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-deep mb-1">Час</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="19:00 (Київ)"
                    className="w-full px-3 py-2 rounded-xl bg-linen border border-sand text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-deep mb-1">Тривалість</label>
                  <input
                    type="number"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-linen border border-sand text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-deep mb-1">Платформа</label>
                  <input
                    type="text"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    placeholder="Zoom / Google Meet"
                    className="w-full px-3 py-2 rounded-xl bg-linen border border-sand text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-deep mb-1">Посилання на трансляцію</label>
                  <input
                    type="text"
                    value={platformUrl}
                    onChange={(e) => setPlatformUrl(e.target.value)}
                    placeholder="https://zoom.us/..."
                    className="w-full px-3 py-2 rounded-xl bg-linen border border-sand text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-deep mb-1.5">Умови участі</label>
                <div className="flex gap-2">
                  {[
                    { type: 'donation' as PriceType, label: 'Вільний донейшн' },
                    { type: 'free' as PriceType, label: 'Безкоштовно' },
                    { type: 'fixed' as PriceType, label: '400 ₴' },
                  ].map((p) => (
                    <button
                      type="button"
                      key={p.type}
                      onClick={() => handlePriceChange(p.type, p.label)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                        priceType === p.type
                          ? 'bg-sage text-white'
                          : 'bg-linen border border-sand text-deep/70'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-deep mb-1">
                  Опис практики
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-linen border border-sand focus:outline-none focus:ring-2 focus:ring-sage/40 text-xs leading-relaxed"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-sage text-white font-semibold text-sm hover:bg-sage-dark transition shadow-md shadow-sage/25 flex items-center justify-center gap-2"
            >
              <span>Опублікувати подію</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </form>

          {/* ПРАВА ЧАСТИНА: ІНТЕРАКТИВНЕ LIVE-ПРЕВ'Ю */}
          <div className="lg:col-span-5 space-y-4 sticky top-24">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-deep-muted flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-sage" /> Попередній перегляд (Live)
              </span>

              {/* Перемикач прев'ю: картка чи банер з аурою */}
              <div className="flex gap-1 bg-sand p-1 rounded-full text-[11px]">
                <button
                  type="button"
                  onClick={() => setPreviewTab('card')}
                  className={`px-3 py-1 rounded-full transition ${
                    previewTab === 'card'
                      ? 'bg-white text-deep font-semibold shadow-2xs'
                      : 'text-deep-muted hover:text-deep'
                  }`}
                >
                  Картка в каталозі
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('banner')}
                  className={`px-3 py-1 rounded-full transition ${
                    previewTab === 'banner'
                      ? 'bg-white text-deep font-semibold shadow-2xs'
                      : 'text-deep-muted hover:text-deep'
                  }`}
                >
                  Банер з аурою
                </button>
              </div>
            </div>

            {/* Власне блок відображення прев'ю */}
            <div className="p-4 rounded-3xl bg-linen border border-sand shadow-inner">
              {previewTab === 'card' ? (
                <div>
                  <span className="text-[10px] text-deep-muted block mb-2 uppercase tracking-wider text-center">
                    Як ваша подія виглядатиме на головній сторінці:
                  </span>
                  <EventCard event={previewEvent} />
                </div>
              ) : (
                <div>
                  <span className="text-[10px] text-deep-muted block mb-2 uppercase tracking-wider text-center">
                    Як банер виглядатиме на сторінці самої події:
                  </span>
                  <AmbientBanner
                    bannerUrl={previewEvent.bannerUrl}
                    title={previewEvent.title}
                    categoryName={previewEvent.categoryName}
                    dateBadge={`${previewEvent.date}, ${previewEvent.time}`}
                  />
                </div>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
