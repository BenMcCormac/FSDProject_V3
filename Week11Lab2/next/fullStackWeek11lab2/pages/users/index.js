// pages/users/index.js
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await fetch("/api/users");

        if (!res.ok) {
          const text = await res.text();
          console.error("Next /api/users error", res.status, text);
          setError(`FastAPI error: ${res.status}`);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        console.error("Network error calling /api/users", err);
        setError("Network error talking to FastAPI");
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <section>
      <h1>Users (FastAPI service)</h1>

      {loading && <p>Loading users from FastAPI…</p>}
      {!loading && error && (
        <p style={{ color: "red" }}>{error}</p>
      )}
      {!loading && !error && users.length === 0 && (
        <p>No users yet.</p>
      )}

      {!loading && !error && users.length > 0 && (
        <ul>
          {users.map((u) => (
            <li key={u.id}>
              {u.name} ({u.student_id}) – {u.email}, age {u.age}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}