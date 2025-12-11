// pages/api/delete-meeting.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const backendRes = await fetch('http://localhost:8000/deleteMeeting', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),   // e.g. { _id: '...' }
    });

    const data = await backendRes.json();
    return res.status(200).json(data); // { response: 'success' | 'fail' }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ response: 'fail' });
  }
}