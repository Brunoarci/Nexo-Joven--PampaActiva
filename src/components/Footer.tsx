import React from 'react';
import { Heart, Sparkles, MapPin, Building2, ShieldCheck } from 'lucide-react';
import { NexoLogo } from './NexoLogo';

interface FooterProps {
  onOpenLocationModal: () => void;
  onOpenPublishModal: () => void;
  selectedCity: string;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLocationModal,
  onOpenPublishModal,
  selectedCity,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-24 md:pb-12 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand & Strategic Context */}
          <div className="md:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2">
              <NexoLogo size={32} />
              <span className="text-xl font-black text-white tracking-tight">Nexo Joven</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-lg leading-relaxed">
              Plataforma digital que conecta a las juventudes con oportunidades de voluntariado, prácticas preprofesionales y comunitarias en sus propios territorios.
            </p>

            {/* Strategic Note ENJU - Grupo Pampa Activa */}
            <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/80 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 text-violet-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Propuesta Estratégica ENJU · Pampa Activa</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Este desarrollo es un prototipo funcional de nuestra propuesta de solución estratégica en el marco del <strong>ENJU</strong> (Encuentro Nacional de Juventudes / Estrategia Provincial) formulada por el grupo <strong>Pampa Activa</strong>.
              </p>
            </div>

            <p className="text-xs text-violet-400 font-semibold">
              Participá. Aprendé. Conectá. Tu comunidad también tiene un lugar para vos.
            </p>
          </div>

          {/* Territorio */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Territorio</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5 text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sede Activa: <strong>General Pico</strong>, La Pampa</span>
              </li>
              <li className="text-slate-500">Santa Rosa · Trenque Lauquen (Próximamente)</li>
              <li className="text-slate-500">Junín · Pergamino · Azul (Próximamente)</li>
              <li>
                <button
                  onClick={onOpenLocationModal}
                  className="text-violet-400 hover:text-violet-300 font-semibold underline mt-1 block"
                >
                  Cambiar localidad ({selectedCity})
                </button>
              </li>
            </ul>
          </div>

          {/* Organizaciones & Ecosistema */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Ecosistema</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Escuelas secundarias & Colegios técnicos (EPET)</li>
              <li>Áreas de Juventud y Municipios</li>
              <li>Clubes deportivos y barriales</li>
              <li>Bibliotecas populares y ONGs</li>
              <li>
                <button
                  onClick={onOpenPublishModal}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 mt-1"
                >
                  <Building2 className="w-3 h-3" />
                  Publicar una actividad
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with exact attribution requested */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} <strong>Nexo Joven de Pampa Activa</strong>. Todos los derechos reservados.
          </div>
          <div className="text-[11px] text-slate-500 text-center sm:text-right">
            Prototipo de solución estratégica · ENJU · Grupo Pampa Activa
          </div>
        </div>
      </div>
    </footer>
  );
};
