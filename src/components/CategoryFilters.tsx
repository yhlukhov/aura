'use client';

import { EventCategory } from '@/types/event';

interface CategoryFiltersProps {
  selectedCategory: EventCategory;
  onSelectCategory: (cat: EventCategory) => void;
  priceFilter: string;
  onPriceFilterChange: (filter: string) => void;
  totalEventsCount: number;
}

export default function CategoryFilters({
  selectedCategory,
  onSelectCategory,
  priceFilter,
  onPriceFilterChange,
  totalEventsCount,
}: CategoryFiltersProps) {
  const categories: { id: EventCategory; label: string }[] = [
    { id: 'all', label: '✨ Всі практики' },
    { id: 'reiki', label: '🌿 Рейкі' },
    { id: 'meditation', label: '🧘 Медитації' },
    { id: 'energy', label: '🔮 Енергопрактики' },
    { id: 'sound', label: '🔔 Звукотерапія' },
    { id: 'breath', label: '🌬 Дихання' },
    { id: 'women_circle', label: '🌸 Жіночі кола' },
  ];

  const priceFilters = [
    { id: 'all', label: 'Всі вартості' },
    { id: 'donation', label: 'Донейшн' },
    { id: 'free', label: 'Безкоштовно' },
    { id: 'fixed', label: 'Фіксована' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 pb-8" id="events">
      {/* Горизонтальні чіпси категорій */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-4 scrollbar-none justify-start md:justify-center">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap duration-200 ${
                isActive
                  ? 'bg-deep text-white shadow-sm scale-105'
                  : 'bg-white/80 hover:bg-white text-deep/75 border border-sand hover:border-sage/50'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Другорядні фільтри: вартість та лічильник подій */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-sand/60 text-xs text-deep-muted">
        <div className="flex items-center gap-2">
          <span>Вартість:</span>
          <div className="flex items-center gap-1.5 bg-sand-light p-1 rounded-full border border-sand">
            {priceFilters.map((p) => {
              const isActive = priceFilter === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onPriceFilterChange(p.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                    isActive
                      ? 'bg-white text-sage-dark shadow-xs'
                      : 'text-deep/70 hover:text-deep'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="text-deep-muted">
          Знайдено подій: <span className="font-semibold text-deep">{totalEventsCount}</span>
        </div>
      </div>
    </section>
  );
}
