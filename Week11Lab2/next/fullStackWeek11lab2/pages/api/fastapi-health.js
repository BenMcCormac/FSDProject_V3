// pages/api/fastapi-health.js

const FASTAPI_BASE_URL =
  "https://ideal-barnacle-pv7jww6w4gf675r-8000.app.github.dev".replace(
    /\/$/,
    ""
  );

export default async function handler(req, res) {
  try {
    const url = `${FASTAPI_BASE_URL}/health`;
    console.log("Calling FastAPI health at:", url);

    const resp = await fetch(url, { headers: { Accept: "application/json" } });
    const text = await resp.text();
    console.log(
      "FastAPI /health raw response:",
      resp.status,
      resp.statusText,
      text.slice(0, 200)
    );

    if (!resp.ok) {
      return res
        .status(500)
        .json({ status: "down", error: `FastAPI error: ${resp.status}` });
    }

    const data = text ? JSON.parse(text) : {};
    return res.status(200).json({ status: "up", raw: data });
  } catch (err) {
    console.error("Error calling FastAPI /health", err);
    return res.status(500).json({ status: "down", error: "Network error" });
  }
}