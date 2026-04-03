import { Injectable, signal } from '@angular/core';
import { CvData } from '../models/cv.model';

const STORAGE_KEY = 'diana-cv-data';

export const INITIAL_CV: CvData = {
  header: {
    name: 'Diana Carolina Arévalo Arévalo',
    location: 'Bogotá, Colombia',
    phone: '+57 333 276 93 21',
    email: 'caroldevelop9607@gmail.com',
    linkedin: 'https://linkedin.com/in/diana-arevalo',
    github: 'https://github.com/diana-arevalo',
    tiktok: 'https://www.tiktok.com/@nutria_dev',
    youtube: 'Diana Dev',
  },
  profiles: [
    {
      id: 1,
      name: 'Full Stack Java / Spring Boot',
      text: 'Desarrolladora Full Stack con experiencia en desarrollo de aplicaciones empresariales utilizando Java, Spring Boot, arquitectura de microservicios y APIs REST. Ha participado en la construcción de plataformas web escalables integrando bases de datos relacionales y NoSQL, aplicando principios SOLID, arquitectura limpia y buenas prácticas de desarrollo. Experiencia trabajando con React, Angular, Node.js, bases de datos relacionales y NO relacionales, colaborando en equipos ágiles bajo metodologías Scrum. Actualmente fortaleciendo conocimientos en arquitecturas cloud y AWS para el despliegue de soluciones modernas y escalables.',
    },
    {
      id: 2,
      name: 'Frontend React / Angular',
      text: 'Desarrolladora Frontend con experiencia en React, Angular y Next.js para la construcción de interfaces modernas y responsivas. Habilidades en implementación de UX/UI, arquitectura de componentes, integración con APIs REST y manejo de estado. Experiencia con Tailwind CSS, TypeScript y buenas prácticas de desarrollo ágil bajo metodología Scrum.',
    },
    {
      id: 3,
      name: 'Backend Java / Microservicios',
      text: 'Desarrolladora Backend especializada en Java 17, Spring Boot y arquitectura de microservicios. Experiencia en diseño e implementación de APIs REST, seguridad con JWT y Spring Security, integración con bases de datos relacionales mediante JPA/Hibernate y orquestación de servicios con Eureka y SpringCloud. Enfoque en arquitectura limpia, principios SOLID y entrega continua bajo metodología Scrum.',
    },
  ],
  activeProfileId: 1,
  experiences: [
    {
      id: 1,
      company: 'Proyecto SIGEBI - SENA',
      companyUrl: 'https://github.com/tu-proyecto',
      location: 'Bogotá, D.C.',
      role: 'Desarrollador Full-Stack',
      period: 'Diciembre 2025 - Actualmente',
      bullets: [
        'Desarrollo de microservicios en Java 17 con Spring Boot siguiendo principios de arquitectura limpia.',
        'Diseño e implementación de APIs REST para gestión de usuarios, inventario biomédico y auditoría del sistema.',
        'Integración con PostgreSQL utilizando JPA/Hibernate para persistencia de datos.',
        'Implementación de seguridad con JWT y Spring Security para autenticación y control de acceso.',
        'Gestión de versiones con GitFlow y construcción del proyecto con Maven.',
        'Trabajo colaborativo bajo metodología Scrum con entregas iterativas.',
      ],
    },
    {
      id: 2,
      company: 'Dragones Dev',
      companyUrl: 'https://github.com/tu-proyecto',
      location: 'Bogotá, D.C.',
      role: 'Desarrollador Full-Stack',
      period: 'Agosto 2025 - Actualidad',
      bullets: [
        'Desarrollo de un sistema para administración y reservas hoteleras.',
        'Implementación de prácticas UX/UI haciendo referencia a la experiencia del usuario con visualización y responsividad.',
        'Integración con arquitectura hexagonal y domain driven design usando Node.js y Express.',
        'Aplicación de tablero scrum y kanban en ClickUp y gestión de versión en GitHub con Git-Flow.',
      ],
    },
    {
      id: 3,
      company: 'Microservicio Eduactivo',
      companyUrl: 'https://github.com/tu-proyecto',
      location: 'Soacha, Cundinamarca',
      role: 'Desarrollador Back-end',
      period: 'Febrero 2025 - Marzo 2025',
      bullets: [
        'Microservicios con Eureka y SpringCloud implementando Students, Courses y Teachers.',
        'Tecnologías implementadas: SpringBoot, Java y Maven.',
        'Configurado a un solo servidor ConfigServer.',
      ],
    },
    {
      id: 4,
      company: 'Proyecto GuardianShop',
      companyUrl: 'https://github.com/tu-proyecto',
      location: 'Bogotá, D.C.',
      role: 'Desarrolladora Front-End React - Java - SpringBoot',
      period: 'Septiembre 2024 - Febrero 2025',
      bullets: [
        'Desarrollo y maquetación del front end para ecommerce con Java y Spring Boot.',
        'Implementación de prácticas UX/UI para mejorar la experiencia del usuario con Tailwind CSS.',
        'Base de datos en MySQL, backend Java Spring Boot y front end en React + Vite con Axios.',
      ],
    },
  ],
  enterpriseExperiences: [
    {
      id: 1,
      company: 'Topaz, Stefanini',
      location: 'Bogotá, D.C.',
      role: 'Desarrollador Full Stack - Proyectos Empresariales',
      period: 'Marzo 2025 - Agosto 2025',
      bullets: [
        'Desarrollo de procedimientos almacenados en SQL Server para procesamiento de transacciones financieras.',
        'Componentes frontend con JavaScript dentro del framework corporativo Cobis Topaz.',
        'Participación en sprints quincenales validados por QA.',
        'Funcionalidades para gestión bancaria: procesamiento de cheques y operaciones financieras.',
        'Trabajo bajo metodología ágil con control de versiones en Git.',
      ],
    },
    {
      id: 2,
      company: 'IpServices',
      location: 'Bogotá, D.C.',
      role: 'Desarrollador Full Stack',
      period: '2024',
      bullets: [
        'Desarrollo de funcionalidad reset password en backend con Node.js e implementación en front con Angular.',
        'Gestión de features con Git-flow.',
        'Mejoras en distintos proyectos con Angular 12.',
      ],
    },
    {
      id: 3,
      company: 'CYMETRIA Group S.A.S',
      location: 'Soacha, Cundinamarca',
      role: 'Soporte técnico y apoyo académico',
      period: 'Junio 2024 - Diciembre 2024',
      bullets: ['Apoyo técnico en plataforma y campus virtual.'],
    },
    {
      id: 4,
      company: 'Proyectos Iniciales FullStack',
      location: 'Bogotá, D.C.',
      role: 'Desarrolladora Full-Stack Freelance',
      period: '2023',
      bullets: [
        'Desarrollo de API REST con stack MERN.',
        'Implementación de aplicaciones con Next.js y PostgreSQL.',
        'Desarrollo frontend con React, TailwindCSS y Three.js.',
        'Implementación de autenticación y manejo de bases de datos.',
      ],
    },
  ],
  technicalSkills: [
    {
      id: 1,
      category: 'Backend',
      skills:
        'Java, Spring Boot, Spring Security, Node.js, Express, APIs REST, JWT, Maven',
    },
    {
      id: 2,
      category: 'Frontend',
      skills:
        'Angular, React, Next.js, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS, Vite, Axios',
    },
    {
      id: 3,
      category: 'Bases de Datos',
      skills: 'PostgreSQL, MySQL, MongoDB, JPA/Hibernate, SQL Server',
    },
    {
      id: 4,
      category: 'DevOps & Tools',
      skills:
        'Git, GitFlow, GitHub, Docker, AWS (en aprendizaje), ClickUp, Jira',
    },
    {
      id: 5,
      category: 'Arquitectura',
      skills:
        'Arquitectura Limpia, Hexagonal, DDD, Microservicios, SOLID, Eureka, SpringCloud, Scrum',
    },
  ],
  education: [
    {
      id: 1,
      institution: 'SENA',
      location: 'Bogotá, D.C.',
      degree: 'Tecnología en Análisis y Desarrollo de Software',
      period: '2023 - 2025',
    },
  ],
  languages: [
    { id: 1, language: 'Español', level: 'Nativo' },
    { id: 2, language: 'Inglés', level: 'Intermedio (B1)' },
  ],
  softSkills: [
    { id: 1, skill: 'Trabajo en equipo' },
    { id: 2, skill: 'Metodología Scrum' },
    { id: 3, skill: 'Comunicación asertiva' },
    { id: 4, skill: 'Aprendizaje continuo' },
    { id: 5, skill: 'Resolución de problemas' },
    { id: 6, skill: 'Adaptabilidad' },
  ],
};

