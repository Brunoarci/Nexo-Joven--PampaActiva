import React from 'react';
import { MapPin, Building2, ChevronDown } from 'lucide-react';
import { UserProfile } from '../types';
import { NexoLogo } from './NexoLogo';

interface NavbarProps {
  currentTab: 'explore' | 'my-activities' | 'profile';
  onTabChange: (tab: 'explore' | 'my-activities' | 'profile') => void;
  selectedCity: string;
  onOpenLocationModal: () => void;
  onOpenPublishModal: () => void;
  user: UserProfile;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  selectedCity,
  onOpenLocationModal,
  onOpenPublishModal,
  user,
}) => {
  const totalEnrolled = user.enrolledActivityIds.length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Zone 1: Modern Minimalist Brand Logo & Location Switcher */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={() => onTabChange('explore')}
              className="flex items-center gap-2.5 text-left group"
            >
              <NexoLogo size={38} />
              <div className="hidden sm:block">
                <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-violet-700 transition-colors">
                  Nexo<span className="text-violet-600">Joven</span>
                </span>
                <span className="block text-[10px] font-semibold text-slate-400 -mt-0.5">
                  General Pico, La Pampa
                </span>
              </div>
            </button>

            {/* Location Switcher */}
            <button
              onClick={onOpenLocationModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-violet-50 text-slate-700 hover:text-violet-700 border border-slate-200 hover:border-violet-200 transition-all text-xs font-semibold"
              title="Cambiar localidad"
            >
              <MapPin className="w-3.5 h-3.5 text-violet-600 shrink-0" />
              <span className="truncate max-w-[130px] sm:max-w-none">
                {selectedCity}, La Pampa
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => onTabChange('explore')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                currentTab === 'explore'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Explorar
            </button>

            <button
              onClick={() => onTabChange('my-activities')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all relative flex items-center gap-1.5 ${
                currentTab === 'my-activities'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>Mis actividades</span>
              {totalEnrolled > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white font-extrabold text-[11px] flex items-center justify-center">
                  {totalEnrolled}
                </span>
              )}
            </button>

            <button
              onClick={() => onTabChange('profile')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                currentTab === 'profile'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Perfil
            </button>
          </nav>

          {/* Zone 3: Actions & User Preview */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Organization CTA */}
            <button
              onClick={onOpenPublishModal}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-violet-700 bg-violet-50 hover:bg-violet-100 rounded-xl transition-colors border border-violet-200"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>¿Sos una organización? Publicá</span>
            </button>

            {/* User Profile Mini Badge */}
            <button
              onClick={() => onTabChange('profile')}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
              title="Ir a mi perfil"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                {user.name[0]}
                {user.lastName[0]}
              </div>
              <div className="text-left hidden sm:block">
                <span className="block text-xs font-bold text-slate-800 leading-tight">
                  {user.name} M.
                </span>
                <span className="block text-[10px] text-slate-400 leading-tight">
                  {user.city}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
