// pages/api/users/index.js

export default async function handler(req, res) {
  const base = process.env.FASTAPI_BASE_URL;

  if (!base) {
    console.error("FASTAPI_BASE_URL is not set");
    return res.status(500).json({ error: "FASTAPI_BASE_URL is not set" });
  }

  // remove trailing slashes from base, then add our path
  const apiBase = base.replace(/\/+$/, "");
  const url = `${apiBase}/api/users`;

  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("Calling FastAPI at:", url);

    const fastRes = await fetch(url, {
      headers: { accept: "application/json" },
    });

    const bodyText = await fastRes.text();
    console.log(
      "FastAPI raw response:",
      fastRes.status,
      bodyText.slice(0, 200)
    );

    if (!fastRes.ok) {
      // Pass through errors without trying to parse HTML as JSON
      return res.status(fastRes.status).json({
        error: "FastAPI error",
        status: fastRes.status,
        body: bodyText.slice(0, 200),
      });
    }

    let data;
    try {
      data = JSON.parse(bodyText);
    } catch (err) {
      console.error("Failed to parse FastAPI JSON:", err);
      return res.status(500).json({
        error: "Invalid JSON from FastAPI",
        bodyPreview: bodyText.slice(0, 200),
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Network error talking to FastAPI:", err);
    return res
      .status(500)
      .json({ error: "Network error talking to FastAPI" });
  }
}