export interface TopicCandidate {
  /** Identificador estable y único del tema. Es la clave anti-repetición: */
  /** una vez usado, no se vuelve a elegir aunque el pool se recorra varias veces. */
  topic: string;
  /** Título orientativo, el modelo puede ajustarlo. */
  seedTitle: string;
  tags: string[];
}

/**
 * Pool de temas técnicos candidatos. Se organiza por categorías para que la
 * selección pueda repartir entre bloques distintos (JS, React, CSS, backend,
 * herramientas, carrera...) y no se agrupen varios posts seguidos del mismo
 * bloque (p. ej. dos posts de punteros en C, o dos de hooks de React).
 */
export const TOPIC_POOL: TopicCandidate[] = [
  // JavaScript / TypeScript
  { topic: 'js-closures', seedTitle: 'Closures en JavaScript explicados con ejemplos reales', tags: ['javascript', 'fundamentos'] },
  { topic: 'js-event-loop', seedTitle: 'Cómo funciona el Event Loop en JavaScript', tags: ['javascript', 'fundamentos'] },
  { topic: 'js-promesas', seedTitle: 'Promesas y async/await: de la teoría al código', tags: ['javascript', 'asincronia'] },
  { topic: 'js-this', seedTitle: 'El temido "this" en JavaScript, de una vez por todas', tags: ['javascript', 'fundamentos'] },
  { topic: 'ts-genericos', seedTitle: 'Genéricos en TypeScript: cuándo y por qué usarlos', tags: ['typescript'] },
  { topic: 'ts-utility-types', seedTitle: 'Utility Types de TypeScript que deberías conocer', tags: ['typescript'] },
  { topic: 'js-array-methods', seedTitle: 'map, filter y reduce: domina los arrays en JS', tags: ['javascript', 'fundamentos'] },
  { topic: 'js-destructuring', seedTitle: 'Destructuring y spread operator en la práctica', tags: ['javascript', 'fundamentos'] },

  // React / Next.js
  { topic: 'react-hooks-personalizados', seedTitle: 'Crea tus propios hooks personalizados en React', tags: ['react', 'hooks'] },
  { topic: 'react-usememo-usecallback', seedTitle: 'useMemo y useCallback: cuándo optimizan y cuándo estorban', tags: ['react', 'rendimiento'] },
  { topic: 'nextjs-app-router', seedTitle: 'App Router de Next.js: qué cambia frente a Pages Router', tags: ['nextjs', 'react'] },
  { topic: 'nextjs-server-components', seedTitle: 'Server Components en Next.js explicados sin humo', tags: ['nextjs', 'react'] },
  { topic: 'react-context-vs-state-manager', seedTitle: 'Context API vs gestores de estado: cuándo usar cada uno', tags: ['react', 'arquitectura'] },
  { topic: 'react-forms', seedTitle: 'Formularios en React: de useState a react-hook-form', tags: ['react', 'formularios'] },

  // CSS / diseño
  { topic: 'css-flexbox-grid', seedTitle: 'Flexbox vs Grid: cuándo usar cada uno', tags: ['css', 'layout'] },
  { topic: 'css-variables', seedTitle: 'Variables CSS para temas claro/oscuro sin librerías', tags: ['css'] },
  { topic: 'css-responsive', seedTitle: 'Diseño responsive de verdad: más allá de los media queries', tags: ['css', 'responsive'] },
  { topic: 'tailwind-buenas-practicas', seedTitle: 'Buenas prácticas con Tailwind CSS en proyectos grandes', tags: ['css', 'tailwind'] },

  // Backend / bases de datos
  { topic: 'node-apis-rest', seedTitle: 'Diseñar una API REST limpia con Node.js', tags: ['node', 'backend'] },
  { topic: 'sql-vs-nosql', seedTitle: 'SQL vs NoSQL: cómo elegir para tu próximo proyecto', tags: ['bases-de-datos', 'backend'] },
  { topic: 'auth-jwt', seedTitle: 'Autenticación con JWT explicada paso a paso', tags: ['backend', 'seguridad'] },
  { topic: 'firebase-vs-supabase', seedTitle: 'Firebase vs Supabase: comparativa para un frontend', tags: ['backend', 'herramientas'] },

  // Fundamentos de bajo nivel / CS
  { topic: 'c-punteros', seedTitle: 'Punteros en C: qué son y cómo perderles el miedo', tags: ['c', 'bajo-nivel'] },
  { topic: 'estructuras-datos-basicas', seedTitle: 'Pilas, colas y listas enlazadas explicadas con ejemplos', tags: ['algoritmos', 'fundamentos'] },
  { topic: 'complejidad-algoritmica', seedTitle: 'Notación Big O sin dolor: cómo medir tu código', tags: ['algoritmos', 'fundamentos'] },

  // Herramientas / flujo de trabajo
  { topic: 'git-flujo-trabajo', seedTitle: 'Flujo de trabajo con Git que uso en proyectos reales', tags: ['git', 'herramientas'] },
  { topic: 'git-rebase-vs-merge', seedTitle: 'Git rebase vs merge: diferencias y cuándo usar cada uno', tags: ['git', 'herramientas'] },
  { topic: 'testing-frontend', seedTitle: 'Testing en frontend: qué probar y qué no', tags: ['testing', 'buenas-practicas'] },
  { topic: 'debugging-navegador', seedTitle: 'Sacarle partido a las DevTools del navegador', tags: ['herramientas', 'debugging'] },

  // Rendimiento y accesibilidad
  { topic: 'rendimiento-web', seedTitle: 'Cómo medir y mejorar el rendimiento de una web', tags: ['rendimiento', 'buenas-practicas'] },
  { topic: 'accesibilidad-web', seedTitle: 'Accesibilidad web: lo mínimo que todo frontend debería saber', tags: ['accesibilidad', 'buenas-practicas'] },
  { topic: 'seo-tecnico-frontend', seedTitle: 'SEO técnico desde el punto de vista de un frontend', tags: ['seo', 'buenas-practicas'] },

  // Carrera / reflexiones
  { topic: 'aprender-programar-autodidacta', seedTitle: 'Lo que aprendí programando por mi cuenta fuera del trabajo', tags: ['carrera', 'reflexion'] },
  { topic: 'code-review', seedTitle: 'Cómo dar y recibir code reviews sin dramas', tags: ['carrera', 'buenas-practicas'] },
  { topic: 'proyectos-personales', seedTitle: 'Por qué merece la pena tener proyectos personales', tags: ['carrera', 'reflexion'] },
];
