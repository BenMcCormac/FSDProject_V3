// components/layout/Layout.js
import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';

function Layout({ children, onLogout }) {
  return (
    <>
      <MainNavigation onLogout={onLogout} />
      <main className={classes.main}>{children}</main>
    </>
  );
}

export default Layout;