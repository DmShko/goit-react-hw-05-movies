import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import sh from '../SharedLayout/SharedLayout.module.css';

const SharedLayout = () => {
  return (
    <>
      <section className={sh.section}>
        <header className={sh.header}>
          <nav className={sh.nav}>
            <NavLink className={sh.link} to="/">
              Home
            </NavLink>
            <NavLink className={sh.link} to="/movies">
              Movies
            </NavLink>
          </nav>
        </header>
      </section>

      <section className={sh.section}>
        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </main>
      </section>
    </>
  );
};

export default SharedLayout;
