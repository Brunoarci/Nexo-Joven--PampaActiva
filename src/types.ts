export type ActivityType =
  | 'Práctica preprofesional'
  | 'Práctica escuela técnica'
  | 'Voluntariado'
  | 'Voluntariado escolar';

export type ActivityCategory =
  | 'Ambiente'
  | 'Educación'
  | 'Cultura'
  | 'Tecnología'
  | 'Comunidad'
  | 'Deportes'
  | 'Salud y bienestar'
  | 'Comunicación'
  | 'Arte'
  | 'Desarrollo social'
  | 'Producción y emprendedurismo'
  | 'Ciencia e innovación';

export type AccreditationType =
  | 'none'              // Actividades lúdicas o voluntariados libres
  | 'general'           // "Acredita Horas"
  | 'technical_school'; // "Acredita Horas Escuela Técnica"

export interface ActivityLocationCoordinates {
  lat: number;
  lng: number;
  xPercent: number; // Coordenada X relativa en el mapa de General Pico (0-100)
  yPercent: number; // Coordenada Y relativa en el mapa de General Pico (0-100)
  neighborhood: string;
  address: string;
}

export interface Activity {
  id: string;
  title: string;
  organization: string;
  organizationType: 'Municipalidad' | 'Escuela' | 'ONG' | 'Club' | 'Universidad' | 'Empresa Social' | 'Cooperativa';
  isVerified: boolean;
  hasOfficialEndorsement?: boolean; // ⭐ Aval Oficial
  endorsementLabel?: string;        // ej: "Aval Oficial Ministerio de Educación"
  type: ActivityType;
  category: ActivityCategory;
  secondaryCategory?: ActivityCategory;
  location: string; // Specific venue / neighborhood
  city: string;     // General Pico
  coordinates: ActivityLocationCoordinates;
  dateString: string;
  startDate: string; // ISO date YYYY-MM-DD for filtering
  endDate?: string;
  timeString: string;
  totalQuotas: number;
  availableQuotas: number;
  accreditation: AccreditationType;
  hoursCount?: number;
  requiresExperience: boolean;
  forTechnicalStudents: boolean;
  forSecondaryStudents: boolean;
  ageRange: string;
  tags: string[];
  imageUrl: string;
  shortDescription: string;
  fullDescription: string;
  tasks: string[];
  learnings: string[];
  requirements: string[];
  contactEmail: string;
  featuredSection?: 'para_vos' | 'cerca' | 'ideal_empezar' | 'ultimos_cupos';
}

export interface UserProfile {
  name: string;
  lastName: string;
  dni: string;
  birthDate: string;
  age: number;
  gender: string;
  city: string;
  school: string;
  grade: string;
  technicalOrientation: string;
  interests: ActivityCategory[];
  enrolledActivityIds: string[];
  savedActivityIds: string[];
}

export type TimelineStep = 'inscripcion' | 'confirmacion' | 'participacion' | 'acreditacion';

export interface EnrolledActivityProgress {
  activityId: string;
  enrolledAt: string;
  currentStep: TimelineStep;
  statusBadge: 'Inscripto' | 'Confirmado' | 'En curso' | 'Acreditado';
  notes?: string;
}
