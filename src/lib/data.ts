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
  { name: 'HTML5', level: 95 },
  { name: 'CSS3 & Sass', level: 90 },
  { name: 'JavaScript (ES6+)', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'React', level: 95 },
  { name: 'Next.js', level: 92 },
  { name: 'Tailwind CSS', level: 98 },
  { name: 'Node.js', level: 75 },
  { name: 'Testing (Jest, RTL)', level: 80 },
  { name: 'Git & GitHub', level: 95 },
  { name: 'Figma', level: 70 },
  { name: 'Storybook', level: 85 },
];

export const projects = [
  {
    slug: 'e-commerce-platform',
    title: 'Plataforma E-commerce',
    isFeatured: true,
    description: 'Una plataforma de e-commerce completa con SSR, un robusto catálogo de productos y una experiencia de pago fluida.',
    problem: 'El cliente necesitaba migrar su tienda física tradicional a una plataforma online moderna, rápida y escalable para aumentar su alcance de mercado.',
    solution: 'Desarrollé un sitio de e-commerce de alto rendimiento usando Next.js para SSR/SSG, lo que resultó en un excelente SEO y cargas de página rápidas. Se integró con Stripe para los pagos y un CMS headless para una fácil gestión de productos.',
    result: 'Se logró un aumento del 40% en las ventas durante el primer trimestre. La puntuación de rendimiento de Lighthouse mejoró de 55 a 98. La tasa de rebote se redujo en un 30%.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Stripe API', 'GraphQL'],
    image: getImage('project-e-commerce'),
    liveUrl: '#',
    repoUrl: '#',
    codeSnippet: `export async function getStaticProps({ params }) {
  const { slug } = params;
  const product = await getProductBySlug(slug);
  return {
    props: { product },
    revalidate: 60, // Re-generate the page every 60 seconds
  };
}`,
  },
  {
    slug: 'analytics-dashboard',
    title: 'Panel de Analíticas',
    isFeatured: true,
    description: 'Un panel de análisis de datos en tiempo real para un producto SaaS, que proporciona a los usuarios información procesable.',
    problem: 'Los usuarios carecían de visibilidad sobre sus datos, lo que dificultaba el seguimiento de métricas clave y la toma de decisiones informadas.',
    solution: 'Construí un panel responsive con gráficos dinámicos y visualizaciones de datos usando Recharts y React. Implementé WebSockets para actualizaciones de datos en tiempo real y proporcioné opciones para filtrar por rango de fechas personalizado.',
    result: 'Aumentó la participación del usuario en un 25%. Los tickets de soporte al cliente relacionados con consultas de datos disminuyeron en un 50%.',
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Recharts', 'WebSockets'],
    image: getImage('project-dashboard'),
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    slug: 'saas-landing-page',
    title: 'Landing Page para SaaS',
    isFeatured: true,
    description: 'Una landing page de alta conversión para un producto SaaS B2B, optimizada para la generación de leads.',
    problem: 'La landing page existente tenía una alta tasa de rebote y una baja tasa de conversión debido a un diseño deficiente y tiempos de carga lentos.',
    solution: 'Rediseñé la landing page por completo con un enfoque en un mensaje claro y una propuesta de valor sólida. Usé Next.js para la generación estática, optimicé las imágenes con `next/image` y realicé pruebas A/B con diferentes copys para los CTA.',
    result: 'La tasa de conversión aumentó en un 200%. El tiempo de carga de la página disminuyó en un 70%.',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    image: getImage('project-saas'),
    liveUrl: '#',
    repoUrl: '#',
  },
    {
    slug: 'mobile-banking-app',
    title: 'Concepto de App de Banca Móvil',
    isFeatured: false,
    description: 'Un diseño conceptual y prototipo para una aplicación moderna de banca móvil.',
    problem: 'Las aplicaciones bancarias tradicionales suelen estar sobrecargadas y ser difíciles de navegar. El objetivo era diseñar una aplicación centrada en el usuario que simplificara la gestión de las finanzas personales.',
    solution: 'Diseñé una interfaz limpia e intuitiva en Figma, centrándome en una estética minimalista y un fácil acceso a tareas bancarias comunes como transferencias y consulta de saldo. Construí un prototipo clicable para demostrar los flujos de usuario.',
    result: 'Feedback positivo en las sesiones de prueba con usuarios, con una tasa de finalización de tareas del 95%. El concepto de diseño fue adoptado posteriormente para un proyecto real.',
    techStack: ['Figma', 'React Native (concepto)', 'Storybook'],
    image: getImage('project-mobile'),
    liveUrl: '#',
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
