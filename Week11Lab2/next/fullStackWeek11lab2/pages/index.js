// pages/index.js
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MeetupList from '../components/meetups/MeetupList';
import GlobalContext from './store/globalContext';

function HomePage() {
  const router = useRouter();
  const globalCtx = useContext(GlobalContext);

  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // runs only in the browser
    if (typeof window === 'undefined') return;

    const logged = localStorage.getItem('isLoggedIn') === 'true';

    if (!logged) {
      // not logged in → send them to /login
      router.replace('/login');
    } else {
      setIsLoggedIn(true);
    }

    setAuthChecked(true);
  }, [router]);

  // While we’re checking / redirecting
  if (!authChecked) {
    return <div>Checking login status…</div>;
  }

  // If not logged in, we’re already redirecting; render nothing
  if (!isLoggedIn) {
    return null;
  }

  // Logged in → show the normal homepage (meetups list)
  return <MeetupList meetups={globalCtx.theGlobalObject.meetings} />;
}

export default HomePage;