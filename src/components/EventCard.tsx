import Link from 'next/link';
import Image from 'next/image';
import { EventItem } from '@/types/event';
import { Calendar, Clock, Video } from 'lucide-react';

interface EventCardProps {
  event: EventItem;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link
      href={`/events/${event.id}`}
      className="group relative flex flex-col rounded-3xl p-4 bg-white/90 backdrop-blur border border-sand hover:border-sage/40 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* 1. БАНЕР КАРТКИ */}
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-4 bg-sand-dark/20">
        <Image
          src={event.bannerUrl}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Градієнт поверх банера для читабельності тексту */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-70 group-hover:opacity-60 transition-opacity" />

        {/* Бейджі зверху */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="bg-white/90 backdrop-blur-md text-deep text-[11px] font-semibold px-3 py-1 rounded-full shadow-xs">
            {event.categoryName}
          </span>
        </div>

        {/* Дата знизу банера */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-medium drop-shadow-sm">
          <Calendar className="w-3.5 h-3.5" />
          <span>{event.date}, {event.time}</span>
        </div>
      </div>

      {/* 2. НАЗВА ТА ОПИС */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-deep leading-snug mb-2 group-hover:text-sage-dark transition line-clamp-2">
            {event.title}
          </h3>

          <div className="flex items-center gap-3 text-xs text-deep-muted mb-4">
            <span className="flex items-center gap-1">
              <Video className="w-3.5 h-3.5 text-sage" />
              {event.platform}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-deep-muted" />
              {event.durationMinutes} хв
            </span>
          </div>
        </div>

        {/* 3. МАЙСТЕР ТА ЦІНА */}
        <div className="flex items-center justify-between pt-3 border-t border-sand/80 mt-2">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-sand-dark">
              <Image
                src={event.master.avatar}
                alt={event.master.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-deep truncate">{event.master.name}</p>
              <p className="text-[11px] text-deep-muted truncate">{event.master.title.split(',')[0]}</p>
            </div>
          </div>

          <span className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full ${
            event.priceType === 'donation'
              ? 'bg-sage-light text-sage-dark'
              : event.priceType === 'free'
              ? 'bg-amethyst-light text-amethyst-dark'
              : 'bg-sand text-deep'
          }`}>
            {event.priceFormatted}
          </span>
        </div>
      </div>
    </Link>
  );
}
