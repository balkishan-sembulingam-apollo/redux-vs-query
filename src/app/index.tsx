import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router';
import { Theme } from '@radix-ui/themes';
import UsersReactQuery from '../containers/users-react-query';
import UsersReactQueryInfinite from '../containers/users-react-query-infinite';
import UsersReduxSaga from '../containers/users-redux-saga';
import '@radix-ui/themes/styles.css';
import styles from './index.module.css';

function App() {
  return (
    <Theme appearance="dark" accentColor="amber">
      <BrowserRouter>
        <main className={styles.main}>
          <header className={styles.header}>
            <span>Demo Application</span>
            <div className={styles.spacer} />
            <nav className={styles.nav}>
              <Link to="/users-react-query">Users React Query</Link>
              <Link to="/users-redux-saga">Users Redux Saga</Link>
              <Link to="/users-react-query-infinite">
                Users React Query Infinite
              </Link>
            </nav>
          </header>
          <section className={styles.section}>
            <Routes>
              <Route path="/users-react-query" element={<UsersReactQuery />} />
              <Route path="/users-redux-saga" element={<UsersReduxSaga />} />
              <Route
                path="/users-react-query-infinite"
                element={<UsersReactQueryInfinite />}
              />
            </Routes>
          </section>
        </main>
      </BrowserRouter>
    </Theme>
  );
}

export default App;
