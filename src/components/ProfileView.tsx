import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Sparkles,
  MapPin,
  Save,
  Check,
  Calendar,
  CreditCard,
  Building2,
  BookOpen
} from 'lucide-react';
import { UserProfile, ActivityCategory } from '../types';
import { CATEGORIES } from '../data/mockData';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onShowToast: (title: string, description?: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onUpdateUser,
  onShowToast,
}) => {
  const [formData, setFormData] = useState<UserProfile>(user);
  const [isSaving, setIsSaving] = useState(false);

  const handleInterestToggle = (category: ActivityCategory) => {
    const isSelected = formData.interests.includes(category);
    const newInterests = isSelected
      ? formData.interests.filter((c) => c !== category)
      : [...formData.interests, category];
    setFormData({ ...formData, interests: newInterests });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onUpdateUser(formData);
      setIsSaving(false);
      onShowToast(
        '✓ Perfil actualizado',
        'Tus intereses y datos se guardaron. Las recomendaciones se actualizaron automáticamente.'
      );
    }, 300);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Header Profile Badge */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-violet-600 via-indigo-600 to-blue-500 text-white flex items-center justify-center font-extrabold text-3xl shadow-lg ring-4 ring-violet-100">
            {formData.name[0]}
            {formData.lastName[0]}
          </div>
          <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white" title="Activa en Nexo Joven">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </span>
        </div>

        <div className="text-center sm:text-left space-y-2 flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl font-black text-slate-900">
              {formData.name} {formData.lastName}
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-800">
              {formData.age} años
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1 font-medium text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-violet-600" />
              {formData.city}, La Pampa
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 font-medium text-slate-700">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
              {formData.school}
            </span>
          </div>

          <p className="text-xs text-slate-500 pt-1">
            Perfil de estudiante verificado · Participante activo del piloto Nexo Joven General Pico
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Datos Personales */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <User className="w-4 h-4 text-violet-600" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Datos personales
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nombre</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Apellido</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">DNI</label>
              <input
                type="text"
                value={formData.dni}
                onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Fecha de nacimiento</label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Género</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="No binario">No binario</option>
                <option value="Prefiero no decir">Prefiero no decir</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Localidad de residencia</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Formación y Escuela */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <GraduationCap className="w-4 h-4 text-violet-600" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Formación e Institución educativa
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Colegio secundario o Institución</label>
              <input
                type="text"
                value={formData.school}
                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Curso / Año</label>
              <input
                type="text"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Orientación / Modalidad</label>
              <input
                type="text"
                value={formData.technicalOrientation}
                onChange={(e) => setFormData({ ...formData, technicalOrientation: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>
        </div>

        {/* Mis Intereses */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                Mis intereses y temáticas
              </h2>
            </div>
            <span className="text-xs text-violet-700 font-bold">
              {formData.interests.length} elegidas
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Elegí las áreas que más te llaman la atención. Las usamos para alimentar la sección "Para vos ✨" con oportunidades personalizadas.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {CATEGORIES.map((cat) => {
              const isSelected = formData.interests.includes(cat);
              return (
                <button
                  type="button"
                  key={cat}
                  onClick={() => handleInterestToggle(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-violet-600 text-white shadow-xs scale-102 ring-2 ring-violet-300'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-violet-500/20 active:scale-95 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Guardando...' : 'Guardar cambios'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
