'use client';

import { useEffect, useState } from 'react';

import { getFolderRequest, submitLogoutRequest } from './requests/requests';

import LoginForm from './components/loginForm';
import FileExplorer from './components/fileExplorer/fileExplorer';
import Loading from './components/loading';

import ChangeTheme from './assets/icons/color-filter.svg';
import Logout from './assets/icons/log-out.svg';

const themes = {
  BlueLight: 'blue-light',
  BlueDark: 'blue-dark',
  GreenPurpleLight: 'green-purple-light',
  GreenPurpleDark: 'green-purple-dark',
  OrangeLight: 'orange-light',
  OrangeDark: 'orange-dark',
  GreenLight: 'green-light',
  GreenDark: 'green-dark',
  YellowLight: 'yellow-light',
  YellowDark: 'yellow-dark',
  SalmonLight: 'salmon-light',
  SalmonDark: 'salmon-dark',
  PurpleLight: 'purple-light',
  PurpleDark: 'purple-dark',
  LimeLight: 'lime-light',
  LimeDark: 'lime-dark',
  LavenderLight: 'lavender-light',
  LavenderDark: 'lavender-dark',
};

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [theme, setTheme] = useState(themes.BlueDark);

  const changeTheme = () => {
    const themesArray = Object.values(themes);
    const themesIndex = themesArray.indexOf(theme);

    if (themesIndex == themesArray.length - 1) {
      setTheme(themesArray[0]);
    } else {
      setTheme(themesArray[themesIndex + 1]);
    }
  };

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
    getFolderRequest("/")
      .then(() => {
        setAuthenticated(true);
      })
      .catch((err) => {
        console.error(err);
      }).finally(() => {
        setInitialLoad(false);
      });
  }, []);

  return (
    <main
      className={`absolute flex h-full w-full select-none flex-col content-center items-center justify-center bg-bg text-black ${theme}`}
    >
      {initialLoad ? (
        <div className="relative h-16 w-60">
          <Loading />
        </div>
      ) : authenticated ? (
        <div className="grid h-full w-full grid-rows-[min-content,1fr]">
          <div className="mx-auto flex h-10 h-min w-full justify-end border-b-4 border-black bg-bg pb-4 pt-4">
            <button
              className="text-align-center align-center mr-4 flex grid h-10 cursor-pointer grid-cols-[1.5em,1fr] justify-center gap-1 rounded-base border-2 border-black bg-main px-4 py-2 text-sm font-base shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
              onClick={() => changeTheme()}
            >
              <img src={ChangeTheme.src}></img>
              <span className="hidden sm:block">Change Theme</span>
            </button>
            <button
              className="text-align-center align-center mr-4 flex grid h-10 cursor-pointer grid-cols-[1.5em,1fr] justify-center gap-1 rounded-base border-2 border-black bg-main px-4 py-2 text-sm font-base shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
              onClick={() => submitLogout()}
            >
              <img src={Logout.src}></img>
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
          <FileExplorer />
        </div>
      ) : (
        <LoginForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
      )}
    </main>
  );
}
