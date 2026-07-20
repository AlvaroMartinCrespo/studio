<div align="center">
  <img src="docs/logo-amc.svg" alt="AMC" width="140" />

  <h1>Álvaro Martín Crespo</h1>
  <p><sub>Portfolio &amp; blog — Next.js</sub></p>
</div>

<br />

## Sobre el proyecto

Sitio personal de Álvaro Martín Crespo: portfolio de proyectos, página de
contacto y un blog cuyas entradas se generan y publican de forma automática
cada día.

## Stack

| Área | Tecnología |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Estilos | Tailwind CSS |
| Datos del blog | Supabase (Postgres) |
| Generación de contenido | Groq (`llama-3.3-70b-versatile`) |
| Imágenes de portada | Pexels API |
| Despliegue | Vercel (Cron Jobs) |

## Estructura

```
src/
  app/          rutas (home, about, projects, blog, contact, dashboard, login)
  components/   componentes de UI y de sección
  lib/          datos, clientes de API (Groq, Pexels, Supabase)
supabase/       schema.sql y seed.sql
docs/           documentación adicional
```

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # completar con tus claves
npm run dev
```

### Variables de entorno

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto de Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave pública (solo lectura, vía RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave de servicio (server-only) |
| `GROQ_API_KEY` | API key de [console.groq.com](https://console.groq.com) |
| `PEXELS_API_KEY` | API key de [pexels.com/api](https://www.pexels.com/api/) |
| `CRON_SECRET` | Cadena aleatoria que autoriza al cron de Vercel |

En producción, estas mismas variables se configuran en
**Vercel → Project Settings → Environment Variables**.

## Blog automático

Cada día, a las 8:00 UTC, un cron de Vercel llama a
`/api/cron/generate-post`, que elige un tema no repetido, genera el artículo
con Groq, busca una imagen de portada en Pexels y guarda el resultado en
Supabase. Documentación completa en
[docs/blog-automation.md](docs/blog-automation.md).

## Redes

- [GitHub](https://github.com/AlvaroMartinCrespo)
- [LinkedIn](https://www.linkedin.com/in/alvaromartincrespo/)
- [Bluesky](https://bsky.app/profile/alvaromartincrespo.bsky.social)

---

<sub>© 2026 Álvaro Martín Crespo. Todos los derechos reservados.</sub>
