'use client';

import { useState } from 'react';
import { EventItem } from '@/types/event';
import { X, CheckCircle, Calendar, ExternalLink } from 'lucide-react';

interface RegistrationModalProps {
  event: EventItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({
  event,
  isOpen,
  onClose,
}: RegistrationModalProps) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact) return;
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setName('');
    setContact('');
    onClose();
  };

  // Google Calendar link generator
  const getGoogleCalendarUrl = () => {
    const text = encodeURIComponent(event.title);
    const details = encodeURIComponent(
      `Практика з ${event.master.name}.\nПлатформа: ${event.platform}\nПосилання: ${event.platformUrl || 'Надіслано на контакт'}`
    );
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&details=${details}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-linen rounded-3xl p-6 sm:p-8 shadow-2xl border border-sand">
        {/* Кнопка закрити */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-sand/80 hover:bg-sand text-deep flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-sage-dark block mb-1">
              Реєстрація на онлайн-практику
            </span>
            <h3 className="font-serif text-2xl font-bold text-deep mb-2 leading-snug">
              {event.title}
            </h3>
            <p className="text-xs text-deep-muted mb-6">
              📅 {event.date}, {event.time} • {event.platform} • {event.priceFormatted}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-deep mb-1.5">
                  Ваше імʼя
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Олена"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-sand focus:outline-none focus:ring-2 focus:ring-sage/40 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-deep mb-1.5">
                  Telegram (нікнейм) або Email
                </label>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="@telegram_nick або name@gmail.com"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-sand focus:outline-none focus:ring-2 focus:ring-sage/40 text-sm"
                />
                <span className="text-[11px] text-deep-muted mt-1 block">
                  Сюди ми надішлемо нагадування за 15 хвилин до початку.
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-sage text-white font-medium text-sm hover:bg-sage-dark transition shadow-md shadow-sage/20"
                >
                  Підтвердити участь ({event.priceFormatted})
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 bg-sage-light text-sage-dark rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-deep">
              Чекаємо на вас у колі!
            </h3>
            <p className="text-xs sm:text-sm text-deep/75 max-w-sm mx-auto leading-relaxed">
              Дякуємо, <strong>{name}</strong>! Ваше місце збережено. Посилання на зустріч у {event.platform}:
            </p>

            {event.platformUrl && (
              <div className="p-3 bg-white rounded-xl border border-sand text-xs flex items-center justify-between gap-2">
                <span className="font-mono text-sage-dark truncate text-left">
                  {event.platformUrl}
                </span>
                <a
                  href={event.platformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-1 text-xs font-semibold text-deep hover:text-sage-dark transition"
                >
                  Перейти <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-full border border-sand hover:border-sage bg-white text-xs font-semibold text-deep flex items-center justify-center gap-1.5 transition"
              >
                <Calendar className="w-4 h-4 text-sage" />
                Додати в Google Календар
              </a>

              <button
                onClick={handleClose}
                className="text-xs text-deep-muted hover:text-deep transition py-2"
              >
                Закрити вікно
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
