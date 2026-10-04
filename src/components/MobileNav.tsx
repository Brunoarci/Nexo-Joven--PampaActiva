import React from 'react';
import { Compass, CalendarCheck2, User, PlusCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface MobileNavProps {
  currentTab: 'explore' | 'my-activities' | 'profile';
  onTabChange: (tab: 'explore' | 'my-activities' | 'profile') => void;
  onOpenPublishModal: () => void;
  user: UserProfile;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentTab,
  onTabChange,
  onOpenPublishModal,
  user,
}) => {
  const totalEnrolled = user.enrolledActivityIds.length;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-2">
      <div className="grid grid-cols-4 items-center gap-1">
        {/* Explorar */}
        <button
          onClick={() => onTabChange('explore')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl text-[10px] font-bold transition-colors ${
            currentTab === 'explore'
              ? 'text-violet-700'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span>Explorar</span>
        </button>

        {/* Mis actividades */}
        <button
          onClick={() => onTabChange('my-activities')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl text-[10px] font-bold transition-colors relative ${
            currentTab === 'my-activities'
              ? 'text-violet-700'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <div className="relative">
            <CalendarCheck2 className="w-5 h-5 mb-0.5" />
            {totalEnrolled > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-emerald-500 text-white font-black text-[9px] flex items-center justify-center">
                {totalEnrolled}
              </span>
            )}
          </div>
          <span>Mis act.</span>
        </button>

        {/* Publicar */}
        <button
          onClick={onOpenPublishModal}
          className="flex flex-col items-center justify-center py-1 rounded-xl text-[10px] font-bold text-slate-500 hover:text-violet-700 transition-colors"
        >
          <PlusCircle className="w-5 h-5 mb-0.5" />
          <span>Publicar</span>
        </button>

        {/* Perfil */}
        <button
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl text-[10px] font-bold transition-colors ${
            currentTab === 'profile'
              ? 'text-violet-700'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span>Perfil</span>
        </button>
      </div>
    </nav>
  );
};
