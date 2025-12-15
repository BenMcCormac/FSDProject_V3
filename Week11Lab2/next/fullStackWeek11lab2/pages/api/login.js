export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { username, password } = req.body;

  
  const VALID_USER = 'admin';
  const VALID_PASS = 'password123';

  if (username === VALID_USER && password === VALID_PASS) {
    return res.status(200).json({ ok: true });
  }

  return res.status(401).json({ ok: false, message: 'Invalid credentials' });
}