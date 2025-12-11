// components/Header.js
export default function Header({ onLogout }) {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
        borderBottom: '1px solid #ccc',
      }}
    >
      <span>My Meetings App</span>
      <button onClick={onLogout}>Logout</button>
    </header>
  );
}