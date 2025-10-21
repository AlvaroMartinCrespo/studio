import { PlaceHolderImages, type ImagePlaceholder } from "./placeholder-images";
import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const getImage = (id: string): ImagePlaceholder | undefined => PlaceHolderImages.find(img => img.id === id);

export const profile = {
  name: "Álvaro Martín Crespo",
  title: "Desarrollador Frontend",
  bio: "Desarrollador frontend especializado en páginas web modernas utilizando frameworks de JavaScript, HTML y CSS.",
  image: getImage('portada'),
  cvUrl: "/placeholder-cv.pdf",
  socials: {
    github: "https://github.com/AlvaroMartinCrespo",
    linkedin: "https://www.linkedin.com/in/alvaromartincrespo/",
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
];

export const projects = [
  {
    slug: 'tablao-flamenco-las-setas',
    title: 'Tablao Flamenco Las Setas',
    isFeatured: true,
    description: 'Página web para un tablao flamenco, uno de mis primeros proyectos en la empresa DSS Network.',
    techStack: ['HTML', 'CSS', 'PHP'],
    image: getImage('project-tablao-flamenco'),
    liveUrl: 'https://tablaoflamencolassetas.com/',
    repoUrl: '#',
  },
];

export const blogPosts = [
  {
    slug: 'hola-mundo-nuevo-espacio-digital',
    title: '¡Hola, Mundo! Estrenando mi nuevo espacio digital',
    date: '2024-07-26',
    excerpt: 'Una breve introducción a mi nuevo portfolio, mi motivación y mi pasión por el desarrollo web.',
    image: getImage('blog-post-1'),
    content: `
      <p>¡Bienvenido a mi nuevo rincón en la web!</p>
      <p>Con mucha ilusión y ganas, doy el primer paso para crear este portfolio. Es más que una simple página; es un lienzo en blanco donde planeo plasmar mi pasión por la creación de experiencias web y compartir un poco sobre mí.</p>
      
      <h3>Mi camino hasta aquí</h3>
      <p>Soy desarrollador frontend, una profesión que descubrí después de completar mi Grado Superior en Desarrollo de Aplicaciones Web. Aunque actualmente trabajo en proyectos para el sector bancario, mi curiosidad y mis ganas de aprender no se detienen ahí. Este espacio es mi válvula de escape creativa, un lugar donde puedo experimentar, construir y, sobre todo, disfrutar de lo que más me gusta: programar.</p>
      
      <h3>¿Qué esperar de este sitio?</h3>
      <p>Esto es solo el comienzo. Estoy muy motivado y con muchas ganas de seguir construyendo más páginas y proyectos personales. Aquí encontrarás una muestra de mi trabajo, mis habilidades y, con el tiempo, un blog donde compartiré reflexiones y aprendizajes, no solo técnicos, sino también personales.</p>
      <p>Este proyecto es un reflejo de mi pasión y de mi hobby. Espero que disfrutes explorándolo tanto como yo he disfrutado creándolo.</p>
      <p>¡Gracias por pasarte!</p>
    `
  }
];
