import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, MapPin, Sprout, Zap, GraduationCap } from 'lucide-react';
import { Activity } from '../types';
import { ActivityCard } from './ActivityCard';

interface ActivitySectionsProps {
  forYouActivities: Activity[];
  nearbyActivities: Activity[];
  idealStartActivities: Activity[];
  lastSpotsActivities: Activity[];
  savedIds: string[];
  enrolledIds: string[];
  onToggleSave: (id: string) => void;
  onSelectActivity: (activity: Activity) => void;
  selectedCity: string;
}

interface SectionRowProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  activities: Activity[];
  savedIds: string[];
  enrolledIds: string[];
  onToggleSave: (id: string) => void;
  onSelectActivity: (activity: Activity) => void;
  badgeText?: string;
}

const SectionRow: React.FC<SectionRowProps> = ({
  title,
  subtitle,
  icon,
  activities,
  savedIds,
  enrolledIds,
  onToggleSave,
  onSelectActivity,
  badgeText,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (activities.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="space-y-4 pt-4">
      {/* Header with Title and Scroll Arrows */}
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center shrink-0">
              {icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  {title}
                </h2>
                {badgeText && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-violet-100 text-violet-800">
                    {badgeText}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-normal">{subtitle}</p>
            </div>
          </div>
        </div>

        {/* Carousel buttons */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors shadow-2xs"
            aria-label="Desplazar a la izquierda"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors shadow-2xs"
            aria-label="Desplazar a la derecha"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Container */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {activities.map((act) => (
          <div
            key={act.id}
            className="w-[280px] sm:w-[320px] md:w-[350px] shrink-0 snap-start flex flex-col"
          >
            <ActivityCard
              activity={act}
              isSaved={savedIds.includes(act.id)}
              isEnrolled={enrolledIds.includes(act.id)}
              onToggleSave={onToggleSave}
              onSelect={onSelectActivity}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export const ActivitySections: React.FC<ActivitySectionsProps> = ({
  forYouActivities,
  nearbyActivities,
  idealStartActivities,
  lastSpotsActivities,
  savedIds,
  enrolledIds,
  onToggleSave,
  onSelectActivity,
  selectedCity,
}) => {
  return (
    <div className="space-y-10">
      {/* 1. Para vos */}
      <SectionRow
        title="Para vos ✨"
        subtitle="Recomendadas según tu perfil escolar e intereses en tecnología y ambiente"
        icon={<Sparkles className="w-4 h-4 text-violet-600" />}
        activities={forYouActivities}
        savedIds={savedIds}
        enrolledIds={enrolledIds}
        onToggleSave={onToggleSave}
        onSelectActivity={onSelectActivity}
        badgeText="Personalizado"
      />

      {/* 2. Cerca tuyo */}
      <SectionRow
        title={`Cerca tuyo 📍 (${selectedCity})`}
        subtitle={`Oportunidades en ${selectedCity} y la región para participar esta semana`}
        icon={<MapPin className="w-4 h-4 text-blue-600" />}
        activities={nearbyActivities}
        savedIds={savedIds}
        enrolledIds={enrolledIds}
        onToggleSave={onToggleSave}
        onSelectActivity={onSelectActivity}
      />

      {/* 3. Ideal para empezar */}
      <SectionRow
        title="Ideal para empezar 🌱"
        subtitle="Experiencias abiertas para tu primera participación comunitaria sin requisitos previos"
        icon={<Sprout className="w-4 h-4 text-emerald-600" />}
        activities={idealStartActivities}
        savedIds={savedIds}
        enrolledIds={enrolledIds}
        onToggleSave={onToggleSave}
        onSelectActivity={onSelectActivity}
      />

      {/* 4. Últimos cupos */}
      <SectionRow
        title="Últimos cupos ⚡"
        subtitle="Actividades de alta demanda con pocas vacantes disponibles"
        icon={<Zap className="w-4 h-4 text-amber-500" />}
        activities={lastSpotsActivities}
        savedIds={savedIds}
        enrolledIds={enrolledIds}
        onToggleSave={onToggleSave}
        onSelectActivity={onSelectActivity}
      />
    </div>
  );
};
