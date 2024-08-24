'use client';

import { useState } from 'react';
import { submitLoginRequest } from '../requests/requests';
import Loading from './loading';

export default function LoginForm(props) {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [loading, setLoading] = useState(false);

  const submitLogin = (e) => {
    e.preventDefault();

    if (!loading) setLoading(true);

    submitLoginRequest(username, password)
      .then((authenticated) => {
        props.setAuthenticated(authenticated);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        if (loading) setLoading(false);
      });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-bg">
      {loading ? (
        <div className="relative h-16 w-60">
          <Loading />
        </div>
      ) : (
        <div className="w-full max-w-md">
          <div className="relative flex flex-col items-center justify-center rounded-base border-2 border-black bg-mainAccent p-10 pt-12 font-base shadow-base">
            <h2 className="mb-6 text-center text-2xl font-bold text-text">Login</h2>
            <form className="space-y-6" onSubmit={(e) => submitLogin(e)}>
              <div>
                <label className="block text-sm font-medium text-text">Username</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 w-full rounded-base border-2 border-black bg-bg p-[10px] font-base text-text outline-none ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                  type="text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 w-full rounded-base border-2 border-black bg-bg p-[10px] font-base text-text outline-none ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                  type="password"
                />
              </div>
              <div className="w-full items-center">
                <button className="text-align-center w-18 m-auto flex cursor-pointer items-center rounded-base border-2 border-black bg-main px-4 py-2 text-sm font-base text-black shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
