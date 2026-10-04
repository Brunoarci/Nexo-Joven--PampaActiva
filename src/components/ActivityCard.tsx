import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  Heart,
  ArrowRight,
  Award,
  Sparkles,
  Building2,
  Star,
  GraduationCap
} from 'lucide-react';
import { Activity } from '../types';

interface ActivityCardProps {
  activity: Activity;
  isSaved: boolean;
  isEnrolled: boolean;
  onToggleSave: (id: string) => void;
  onSelect: (activity: Activity) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  isSaved,
  isEnrolled,
  onToggleSave,
  onSelect,
}) => {
  const [imageError, setImageError] = useState(false);
  const [showVerifiedTooltip, setShowVerifiedTooltip] = useState(false);
  const [showEndorsementTooltip, setShowEndorsementTooltip] = useState(false);

  // Derive quota urgency
  const isUrgent = activity.availableQuotas <= 3;

  return (
    <div
      onClick={() => onSelect(activity)}
      className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-violet-300 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* Image Container with Fallback */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        {!imageError ? (
          <img
            src={activity.imageUrl}
            alt={activity.title}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-700 flex flex-col items-center justify-center p-6 text-white text-center">
            <Sparkles className="w-10 h-10 text-violet-200 mb-2 opacity-80" />
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-200">
              {activity.category}
            </span>
            <p className="text-sm font-bold mt-1 line-clamp-2">{activity.title}</p>
          </div>
        )}

        {/* Gradient Scrim for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />

        {/* Top Badges / Floating Controls */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          {/* Main Category Badge */}
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-xs bg-slate-900/80 text-white border border-white/10">
            {activity.category}
          </span>

          {/* Bookmark Heart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(activity.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
              isSaved
                ? 'bg-rose-500 text-white scale-110'
                : 'bg-white/80 hover:bg-white text-slate-700 hover:text-rose-500'
            }`}
            aria-label={isSaved ? 'Quitar de guardadas' : 'Guardar actividad'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom tags on image scrim: Distinction between Technical vs General vs None */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-1.5">
          {/* Acredita Horas Escuela Técnica */}
          {activity.accreditation === 'technical_school' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-black bg-amber-500 text-slate-950 shadow-xs">
              <GraduationCap className="w-3.5 h-3.5 stroke-[2.5]" />
              Acredita Horas Escuela Técnica ({activity.hoursCount}h)
            </span>
          )}

          {/* Acredita Horas (General) */}
          {activity.accreditation === 'general' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-500/95 text-white backdrop-blur-md shadow-xs">
              <Award className="w-3 h-3" />
              Acredita {activity.hoursCount}h
            </span>
          )}

          {/* Voluntariado libre */}
          {activity.accreditation === 'none' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-violet-600/90 text-white backdrop-blur-md shadow-xs">
              Voluntariado
            </span>
          )}

          {isUrgent && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-rose-500/90 text-white backdrop-blur-md shadow-xs">
              Últimos {activity.availableQuotas} cupos
            </span>
          )}

          {isEnrolled && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-violet-600 text-white backdrop-blur-md shadow-xs">
              Inscripto
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Organization & Official Endorsements */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2 gap-2">
            <div className="flex items-center gap-1.5 truncate">
              <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate font-medium">{activity.organization}</span>
              {activity.isVerified && (
                <div 
                  className="relative inline-flex items-center"
                  onMouseEnter={() => setShowVerifiedTooltip(true)}
                  onMouseLeave={() => setShowVerifiedTooltip(false)}
                >
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0 fill-blue-50" />
                  
                  {showVerifiedTooltip && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-48 p-2 bg-slate-900 text-white text-[11px] rounded-lg shadow-xl z-20 pointer-events-none text-center">
                      Validada por institución de Nexo Joven
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ⭐ Official Endorsement Star */}
            {activity.hasOfficialEndorsement && (
              <div
                className="relative inline-flex items-center shrink-0"
                onMouseEnter={() => setShowEndorsementTooltip(true)}
                onMouseLeave={() => setShowEndorsementTooltip(false)}
              >
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-extrabold">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  Aval Oficial
                </span>

                {showEndorsementTooltip && (
                  <div className="absolute bottom-full right-0 mb-1.5 w-52 p-2 bg-slate-900 text-amber-200 text-[11px] rounded-lg shadow-xl z-20 pointer-events-none text-center">
                    {activity.endorsementLabel || 'Aval oficial del Ministerio o Municipio'}
                    <div className="absolute top-full right-4 border-4 border-transparent border-t-slate-900" />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-violet-700 transition-colors line-clamp-2 leading-snug">
            {activity.title}
          </h3>

          {/* Short description */}
          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {activity.shortDescription}
          </p>
        </div>

        {/* Metadata info block */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5 truncate">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{activity.dateString}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate font-medium text-slate-700">
                {activity.coordinates.neighborhood}
              </span>
            </div>

            <div className="flex items-center gap-1 text-slate-700 font-medium shrink-0 ml-2">
              <Users className="w-3.5 h-3.5 text-violet-500" />
              <span className={isUrgent ? 'text-amber-700 font-bold' : ''}>
                {activity.availableQuotas} cupos
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-violet-700 font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              Ver actividad <ArrowRight className="w-3.5 h-3.5" />
            </span>

            <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium">
              {activity.type === 'Práctica escuela técnica' ? 'Escuela Técnica' : activity.type}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
