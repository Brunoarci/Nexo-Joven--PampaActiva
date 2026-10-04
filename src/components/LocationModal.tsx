import React, { useState } from 'react';
import { MapPin, Search, Check, Sparkles, X, Lock } from 'lucide-react';
import { CITIES, CityOption } from '../data/mockData';

interface LocationModalProps {
  isOpen: boolean;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  onClose?: () => void;
  isFirstVisit?: boolean;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  selectedCity,
  onSelectCity,
  onClose,
  isFirstVisit = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tempCity, setTempCity] = useState(selectedCity || 'General Pico');

  if (!isOpen) return null;

  const filteredCities = CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.province.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConfirm = () => {
    onSelectCity(tempCity);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-700 text-white">
          {!isFirstVisit && onClose && (
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-md mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Nexo Joven · Región Pampeana</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">¿Dónde estás?</h2>
          <p className="text-violet-100 text-sm sm:text-base mt-2">
            Elegí tu localidad para encontrar oportunidades de voluntariado, prácticas y participación cerca tuyo.
          </p>
        </div>

        {/* Search & List */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar localidad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
              autoFocus={!isFirstVisit}
            />
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {filteredCities.map((city: CityOption) => {
              const isSelected = tempCity === city.name;
              const isEnabled = city.isActive;

              return (
                <button
                  key={city.name}
                  disabled={!isEnabled}
                  onClick={() => isEnabled && setTempCity(city.name)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all ${
                    !isEnabled
                      ? 'opacity-60 bg-slate-100/70 border-slate-200 cursor-not-allowed text-slate-400'
                      : isSelected
                      ? 'border-violet-600 bg-violet-50/80 text-violet-950 font-semibold shadow-xs ring-1 ring-violet-500 cursor-pointer'
                      : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100/80 text-slate-700 hover:border-slate-200 cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        !isEnabled
                          ? 'bg-slate-200 text-slate-400'
                          : isSelected
                          ? 'bg-violet-600 text-white'
                          : 'bg-white text-slate-500 border border-slate-200'
                      }`}
                    >
                      {isEnabled ? <MapPin className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${isEnabled ? 'font-semibold' : 'font-medium'}`}>
                          {city.name}
                        </span>
                        {!isEnabled && city.statusLabel && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-200 text-slate-600 border border-slate-300">
                            {city.statusLabel}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 font-normal">{city.province}</span>
                    </div>
                  </div>

                  {isEnabled && isSelected && (
                    <div className="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}

            {filteredCities.length === 0 && (
              <div className="text-center py-6 text-slate-500 text-sm">
                No encontramos "{searchTerm}".
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-500 hidden sm:block">
            Actualmente activo en General Pico. Próximamente en otras localidades.
          </div>
          <button
            onClick={handleConfirm}
            className="w-full sm:w-auto px-7 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-violet-500/20 active:scale-95 ml-auto"
          >
            Explorar oportunidades
          </button>
        </div>
      </div>
    </div>
  );
};
