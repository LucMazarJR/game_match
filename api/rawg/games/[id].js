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

  const id = String(req.query.id ?? '').trim();
  if (!id) {
    return sendError(res, 400, 'ID do jogo e obrigatorio');
  }

  const params = new URLSearchParams({ key: apiKey });

  try {
    const response = await fetch(
      `${RAWG_BASE_URL}/games/${encodeURIComponent(id)}?${params.toString()}`,
    );
    const text = await response.text();

    if (!response.ok) {
      return sendError(res, response.status, text || 'Falha ao buscar jogo');
    }

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
    return res.status(200).send(text);
  } catch {
    return sendError(res, 500, 'Erro interno ao consultar RAWG');
  }
}
