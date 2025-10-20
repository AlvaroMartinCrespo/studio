import { PlaceHolderImages, type ImagePlaceholder } from "./placeholder-images";
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const getImage = (id: string): ImagePlaceholder | undefined => PlaceHolderImages.find(img => img.id === id);

export const profile = {
  name: "Álvaro Martín Crespo",
  title: "Frontend Developer",
  bio: "I build scalable and maintainable web applications with a focus on user experience and performance. My expertise lies in the React ecosystem, particularly with Next.js and Tailwind CSS, where I transform complex problems into elegant, real-world solutions.",
  image: getImage('profile-picture'),
  cvUrl: "/placeholder-cv.pdf",
  socials: {
    github: "https://github.com/tu",
    linkedin: "https://linkedin.com/in/tu",
    twitter: "https://x.com/tu",
  },
  contact: {
    email: "your.email@example.com",
    phone: "+1 (123) 456-7890",
    address: "Madrid, Spain"
  },
  contactLinks: [
    { icon: Mail, value: "your.email@example.com", href: "mailto:your.email@example.com" },
    { icon: Phone, value: "+1 (123) 456-7890", href: "tel:+11234567890" },
    { icon: MapPin, value: "Madrid, Spain" },
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
    title: 'E-commerce Platform',
    isFeatured: true,
    description: 'A full-featured e-commerce platform with SSR, a robust product catalog, and a seamless checkout experience.',
    problem: 'The client needed to migrate their legacy brick-and-mortar store to a modern, fast, and scalable online platform to increase their market reach.',
    solution: 'Developed a high-performance e-commerce site using Next.js for SSR/SSG, resulting in excellent SEO and fast page loads. Integrated with Stripe for payments and a headless CMS for easy product management.',
    result: 'Achieved a 40% increase in sales within the first quarter. Lighthouse performance score improved from 55 to 98. Reduced bounce rate by 30%.',
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
    title: 'Analytics Dashboard',
    isFeatured: true,
    description: 'A real-time data analytics dashboard for a SaaS product, providing users with actionable insights.',
    problem: 'Users lacked visibility into their data, making it difficult to track key metrics and make informed decisions.',
    solution: 'Built a responsive dashboard with dynamic charts and data visualizations using Recharts and React. Implemented WebSocket for real-time data updates and provided options for custom date-range filtering.',
    result: 'Increased user engagement by 25%. Customer support tickets related to data queries dropped by 50%.',
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Recharts', 'WebSockets'],
    image: getImage('project-dashboard'),
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    slug: 'saas-landing-page',
    title: 'SaaS Landing Page',
    isFeatured: true,
    description: 'A high-converting landing page for a B2B SaaS product, optimized for lead generation.',
    problem: 'The existing landing page had a high bounce rate and low conversion rate due to poor design and slow load times.',
    solution: 'Redesigned the entire landing page with a focus on clear messaging and a strong value proposition. Used Next.js for static generation, optimized images with `next/image`, and A/B tested different CTA copies.',
    result: 'Conversion rate increased by 200%. Page load time decreased by 70%.',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    image: getImage('project-saas'),
    liveUrl: '#',
    repoUrl: '#',
  },
    {
    slug: 'mobile-banking-app',
    title: 'Mobile Banking App Concept',
    isFeatured: false,
    description: 'A conceptual design and prototype for a modern mobile banking application.',
    problem: 'Traditional banking apps are often cluttered and difficult to navigate. The goal was to design a user-centric app that simplifies personal finance management.',
    solution: 'Designed a clean, intuitive interface in Figma, focusing on a minimalist aesthetic and easy access to common banking tasks like transfers and balance checks. Built a clickable prototype to demonstrate user flows.',
    result: 'Positive feedback from user testing sessions, with a 95% task completion rate. The design concept was later adopted for a real-world project.',
    techStack: ['Figma', 'React Native (concept)', 'Storybook'],
    image: getImage('project-mobile'),
    liveUrl: '#',
    repoUrl: '#',
  },
];

export const blogPosts = [
  {
    slug: 'mastering-nextjs-performance',
    title: 'Mastering Next.js Performance: A Practical Guide',
    date: '2024-05-15',
    excerpt: 'Dive deep into practical techniques for optimizing your Next.js applications, from dynamic imports and code splitting to image optimization and caching strategies.',
    image: getImage('blog-post-1'),
    content: `
## Introduction
Performance is not a feature, it's a necessity. In this guide, we'll explore...

### 1. Code Splitting with \`dynamic()\`
\`\`\`javascript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('../components/HeavyComponent'))

function HomePage() {
  return (
    <div>
      <p>This is the home page.</p>
      <HeavyComponent />
    </div>
  )
}
\`\`\`
    `
  },
  {
    slug: 'advanced-tailwind-css-patterns',
    title: 'Advanced Tailwind CSS Patterns for Reusable Components',
    date: '2024-04-22',
    excerpt: 'Move beyond basic utility classes. Learn how to create scalable and maintainable component styles in Tailwind CSS using plugins, variants, and composition.',
    image: getImage('blog-post-2'),
    content: `
## The Problem with Repetition
Writing the same combination of utility classes over and over can be tedious.

### Creating a Plugin
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
    title: 'The State of React State Management in 2024',
    date: '2024-03-10',
    excerpt: 'useState, useReducer, Context API, Zustand, Redux Toolkit... The choices are endless. This post breaks down the pros and cons of popular state management solutions.',
    image: getImage('blog-post-3'),
    content: `
## Zustand: The Minimalist's Choice
Zustand offers a simple, unopinionated way to manage state.

### Basic Usage
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
