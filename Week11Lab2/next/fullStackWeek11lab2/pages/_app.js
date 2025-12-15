// pages/_app.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GlobalContextProvider } from './store/globalContext';
import Layout from '../components/layout/Layout';
import LoginForm from '../components/LoginForm'; // your simple login form
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  // Check sessionStorage on first load (per-tab login)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = sessionStorage.getItem('loggedIn');
    setLoggedIn(stored === 'true');
    setReady(true);
  }, []);

  const handleLogin = (username, password) => {
    // Put whatever credentials you want here
    if (username === 'admin' && password === 'password') {
      setLoggedIn(true);
      sessionStorage.setItem('loggedIn', 'true'); // remove if you want 0 persistence
      router.push('/'); // IMPORTANT: go to homepage, not /users
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    sessionStorage.removeItem('loggedIn');
    router.push('/'); // back to / – will show login form again
  };

  // Avoid flicker while we read sessionStorage
  if (!ready) return null;

  // Not logged in → only show the login form
  if (!loggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  // Logged in → whole site with your normal layout + nav
  return (
    <GlobalContextProvider>
      <Layout onLogout={handleLogout}>
        <Component {...pageProps} />
      </Layout>
    </GlobalContextProvider>
  );
}

export default MyApp;