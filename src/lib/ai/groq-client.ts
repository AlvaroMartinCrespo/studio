const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function groqChat(
  messages: GroqMessage[],
  options?: { temperature?: number; jsonMode?: boolean; maxTokens?: number }
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('Falta GROQ_API_KEY en las variables de entorno.');
  }

  const response = await fetch(GROQ_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
      messages,
      temperature: options?.temperature ?? 0.8,
      // Por defecto generoso: un post de 500-800 palabras + ejemplo de código,
      // una vez escapado dentro de un string JSON, puede consumir bastantes
      // tokens. Si se corta a mitad de generación, el JSON queda mal formado
      // y Groq responde con json_validate_failed.
      max_tokens: options?.maxTokens ?? 4000,
      ...(options?.jsonMode ? { response_format: { type: 'json_object' } } : {}),
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Error de la API de Groq (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const choice = data?.choices?.[0];
  const content = choice?.message?.content;
  if (!content) {
    throw new Error('Respuesta de Groq sin contenido.');
  }
  // Si el modelo se quedó sin tokens a mitad de generación, el JSON vendrá
  // incompleto aunque la petición HTTP haya sido un 200 OK. Lo detectamos
  // aquí para poder reintentar en vez de fallar más adelante en JSON.parse
  // con un error menos informativo.
  if (choice?.finish_reason === 'length') {
    throw new Error('La respuesta de Groq se cortó por límite de tokens (finish_reason=length).');
  }
  return content as string;
}
