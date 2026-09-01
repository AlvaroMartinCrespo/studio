/**
 * Cliente mínimo para reportar a la API de monitorización de bots
 * (el "studio" de bots: /api/ping, /api/event, /api/error).
 *
 * No lanza nunca: si el reporte falla, solo se loguea. Nunca debe romper
 * el flujo real de generación del post.
 */

const BOT_NAME = 'devalvaro-blog-portfolio';

function getConfig() {
  const baseUrl = process.env.BOTS_MONITOR_URL;
  const apiKey = process.env.BOTS_SHARED_KEY;
  if (!baseUrl || !apiKey) return null;
  return { baseUrl: baseUrl.replace(/\/$/, ''), apiKey };
}

async function report(path: string, body: Record<string, unknown>): Promise<void> {
  const config = getConfig();
  if (!config) {
    // No configurado: no se reporta, no se interrumpe nada.
    return;
  }

  try {
    const res = await fetch(`${config.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.apiKey,
        'x-bot-name': BOT_NAME,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error(`[bots-monitor] ${path} respondió ${res.status}`);
    }
  } catch (err) {
    console.error(`[bots-monitor] no se pudo reportar a ${path}:`, err);
  }
}

/** Reporta que la generación del post ha ido bien. */
export function reportBlogPostSuccess(details: Record<string, unknown>): Promise<void> {
  return report('/api/event', { action: 'generate_blog_post', details });
}

/** Reporta que la generación del post ha fallado. */
export function reportBlogPostError(message: string, details?: Record<string, unknown>): Promise<void> {
  return report('/api/error', { action: 'generate_blog_post', message, details });
}