@Injectable({ providedIn: 'root' })
export class CvService {
  cv = signal<CvData>(this.load());
  lang = signal<'es' | 'en'>('es');

  readonly labelsEs = {
    profile: 'PERFIL PROFESIONAL',
    experience: 'EXPERIENCIA PROFESIONAL',
    enterprise: 'EXPERIENCIA EMPRESARIAL',
    skills: 'HABILIDADES TÉCNICAS',
    education: 'EDUCACIÓN',
    additional: 'HABILIDADES ADICIONALES',
    languages: 'Idiomas:',
    softSkills: 'Habilidades Blandas:',
  };

  readonly labelsEn = {
    profile: 'PROFESSIONAL PROFILE',
    experience: 'PROFESSIONAL EXPERIENCE',
    enterprise: 'CORPORATE EXPERIENCE',
    skills: 'TECHNICAL SKILLS',
    education: 'EDUCATION',
    additional: 'ADDITIONAL SKILLS',
    languages: 'Languages:',
    softSkills: 'Soft Skills:',
  };

  private load(): CvData {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_CV;
    } catch {
      return INITIAL_CV;
    }
  }

  save(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cv()));
  }

  update(data: Partial<CvData>): void {
    this.cv.update((current) => ({ ...current, ...data }));
    this.save();
  }

  reset(): void {
    this.cv.set(INITIAL_CV);
    this.save();
  }

  exportJson(): void {
    const blob = new Blob([JSON.stringify(this.cv(), null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cv-data.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  importJson(file: File): Promise<void> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string) as CvData;
          this.cv.set(data);
          this.save();
          resolve();
        } catch {
          reject(new Error('JSON inválido'));
        }
      };
      reader.readAsText(file);
    });
  }
}
