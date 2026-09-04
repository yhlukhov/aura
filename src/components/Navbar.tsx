import Link from 'next/link';
import { Sparkles, Plus, Compass, Calendar } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-sand/80 px-6 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="text-2xl text-sage transition-transform group-hover:rotate-12 duration-300">✦</span>
          <span className="font-serif text-3xl font-bold tracking-widest text-deep group-hover:text-sage-dark transition">
            AURA
          </span>
          <span className="hidden sm:inline-block text-[11px] uppercase tracking-widest text-sage-dark/70 font-semibold border-l border-sand-dark pl-2 ml-1">
            Події
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-deep/75">
          <Link href="/#events" className="hover:text-sage-dark transition flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-sage" />
            Каталог практик
          </Link>
          <Link href="/#week-events" className="hover:text-sage-dark transition flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-sage" />
            Події тижня
          </Link>
          <Link href="/create" className="hover:text-sage-dark transition">
            Організаторам
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/create"
            className="bg-sage text-white text-xs sm:text-sm font-medium px-4 sm:px-5 py-2.5 rounded-full hover:bg-sage-dark transition shadow-sm shadow-sage/20 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Розмістити подію</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
