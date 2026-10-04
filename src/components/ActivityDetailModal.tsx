import React, { useState } from 'react';
import {
  X,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  Heart,
  Award,
  Sparkles,
  Building2,
  Share2,
  HelpCircle,
  FileCheck2,
  Check,
  Star,
  GraduationCap
} from 'lucide-react';
import { Activity } from '../types';
import { DetailLocationMap } from './DetailLocationMap';

interface ActivityDetailModalProps {
  activity: Activity | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  isEnrolled: boolean;
  onToggleSave: (id: string) => void;
  onEnroll: (id: string) => void;
  onViewMyActivities: () => void;
}

export const ActivityDetailModal: React.FC<ActivityDetailModalProps> = ({
  activity,
  isOpen,
  onClose,
  isSaved,
  isEnrolled,
  onToggleSave,
  onEnroll,
  onViewMyActivities,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessState, setShowSuccessState] = useState(false);
  const [showVerifiedExplainer, setShowVerifiedExplainer] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !activity) return null;

  const occupiedQuotas = activity.totalQuotas - activity.availableQuotas;
  const occupiedPercentage = Math.min(100, Math.round((occupiedQuotas / activity.totalQuotas) * 100));

  const handleConfirmEnrollment = () => {
    onEnroll(activity.id);
    setShowConfirmModal(false);
    setShowSuccessState(true);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const isTechnicalAccreditation = activity.accreditation === 'technical_school';
  const isGeneralAccreditation = activity.accreditation === 'general';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full my-auto overflow-hidden border border-slate-100 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header Bar */}
        <div className="relative aspect-[16/8] sm:aspect-[16/7] w-full bg-slate-900 overflow-hidden shrink-0">
          <img
            src={activity.imageUrl}
            alt={activity.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Top Actions */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white border border-white/20">
              {activity.type}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors"
                title="Compartir enlace"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => onToggleSave(activity.id)}
                className={`p-2.5 rounded-full backdrop-blur-md transition-colors ${
                  isSaved ? 'bg-rose-500 text-white' : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
                title={isSaved ? 'Guardada' : 'Guardar actividad'}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors"
                aria-label="Cerrar detalle"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Title on Scrim */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-violet-200 mb-1.5">
              <span>{activity.category}</span>
              {activity.secondaryCategory && (
                <>
                  <span>·</span>
                  <span>{activity.secondaryCategory}</span>
                </>
              )}
              {activity.hasOfficialEndorsement && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[11px] shadow-sm">
                  <Star className="w-3 h-3 fill-current" />
                  ⭐ Aval Oficial
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
              {activity.title}
            </h1>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1">
          {/* Key Facts Pill Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-slate-400 font-medium block">Lugar</span>
                <span className="text-xs font-bold text-slate-800 line-clamp-1">{activity.coordinates.neighborhood}</span>
                <span className="text-[11px] text-slate-500">{activity.city}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-slate-400 font-medium block">Fecha</span>
                <span className="text-xs font-bold text-slate-800 line-clamp-1">{activity.dateString.split('·')[0]}</span>
                <span className="text-[11px] text-slate-500">{activity.timeString}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Users className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-slate-400 font-medium block">Disponibilidad</span>
                <span className="text-xs font-bold text-slate-800">{activity.availableQuotas} cupos libres</span>
                <span className="text-[11px] text-slate-500">de {activity.totalQuotas} totales</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Award className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] text-slate-400 font-medium block">Régimen</span>
                <span className="text-xs font-bold text-slate-800">
                  {isTechnicalAccreditation
                    ? 'Escuela Técnica'
                    : isGeneralAccreditation
                    ? `${activity.hoursCount}h Acreditadas`
                    : 'Voluntariado'}
                </span>
                <span className="text-[11px] text-emerald-600 font-medium">Validado</span>
              </div>
            </div>
          </div>

          {/* Official Endorsement Highlight Banner if applicable */}
          {activity.hasOfficialEndorsement && (
            <div className="p-4 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0">
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-amber-950 block">
                    Actividad con Aval Institucional Oficial
                  </span>
                  <span className="text-[11px] text-amber-800 font-medium">
                    {activity.endorsementLabel}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2.5 py-1 rounded-full shrink-0">
                Homologada
              </span>
            </div>
          )}

          {/* Organization & Verification */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-violet-50/60 rounded-2xl border border-violet-100 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-900 block">
                  {activity.organization}
                </span>
                <span className="text-[11px] text-violet-700 font-medium">
                  {activity.organizationType} participante de Nexo Joven
                </span>
              </div>
            </div>

            {activity.isVerified && (
              <button
                type="button"
                onClick={() => setShowVerifiedExplainer(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-100/80 hover:bg-blue-200 text-blue-900 text-xs font-semibold transition-colors self-start sm:self-auto"
              >
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Organización validada</span>
                <HelpCircle className="w-3 h-3 text-blue-500" />
              </button>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
              Acerca de esta oportunidad
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {activity.fullDescription}
            </p>
          </div>

          {/* Location Component / Static Map Representation with coordinates */}
          <DetailLocationMap activity={activity} />

          {/* ¿Qué vas a hacer? & ¿Qué vas a aprender? Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-violet-900 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-violet-600" />
                ¿Qué vas a hacer?
              </h4>
              <ul className="space-y-2">
                {activity.tasks.map((task, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0 mt-1.5" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-3 flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-indigo-600" />
                ¿Qué vas a aprender?
              </h4>
              <ul className="space-y-2">
                {activity.learnings.map((learning, idx) => (
                  <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                    <span>{learning}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Requisitos */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Requisitos y condiciones
            </h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {activity.requirements.map((req, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlight Acreditación Card (only if accreditation is technical_school or general) */}
          {isTechnicalAccreditation && (
            <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-2xl border border-amber-200/90 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-black text-amber-950">Acreditación Oficial Escuela Técnica</h4>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-950">
                    +{activity.hoursCount} horas de taller homologadas
                  </span>
                </div>
                <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                  Esta actividad cumple con los requerimientos curriculares de prácticas formativas y profesionalizantes para colegios secundarios técnicos de General Pico (EPET).
                </p>
              </div>
            </div>
          )}

          {isGeneralAccreditation && (
            <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-2xl border border-emerald-200/80 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Award className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-emerald-950">Acreditación general de horas</h4>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900">
                    +{activity.hoursCount} horas registradas
                  </span>
                </div>
                <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                  Esta actividad contempla registro de participación y acreditación de horas comunitarias según las condiciones de articulación con colegios secundarios de General Pico.
                </p>
              </div>
            </div>
          )}

          {/* Cupos Bar */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-slate-700">Cupos de participación</span>
              <span className="font-bold text-slate-900">
                {occupiedQuotas} / {activity.totalQuotas} ocupados ({activity.availableQuotas} disponibles)
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${occupiedPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Footer Action Bar */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4 shrink-0">
          <button
            type="button"
            onClick={() => onToggleSave(activity.id)}
            className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
              isSaved
                ? 'bg-rose-50 border-rose-200 text-rose-700'
                : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current text-rose-500' : ''}`} />
            <span>{isSaved ? 'Guardada' : 'Guardar actividad'}</span>
          </button>

          <div className="flex items-center gap-3">
            {isEnrolled ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-100 border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4" /> Ya estás inscripto
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onViewMyActivities();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  Ver seguimiento
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowConfirmModal(true)}
                disabled={activity.availableQuotas <= 0}
                className="px-6 sm:px-8 py-3 bg-violet-600 hover:bg-violet-700 disabled:bg-slate-300 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-violet-500/25 active:scale-95"
              >
                {activity.availableQuotas > 0 ? 'Quiero participar' : 'Cupos agotados'}
              </button>
            )}
          </div>
        </div>

        {/* Confirmation Sub-Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>

              <div className="text-center">
                <h3 className="text-lg font-extrabold text-slate-900">
                  ¿Querés inscribirte en esta actividad?
                </h3>
                <p className="text-xs text-slate-600 mt-2">
                  Vas a postularte a <strong className="text-slate-800">{activity.title}</strong> en {activity.city}. Tu participación quedará registrada en tu perfil de Nexo Joven.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 text-slate-600 border border-slate-100">
                <p>📍 <strong>Lugar:</strong> {activity.location}</p>
                <p>📅 <strong>Fecha:</strong> {activity.dateString}</p>
                {activity.hoursCount && (
                  <p>🎓 <strong>Acredita:</strong> {activity.hoursCount} horas de práctica</p>
                )}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Volver
                </button>
                <button
                  type="button"
                  onClick={handleConfirmEnrollment}
                  className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs transition-all shadow-md shadow-violet-500/20"
                >
                  Confirmar inscripción
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessState && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl p-7 max-w-md w-full shadow-2xl border border-slate-100 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  ¡Listo! Te inscribiste correctamente.
                </h3>
                <p className="text-xs text-slate-600 mt-2">
                  Ya tenés tu lugar reservado para <strong>{activity.title}</strong>. Podés seguir el estado de tu participación desde tu panel.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setShowSuccessState(false);
                    onClose();
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Seguir explorando
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowSuccessState(false);
                    onClose();
                    onViewMyActivities();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs transition-all shadow-md shadow-violet-500/20"
                >
                  Ir a Mis actividades →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Verified Organization Explanation Modal */}
        {showVerifiedExplainer && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div className="text-center">
                <h3 className="text-lg font-extrabold text-slate-900">
                  Organización y actividad validada
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Esta actividad fue validada por una institución participante de la red de <strong>Nexo Joven</strong>. Cuenta con referentes adultos identificados, condiciones seguras de participación y articulación con los programas formativos locales.
                </p>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl text-xs text-blue-900 border border-blue-100">
                La plataforma articula con el Ministerio de Educación, la Municipalidad de General Pico, instituciones educativas, universidades, clubes y organizaciones comunitarias.
              </div>

              <button
                type="button"
                onClick={() => setShowVerifiedExplainer(false)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
