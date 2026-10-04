import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Calendar,
  Users,
  Award,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  X,
  ChevronDown,
  Star,
  Map,
  LayoutGrid
} from 'lucide-react';
import { ActivityType, ActivityCategory } from '../types';
import { CATEGORIES } from '../data/mockData';

export interface FilterState {
  searchTerm: string;
  activityType: ActivityType | 'Todas';
  minQuotas: number;
  dateRange: 'all' | 'this_week' | 'this_month' | 'next_month' | 'custom';
  customDate: string;
  categories: ActivityCategory[];
  onlyVerified: boolean;
  onlyTechnicalHours: boolean;
  onlyGeneralHours: boolean;
  onlyOfficialEndorsement: boolean;
  noExperienceRequired: boolean;
  forSecondary: boolean;
  forTechnical: boolean;
}

export const INITIAL_FILTERS: FilterState = {
  searchTerm: '',
  activityType: 'Todas',
  minQuotas: 1,
  dateRange: 'all',
  customDate: '',
  categories: [],
  onlyVerified: false,
  onlyTechnicalHours: false,
  onlyGeneralHours: false,
  onlyOfficialEndorsement: false,
  noExperienceRequired: false,
  forSecondary: false,
  forTechnical: false,
};

interface FilterSectionProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  totalResults: number;
  selectedCity: string;
  onOpenLocationModal: () => void;
  currentViewMode: 'grid' | 'map';
  onToggleViewMode: (mode: 'grid' | 'map') => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
  selectedCity,
  onOpenLocationModal,
  currentViewMode,
  onToggleViewMode,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const activityTypes: Array<ActivityType | 'Todas'> = [
    'Todas',
    'Voluntariado',
    'Práctica escuela técnica',
    'Práctica preprofesional',
    'Voluntariado escolar',
  ];

  const handleTypeSelect = (type: ActivityType | 'Todas') => {
    onFilterChange({ ...filters, activityType: type });
  };

  const handleCategoryToggle = (category: ActivityCategory) => {
    const isSelected = filters.categories.includes(category);
    const newCategories = isSelected
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const activeFiltersCount = [
    filters.searchTerm ? 1 : 0,
    filters.activityType !== 'Todas' ? 1 : 0,
    filters.minQuotas > 1 ? 1 : 0,
    filters.dateRange !== 'all' ? 1 : 0,
    filters.categories.length,
    filters.onlyVerified ? 1 : 0,
    filters.onlyTechnicalHours ? 1 : 0,
    filters.onlyGeneralHours ? 1 : 0,
    filters.onlyOfficialEndorsement ? 1 : 0,
    filters.noExperienceRequired ? 1 : 0,
    filters.forSecondary ? 1 : 0,
    filters.forTechnical ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-4">
      {/* Big Search Bar with View Switcher */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch">
        <div className="relative flex-1">
          <div className="flex items-center bg-white rounded-2xl border border-slate-200/90 shadow-md focus-within:border-violet-600 focus-within:ring-4 focus-within:ring-violet-500/15 transition-all p-2 gap-2">
            <div className="pl-3 text-slate-400">
              <Search className="w-5 h-5 text-violet-600" />
            </div>
            <input
              type="text"
              placeholder="🔎 ¿Qué estás buscando? Buscar por nombre, organización, temática..."
              value={filters.searchTerm}
              onChange={(e) => onFilterChange({ ...filters, searchTerm: e.target.value })}
              className="w-full py-2.5 text-sm sm:text-base bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            {filters.searchTerm && (
              <button
                onClick={() => onFilterChange({ ...filters, searchTerm: '' })}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
                title="Borrar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                showAdvanced || activeFiltersCount > 0
                  ? 'bg-violet-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Filtros</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-violet-700 font-bold text-[11px] flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* View Mode Toggle Button: Lista vs Mapa */}
        <div className="flex items-center p-1 bg-white rounded-2xl border border-slate-200/90 shadow-sm shrink-0 self-end sm:self-auto">
          <button
            onClick={() => onToggleViewMode('grid')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              currentViewMode === 'grid'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Tarjetas</span>
          </button>
          <button
            onClick={() => onToggleViewMode('map')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              currentViewMode === 'map'
                ? 'bg-violet-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>Mapa Territorial</span>
          </button>
        </div>
      </div>

      {/* Quick Type Chips (always visible for fast access) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
          Tipo:
        </span>
        {activityTypes.map((type) => {
          const isSelected = filters.activityType === type;
          return (
            <button
              key={type}
              onClick={() => handleTypeSelect(type)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>

      {/* Advanced Filter Drawer / Panel */}
      {showAdvanced && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-lg space-y-6 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-violet-600" />
              <h3 className="font-bold text-slate-900 text-base">Filtros detallados</h3>
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={onResetFilters}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Limpiar filtros
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Cupos Slider */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-violet-600" />
                  Cupos disponibles mínimos
                </span>
                <span className="font-extrabold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-md border border-violet-100">
                  {filters.minQuotas === 1 ? 'Cualquiera' : `${filters.minQuotas}+ cupos`}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={filters.minQuotas}
                onChange={(e) => onFilterChange({ ...filters, minQuotas: Number(e.target.value) })}
                className="w-full accent-violet-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>1 cupo</span>
                <span>5 cupos</span>
                <span>10+ cupos</span>
                <span>15+</span>
              </div>
            </div>

            {/* Fecha Selector */}
            <div className="space-y-2.5">
              <span className="font-bold text-xs text-slate-700 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-violet-600" />
                Fecha de realización
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'all', label: 'Cualquier fecha' },
                  { id: 'this_week', label: 'Esta semana' },
                  { id: 'this_month', label: 'Este mes' },
                  { id: 'next_month', label: 'Próximo mes' },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => onFilterChange({ ...filters, dateRange: d.id as any })}
                    className={`py-1.5 px-2.5 text-xs rounded-lg font-medium border text-center transition-all ${
                      filters.dateRange === d.id
                        ? 'border-violet-600 bg-violet-50 text-violet-950 font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Conditions Toggles with Refined Accreditation */}
            <div className="space-y-2">
              <span className="font-bold text-xs text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-violet-600" />
                Régimen y acreditaciones
              </span>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={filters.onlyOfficialEndorsement}
                    onChange={(e) => onFilterChange({ ...filters, onlyOfficialEndorsement: e.target.checked })}
                    className="rounded border-slate-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="font-semibold text-slate-900">⭐ Con Aval Oficial (Ministerio / Municipio)</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={filters.onlyTechnicalHours}
                    onChange={(e) => onFilterChange({ ...filters, onlyTechnicalHours: e.target.checked })}
                    className="rounded border-slate-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                  <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                  <span>Acredita Horas Escuela Técnica</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={filters.onlyGeneralHours}
                    onChange={(e) => onFilterChange({ ...filters, onlyGeneralHours: e.target.checked })}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Acredita Horas (General)</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={filters.noExperienceRequired}
                    onChange={(e) => onFilterChange({ ...filters, noExperienceRequired: e.target.checked })}
                    className="rounded border-slate-300 text-violet-600 focus:ring-violet-500 w-4 h-4"
                  />
                  <span>🌱 Sin experiencia previa (Voluntariado libre)</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={filters.onlyVerified}
                    onChange={(e) => onFilterChange({ ...filters, onlyVerified: e.target.checked })}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Organizaciones verificadas</span>
                </label>
              </div>
            </div>
          </div>

          {/* Temáticas Multi-Select Grid */}
          <div className="pt-3 border-t border-slate-100">
            <span className="font-bold text-xs text-slate-700 block mb-2.5">
              Temáticas y áreas de interés ({filters.categories.length} seleccionadas)
            </span>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => {
                const isSelected = filters.categories.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryToggle(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-violet-600 text-white font-semibold shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Results Header Bar & Active Chips */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-extrabold text-slate-900">
            {totalResults} oportunidades encontradas
          </span>
          <span className="text-xs text-slate-500">en {selectedCity}</span>
        </div>

        {activeFiltersCount > 0 && (
          <button
            onClick={onResetFilters}
            className="text-xs text-violet-600 hover:text-violet-800 font-bold flex items-center gap-1 ml-auto"
          >
            <RotateCcw className="w-3 h-3" />
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Active Filter Chips */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {filters.searchTerm && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-50 text-violet-900 border border-violet-200 text-xs font-medium">
              Búsqueda: "{filters.searchTerm}"
              <button
                onClick={() => onFilterChange({ ...filters, searchTerm: '' })}
                className="hover:text-violet-700"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.onlyOfficialEndorsement && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold">
              ⭐ Con Aval Oficial
              <button
                onClick={() => onFilterChange({ ...filters, onlyOfficialEndorsement: false })}
                className="hover:text-amber-700"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.onlyTechnicalHours && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
              Escuela Técnica
              <button
                onClick={() => onFilterChange({ ...filters, onlyTechnicalHours: false })}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.onlyGeneralHours && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-medium">
              Acredita Horas
              <button
                onClick={() => onFilterChange({ ...filters, onlyGeneralHours: false })}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.noExperienceRequired && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium">
              Sin experiencia previa
              <button
                onClick={() => onFilterChange({ ...filters, noExperienceRequired: false })}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.categories.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-100 text-violet-900 text-xs font-medium"
            >
              {cat}
              <button
                onClick={() => handleCategoryToggle(cat)}
                className="hover:text-violet-700"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
