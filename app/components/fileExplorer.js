'use client';

import { useEffect, useState } from 'react';
import { getFolderRequest, uploadFilesRequest } from '../requests/requests';
import { sanitizePath, popPath, isDarkMode, changeTheme } from '../utils/util';

import File from './file';
import Folder from './folder';
import FileUploadForm from './fileUploadForm';
import LazyLoadWrapper from './lazyLoadWrapper';

import SunIcon from '../assets/icons/sun-light.svg';
import MoonIcon from '../assets/icons/half-moon.svg';

export default function FileExplorer(props) {
  const [path, setPath] = useState('/');
  const [folderContents, setFolderContents] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('dark');

  changeTheme(currentTheme);

  const isDark = isDarkMode();

  const updatePath = (newPath) => {
    if (newPath == path) return;

    setFolderContents([]);
    setPath(sanitizePath(newPath));
  };

  useEffect(() => {
    getFolderRequest(sanitizePath(path))
      .then((contents) => {
        setFolderContents(contents);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [path]);

  useEffect(() => {
    const preventDefault = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    document.addEventListener('dragover', preventDefault);
    document.addEventListener('drop', preventDefault);

    return () => {
      document.removeEventListener('dragover', preventDefault);
      document.removeEventListener('drop', preventDefault);
    };
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);
    uploadFilesRequest(e.dataTransfer.files, path)
      .then((contents) => {
        setFolderContents(contents);
      })
      .catch((err) => console.error(err));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!dragging) setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  return (
    <div className="absolute grid h-full w-full grid-rows-[4em,1fr] overflow-hidden">
      <div className="h-16 content-center border-b-4 border-black bg-bg">
        <div className="mx-auto flex w-full items-center justify-between">
          <button
            className={`text-align-center w-18 ml-2 flex cursor-pointer rounded-base border-2 border-black bg-main px-4 py-2 text-sm font-base shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none`}
            onClick={() => updatePath(popPath(path))}
          >
            Back
          </button>
          <div className="flex items-center justify-between">
            {/* <button
              className="text-align-center w-18 mr-3 flex cursor-pointer rounded-base border-2 border-black bg-main px-4 py-2 text-sm font-base shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
              onClick={() => setCurrentTheme(currentTheme == 'dark' ? 'light' : 'dark')}
            >
              <img src={isDark ? SunIcon.src : MoonIcon.src}></img>
            </button> */}
            <button
              className="text-align-center w-18 mr-3 flex cursor-pointer rounded-base border-2 border-black bg-main px-4 py-2 text-sm font-base shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
              onClick={() => props.submitLogout()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div
        className={`h-full w-full overflow-scroll bg-bg ${dragging ? 'bg-white' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex h-min w-full flex-row flex-wrap items-center justify-items-center gap-4 px-4 py-4">
          {folderContents.map((item, index) => {
            return (
              <LazyLoadWrapper key={index} childClassName={'w-40 h-36'}>
                {item.is_file ? (
                  <File file={item} path={path} />
                ) : (
                  <Folder file={item} path={path} setPath={updatePath} />
                )}
              </LazyLoadWrapper>
            );
          })}
        </div>
      </div>

      <FileUploadForm path={path} setFolderContents={setFolderContents} />
    </div>
  );
}
