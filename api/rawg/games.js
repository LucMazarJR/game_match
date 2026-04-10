const RAWG_BASE_URL = 'https://api.rawg.io/api';

function sendError(res, status, error) {
  return res.status(status).json({ error });
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return sendError(res, 405, 'Method not allowed');
  }

  const apiKey = process.env.RAWG_API_KEY;
  if (!apiKey) {
    return sendError(res, 500, 'RAWG_API_KEY nao configurada');
  }

  const page = Number(req.query.page ?? 1);
  const pageSize = Number(req.query.page_size ?? 20);
  const genres = String(req.query.genres ?? '');
  const platforms = String(req.query.platforms ?? '');
  const stores = String(req.query.stores ?? '');

  const params = new URLSearchParams({
    key: apiKey,
    page: String(Number.isInteger(page) && page > 0 ? page : 1),
    page_size: String(Number.isInteger(pageSize) && pageSize > 0 ? pageSize : 20),
  });

  if (genres) {
    params.set('genres', genres);
  }

  if (platforms) {
    params.set('platforms', platforms);
  }

  if (stores) {
    params.set('stores', stores);
  }

  try {
    const response = await fetch(`${RAWG_BASE_URL}/games?${params.toString()}`);
    const text = await response.text();

    if (!response.ok) {
      return sendError(res, response.status, text || 'Falha ao buscar jogos');
    }

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(200).send(text);
  } catch {
    return sendError(res, 500, 'Erro interno ao consultar RAWG');
  }
}
