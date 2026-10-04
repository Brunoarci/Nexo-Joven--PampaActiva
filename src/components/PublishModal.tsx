import React, { useState } from 'react';
import {
  X,
  Building2,
  Sparkles,
  School,
  Users2,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Send,
  ShieldCheck
} from 'lucide-react';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessToast: (title: string, desc?: string) => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({
  isOpen,
  onClose,
  onSuccessToast,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [activityTitle, setActivityTitle] = useState('');
  const [actorType, setActorType] = useState('Organización social / ONG');
  const [city, setCity] = useState('General Pico');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onSuccessToast(
      '✓ Propuesta enviada a revisión',
      'El equipo territorial de Nexo Joven se comunicará para validar la propuesta y acreditar las horas.'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-br from-indigo-700 via-violet-700 to-purple-800 text-white">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-md mb-3">
            <Users2 className="w-3.5 h-3.5 text-indigo-200" />
            <span>Red Multiactoral · Nexo Joven</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            ¿Sos una organización? Publicá tu oportunidad
          </h2>
          <p className="text-violet-100 text-xs sm:text-sm mt-2 leading-relaxed">
            Conectamos a municipios, escuelas, clubes, ONGs y empresas con jóvenes dispuestos a participar, formarse y sumar valor en sus comunidades.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Actor explanation */}
              <div className="p-4 bg-violet-50/70 rounded-2xl border border-violet-100 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-violet-700 shrink-0 mt-0.5" />
                <div className="text-xs text-violet-950 space-y-1">
                  <p className="font-bold">Acreditación y validación institucional</p>
                  <p className="text-violet-800 leading-relaxed">
                    Todas las actividades publicadas son validadas por el equipo de Nexo Joven para garantizar seguridad, acompañamiento adulto y seguimiento de horas formativas para colegios y universidades.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nombre de la institución u organización
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Club Deportivo Barrio Norte / Escuela Técnica..."
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tipo de actor participante
                  </label>
                  <select
                    value={actorType}
                    onChange={(e) => setActorType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="Organización social / ONG">Organización social / ONG</option>
                    <option value="Municipio / Área de Juventud">Municipio / Área de Juventud</option>
                    <option value="Escuela Secundaria / Escuela Técnica">Escuela Secundaria / Escuela Técnica</option>
                    <option value="Universidad / Terciario">Universidad / Terciario</option>
                    <option value="Club social y deportivo">Club social y deportivo</option>
                    <option value="Biblioteca Popular o Centro Vecinal">Biblioteca Popular o Centro Vecinal</option>
                    <option value="Empresa o Cooperativa Productiva">Empresa o Cooperativa Productiva</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Localidad del proyecto
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="General Pico">General Pico (Sede Piloto)</option>
                    <option value="Santa Rosa">Santa Rosa</option>
                    <option value="Trenque Lauquen">Trenque Lauquen</option>
                    <option value="Junín">Junín</option>
                    <option value="Pergamino">Pergamino</option>
                    <option value="Azul">Azul</option>
                    <option value="Bahía Blanca">Bahía Blanca</option>
                    <option value="La Plata">La Plata</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Título de la oportunidad o práctica formativa
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Acondicionamiento de salas comunitarias / Taller de robótica barrial..."
                  value={activityTitle}
                  onChange={(e) => setActivityTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-violet-500/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Quiero publicar una actividad</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                ¡Gracias por sumarte a Nexo Joven!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Recibimos los datos de <strong>{orgName || 'tu institución'}</strong> para la actividad "{activityTitle || 'Propuesta formativa'}". Un articulador territorial de General Pico se contactará para coordinar el convenio y la fecha de publicación.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
              >
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
