import { Activity, UserProfile, ActivityCategory } from '../types';

export interface CityOption {
  name: string;
  province: string;
  isActive: boolean;
  statusLabel?: string;
}

export const CITIES: CityOption[] = [
  { name: 'General Pico', province: 'La Pampa', isActive: true },
  { name: 'Santa Rosa', province: 'La Pampa', isActive: false, statusLabel: 'Próximamente' },
  { name: 'Trenque Lauquen', province: 'Buenos Aires', isActive: false, statusLabel: 'Próximamente' },
  { name: 'Junín', province: 'Buenos Aires', isActive: false, statusLabel: 'Próximamente' },
  { name: 'Pergamino', province: 'Buenos Aires', isActive: false, statusLabel: 'Próximamente' },
  { name: 'Azul', province: 'Buenos Aires', isActive: false, statusLabel: 'Próximamente' },
  { name: 'Bahía Blanca', province: 'Buenos Aires', isActive: false, statusLabel: 'Próximamente' },
  { name: 'La Plata', province: 'Buenos Aires', isActive: false, statusLabel: 'Próximamente' },
  { name: 'Otra localidad', province: 'Región Pampeana', isActive: false, statusLabel: 'Inactivo' },
];

export const CATEGORIES: ActivityCategory[] = [
  'Ambiente',
  'Educación',
  'Cultura',
  'Tecnología',
  'Comunidad',
  'Deportes',
  'Salud y bienestar',
  'Comunicación',
  'Arte',
  'Desarrollo social',
  'Producción y emprendedurismo',
  'Ciencia e innovación',
];

