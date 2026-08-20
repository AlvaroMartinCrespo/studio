const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function groqChat(
  messages: GroqMessage[],
  options?: { temperature?: number; jsonMode?: boolean }
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
      ...(options?.jsonMode ? { response_format: { type: 'json_object' } } : {}),
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Error de la API de Groq (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('Respuesta de Groq sin contenido.');
  }
  return content as string;
}
