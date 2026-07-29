
import { PlaceHolderImages, type ImagePlaceholder } from "./placeholder-images";
import { Mail, MapPin } from 'lucide-react';

const getImage = (id: string): ImagePlaceholder | undefined => PlaceHolderImages.find(img => img.id === id);

export const profile = {
  name: "Álvaro Martín Crespo",
  title: "Desarrollador Frontend",
  bio: "Desarrollador frontend especializado en páginas web modernas utilizando frameworks de JavaScript, HTML y CSS.",
  image: getImage('portada'),
  cvUrl: "https://www.linkedin.com/in/alvaromartincrespo/overlay/1741013461746/single-media-viewer/?profileId=ACoAAD0Hqn0BjOTYp3HNks1A9oUeu0mvWyNStww",
  socials: {
    github: "https://github.com/AlvaroMartinCrespo",
    linkedin: "https://www.linkedin.com/in/alvaromartincrespo/",
    bluesky: "https://bsky.app/profile/alvaromartincrespo.bsky.social",
    instagram: "https://www.instagram.com/alvaro.martin.crespo.00/",
  },
  contact: {
    email: "alvaro.martin.crespo.00@gmail.com",
    address: "Sevilla, España"
  },
  contactLinks: [
    { icon: Mail, value: "alvaro.martin.crespo.00@gmail.com", href: "mailto:alvaro.martin.crespo.00@gmail.com" },
    { icon: MapPin, value: "Sevilla, España" },
  ],
};

export const skills = [
  { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Angular', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg' },
  { name: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
  { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
  { name: 'LitElement', logo: 'https://cdn.simpleicons.org/lit/324FFF' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
];

export const certifications = [
  {
    title: 'React - The Complete Guide',
    issuer: 'Udemy',
    skills: ['React Hooks', 'React.js'],
  },
  {
    title: 'Complete Python Bootcamp From Zero to Hero in Python',
    issuer: 'Udemy',
    skills: ['Python'],
  },
  {
    title: 'Inglés B1',
    issuer: 'Fundae Fundación Estatal para la Formación en el Empleo',
    skills: ['Inglés'],
  },
  {
    title: 'Elements of AI',
    issuer: 'University of Helsinki',
    skills: ['Inteligencia artificial'],
  },
  {
    title: 'Prompt Engineering for Everyone',
    issuer: 'Cognitive Class',
    skills: ['Inteligencia artificial'],
  },
  {
    title: 'IA Generativa',
    issuer: 'Massachusetts Institute of Technology',
    skills: ['IA', 'Inteligencia artificial'],
  },
  {
    title: 'Google: Inteligencia Artificial y Productividad',
    issuer: 'Google',
    skills: ['IA', 'Inteligencia artificial'],
  },
  {
    title: 'Front End Development Libraries',
    issuer: 'freeCodeCamp',
    skills: ['CSS', 'JavaScript'],
  },
  {
    title: 'Fundamentos profesionales del desarrollo de software',
    issuer: 'Microsoft',
    skills: ['Desarrollo de software', 'Programación'],
  },
  {
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    skills: ['Diseño web', 'Visual Studio'],
  },
  {
    title: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    skills: ['Bibliotecas de JavaScript', 'Visual Studio'],
  },
] as const;

export const projects = [
  {
    slug: 'tablao-flamenco-las-setas',
    title: 'Tablao Flamenco Las Setas',
    isFeatured: false,
    description: 'Página web para un tablao flamenco, uno de mis primeros proyectos en la empresa DSS Network.',
    techStack: ['HTML', 'CSS', 'PHP'],
    image: getImage('project-tablao-flamenco'),
    liveUrl: 'https://tablaoflamencolassetas.com/',
    repoUrl: '#',
  },
  {
    slug: 'lunar-red-social',
    title: 'Lunar - Una Red Social',
    isFeatured: true,
    description: 'Una red social 100% funcional, donde los usuarios pueden publicar, ver contenido, editar su perfil y donde los administradores acceden a estadísticas en tiempo real. Construida con React, Firebase y diseño responsive.',
    techStack: ['React', 'Firebase', 'Responsive Design'],
    image: getImage('project-lunar'),
    liveUrl: 'https://app-react-5d63e.web.app/',
    repoUrl: 'https://github.com/AlvaroMartinCrespo',
  },
  {
    slug: 'howeb-hotel-booking',
    title: 'Howeb',
    isFeatured: true,
    description: 'Es una pagina de reserva de hoteles, donde se pueden publicar anuncios de hoteles o de habitaciones para alquilar. Tiene sistema de usuarios, sistema de pagos, web responsive y esta hecho en laravel y sql.',
    techStack: ['Laravel', 'SQL', 'Responsive Design'],
    image: getImage('project-howeb'),
    liveUrl: '#',
    repoUrl: 'https://github.com/AlvaroMartinCrespo/howeb',
  },
  {
    slug: 'fisicamr-landing-page',
    title: 'FisicaMr',
    isFeatured: true,
    description: 'Landing page para FisicaMr con base de datos en Firebase para mostrar eventos y blogs.',
    techStack: ['React', 'Tailwind CSS', 'Firebase'],
    image: getImage('project-fisicamr'),
    liveUrl: 'https://fisicamr.site/',
    repoUrl: '#',
  },
  {
    slug: 'weather-app',
    title: 'Aplicación del Tiempo',
    isFeatured: false,
    description: 'Es una aplicación sencilla realizada con React y Tailwind, en la que me lanzo a probar como funcionan las APIs, es una aplicación donde intruduces el lugar y te dice el tiempo, y grados, en tiempo real.',
    techStack: ['React', 'Tailwind CSS', 'API Rest'],
    image: getImage('project-weather-app'),
    liveUrl: '#',
    repoUrl: 'https://github.com/AlvaroMartinCrespo/weather-api',
  },
  {
    slug: 'gym-app',
    title: 'Aplicación para el gimnasio',
    isFeatured: false,
    description: 'Aplicación en la que puedes guardar tu rutina de gimnasio, con un calendario y puedes verlo cuando quieras, repeticiones y pesos. También tiene una pestaña de perfil y una pestaña de ranking para ver qué persona hace más ejercicio.',
    techStack: ['React', 'Supabase', 'Tailwind CSS'],
    image: getImage('project-gym-app'),
    liveUrl: '#',
    repoUrl: 'https://github.com/AlvaroMartinCrespo/gym-project',
  }
];

// Los posts del blog se generan automáticamente (Groq + Pexels) y se sirven
// desde Supabase. Ver src/lib/blog.ts y src/lib/ai/generate-post.ts.
// El post original "¡Hola, Mundo!" se inserta como semilla en
// supabase/seed.sql para no perderlo al migrar.
