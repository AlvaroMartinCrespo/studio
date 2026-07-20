-- Inserta el post original del blog ("¡Hola, Mundo!") tras crear el esquema
-- (supabase/schema.sql), para no perderlo al migrar de src/lib/data.ts a Supabase.

insert into blog_posts (slug, title, excerpt, content, image_url, image_alt, topic, tags, date)
values (
  'hola-mundo-nuevo-espacio-digital',
  '¡Hola, Mundo! Estrenando mi nuevo espacio digital',
  'Una breve introducción a mi nuevo portfolio, mi motivación y mi pasión por el desarrollo web.',
  '<p>¡Bienvenido a mi nuevo rincón en la web!</p>
   <p>Con mucha ilusión y ganas, doy el primer paso para crear este portfolio. Es más que una simple página; es un lienzo en blanco donde planeo plasmar mi pasión por la creación de experiencias web y compartir un poco sobre mí.</p>
   <h3>Mi camino hasta aquí</h3>
   <p>Soy desarrollador frontend, una profesión que descubrí después de completar mi Grado Superior en Desarrollo de Aplicaciones Web. Aunque actualmente trabajo en proyectos para el sector bancario, mi curiosidad y mis ganas de aprender no se detienen ahí. Este espacio es mi válvula de escape creativa, un lugar donde puedo experimentar, construir y, sobre todo, disfrutar de lo que más me gusta: programar.</p>
   <h3>¿Qué esperar de este sitio?</h3>
   <p>Esto es solo el comienzo. Estoy muy motivado y con muchas ganas de seguir construyendo más páginas y proyectos personales. Aquí encontrarás una muestra de mi trabajo, mis habilidades y, con el tiempo, un blog donde compartiré reflexiones y aprendizajes, no solo técnicos, sino también personales.</p>
   <p>Este proyecto es un reflejo de mi pasión y de mi hobby. Espero que disfrutes explorándolo tanto como yo he disfrutado creándolo.</p>
   <p>¡Gracias por pasarte!</p>',
  'https://images.unsplash.com/photo-1675495666589-94cdafbcfcc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxjb2RlJTIwdGVjaG5vbG9neXxlbnwwfHx8fDE3NjA5Njc3ODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'code technology',
  'seed-hola-mundo',
  array['portfolio', 'presentacion'],
  '2024-07-31'
)
on conflict (slug) do nothing;
