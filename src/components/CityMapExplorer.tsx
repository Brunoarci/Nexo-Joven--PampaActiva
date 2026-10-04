import React, { useState } from 'react';
import {
  MapPin,
  Sparkles,
  Award,
  Users,
  Compass,
  Building2,
  Star,
  ExternalLink,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Crosshair,
  Layers
} from 'lucide-react';
import { Activity } from '../types';

interface CityMapExplorerProps {
  activities: Activity[];
  onSelectActivity: (activity: Activity) => void;
  selectedActivityId?: string;
}

export const CityMapExplorer: React.FC<CityMapExplorerProps> = ({
  activities,
  onSelectActivity,
  selectedActivityId,
}) => {
  const [activePinActivity, setActivePinActivity] = useState<Activity | null>(
    activities.find((a) => a.id === selectedActivityId) || activities[0] || null
  );
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('todos');

  // Distinct neighborhoods in the mock dataset
  const neighborhoods = Array.from(
    new Set(activities.map((a) => a.coordinates.neighborhood))
  );

  const displayedActivities = activities.filter((a) =>
    selectedNeighborhood === 'todos'
      ? true
      : a.coordinates.neighborhood === selectedNeighborhood
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden flex flex-col space-y-0">
      {/* Map Control Bar */}
      <div className="p-4 sm:p-5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-violet-600 text-white flex items-center justify-center font-bold text-xs">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-white">
              Mapa Territorial de Actividades
            </h3>
            <p className="text-[11px] text-slate-400">
              General Pico, La Pampa · {displayedActivities.length} ubicaciones marcadas
            </p>
          </div>
        </div>

        {/* Neighborhood Selector */}
        <div className="flex items-center gap-2">
          <select
            value={selectedNeighborhood}
            onChange={(e) => setSelectedNeighborhood(e.target.value)}
            className="px-3 py-1.5 bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-violet-500"
          >
            <option value="todos">Todos los barrios ({activities.length})</option>
            {neighborhoods.map((nb) => (
              <option key={nb} value={nb}>
                {nb}
              </option>
            ))}
          </select>

          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
              className="p-1 hover:text-white text-slate-400"
              title="Alejar mapa"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="px-1.5 text-[11px] font-mono text-slate-300"
              title="Restablecer vista"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.2))}
              className="p-1 hover:text-white text-slate-400"
              title="Acercar mapa"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Map Canvas Container */}
      <div className="relative w-full h-[400px] sm:h-[480px] bg-slate-900 overflow-hidden select-none">
        {/* SVG Street Grid & Urban Canvas for General Pico */}
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 1000 650"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="urbanGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#1E293B" strokeWidth="0.8" />
              </pattern>
            </defs>

            {/* Background Grid */}
            <rect width="1000" height="650" fill="#0F172A" />
            <rect width="1000" height="650" fill="url(#urbanGrid)" opacity="0.6" />

            {/* Urban Zones & Green Spaces */}
            {/* Parque Urbano / Reserva */}
            <circle cx="320" cy="280" r="70" fill="#065F46" opacity="0.25" />
            <text x="280" y="275" fill="#10B981" fontSize="12" fontWeight="700" opacity="0.6">
              Parque Urbano
            </text>

            {/* Campus UNLPam */}
            <rect x="700" y="320" width="130" height="90" rx="15" fill="#312E81" opacity="0.3" />
            <text x="715" y="365" fill="#818CF8" fontSize="12" fontWeight="700" opacity="0.7">
              UNLPam Ingeniería
            </text>

            {/* Plaza San Martín (Centro) */}
            <rect x="420" y="220" width="60" height="60" rx="10" fill="#059669" opacity="0.25" />
            <text x="410" y="295" fill="#34D399" fontSize="11" fontWeight="700" opacity="0.7">
              Plaza San Martín
            </text>

            {/* Main Avenues & Streets */}
            {/* Ferrocarril General Roca (Diagonal) */}
            <line x1="100" y1="120" x2="880" y2="480" stroke="#475569" strokeWidth="5" strokeDasharray="8 6" />
            <text x="180" y="160" fill="#94A3B8" fontSize="10" fontWeight="600" opacity="0.7" transform="rotate(24 180 160)">
              Línea Ferroviaria · Calle 21
            </text>

            {/* Av. San Martín / Calle 9 */}
            <line x1="120" y1="360" x2="880" y2="120" stroke="#334155" strokeWidth="4" />
            <text x="500" y="240" fill="#64748B" fontSize="10" fontWeight="600" transform="rotate(-18 500 240)">
              Avenida San Martín
            </text>

            {/* Calle 13 */}
            <line x1="480" y1="40" x2="480" y2="600" stroke="#1E293B" strokeWidth="3" />
            {/* Calle 19 */}
            <line x1="420" y1="40" x2="420" y2="600" stroke="#1E293B" strokeWidth="2.5" />
            {/* Calle 102 */}
            <line x1="80" y1="240" x2="920" y2="240" stroke="#1E293B" strokeWidth="2.5" />
            {/* Calle 107 */}
            <line x1="80" y1="400" x2="920" y2="400" stroke="#1E293B" strokeWidth="3" />

            {/* Peripheral Ring - Circunvalación */}
            <rect x="60" y="40" width="880" height="560" rx="40" fill="none" stroke="#1E293B" strokeWidth="3.5" />
            <text x="100" y="60" fill="#475569" fontSize="10" fontWeight="700">
              Circunvalación General Pico
            </text>
          </svg>

          {/* Interactive Activity Pins Placed via Coordinates */}
          {displayedActivities.map((act) => {
            const isSelected = activePinActivity?.id === act.id;
            const isTechnical = act.accreditation === 'technical_school';
            const isGeneralAccredited = act.accreditation === 'general';

            // Pin styling
            let pinBg = 'bg-violet-600';
            if (isTechnical) pinBg = 'bg-amber-600 ring-2 ring-amber-300';
            else if (isGeneralAccredited) pinBg = 'bg-emerald-600';

            return (
              <div
                key={act.id}
                className="absolute -translate-x-1/2 -translate-y-full cursor-pointer transition-all duration-300 group z-10"
                style={{
                  left: `${act.coordinates.xPercent}%`,
                  top: `${act.coordinates.yPercent}%`,
                }}
                onClick={() => setActivePinActivity(act)}
              >
                {/* Pin Element */}
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-white text-[11px] font-bold shadow-xl transition-all ${pinBg} ${
                    isSelected ? 'scale-125 ring-4 ring-white z-30' : 'hover:scale-110 opacity-90'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0 fill-current" />
                  <span className="hidden sm:inline max-w-[100px] truncate">
                    {act.title.split(' ')[0]}
                  </span>
                  {act.hasOfficialEndorsement && (
                    <Star className="w-3 h-3 text-amber-300 fill-amber-300 shrink-0" />
                  )}
                </div>

                {/* Pulse radar for selected pin */}
                {isSelected && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-violet-400 animate-ping opacity-75 pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>

        {/* Legend Overlay */}
        <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-800 text-[11px] text-slate-300 space-y-1.5 shadow-md pointer-events-none hidden sm:block">
          <div className="font-bold text-white mb-1">Referencias de Acreditación</div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
            <span>Acredita Horas Escuela Técnica</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
            <span>Acredita Horas (General)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-violet-600 shrink-0" />
            <span>Voluntariado Comunitario</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-3 h-3 text-amber-300 fill-amber-300 shrink-0" />
            <span>⭐ Aval Oficial Ministerio / Municipio</span>
          </div>
        </div>

        {/* Active Pin Card Popup / Bottom Drawer */}
        {activePinActivity && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 animate-in fade-in slide-in-from-bottom-3 duration-200 z-20">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 flex-1">
                {/* Accreditation badge */}
                <div className="flex flex-wrap items-center gap-1.5 mb-1">
                  {activePinActivity.accreditation === 'technical_school' ? (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200 flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-700" />
                      Acredita Horas Escuela Técnica
                    </span>
                  ) : activePinActivity.accreditation === 'general' ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-200 flex items-center gap-1">
                      <Award className="w-3 h-3 text-emerald-700" />
                      Acredita {activePinActivity.hoursCount}h
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-violet-50 text-violet-800">
                      Voluntariado
                    </span>
                  )}

                  {activePinActivity.hasOfficialEndorsement && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-900 flex items-center gap-0.5" title={activePinActivity.endorsementLabel}>
                      <Star className="w-2.5 h-2.5 text-blue-600 fill-blue-600" />
                      ⭐ Aval Oficial
                    </span>
                  )}
                </div>

                <h4 className="font-extrabold text-slate-900 text-sm leading-snug line-clamp-2">
                  {activePinActivity.title}
                </h4>

                <p className="text-[11px] text-slate-500 font-medium">
                  📍 {activePinActivity.coordinates.address} ({activePinActivity.coordinates.neighborhood})
                </p>
              </div>

              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <img
                  src={activePinActivity.imageUrl}
                  alt={activePinActivity.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-700">
                👥 {activePinActivity.availableQuotas} cupos libres
              </span>
              <button
                onClick={() => onSelectActivity(activePinActivity)}
                className="px-3.5 py-1.5 bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <span>Ver actividad</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