export const INITIAL_USER: UserProfile = {
  name: 'Sofía',
  lastName: 'Martínez',
  dni: '48.912.304',
  birthDate: '2009-04-18',
  age: 17,
  gender: 'Femenino',
  city: 'General Pico',
  school: 'EPET N° 2 / Colegio Secundario Los Caldenes',
  grade: '5° Año',
  technicalOrientation: 'Electromecánica y Tecnologías Digitales',
  interests: ['Tecnología', 'Ambiente', 'Comunidad', 'Ciencia e innovación'],
  enrolledActivityIds: ['act-3'], // Initially enrolled in Instalación de luminarias
  savedActivityIds: ['act-2', 'act-1'],
};

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    title: 'Recuperación y forestación de espacios verdes del barrio',
    organization: 'Asociación Civil Raíces Pampeanas & Municipalidad',
    organizationType: 'ONG',
    isVerified: true,
    hasOfficialEndorsement: true,
    endorsementLabel: 'Aval Municipal de Ambiente',
    type: 'Voluntariado',
    category: 'Ambiente',
    secondaryCategory: 'Comunidad',
    location: 'Parque Urbano y Barrio El Molino',
    city: 'General Pico',
    coordinates: {
      lat: -35.6565,
      lng: -63.7482,
      xPercent: 32,
      yPercent: 44,
      neighborhood: 'Barrio El Molino',
      address: 'Calle 2 y 105, General Pico'
    },
    dateString: 'Sáb. 17 oct. · 09:30 a 13:00',
    startDate: '2026-10-17',
    timeString: '09:30 — 13:00',
    totalQuotas: 18,
    availableQuotas: 12,
    accreditation: 'general',
    hoursCount: 8,
    requiresExperience: false,
    forTechnicalStudents: false,
    forSecondaryStudents: true,
    ageRange: '16 a 24 años',
    tags: ['Acredita Horas', 'Ambiente', 'Espacios Verdes'],
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Plantación comunitaria de especies nativas, acondicionamiento de senderos y compostaje barrial.',
    fullDescription: 'Sumate a una jornada de acción comunitaria para revitalizar los canteros y arbolado nativo de la plaza y los espacios comunitarios del Barrio El Molino. Trabajaremos junto a vecinos, referentes ambientales locales y jóvenes de diferentes colegios.',
    tasks: [
      'Plantación y tutorado de 40 ejemplares de caldenes y algarrobos autóctonos.',
      'Armado de canteros con plantas polinizadoras para biodiversidad urbana.',
      'Acondicionamiento de composteras comunitarias.',
      'Taller express de cuidado del arbolado en zona semiárida pampeana.'
    ],
    learnings: [
      'Identificación y siembra de flora nativa pampeana.',
      'Técnicas de riego eficiente y mulching para conservación de humedad.',
      'Trabajo en equipo y dinamización comunitaria territorial.'
    ],
    requirements: [
      'Tener entre 16 y 25 años.',
      'Ropa cómoda apta para tierra y calzado cerrado.',
      'Ganas de aprender y colaborar al aire libre (no requiere experiencia).'
    ],
    contactEmail: 'raices.pico@nexojoven.ar',
    featuredSection: 'ideal_empezar'
  },
  {
    id: 'act-2',
    title: 'Práctica de desarrollo web para proyectos comunitarios',
    organization: 'Polo Tecnológico General Pico & Cooperativa TIC',
    organizationType: 'Empresa Social',
    isVerified: true,
    hasOfficialEndorsement: true,
    endorsementLabel: 'Aval Polo Tecnológico & Ministerio de Educación',
    type: 'Práctica preprofesional',
    category: 'Tecnología',
    secondaryCategory: 'Comunidad',
    location: 'Medanito Polo Tecnológico (Calle 13 y 102)',
    city: 'General Pico',
    coordinates: {
      lat: -35.6542,
      lng: -63.7548,
      xPercent: 48,
      yPercent: 36,
      neighborhood: 'Medanito / Centro Cívico',
      address: 'Calle 13 esquina 102, General Pico'
    },
    dateString: '20 oct. al 20 nov. · Martes y Jueves 17:30 a 19:30',
    startDate: '2026-10-20',
    endDate: '2026-11-20',
    timeString: '17:30 — 19:30',
    totalQuotas: 6,
    availableQuotas: 3,
    accreditation: 'general',
    hoursCount: 30,
    requiresExperience: false,
    forTechnicalStudents: true,
    forSecondaryStudents: true,
    ageRange: '16 a 20 años',
    tags: ['Acredita Horas', 'Últimos cupos', 'Tecnología'],
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Diseño e implementación de páginas web accesibles para comedores escolares y clubes de barrio.',
    fullDescription: 'Una oportunidad de práctica formativa donde estudiantes secundarios y técnicos colaboran en duplas para crear sitios web y herramientas digitales para organizaciones sin fines de lucro de General Pico, con mentoría de programadores profesionales del medio local.',
    tasks: [
      'Relevar requerimientos junto a los referentes de las organizaciones barriales.',
      'Diseñar wireframes sencillos y prototipos accesibles (móvil y desktop).',
      'Desarrollar landing pages informativas usando HTML, Tailwind y React/JS.',
      'Capacitar a los encargados de la institución para actualizar sus contenidos.'
    ],
    learnings: [
      'Flujo de trabajo real de desarrollo de software colaborativo (Git/GitHub).',
      'Buenas prácticas de diseño centrado en el usuario y accesibilidad web.',
      'Habilidades blandas de comunicación con clientes comunitarios.'
    ],
    requirements: [
      'Estudiantes de secundaria, escuela técnica o primeros años terciarios.',
      'Conocimientos básicos de computación o programación escolar inicial.',
      'Compromiso de asistencia de 4 horas semanales.'
    ],
    contactEmail: 'polotec.pico@nexojoven.ar',
    featuredSection: 'ultimos_cupos'
  },
  {
    id: 'act-3',
    title: 'Instalación de luminarias solares en espacio comunitario',
    organization: 'Municipalidad de General Pico & Escuelas Técnicas',
    organizationType: 'Municipalidad',
    isVerified: true,
    hasOfficialEndorsement: true,
    endorsementLabel: 'Aval Oficial Ministerio de Educación (Práctica Técnica)',
    type: 'Práctica escuela técnica',
    category: 'Tecnología',
    secondaryCategory: 'Comunidad',
    location: 'Playón Deportivo Barrio Rucci, General Pico',
    city: 'General Pico',
    coordinates: {
      lat: -35.6621,
      lng: -63.7655,
      xPercent: 68,
      yPercent: 62,
      neighborhood: 'Barrio Rucci',
      address: 'Calle 107 y 300, General Pico'
    },
    dateString: 'Dom. 11 de octubre · 08:30 a 13:00',
    startDate: '2026-10-11',
    timeString: '08:30 — 13:00',
    totalQuotas: 10,
    availableQuotas: 4,
    accreditation: 'technical_school',
    hoursCount: 12,
    requiresExperience: false,
    forTechnicalStudents: true,
    forSecondaryStudents: true,
    ageRange: '16 a 18 años',
    tags: ['Acredita Horas Escuela Técnica', 'Infraestructura Solar'],
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Montaje de reflectores LED solares y tablero de protección para el nuevo playón deportivo barrial.',
    fullDescription: 'Práctica formativa supervisada por ingenieros y profesores técnicos para equipar con iluminación sustentable y eficiente el playón deportivo multiuso donde entrenan más de 120 jóvenes del Barrio Rucci.',
    tasks: [
      'Replanteo y cálculo básico de circuitos de iluminación de baja tensión.',
      'Conexionado de paneles solares fotovoltaicos, regulador y baterías de ciclo profundo.',
      'Montaje mecánico de soportes de luminarias en columnas perimetrales.',
      'Verificación de aislaciones y puesta a tierra con instrumental técnico.'
    ],
    learnings: [
      'Procedimientos de seguridad eléctrica y trabajo en equipo técnico.',
      'Configuración de sistemas fotovoltaicos aislados (off-grid).',
      'Uso de herramientas de mano y aparatos de medición homologados.'
    ],
    requirements: [
      'Tener entre 16 y 18 años (alumnos de secundario o escuela técnica).',
      'Contar con seguro escolar/autorización correspondiente del colegio.',
      'Interés en actividades prácticas de taller (no excluyente experiencia previa).'
    ],
    contactEmail: 'juventudes.municipio@nexojoven.ar',
    featuredSection: 'para_vos'
  },
  {
    id: 'act-4',
    title: 'Apoyo escolar y alfabetización para estudiantes de primaria',
    organization: 'Centro Barrial San José & Red Educativa Pampeana',
    organizationType: 'ONG',
    isVerified: true,
    hasOfficialEndorsement: true,
    endorsementLabel: 'Aval Red Educativa Pampeana',
    type: 'Voluntariado escolar',
    category: 'Educación',
    secondaryCategory: 'Desarrollo social',
    location: 'Sede Comunitaria Calle 108 bis N° 450, General Pico',
    city: 'General Pico',
    coordinates: {
      lat: -35.6588,
      lng: -63.7612,
      xPercent: 55,
      yPercent: 50,
      neighborhood: 'Barrio San José',
      address: 'Calle 108 bis N° 450, General Pico'
    },
    dateString: 'Sábados de Octubre · 10:00 a 12:30',
    startDate: '2026-10-10',
    endDate: '2026-10-31',
    timeString: '10:00 — 12:30',
    totalQuotas: 15,
    availableQuotas: 9,
    accreditation: 'general',
    hoursCount: 16,
    requiresExperience: false,
    forTechnicalStudents: false,
    forSecondaryStudents: true,
    ageRange: '16 a 22 años',
    tags: ['Acredita Horas', 'Sin experiencia previa', 'Educación'],
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Acompañamiento en lectura, matemática y tareas escolares para chicos de 1° a 6° grado.',
    fullDescription: 'Los jóvenes de secundaria son los mejores motivadores para chicos que necesitan reforzar sus aprendizajes. A través de juegos pedagógicos, lectura guiada y apoyo con las tareas escolares, creamos un espacio de confianza y estímulo educativo.',
    tasks: [
      'Guiar actividades de lectura compartida y comprensión de textos infantiles.',
      'Ayudar con dudas de matemática práctica mediante juegos con fichas.',
      'Coordinar una merienda compartida y cierre lúdico semanal.',
      'Llevar un registro afectivo y de progresos de cada estudiante.'
    ],
    learnings: [
      'Estrategias de comunicación pedagógica adaptada a infancias.',
      'Paciencia, empatía y resolución constructiva de conflictos.',
      'Compromiso social y fortalecimiento de la educación pública.'
    ],
    requirements: [
      'Ser estudiante de secundaria o estudios superiores.',
      'Empatía, ganas de compartir y buen trato con niñas y niños.',
      'No se requiere formación docente previa.'
    ],
    contactEmail: 'apoyo.sanjose@nexojoven.ar',
    featuredSection: 'ideal_empezar'
  },
  {
    id: 'act-5',
    title: 'Taller de reparación y reciclaje de bicicletas comunitarias',
    organization: 'Club Ciclista Pico & Colectivo Movilidad Sustentable',
    organizationType: 'Club',
    isVerified: true,
    hasOfficialEndorsement: false,
    type: 'Voluntariado',
    category: 'Comunidad',
    secondaryCategory: 'Ambiente',
    location: 'Galpón Ferroviario de Calle 21, General Pico',
    city: 'General Pico',
    coordinates: {
      lat: -35.6515,
      lng: -63.7585,
      xPercent: 44,
      yPercent: 26,
      neighborhood: 'Paseo Ferroviario',
      address: 'Calle 21 entre 20 y 24, General Pico'
    },
    dateString: 'Sáb. 24 oct. · 14:00 a 18:00',
    startDate: '2026-10-24',
    timeString: '14:00 — 18:00',
    totalQuotas: 12,
    availableQuotas: 5,
    accreditation: 'none', // Actividad más tranquila/lúdica
    requiresExperience: false,
    forTechnicalStudents: true,
    forSecondaryStudents: true,
    ageRange: '16 a 25 años',
    tags: ['Voluntariado Comunitario', 'Sin experiencia previa', 'Mecánica'],
    imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Puesta a punto de bicicletas en desuso para donar a chicos de zonas rurales y colegios.',
    fullDescription: 'Recuperamos bicicletas donadas por vecinos para darles una segunda vida y entregarlas a chicos que necesitan movilidad para asistir a la escuela. Aprendemos mecánica ligera de bicis mientras compartimos unos mates.',
    tasks: [
      'Desarme, limpieza y desengrase de cadenas, piñones y mazas.',
      'Centrado de ruedas y parchado de cámaras con herramientas de taller.',
      'Calibración de frenos V-Brake y cambios de marchas.',
      'Pintura y armado final con accesorios de seguridad vial reflectantes.'
    ],
    learnings: [
      'Mecánica básica de bicicletas para uso personal y comunitario.',
      'Criterios de economía circular y reutilización de componentes.',
      'Promoción de la movilidad activa y ecológica en la ciudad.'
    ],
    requirements: [
      'Ganas de ensuciarse las manos y colaborar.',
      'No se precisan herramientas propias (se proveen en el taller).'
    ],
    contactEmail: 'bicis.pico@nexojoven.ar',
    featuredSection: 'cerca'
  },
  {
    id: 'act-6',
    title: 'Laboratorio de robótica y sensores ambientales',
    organization: 'Facultad de Ingeniería UNLPam & Club de Ciencias Pico',
    organizationType: 'Universidad',
    isVerified: true,
    hasOfficialEndorsement: true,
    endorsementLabel: 'Aval UNLPam & Consejo Provincial de Educación Técnica',
    type: 'Práctica escuela técnica',
    category: 'Ciencia e innovación',
    secondaryCategory: 'Tecnología',
    location: 'Facultad de Ingeniería UNLPam (Calle 110 N° 390)',
    city: 'General Pico',
    coordinates: {
      lat: -35.6599,
      lng: -63.7689,
      xPercent: 74,
      yPercent: 54,
      neighborhood: 'Campus Universitario UNLPam',
      address: 'Calle 110 N° 390, General Pico'
    },
    dateString: 'Viernes 23 oct. · 15:00 a 18:30',
    startDate: '2026-10-23',
    timeString: '15:00 — 18:30',
    totalQuotas: 8,
    availableQuotas: 2,
    accreditation: 'technical_school',
    hoursCount: 15,
    requiresExperience: false,
    forTechnicalStudents: true,
    forSecondaryStudents: true,
    ageRange: '16 a 19 años',
    tags: ['Acredita Horas Escuela Técnica', 'Últimos cupos', 'Robótica'],
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Construcción y calibración de estaciones meteorológicas con Arduino y microcontroladores ESP32.',
    fullDescription: 'Conectá la teoría de la física y la electrónica escolar con un proyecto real: diseñar e instalar sensores de humedad de suelo, temperatura y radiación UV que enviarán datos abiertos a los productores agroecológicos de la zona.',
    tasks: [
      'Soldar componentes electrónicos en placas perforadas de prototipo.',
      'Programar sensores de temperatura DHT22 y presión atmosférica en Arduino C++.',
      'Probar la transmisión de datos por WiFi/LoRa hacia una base de datos local.',
      'Fabricar carcasas impresas en 3D resistentes a la intemperie.'
    ],
    learnings: [
      'Electrónica aplicada e Internet de las Cosas (IoT).',
      'Lectura de hojas de datos de sensores y resolución de fallas en hardware.',
      'Contacto con laboratorios y docentes universitarios de la UNLPam.'
    ],
    requirements: [
      'Estudiantes de escuelas secundarias con orientación técnica o bachiller en ciencias.',
      'Interés demostrado en programación, robótica o física.'
    ],
    contactEmail: 'robotica.ingenieria@nexojoven.ar',
    featuredSection: 'ultimos_cupos'
  },
  {
    id: 'act-7',
    title: 'Huertas agroecológicas y soberanía alimentaria urbana',
    organization: 'INTA ProHuerta & Cooperativa Tierra Viva',
    organizationType: 'Cooperativa',
    isVerified: true,
    hasOfficialEndorsement: false,
    type: 'Voluntariado',
    category: 'Ambiente',
    secondaryCategory: 'Producción y emprendedurismo',
    location: 'Predio Demostrativo Barrio Federal, General Pico',
    city: 'General Pico',
    coordinates: {
      lat: -35.6698,
      lng: -63.7745,
      xPercent: 82,
      yPercent: 78,
      neighborhood: 'Barrio Federal',
      address: 'Calle 405 y 440, General Pico'
    },
    dateString: 'Sáb. 31 oct. · 09:00 a 12:30',
    startDate: '2026-10-31',
    timeString: '09:00 — 12:30',
    totalQuotas: 20,
    availableQuotas: 14,
    accreditation: 'none', // Actividad comunitaria libre
    requiresExperience: false,
    forTechnicalStudents: false,
    forSecondaryStudents: true,
    ageRange: '16 a 30 años',
    tags: ['Voluntariado Comunitario', 'Sin experiencia previa', 'Agroecología'],
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a49?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Siembra comunitaria de temporada primavera-verano y armado de canteros agroecológicos.',
    fullDescription: 'Aprendé a producir alimentos sanos sin químicos y llevate plantines para tu casa o colegio. La huerta del Barrio Federal abastece a 3 comedores de la zona y promueve la soberanía alimentaria entre las juventudes.',
    tasks: [
      'Preparación de tierra con compost maduro y lombricompuesto.',
      'Siembra de tomates perita, pimientos, aromáticas y zapallitos.',
      'Instalación de mangueras de riego por goteo con timer.',
      'Cosecha y empaquetado solidario de acelga y verduras de hoja.'
    ],
    learnings: [
      'Asociación y rotación de cultivos pampeanos.',
      'Elaboración de biofertilizantes caseros y control biológico de plagas.',
      'Puesta en valor de la alimentación saludable y el trabajo colectivo.'
    ],
    requirements: [
      'Ganas de conectarse con la tierra y el trabajo en equipo.',
      'Traer botella de agua reutilizable y sombrero para sol.'
    ],
    contactEmail: 'huerta.pico@nexojoven.ar',
    featuredSection: 'ideal_empezar'
  },
  {
    id: 'act-8',
    title: 'Taller de arte urbano y muralismo participativo',
    organization: 'Secretaría de Cultura & Juventudes Pampeanas',
    organizationType: 'Municipalidad',
    isVerified: true,
    hasOfficialEndorsement: false,
    type: 'Voluntariado escolar',
    category: 'Arte',
    secondaryCategory: 'Cultura',
    location: 'Muro del Centro Juvenil (Calle 19 entre 20 y 22)',
    city: 'General Pico',
    coordinates: {
      lat: -35.6531,
      lng: -63.7571,
      xPercent: 42,
      yPercent: 32,
      neighborhood: 'Centro / Plaza San Martín',
      address: 'Calle 19 entre 20 y 22, General Pico'
    },
    dateString: 'Viernes 16 y Sáb. 17 oct. · 16:00 a 19:30',
    startDate: '2026-10-16',
    endDate: '2026-10-17',
    timeString: '16:00 — 19:30',
    totalQuotas: 15,
    availableQuotas: 7,
    accreditation: 'none', // Actividad artística abierta
    requiresExperience: false,
    forTechnicalStudents: false,
    forSecondaryStudents: true,
    ageRange: '15 a 21 años',
    tags: ['Voluntariado Cultural', 'Sin experiencia previa', 'Muralismo'],
    imageUrl: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Creación colectiva de un mural sobre identidad juvenil, música y memoria colectiva.',
    fullDescription: 'Sumate a pintar y transformar el paredón del Centro Juvenil con una obra mural colectiva. Coordinada por artistas locales, abordaremos la técnica de cuadrícula, mezcla de colores y pintura con látex exterior.',
    tasks: [
      'Votar y bocetar ideas sobre la temática "Juventudes y futuro en La Pampa".',
      'Fondeo del muro y escalado del diseño con tiza y proyectores.',
      'Pintura por capas y mezcla de paletas cromáticas.',
      'Detalles con pincel, sellado y firma comunitaria.'
    ],
    learnings: [
      'Técnicas de pintura a gran escala y manejo del color.',
      'Expresión artística colectiva y apropiación positiva del espacio público.',
      'Vínculo con otros jóvenes creativos de la ciudad.'
    ],
    requirements: [
      'Ropa que se pueda manchar con pintura.',
      '¡No hace falta saber dibujar! Hay tareas para todos los gustos.'
    ],
    contactEmail: 'cultura.joven@nexojoven.ar',
    featuredSection: 'cerca'
  },
  {
    id: 'act-9',
    title: 'Digitalización del archivo histórico de la biblioteca popular',
    organization: 'Biblioteca Popular Florentino Ameghino',
    organizationType: 'ONG',
    isVerified: true,
    hasOfficialEndorsement: true,
    endorsementLabel: 'Aval Secretaría de Cultura & CONABIP',
    type: 'Voluntariado escolar',
    category: 'Cultura',
    secondaryCategory: 'Educación',
    location: 'Biblioteca Popular Ameghino (Calle 26 N° 445)',
    city: 'General Pico',
    coordinates: {
      lat: -35.6558,
      lng: -63.7598,
      xPercent: 46,
      yPercent: 40,
      neighborhood: 'Centro Cívico',
      address: 'Calle 26 N° 445, General Pico'
    },
    dateString: 'Martes de Octubre · 18:00 a 20:00',
    startDate: '2026-10-13',
    endDate: '2026-11-03',
    timeString: '18:00 — 20:00',
    totalQuotas: 8,
    availableQuotas: 5,
    accreditation: 'general',
    hoursCount: 12,
    requiresExperience: false,
    forTechnicalStudents: false,
    forSecondaryStudents: true,
    ageRange: '16 a 24 años',
    tags: ['Acredita Horas', 'Patrimonio Histórico'],
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Escaneo y catalogación de periódicos y fotografías históricas de la fundación de General Pico.',
    fullDescription: 'Preservá la memoria viva de nuestra comunidad. Aprenderás a manipular documentos históricos centenarios, escanearlos en alta definición y cargarlos al repositorio digital abierto para que escuelas y vecinos puedan acceder a su historia.',
    tasks: [
      'Manipulación cuidadosa y limpieza superficial de diarios locales antiguos (1920-1960).',
      'Escaneo con equipos ópticos especiales de libro abierto.',
      'Carga de metadatos (fecha, autor, tema, palabras clave) en software bibliotecario.',
      'Selección de anécdotas curiosas para redes sociales de la biblioteca.'
    ],
    learnings: [
      'Preservación documental y archivo digital.',
      'Historia local de General Pico y el ferrocarril pampeano.',
      'Organización de información estructurada y trabajo archivístico.'
    ],
    requirements: [
      'Estudiantes con curiosidad por la historia o la comunicación.',
      'Cuidado y paciencia para manipular papel histórico.'
    ],
    contactEmail: 'biblioteca.ameghino@nexojoven.ar',
    featuredSection: 'cerca'
  },
  {
    id: 'act-11',
    title: 'Práctica de mantenimiento electromecánico en sala comunitaria',
    organization: 'Centro Comunitario Malvinas & EPET N° 3',
    organizationType: 'Escuela',
    isVerified: true,
    hasOfficialEndorsement: true,
    endorsementLabel: 'Aval Oficial Dirección Provincial de Educación Técnica',
    type: 'Práctica escuela técnica',
    category: 'Tecnología',
    secondaryCategory: 'Comunidad',
    location: 'Centro Comunitario Malvinas (Calle 5 y 116)',
    city: 'General Pico',
    coordinates: {
      lat: -35.6482,
      lng: -63.7642,
      xPercent: 62,
      yPercent: 18,
      neighborhood: 'Barrio Malvinas',
      address: 'Calle 5 y 116, General Pico'
    },
    dateString: 'Sáb. 17 oct. · 08:30 a 12:30',
    startDate: '2026-10-17',
    timeString: '08:30 — 12:30',
    totalQuotas: 8,
    availableQuotas: 3,
    accreditation: 'technical_school',
    hoursCount: 10,
    requiresExperience: true,
    forTechnicalStudents: true,
    forSecondaryStudents: true,
    ageRange: '16 a 19 años',
    tags: ['Acredita Horas Escuela Técnica', 'Últimos cupos'],
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Revisión y puesta en marcha de bombas de agua, tableros y climatización del salón vecinal.',
    fullDescription: 'Práctica formativa para estudiantes de orientación electromecánica. Bajo la supervisión de un docente técnico matriculado, se realizarán mediciones, lubricación de rodamientos de bombas centrífugas y recambio de llaves termomagnéticas.',
    tasks: [
      'Comprobación de tensiones de fase y corriente en tablero seccional.',
      'Mantenimiento preventivo de bombas elevadoras de agua sanitaria.',
      'Ajuste de contactores, relevos térmicos y protecciones diferenciales.',
      'Emisión de un informe técnico de recomendaciones a la comisión vecinal.'
    ],
    learnings: [
      'Resolución de averías electromecánicas en instalaciones reales.',
      'Lectura de planos unifilares y cumplimiento de normativas de seguridad.',
      'Elaboración de informes de diagnóstico técnico profesional.'
    ],
    requirements: [
      'Alumnos de 4°, 5° o 6° año de escuela técnica industrial.',
      'Calzado de seguridad y ropa de trabajo adecuada.',
      'Haber cursado materias introductorias de instalaciones eléctricas.'
    ],
    contactEmail: 'tecnica.malvinas@nexojoven.ar',
    featuredSection: 'ultimos_cupos'
  },
  {
    id: 'act-13',
    title: 'Impresión 3D de ayudas técnicas y adaptadores comunitarios',
    organization: 'Club Social de Innovación & Hospital Gobernador Centeno',
    organizationType: 'Club',
    isVerified: true,
    hasOfficialEndorsement: true,
    endorsementLabel: 'Aval Hospital Centeno & Ministerio de Salud',
    type: 'Práctica preprofesional',
    category: 'Tecnología',
    secondaryCategory: 'Salud y bienestar',
    location: 'Club Social de Innovación (Calle 20 esquina 15)',
    city: 'General Pico',
    coordinates: {
      lat: -35.6548,
      lng: -63.7532,
      xPercent: 40,
      yPercent: 38,
      neighborhood: 'Centro',
      address: 'Calle 20 esquina 15, General Pico'
    },
    dateString: 'Jueves 22 y 29 oct. · 17:00 a 19:30',
    startDate: '2026-10-22',
    endDate: '2026-10-29',
    timeString: '17:00 — 19:30',
    totalQuotas: 7,
    availableQuotas: 3,
    accreditation: 'technical_school',
    hoursCount: 16,
    requiresExperience: false,
    forTechnicalStudents: true,
    forSecondaryStudents: true,
    ageRange: '16 a 21 años',
    tags: ['Acredita Horas Escuela Técnica', 'Tecnología Social'],
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Diseño e impresión de adaptadores para lápices, cubiertos y ayudas motrices para personas con discapacidad.',
    fullDescription: 'La tecnología al servicio de la inclusión. En articulación con el área de terapia ocupacional, modelaremos e imprimiremos piezas en filamento PETG y PLA reciclado destinadas a chicos y adultos que necesitan ayudas técnicas personalizadas.',
    tasks: [
      'Adaptar modelos 3D de código abierto en software CAD (Tinkercad / Fusion 360).',
      'Configurar parámetros de laminado (slicer Cura/Prusa) para resistencia mecánica.',
      'Calibrar impresoras 3D FDM y supervisar el proceso de extrusión.',
      'Lijado, postprocesado y ensamblado de piezas con velcros y elásticos.'
    ],
    learnings: [
      'Tecnologías de fabricación digital orientadas a salud pública.',
      'Propiedades mecánicas de polímeros y termoplásticos.',
      'Diseño universal y empatía aplicada al desarrollo de soluciones tangibles.'
    ],
    requirements: [
      'Estudiantes de secundaria técnica o general con interés en diseño 3D.',
      'Manejo básico de computadora (Windows o Linux).'
    ],
    contactEmail: 'innovacion.salud@nexojoven.ar',
    featuredSection: 'para_vos'
  },
  {
    id: 'act-14',
    title: 'Brigada juvenil de primeros auxilios y prevención comunitaria',
    organization: 'Cruz Roja Argentina Filial Pico & Bomberos Voluntarios',
    organizationType: 'ONG',
    isVerified: true,
    hasOfficialEndorsement: true,
    endorsementLabel: 'Certificación Homologada Cruz Roja Argentina',
    type: 'Voluntariado',
    category: 'Salud y bienestar',
    secondaryCategory: 'Comunidad',
    location: 'Cuartel Central (Fraternidad y Calle 102)',
    city: 'General Pico',
    coordinates: {
      lat: -35.6528,
      lng: -63.7621,
      xPercent: 52,
      yPercent: 28,
      neighborhood: 'Barrio Talleres',
      address: 'Calle Fraternidad y 102, General Pico'
    },
    dateString: 'Sáb. 24 oct. · 09:00 a 13:00',
    startDate: '2026-10-24',
    timeString: '09:00 — 13:00',
    totalQuotas: 25,
    availableQuotas: 16,
    accreditation: 'general',
    hoursCount: 8,
    requiresExperience: false,
    forTechnicalStudents: false,
    forSecondaryStudents: true,
    ageRange: '16 a 26 años',
    tags: ['Acredita Horas', 'Primeros Auxilios'],
    imageUrl: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Entrenamiento práctico en RCP básica, maniobra de Heimlich y armado de botiquines comunitarios.',
    fullDescription: 'Saber qué hacer en una emergencia salva vidas. Un encuentro intensivo con instructores certificados donde practicarás maniobras de reanimación cardiopulmonar en maniquíes, uso del DEA (Desfibrilador) y contención inicial en eventos barriales.',
    tasks: [
      'Práctica continua de compresiones torácicas en maniquíes pediátricos y adultos.',
      'Simulacro de uso del Desfibrilador Externo Automático (DEA).',
      'Técnicas de inmovilización básica y vendaje de heridas.',
      'Armado y donación de botiquines de primeros auxilios para comedores.'
    ],
    learnings: [
      'Capacidad de respuesta serena y eficaz ante emergencias.',
      'Primeros auxilios homologados con validez comunitaria.',
      'Conciencia de autocuidado y solidaridad en el territorio.'
    ],
    requirements: [
      'Tener 16 años o más.',
      'Ropa que permita arrodillarse sobre colchonetas.',
      'No se precisa formación previa en salud.'
    ],
    contactEmail: 'cruzroja.pico@nexojoven.ar',
    featuredSection: 'ideal_empezar'
  },
  {
    id: 'act-17',
    title: 'Recreación y juego inclusivo en merenderos comunitarios',
    organization: 'Merendero Los Pekes & Movimiento Barrial',
    organizationType: 'ONG',
    isVerified: true,
    hasOfficialEndorsement: false,
    type: 'Voluntariado escolar',
    category: 'Desarrollo social',
    secondaryCategory: 'Educación',
    location: 'Merendero Los Pekes (Barrio Malvinas Amarillo)',
    city: 'General Pico',
    coordinates: {
      lat: -35.6465,
      lng: -63.7661,
      xPercent: 66,
      yPercent: 14,
      neighborhood: 'Barrio Malvinas Amarillo',
      address: 'Calle 304 bis N° 120, General Pico'
    },
    dateString: 'Sáb. 17 oct. · 15:30 a 18:00',
    startDate: '2026-10-17',
    timeString: '15:30 — 18:00',
    totalQuotas: 12,
    availableQuotas: 6,
    accreditation: 'none', // Actividad lúdica de voluntariado
    requiresExperience: false,
    forTechnicalStudents: false,
    forSecondaryStudents: true,
    ageRange: '16 a 22 años',
    tags: ['Voluntariado Comunitario', 'Inclusión', 'Niñeces'],
    imageUrl: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Juegos cooperativos, merienda compartida y rincón de lectura para 40 chicas y chicos del barrio.',
    fullDescription: 'Una tarde de encuentro y juego libre. Coordinaremos dinámicas grupales con paracaídas de tela, títeres y rincón de cuentos para regalar una tarde alegre a las infancias del barrio.',
    tasks: [
      'Preparar juegos cooperativos de postas y dinámicas no competitivas.',
      'Servir la chocolatada y merienda junto a los cocineros del merendero.',
      'Animar la lectura dramatizada de cuentos populares.',
      'Acompañar a las infancias con empatía y atención cercana.'
    ],
    learnings: [
      'Dinámicas de recreación comunitaria y juego cooperativo.',
      'Cuidado y contención afectiva de infancias en contextos vulnerables.',
      'Valor del tiempo compartido y la reciprocidad comunitaria.'
    ],
    requirements: [
      'Sensibilidad social, alegría y ganas de jugar.',
      'No requiere experiencia pedagógica previa.'
    ],
    contactEmail: 'lospekes.pico@nexojoven.ar',
    featuredSection: 'ideal_empezar'
  },
  {
    id: 'act-18',
    title: 'Relevamiento y cartografía comunitaria con software GIS',
    organization: 'Observatorio Territorial Pampeano & EPET N° 2',
    organizationType: 'Escuela',
    isVerified: true,
    hasOfficialEndorsement: true,
    endorsementLabel: 'Aval Oficial EPET N° 2 & Ministerio de Educación',
    type: 'Práctica escuela técnica',
    category: 'Ciencia e innovación',
    secondaryCategory: 'Tecnología',
    location: 'Laboratorio de Cartografía y Territorio (EPET N° 2)',
    city: 'General Pico',
    coordinates: {
      lat: -35.6575,
      lng: -63.7562,
      xPercent: 44,
      yPercent: 46,
      neighborhood: 'Barrio Este / EPET N° 2',
      address: 'Calle 29 esquina 8, General Pico'
    },
    dateString: 'Miércoles 21 y 28 oct. · 14:00 a 17:00',
    startDate: '2026-10-21',
    endDate: '2026-10-28',
    timeString: '14:00 — 17:00',
    totalQuotas: 8,
    availableQuotas: 2,
    accreditation: 'technical_school',
    hoursCount: 16,
    requiresExperience: false,
    forTechnicalStudents: true,
    forSecondaryStudents: true,
    ageRange: '16 a 19 años',
    tags: ['Acredita Horas Escuela Técnica', 'Mapas y GIS'],
    imageUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Mapeo satelital y georreferenciación de bicisendas y puntos limpios de reciclaje en General Pico.',
    fullDescription: 'Utilizaremos herramientas de georreferenciación satelital abierta (OpenStreetMap y QGIS) para relevar en terreno el estado de las ciclovías y la ubicación de campanas de reciclaje de General Pico.',
    tasks: [
      'Recorrer tramos asignados con app móvil GPS (OSM Tracker).',
      'Tomar fotografías georreferenciadas y registrar estado del asfalto o señalética.',
      'Cargar y validar capas vectoriales en software QGIS en el laboratorio.',
      'Exportar mapa interactivo libre para compartir con el municipio y la comunidad.'
    ],
    learnings: [
      'Sistemas de Información Geográfica (SIG) y cartografía moderna.',
      'Mapeo participativo y datos geoespaciales abiertos.',
      'Análisis espacial aplicado a la movilidad sustentable de la ciudad.'
    ],
    requirements: [
      'Estudiantes de secundaria técnica o ciclo superior.',
      'Smartphone con GPS para la jornada de campo (se proveerá batería externa).'
    ],
    contactEmail: 'cartografia.pico@nexojoven.ar',
    featuredSection: 'ultimos_cupos'
  }
];
