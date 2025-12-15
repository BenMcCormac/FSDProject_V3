// pages/api/users/[userId].js
const USERS_API_BASE = process.env.USERS_API_BASE;

export default async function handler(req, res) {
  const { userId } = req.query;
  const url = `${USERS_API_BASE}/api/users/${userId}`;

  try {
    if (req.method === 'GET') {
      const resp = await fetch(url);
      const data = await resp.json();
      return res.status(resp.status).json(data);
    }

    if (req.method === 'PUT') {
      const resp = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
      const data = await resp.json();
      return res.status(resp.status).json(data);
    }

    if (req.method === 'DELETE') {
      // FastAPI delete usually doesn’t expect a body – just the path param
      const resp = await fetch(url, { method: 'DELETE' });
      const data = await resp.json();
      return res.status(resp.status).json(data);
    }

    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).end('Method Not Allowed');
  } catch (err) {
    console.error(`${req.method} /api/users/${userId} failed:`, err);
    return res.status(500).json({ detail: 'Users service unreachable' });
  }
}