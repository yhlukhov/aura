'use client';

import { useState, useMemo } from 'react';
import HeroSection from '@/components/HeroSection';
import CategoryFilters from '@/components/CategoryFilters';
import EventCard from '@/components/EventCard';
import { mockEvents } from '@/data/mockEvents';
import { EventCategory } from '@/types/event';
import { Sparkles, Calendar } from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Фільтрація подій
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

  // Топ-події (рекламні місця для майстрів)
  const featuredEvents = useMemo(() => {
    return mockEvents.filter((e) => e.isFeatured);
  }, []);

  return (
    <div className="space-y-12 pb-24">
      {/* 1. HERO ІНТРО З ПОШУКОМ */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 2. СЕКЦІЯ ТОП-ПОДІЙ (Вибір провідників / Рекламний блок) */}
      {!searchQuery && selectedCategory === 'all' && priceFilter === 'all' && (
        <section className="max-w-7xl mx-auto px-6" id="featured">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-full bg-gold-light text-gold">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-deep">
                Топ події тижня
              </h2>
            </div>
            <span className="text-xs text-deep-muted">Рекомендовані практики</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((item) => (
              <EventCard key={`featured-${item.id}`} event={item} />
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
