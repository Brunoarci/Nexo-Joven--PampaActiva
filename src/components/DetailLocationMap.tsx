import React from 'react';
import { MapPin, Navigation, Compass, Star, Building2 } from 'lucide-react';
import { Activity } from '../types';

interface DetailLocationMapProps {
  activity: Activity;
}

export const DetailLocationMap: React.FC<DetailLocationMapProps> = ({ activity }) => {
  const { coordinates, location, city } = activity;

  return (
    <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-4 sm:p-5 space-y-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-violet-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Ubicación en {city}
          </h4>
        </div>
        <span className="text-[11px] font-semibold text-slate-500">
          {coordinates.neighborhood}
        </span>
      </div>

      {/* Visual Map Canvas Representation */}
      <div className="relative w-full h-44 rounded-xl overflow-hidden border border-slate-300/80 bg-slate-900 shadow-inner">
        {/* SVG Street Grid representation for the location */}
        <svg
          className="w-full h-full"
          viewBox="0 0 500 220"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="500" height="220" fill="#0F172A" />

          {/* Grid lines */}
          <line x1="0" y1="50" x2="500" y2="50" stroke="#1E293B" strokeWidth="1.5" />
          <line x1="0" y1="110" x2="500" y2="110" stroke="#334155" strokeWidth="3" />
          <line x1="0" y1="170" x2="500" y2="170" stroke="#1E293B" strokeWidth="1.5" />

          <line x1="120" y1="0" x2="120" y2="220" stroke="#1E293B" strokeWidth="1.5" />
          <line x1="250" y1="0" x2="250" y2="220" stroke="#334155" strokeWidth="3" />
          <line x1="380" y1="0" x2="380" y2="220" stroke="#1E293B" strokeWidth="1.5" />

          {/* Urban blocks */}
          <rect x="20" y="60" width="80" height="40" rx="4" fill="#1E293B" opacity="0.6" />
          <rect x="140" y="60" width="90" height="40" rx="4" fill="#1E293B" opacity="0.6" />
          <rect x="270" y="60" width="90" height="40" rx="4" fill="#065F46" opacity="0.4" />
          <rect x="140" y="125" width="90" height="35" rx="4" fill="#1E293B" opacity="0.6" />
          <rect x="270" y="125" width="90" height="35" rx="4" fill="#1E293B" opacity="0.6" />

          {/* Street labels */}
          <text x="260" y="25" fill="#64748B" fontSize="9" fontWeight="600">
            Calle Principal
          </text>
          <text x="10" y="105" fill="#64748B" fontSize="9" fontWeight="600">
            Avenida
          </text>
        </svg>

        {/* Central Pin Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
          <div className="px-3 py-1 rounded-full bg-violet-600 text-white text-[11px] font-bold shadow-xl border border-violet-400 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 fill-current" />
            <span className="truncate max-w-[140px]">{location}</span>
          </div>
          <div className="w-2.5 h-2.5 bg-violet-600 rotate-45 -mt-1.5" />
          <div className="w-4 h-2 rounded-full bg-slate-950/60 blur-[1px] mt-0.5" />
        </div>

        {/* Coords overlay */}
        <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] text-slate-400 font-mono">
          Lat: {coordinates.lat.toFixed(4)}, Lng: {coordinates.lng.toFixed(4)}
        </div>
      </div>

      {/* Address & Navigation Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 pt-1">
        <div>
          <span className="font-bold text-slate-800 block">{coordinates.address}</span>
          <span className="text-[11px] text-slate-500">
            Barrio {coordinates.neighborhood} · {city}, La Pampa
          </span>
        </div>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-violet-700 font-bold text-xs rounded-xl border border-slate-200 transition-colors shadow-2xs self-start sm:self-auto"
        >
          <Navigation className="w-3.5 h-3.5 text-violet-600" />
          <span>Abrir en GPS / Maps</span>
        </a>
      </div>
    </div>
  );
};
