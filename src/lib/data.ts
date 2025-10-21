import { PlaceHolderImages, type ImagePlaceholder } from "./placeholder-images";
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const getImage = (id: string): ImagePlaceholder | undefined => PlaceHolderImages.find(img => img.id === id);

export const profile = {
  name: "Álvaro Martín Crespo",
  title: "Desarrollador Frontend",
  bio: "Construyo aplicaciones web escalables y mantenibles con un enfoque en la experiencia de usuario y el rendimiento. Mi especialidad es el ecosistema de React, particularmente con Next.js y Tailwind CSS, donde transformo problemas complejos en soluciones elegantes para el mundo real.",
  image: getImage('profile-picture'),
  cvUrl: "/placeholder-cv.pdf",
  socials: {
    github: "https://github.com/AlvaroMartinCrespo",
    linkedin: "https://www.linkedin.com/in/alvaromartincrespo/",
  },
  contact: {
    email: "tu.email@example.com",
    phone: "+34 123 456 789",
    address: "Madrid, España"
  },
  contactLinks: [
    { icon: Mail, value: "tu.email@example.com", href: "mailto:tu.email@example.com" },
    { icon: Phone, value: "+34 123 456 789", href: "tel:+34123456789" },
    { icon: MapPin, value: "Madrid, España" },
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
    slug: 'mastering-nextjs-performance',
    title: 'Dominando el Rendimiento en Next.js: Una Guía Práctica',
    date: '2024-05-15',
    excerpt: 'Sumérgete en técnicas prácticas para optimizar tus aplicaciones Next.js, desde importaciones dinámicas y división de código hasta optimización de imágenes y estrategias de caché.',
    image: getImage('blog-post-1'),
    content: `
## Introducción
El rendimiento no es una característica, es una necesidad. En esta guía, exploraremos...

### 1. División de Código con \`dynamic()\`
\`\`\`javascript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('../components/HeavyComponent'))

function HomePage() {
  return (
    <div>
      <p>Esta es la página de inicio.</p>
      <HeavyComponent />
    </div>
  )
}
\`\`\`
    `
  },
  {
    slug: 'advanced-tailwind-css-patterns',
    title: 'Patrones Avanzados de Tailwind CSS para Componentes Reutilizables',
    date: '2024-04-22',
    excerpt: 'Ve más allá de las clases de utilidad básicas. Aprende a crear estilos de componentes escalables y mantenibles en Tailwind CSS usando plugins, variantes y composición.',
    image: getImage('blog-post-2'),
    content: `
## El Problema de la Repetición
Escribir la misma combinación de clases de utilidad una y otra vez puede ser tedioso.

### Creando un Plugin
\`\`\`javascript
// tailwind.config.js
const plugin = require('tailwindcss/plugin')

module.exports = {
  plugins: [
    plugin(function({ addComponents, theme }) {
      const buttons = {
        '.btn-primary': {
          backgroundColor: theme('colors.primary'),
          color: theme('colors.white'),
          // ...
        }
      }
      addComponents(buttons)
    })
  ]
}
\`\`\`
    `
  },
  {
    slug: 'react-state-management-2024',
    title: 'El Estado de la Gestión de Estado en React en 2024',
    date: '2024-03-10',
    excerpt: 'useState, useReducer, Context API, Zustand, Redux Toolkit... Las opciones son infinitas. Este post analiza los pros y contras de las soluciones de gestión de estado más populares.',
    image: getImage('blog-post-3'),
    content: `
## Zustand: La Elección Minimalista
Zustand ofrece una forma sencilla y sin opiniones de gestionar el estado.

### Uso Básico
\`\`\`javascript
import { create } from 'zustand'

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))
\`\`\`
    `
  },
];
