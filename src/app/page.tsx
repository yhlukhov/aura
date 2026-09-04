'use client';

import { useState, useMemo, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import CategoryFilters from '@/components/CategoryFilters';
import EventCard from '@/components/EventCard';
import { mockEvents } from '@/data/mockEvents';
import { EventCategory, EventItem } from '@/types/event';
import { Calendar, RefreshCw } from 'lucide-react';
import { getEventsForNext7Days, pickRandomEvents } from '@/utils/dateUtils';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Фільтрація подій для каталогу
  const filteredEvents = useMemo(() => {
    return mockEvents.filter((item) => {
      // 1. Категорія
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // 2. Вартість
      if (priceFilter !== 'all' && item.priceType !== priceFilter) {
        return false;
      }
      // 3. Пошук
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchMaster = item.master.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchCat = item.categoryName.toLowerCase().includes(q);
        if (!matchTitle && !matchMaster && !matchDesc && !matchCat) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, priceFilter, searchQuery]);

  // Події тижня (Week Events): 3 випадкові події на найближчі 7 днів (включаючи сьогодні)
  const [weekEvents, setWeekEvents] = useState<EventItem[]>(() => {
    const next7Days = getEventsForNext7Days(mockEvents);
    return next7Days.slice(0, 3);
  });

  useEffect(() => {
    const next7Days = getEventsForNext7Days(mockEvents);
    setWeekEvents(pickRandomEvents(next7Days, 3));
  }, []);

  const handleShuffleWeekEvents = () => {
    const next7Days = getEventsForNext7Days(mockEvents);
    setWeekEvents(pickRandomEvents(next7Days, 3));
  };

  return (
    <div className="space-y-12 pb-24">
      {/* 1. HERO ІНТРО З ПОШУКОМ */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 2. СЕКЦІЯ ПОДІЙ ТИЖНЯ (Week Events - 3 випадкові події на найближчі 7 днів) */}
      {!searchQuery && selectedCategory === 'all' && priceFilter === 'all' && weekEvents.length > 0 && (
        <section className="max-w-7xl mx-auto px-6" id="week-events" aria-label="Week Events">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-full bg-sage-light text-sage-dark">
                <Calendar className="w-4 h-4" />
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-deep">
                Події тижня
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-deep-muted hidden sm:inline-block">
                Week Events • 3 випадкові практики на найближчі 7 днів
              </span>
              <button
                type="button"
                onClick={handleShuffleWeekEvents}
                title="Оновити вибір подій"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-deep-muted hover:text-deep bg-white/80 hover:bg-white border border-sand hover:border-sage/40 transition shadow-2xs group cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-sage group-hover:rotate-180 transition-transform duration-500" />
                <span>Оновити вибір</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weekEvents.map((item) => (
              <EventCard key={`week-${item.id}`} event={item} />
            ))}
          </div>
        </section>
      )}

      {/* 3. ФІЛЬТРИ ТЕМАТИК ТА ВАРТОСТІ */}
      <CategoryFilters
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        priceFilter={priceFilter}
        onPriceFilterChange={setPriceFilter}
        totalEventsCount={filteredEvents.length}
      />

      {/* 4. ОСНОВНА СІТКА ПОДІЙ */}
      <section className="max-w-7xl mx-auto px-6">
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((item) => (
              <EventCard key={item.id} event={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/60 backdrop-blur rounded-3xl border border-sand p-8 max-w-lg mx-auto">
            <Calendar className="w-12 h-12 text-sage/60 mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold text-deep mb-2">
              Подій за цими критеріями не знайдено
            </h3>
            <p className="text-xs text-deep-muted mb-6">
              Спробуйте обрати іншу категорію або очистити пошуковий запит.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setPriceFilter('all');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-full bg-sage text-white text-xs font-semibold hover:bg-sage-dark transition shadow-sm"
            >
              Скинути всі фільтри
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
