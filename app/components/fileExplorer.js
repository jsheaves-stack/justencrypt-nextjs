'use client';

import { useEffect, useState } from 'react';
import { getFolderRequest, uploadFilesRequest } from '../requests/requests';
import { sanitizePath, popPath } from '../utils/util';

import File from './file';
import Folder from './folder';
import LazyLoadWrapper from './lazyLoadWrapper';

import CreateFolder from '../assets/icons/folder-plus.svg';
import AddFile from '../assets/icons/plus-square-solid.svg';
import CreateFolderModal from './createFolderModal';

export default function FileExplorer(props) {
  const [path, setPath] = useState('/');
  const [folderContents, setFolderContents] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState(null);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);

  const updatePath = (newPath) => {
    if (newPath == path) return;

    setFolderContents([]);
    setPath(sanitizePath(newPath));
  };

  useEffect(() => {
    if (!files) return;

    uploadFilesRequest(files, path)
      .then((contents) => {
        setFolderContents(contents);
      })
      .catch((err) => console.error(err));
  }, [files]);

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
      {showCreateFolderModal && (
        <CreateFolderModal
          path={path}
          closeModal={() => setShowCreateFolderModal(false)}
          setFolderContents={(contents) => setFolderContents(contents)}
        />
      )}
      <div className="h-16 content-center border-b-4 border-black bg-bg">
        <div className="mx-auto flex w-full items-center justify-between">
          <button
            className="text-align-center w-18 ml-2 flex cursor-pointer rounded-base border-2 border-black bg-main px-4 py-2 text-sm font-base shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
            onClick={() => updatePath(popPath(path))}
          >
            Back
          </button>
          <div className="mr-4 flex items-center justify-between gap-4">
            <input
              id="file-upload"
              className="inset-0 hidden h-10 w-32 cursor-pointer opacity-0"
              type="file"
              multiple={true}
              onChange={(e) => setFiles(e.target.files)}
            />
            <label
              htmlFor="file-upload"
              className="text-align-center w-18 align-center flex grid h-10 cursor-pointer grid-cols-[1.5em,1fr] justify-center gap-1 rounded-base border-2 border-black bg-main px-4 py-2 text-sm font-base shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
            >
              <img src={AddFile.src}></img>
              <span>Add File</span>
            </label>
            <button
              className="text-align-center w-18 align-center flex grid h-10 cursor-pointer grid-cols-[1.5em,1fr] justify-center gap-1 rounded-base border-2 border-black bg-main px-4 py-2 text-sm font-base shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
              onClick={() => {
                setShowCreateFolderModal(true);
              }}
            >
              <img src={CreateFolder.src}></img>
              <span>Create Folder</span>
            </button>
            <button
              className="text-align-center w-18 flex h-10 cursor-pointer rounded-base border-2 border-black bg-main px-4 py-2 text-sm font-base shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
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
    </div>
  );
}
