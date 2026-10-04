import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  MapPin,
  Search,
  BookOpen,
  Award,
  Users,
  Compass,
  CheckCircle2,
  CalendarCheck,
  Star,
  Map
} from 'lucide-react';
import { Activity, UserProfile, ActivityCategory } from './types';
import { MOCK_ACTIVITIES, INITIAL_USER, CITIES } from './data/mockData';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { Footer } from './components/Footer';
import { LocationModal } from './components/LocationModal';
import { ActivityCard } from './components/ActivityCard';
import { ActivityDetailModal } from './components/ActivityDetailModal';
import { FilterSection, FilterState, INITIAL_FILTERS } from './components/FilterSection';
import { ActivitySections } from './components/ActivitySections';
import { MyActivitiesView } from './components/MyActivitiesView';
import { ProfileView } from './components/ProfileView';
import { PublishModal } from './components/PublishModal';
import { CityMapExplorer } from './components/CityMapExplorer';
import { ToastContainer, ToastMessage } from './components/Toast';

export default function App() {
  // Navigation & Core State
  const [currentTab, setCurrentTab] = useState<'explore' | 'my-activities' | 'profile'>('explore');
  const [selectedCity, setSelectedCity] = useState<string>('General Pico');
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(true);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(true);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState<boolean>(false);
  const [currentViewMode, setCurrentViewMode] = useState<'grid' | 'map'>('grid');

  // User Profile State (Pre-authenticated mock Sofía Martínez)
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);

  // Activities Data State
  const [activities, setActivities] = useState<Activity[]>(MOCK_ACTIVITIES);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  // Filters State
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, description?: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Handle City Select
  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setIsFirstVisit(false);
    setIsLocationModalOpen(false);
    addToast(`📍 Localidad seleccionada: ${city}`, 'Mostrando oportunidades disponibles en tu comunidad.');
  };

  // Toggle Save Activity
  const handleToggleSave = (activityId: string) => {
    const isSaved = user.savedActivityIds.includes(activityId);
    const newSaved = isSaved
      ? user.savedActivityIds.filter((id) => id !== activityId)
      : [...user.savedActivityIds, activityId];

    setUser({ ...user, savedActivityIds: newSaved });

    const activity = activities.find((a) => a.id === activityId);
    if (!isSaved) {
      addToast(
        'Actividad guardada',
        `"${activity?.title?.substring(0, 35)}..." ahora está en tu lista de guardadas.`
      );
    } else {
      addToast('Actividad eliminada de guardadas', '', 'info');
    }
  };

  // Enroll in Activity
  const handleEnroll = (activityId: string) => {
    if (user.enrolledActivityIds.includes(activityId)) return;

    // Update user enrollments
    const newEnrolled = [...user.enrolledActivityIds, activityId];
    setUser({ ...user, enrolledActivityIds: newEnrolled });

    // Decrement quota in activities
    setActivities((prev) =>
      prev.map((act) =>
        act.id === activityId && act.availableQuotas > 0
          ? { ...act, availableQuotas: act.availableQuotas - 1 }
          : act
      )
    );

    const act = activities.find((a) => a.id === activityId);
    addToast(
      '¡Inscripción confirmada!',
      `Te inscribiste a "${act?.title}". Podés seguir el circuito en "Mis actividades".`
    );
  };

  // Cancel Enrollment
  const handleCancelEnrollment = (activityId: string) => {
    const newEnrolled = user.enrolledActivityIds.filter((id) => id !== activityId);
    setUser({ ...user, enrolledActivityIds: newEnrolled });

    // Restore quota
    setActivities((prev) =>
      prev.map((act) =>
        act.id === activityId
          ? { ...act, availableQuotas: act.availableQuotas + 1 }
          : act
      )
    );

    addToast('Inscripción cancelada', 'Liberaste tu cupo para otros jóvenes.', 'info');
  };

  // User Profile Update
  const handleUpdateUser = (updatedUser: UserProfile) => {
    setUser(updatedUser);
  };

  // Filter Logic
  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      // Search term
      if (filters.searchTerm.trim()) {
        const query = filters.searchTerm.toLowerCase();
        const matchesTitle = act.title.toLowerCase().includes(query);
        const matchesOrg = act.organization.toLowerCase().includes(query);
        const matchesCat = act.category.toLowerCase().includes(query);
        const matchesDesc = act.shortDescription.toLowerCase().includes(query);
        const matchesNeighborhood = act.coordinates.neighborhood.toLowerCase().includes(query);
        if (!matchesTitle && !matchesOrg && !matchesCat && !matchesDesc && !matchesNeighborhood) {
          return false;
        }
      }

      // Activity Type
      if (filters.activityType !== 'Todas' && act.type !== filters.activityType) {
        return false;
      }

      // Quotas
      if (act.availableQuotas < filters.minQuotas) {
        return false;
      }

      // Categories
      if (filters.categories.length > 0) {
        const matchesPrimary = filters.categories.includes(act.category);
        const matchesSecondary = act.secondaryCategory
          ? filters.categories.includes(act.secondaryCategory)
          : false;
        if (!matchesPrimary && !matchesSecondary) {
          return false;
        }
      }

      // Official Endorsement (⭐)
      if (filters.onlyOfficialEndorsement && !act.hasOfficialEndorsement) {
        return false;
      }

      // Technical School Hours
      if (filters.onlyTechnicalHours && act.accreditation !== 'technical_school') {
        return false;
      }

      // General Hours
      if (filters.onlyGeneralHours && act.accreditation !== 'general') {
        return false;
      }

      // Verification
      if (filters.onlyVerified && !act.isVerified) {
        return false;
      }

      // No experience required
      if (filters.noExperienceRequired && act.requiresExperience) {
        return false;
      }

      // Technical students
      if (filters.forTechnical && !act.forTechnicalStudents) {
        return false;
      }

      // Secondary students
      if (filters.forSecondary && !act.forSecondaryStudents) {
        return false;
      }

      return true;
    });
  }, [activities, filters]);

  // Curated Recommendation Sections
  const forYouActivities = useMemo(() => {
    return activities.filter((act) => {
      const matchesInterests =
        user.interests.includes(act.category) ||
        (act.secondaryCategory && user.interests.includes(act.secondaryCategory));
      const isTechnicalMatch = act.forTechnicalStudents;
      return matchesInterests || isTechnicalMatch;
    }).slice(0, 6);
  }, [activities, user.interests]);

  const nearbyActivities = useMemo(() => {
    return activities.slice(0, 6);
  }, [activities]);

  const idealStartActivities = useMemo(() => {
    return activities.filter((act) => !act.requiresExperience).slice(0, 6);
  }, [activities]);

  const lastSpotsActivities = useMemo(() => {
    return activities.filter((act) => act.availableQuotas <= 4).slice(0, 6);
  }, [activities]);

  const hasActiveFilters =
    filters.searchTerm !== '' ||
    filters.activityType !== 'Todas' ||
    filters.minQuotas > 1 ||
    filters.dateRange !== 'all' ||
    filters.categories.length > 0 ||
    filters.onlyVerified ||
    filters.onlyTechnicalHours ||
    filters.onlyGeneralHours ||
    filters.onlyOfficialEndorsement ||
    filters.noExperienceRequired ||
    filters.forSecondary ||
    filters.forTechnical;

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f6fb] text-slate-800">
      {/* Location Onboarding Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        selectedCity={selectedCity}
        onSelectCity={handleCitySelect}
        onClose={() => setIsLocationModalOpen(false)}
        isFirstVisit={isFirstVisit}
      />

      {/* Activity Detail Modal */}
      <ActivityDetailModal
        activity={selectedActivity}
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        isSaved={selectedActivity ? user.savedActivityIds.includes(selectedActivity.id) : false}
        isEnrolled={selectedActivity ? user.enrolledActivityIds.includes(selectedActivity.id) : false}
        onToggleSave={handleToggleSave}
        onEnroll={handleEnroll}
        onViewMyActivities={() => setCurrentTab('my-activities')}
      />

      {/* Organization Publishing Modal */}
      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onSuccessToast={addToast}
      />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Navbar */}
      <Navbar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedCity={selectedCity}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        onOpenPublishModal={() => setIsPublishModalOpen(true)}
        user={user}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* VIEW 1: EXPLORE / HOME */}
        {currentTab === 'explore' && (
          <div className="space-y-10">
            {/* Hero Header */}
            <div className="bg-gradient-to-br from-violet-900 via-indigo-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl border border-violet-800/40">
              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-md border border-white/15">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>
                    Oportunidades en <strong>General Pico, La Pampa</strong>
                  </span>
                  <button
                    onClick={() => setIsLocationModalOpen(true)}
                    className="text-violet-300 hover:text-white underline ml-1 font-bold"
                  >
                    Cambiar
                  </button>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  Encontrá dónde participar, aprender y aportar
                </h1>

                <p className="text-violet-100 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
                  Prácticas formativas, proyectos técnicos de escuela secundaria y voluntariados en General Pico. Conectá tus intereses con las necesidades de tu comunidad.
                </p>

                {/* Quick suggestions */}
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-violet-300 font-semibold">Búsquedas populares:</span>
                  {[
                    'Ambiente',
                    'Escuela técnica',
                    'Desarrollo web',
                    'Apoyo escolar',
                    'Robótica',
                    'Bicicletas',
                  ].map((sug) => (
                    <button
                      key={sug}
                      onClick={() => setFilters({ ...filters, searchTerm: sug })}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>

              {/* Decorative background glows */}
              <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-violet-600/30 blur-3xl pointer-events-none" />
              <div className="absolute right-40 top-0 w-60 h-60 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
            </div>

            {/* Filter Section with View Switcher */}
            <FilterSection
              filters={filters}
              onFilterChange={setFilters}
              onResetFilters={() => setFilters(INITIAL_FILTERS)}
              totalResults={filteredActivities.length}
              selectedCity={selectedCity}
              onOpenLocationModal={() => setIsLocationModalOpen(true)}
              currentViewMode={currentViewMode}
              onToggleViewMode={setCurrentViewMode}
            />

            {/* IF MAP VIEW MODE IS ACTIVE: SHOW INTERACTIVE MAP CANVAS */}
            {currentViewMode === 'map' ? (
              <div className="space-y-6 animate-in fade-in duration-200">
                <CityMapExplorer
                  activities={filteredActivities}
                  onSelectActivity={setSelectedActivity}
                />

                {/* Mini card grid under map */}
                <div className="pt-4">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-3">
                    Actividades georreferenciadas ({filteredActivities.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredActivities.map((activity) => (
                      <ActivityCard
                        key={activity.id}
                        activity={activity}
                        isSaved={user.savedActivityIds.includes(activity.id)}
                        isEnrolled={user.enrolledActivityIds.includes(activity.id)}
                        onToggleSave={handleToggleSave}
                        onSelect={setSelectedActivity}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : hasActiveFilters ? (
              /* IF FILTERS ARE APPLIED IN GRID MODE: SHOW DIRECT RESULTS GRID */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-extrabold text-slate-900">
                    Resultados de búsqueda ({filteredActivities.length})
                  </h2>
                </div>

                {filteredActivities.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 space-y-4">
                    <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                      <Search className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      No encontramos actividades con estos filtros
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                      Probá ampliando el rango de cupos, seleccionando otra temática o limpiando los filtros para ver todas las opciones de General Pico.
                    </p>
                    <button
                      onClick={() => setFilters(INITIAL_FILTERS)}
                      className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-violet-500/20"
                    >
                      Restablecer todos los filtros
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {filteredActivities.map((activity) => (
                      <ActivityCard
                        key={activity.id}
                        activity={activity}
                        isSaved={user.savedActivityIds.includes(activity.id)}
                        isEnrolled={user.enrolledActivityIds.includes(activity.id)}
                        onToggleSave={handleToggleSave}
                        onSelect={setSelectedActivity}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* IF NO SEARCH/FILTERS ACTIVE: SHOW RICH DISCOVERY CAROUSELS + FULL CATALOG */
              <div className="space-y-12">
                <ActivitySections
                  forYouActivities={forYouActivities}
                  nearbyActivities={nearbyActivities}
                  idealStartActivities={idealStartActivities}
                  lastSpotsActivities={lastSpotsActivities}
                  savedIds={user.savedActivityIds}
                  enrolledIds={user.enrolledActivityIds}
                  onToggleSave={handleToggleSave}
                  onSelectActivity={setSelectedActivity}
                  selectedCity={selectedCity}
                />

                {/* All opportunities catalog grid */}
                <div className="space-y-6 pt-6 border-t border-slate-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                        Todas las oportunidades en General Pico ({activities.length})
                      </h2>
                      <p className="text-xs text-slate-500">
                        Explorá el conjunto completo de prácticas formativas, técnicas y voluntariados disponibles.
                      </p>
                    </div>

                    <button
                      onClick={() => setCurrentViewMode('map')}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-violet-50 text-violet-700 hover:bg-violet-100 flex items-center gap-1.5 transition-colors self-start sm:self-auto border border-violet-200"
                    >
                      <Map className="w-3.5 h-3.5" />
                      <span>Ver todas en el mapa territorial</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {filteredActivities.map((activity) => (
                      <ActivityCard
                        key={activity.id}
                        activity={activity}
                        isSaved={user.savedActivityIds.includes(activity.id)}
                        isEnrolled={user.enrolledActivityIds.includes(activity.id)}
                        onToggleSave={handleToggleSave}
                        onSelect={setSelectedActivity}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: MIS ACTIVIDADES */}
        {currentTab === 'my-activities' && (
          <MyActivitiesView
            user={user}
            allActivities={activities}
            onSelectActivity={setSelectedActivity}
            onCancelEnrollment={handleCancelEnrollment}
            onToggleSave={handleToggleSave}
            onExploreClick={() => setCurrentTab('explore')}
          />
        )}

        {/* VIEW 3: PERFIL */}
        {currentTab === 'profile' && (
          <ProfileView
            user={user}
            onUpdateUser={handleUpdateUser}
            onShowToast={addToast}
          />
        )}
      </main>

      {/* Footer with Strategic Attribution */}
      <Footer
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        onOpenPublishModal={() => setIsPublishModalOpen(true)}
        selectedCity={selectedCity}
      />

      {/* Mobile Sticky Navigation */}
      <MobileNav
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPublishModal={() => setIsPublishModalOpen(true)}
        user={user}
      />
    </div>
  );
}
