interface PexelsImage {
  url: string;
  alt: string;
  photographerName: string;
  photographerUrl: string;
}

/**
 * Busca una imagen en Pexels para el/los tags dados. Coge un resultado
 * aleatorio entre los primeros N para no repetir siempre la misma foto
 * cuando se repite tag entre posts.
 */
export async function fetchPexelsImage(
  query: string,
  fallbackQuery = 'programming code'
): Promise<PexelsImage | null> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    throw new Error('Falta PEXELS_API_KEY en las variables de entorno.');
  }

  const search = async (q: string) => {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
      q
    )}&per_page=10&orientation=landscape`;
    const response = await fetch(url, {
      headers: { Authorization: apiKey },
    });
    if (!response.ok) {
      throw new Error(`Error de la API de Pexels (${response.status})`);
    }
    return response.json();
  };

  let data = await search(query);
  if (!data.photos?.length) {
    data = await search(fallbackQuery);
  }
  if (!data.photos?.length) {
    return null;
  }

  const photo = data.photos[Math.floor(Math.random() * data.photos.length)];

  return {
    url: photo.src.large,
    alt: photo.alt || query,
    photographerName: photo.photographer,
    photographerUrl: photo.photographer_url,
  };
}
