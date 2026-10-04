import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Award,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  ChevronRight,
  Heart,
  Compass,
  ArrowRight,
  Download,
  Building2,
  Trash2,
  Sparkles
} from 'lucide-react';
import { Activity, UserProfile } from '../types';

interface MyActivitiesViewProps {
  user: UserProfile;
  allActivities: Activity[];
  onSelectActivity: (activity: Activity) => void;
  onCancelEnrollment: (activityId: string) => void;
  onToggleSave: (activityId: string) => void;
  onExploreClick: () => void;
}

export const MyActivitiesView: React.FC<MyActivitiesViewProps> = ({
  user,
  allActivities,
  onSelectActivity,
  onCancelEnrollment,
  onToggleSave,
  onExploreClick,
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'saved' | 'completed'>('upcoming');
  const [showCertificateModal, setShowCertificateModal] = useState<Activity | null>(null);

  const enrolledActivities = allActivities.filter((a) =>
    user.enrolledActivityIds.includes(a.id)
  );
  const savedActivities = allActivities.filter((a) =>
    user.savedActivityIds.includes(a.id)
  );

  // Completed mock activity for simulation
  const completedActivities: Activity[] = [
    {
      id: 'completed-1',
      title: 'Jornada de voluntariado en siembra comunitaria',
      organization: 'Cooperativa Tierra Viva & Municipalidad',
      organizationType: 'Cooperativa',
      isVerified: true,
      hasOfficialEndorsement: true,
      endorsementLabel: 'Aval Municipal de Ambiente',
      type: 'Voluntariado',
      category: 'Ambiente',
      location: 'Vivero Municipal, General Pico',
      city: 'General Pico',
      coordinates: {
        lat: -35.658,
        lng: -63.754,
        xPercent: 45,
        yPercent: 50,
        neighborhood: 'Vivero Municipal',
        address: 'Calle 101 y 10, General Pico'
      },
      dateString: '12 de Septiembre de 2026',
      startDate: '2026-09-12',
      timeString: '09:00 — 13:00',
      totalQuotas: 20,
      availableQuotas: 0,
      accreditation: 'general',
      hoursCount: 6,
      requiresExperience: false,
      forTechnicalStudents: false,
      forSecondaryStudents: true,
      ageRange: '16 a 24 años',
      tags: ['Acreditada', 'Completada'],
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      shortDescription: 'Siembra y multiplicación de especies nativas para arbolado de plazas.',
      fullDescription: 'Jornada completada exitosamente con acreditación de 6 horas de servicio sociocomunitario.',
      tasks: ['Carga de sustrato', 'Siembra en bandejas'],
      learnings: ['Manejo de almácigos', 'Cuidado de plantines'],
      requirements: ['Asistencia completa'],
      contactEmail: 'tierra.viva@nexojoven.ar',
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-700 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-md mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Seguimiento y acreditación</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Mis actividades</h1>
          <p className="text-violet-100 text-xs sm:text-sm mt-2 leading-relaxed">
            Acá podés consultar las oportunidades en las que te inscribiste, seguir el circuito de validación de horas y revisar las que guardaste para más adelante.
          </p>
        </div>

        {/* Stats bar */}
        <div className="mt-6 pt-5 border-t border-white/20 flex flex-wrap gap-6 text-xs relative z-10">
          <div>
            <span className="text-violet-200 block text-[11px]">Próximas actividades</span>
            <span className="text-xl font-black">{enrolledActivities.length}</span>
          </div>
          <div>
            <span className="text-violet-200 block text-[11px]">Horas acumuladas</span>
            <span className="text-xl font-black">
              {completedActivities.reduce((acc, act) => acc + (act.hoursCount || 0), 0)}h
            </span>
          </div>
          <div>
            <span className="text-violet-200 block text-[11px]">Guardadas</span>
            <span className="text-xl font-black">{savedActivities.length}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'upcoming'
              ? 'bg-violet-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span>Próximas ({enrolledActivities.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'saved'
              ? 'bg-violet-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>Guardadas ({savedActivities.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'completed'
              ? 'bg-violet-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Completadas ({completedActivities.length})</span>
        </button>
      </div>

      {/* 1. Tab Próximas (Enrolled) */}
      {activeTab === 'upcoming' && (
        <div className="space-y-6">
          {enrolledActivities.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-violet-50 text-violet-600 flex items-center justify-center mx-auto">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Aún no te inscribiste a ninguna actividad</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Explorá las oportunidades de voluntariado y prácticas formativas en General Pico y sumate a colaborar en tu comunidad.
              </p>
              <button
                onClick={onExploreClick}
                className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-violet-500/20"
              >
                Explorar oportunidades
              </button>
            </div>
          ) : (
            enrolledActivities.map((act) => (
              <div
                key={act.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-5 sm:p-7 space-y-6 transition-all hover:border-violet-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Inscripto
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {act.type}
                      </span>
                    </div>

                    <h2
                      onClick={() => onSelectActivity(act)}
                      className="text-lg sm:text-xl font-extrabold text-slate-900 hover:text-violet-700 cursor-pointer transition-colors"
                    >
                      {act.title}
                    </h2>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{act.organization}</span>
                      {act.isVerified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onSelectActivity(act)}
                      className="px-4 py-2 bg-violet-50 hover:bg-violet-100 text-violet-700 text-xs font-bold rounded-xl transition-colors"
                    >
                      Ver detalle
                    </button>
                    <button
                      onClick={() => onCancelEnrollment(act.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                      title="Darme de baja de la actividad"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Details row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-2xl text-xs text-slate-700 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-violet-600 shrink-0" />
                    <span className="font-medium">{act.dateString}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-violet-600 shrink-0" />
                    <span className="font-medium">{act.location}, {act.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-bold text-emerald-800">
                      Acredita {act.hoursCount || 10} horas formativas
                    </span>
                  </div>
                </div>

                {/* Timeline Progress Tracker */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Circuito de seguimiento en Nexo Joven
                  </span>

                  <div className="grid grid-cols-4 gap-2 relative">
                    {/* Connecting line */}
                    <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0" />

                    {/* Step 1: Inscripción */}
                    <div className="flex flex-col items-center text-center relative z-10">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                        ✓
                      </div>
                      <span className="text-xs font-bold text-slate-900 mt-2">Inscripción</span>
                      <span className="text-[10px] text-emerald-600 font-medium">Completada</span>
                    </div>

                    {/* Step 2: Confirmación */}
                    <div className="flex flex-col items-center text-center relative z-10">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                        ✓
                      </div>
                      <span className="text-xs font-bold text-slate-900 mt-2">Confirmación</span>
                      <span className="text-[10px] text-emerald-600 font-medium">Lugar asegurado</span>
                    </div>

                    {/* Step 3: Participación */}
                    <div className="flex flex-col items-center text-center relative z-10">
                      <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-xs shadow-xs ring-4 ring-violet-100 animate-pulse">
                        3
                      </div>
                      <span className="text-xs font-bold text-violet-900 mt-2">Participación</span>
                      <span className="text-[10px] text-violet-700 font-medium">Próximo encuentro</span>
                    </div>

                    {/* Step 4: Acreditación */}
                    <div className="flex flex-col items-center text-center relative z-10">
                      <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs">
                        4
                      </div>
                      <span className="text-xs font-bold text-slate-400 mt-2">Acreditación</span>
                      <span className="text-[10px] text-slate-400 font-medium">Pendiente</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 2. Tab Guardadas (Saved) */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          {savedActivities.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No tenés actividades guardadas</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Hacé click en el ícono de corazón en cualquier oportunidad para tenerla a mano y decidirte más tarde.
              </p>
              <button
                onClick={onExploreClick}
                className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-violet-500/20"
              >
                Explorar oportunidades
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedActivities.map((act) => (
                <div
                  key={act.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:shadow-md transition-all space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-violet-700">{act.type}</span>
                      <button
                        onClick={() => onToggleSave(act.id)}
                        className="text-rose-500 hover:text-rose-700"
                        title="Quitar de guardadas"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                    <h3
                      onClick={() => onSelectActivity(act)}
                      className="font-bold text-slate-900 hover:text-violet-700 cursor-pointer"
                    >
                      {act.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{act.shortDescription}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">{act.dateString.split('·')[0]}</span>
                    <button
                      onClick={() => onSelectActivity(act)}
                      className="text-violet-600 font-bold hover:underline flex items-center gap-1"
                    >
                      Ver detalle →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. Tab Completadas */}
      {activeTab === 'completed' && (
        <div className="space-y-4">
          {completedActivities.map((act) => (
            <div
              key={act.id}
              className="bg-white rounded-3xl border border-emerald-200/80 p-6 space-y-4 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Acreditada con éxito
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{act.title}</h3>
                  <p className="text-xs text-slate-500">{act.organization} · {act.city}</p>
                </div>

                <button
                  onClick={() => setShowCertificateModal(act)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-xs transition-colors self-start"
                >
                  <Award className="w-4 h-4" />
                  Ver Certificado Oficial
                </button>
              </div>

              <div className="p-3 bg-emerald-50/60 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
                <span>Fecha: <strong>{act.dateString}</strong></span>
                <span>Horas acreditadas: <strong>+{act.hoursCount} horas</strong></span>
                <span className="hidden sm:inline">Folio: <strong>NJ-2026-LP-0842</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certificate Simulator Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border-4 border-violet-100 space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-800 text-xs font-bold">
              <Award className="w-4 h-4 text-violet-700" />
              Certificado Digital de Participación
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Nexo Joven · Región Pampeana
              </h2>
              <p className="text-xs text-slate-500">
                Constancia de Horas de Participación Sociocomunitaria y Formativa
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-3 text-xs text-slate-700">
              <p>
                Se deja constancia de que <strong>{user.name} {user.lastName}</strong> (DNI {user.dni}), estudiante de <strong>{user.school}</strong>, ha completado satisfactoriamente la actividad:
              </p>
              <p className="text-sm font-bold text-violet-900 bg-violet-50 p-2.5 rounded-lg border border-violet-100">
                "{showCertificateModal.title}"
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-[11px]">
                <div>
                  <span className="text-slate-400 block">Organización:</span>
                  <strong>{showCertificateModal.organization}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Horas Acreditadas:</span>
                  <strong className="text-emerald-700">{showCertificateModal.hoursCount} horas reloj</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Localidad:</span>
                  <strong>{showCertificateModal.city}, La Pampa</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Código Único de Validación:</span>
                  <strong className="font-mono text-slate-600">NJ-LP-2026-9912X</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setShowCertificateModal(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("Descargando certificado digital homologado en PDF...");
                }}
                className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-violet-500/20"
              >
                <Download className="w-3.5 h-3.5" />
                Descargar PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
