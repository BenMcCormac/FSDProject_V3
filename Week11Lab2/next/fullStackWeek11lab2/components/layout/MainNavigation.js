// components/layout/MainNavigation.js
import classes from './MainNavigation.module.css';
import Link from 'next/link';
import HamMenu from '../generic/HamMenu';
import HamMenuFAB from '../generic/HamMenuFAB';
import { useContext } from 'react';
import GlobalContext from '../../pages/store/globalContext';
import HamMenuContent from './HamMenuContent';

function MainNavigation({ onLogout }) {
  const globalCtx = useContext(GlobalContext);

  function toggleMenuHide() {
    globalCtx.updateGlobals({ cmd: 'hideHamMenu', newVal: false });
  }

  const contents = [];
  globalCtx.theGlobalObject.meetings.forEach((element) => {
    contents.push({ title: element.title, webAddress: '/' + element.meetingId });
  });

  return (
    <header className={classes.header}>
      <HamMenuContent contents={contents} />
      <HamMenu toggleMenuHide={() => toggleMenuHide()} />
      <HamMenuFAB toggleMenuHide={() => toggleMenuHide()} />
      <nav>
        <ul>
          <li>
            <Link href='/'>
              All Meetups
            </Link>{' '}
            ({globalCtx.theGlobalObject.meetings.length})
          </li>
          <li>
            <Link href='/new-meetup'>Add New Meetup</Link>
          </li>
          <li>
            <Link href='/users'>Users (FastAPI)</Link>
          </li>
          {/* NEW: Logout item – same layout, just one more list item */}
          <li>
            <button
              type='button'
              onClick={onLogout}
              className={classes.logoutButton}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;