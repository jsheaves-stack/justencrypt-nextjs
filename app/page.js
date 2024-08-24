'use client';

import { useEffect, useState } from 'react';
import LoginForm from './components/loginForm';
import FileExplorer from './components/fileExplorer';
import Loading from './components/loading';

import { checkAuthRequest, submitLogoutRequest } from './requests/requests';

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const submitLogout = () => {
    submitLogoutRequest()
      .then((authenticated) => {
        setAuthenticated(authenticated);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    checkAuthRequest()
      .then((authenticated) => {
        setAuthenticated(authenticated);
        setInitialLoad(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <main className="absolute flex h-full w-full select-none flex-col content-center items-center justify-center bg-bg text-black">
      {initialLoad ? (
        <div className="relative h-16 w-60">
          <Loading />
        </div>
      ) : authenticated ? (
        <FileExplorer submitLogout={submitLogout} />
      ) : (
        <LoginForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
      )}
    </main>
  );
}
