'use client'

import { useEffect, useState } from 'react'
import LoginForm from './components/loginForm';
import FileExplorer from './components/fileExplorer';
import { checkAuthRequest, submitLogoutRequest } from './requests/requests';

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const submitLogout = () => {
    submitLogoutRequest().then((authenticated) => {
      setAuthenticated(authenticated);
    }).catch((err) => {
      console.error(err);
    });
  };

  useEffect(() => {
    checkAuthRequest().then((authenticated) => {
      setAuthenticated(authenticated);
      setInitialLoad(false);
    }).catch((err) => {
      console.error(err);
    })
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between bg-bg text-black select-none">
      {
        initialLoad ? (
          <div className="absolute inset-0 flex items-center justify-center text-lg">
            Loading...
          </div>
        ) : (
          authenticated ? (
            <FileExplorer submitLogout={submitLogout} />
          ) : (
            <LoginForm
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          )
        )
      }
    </main>
  );
}
