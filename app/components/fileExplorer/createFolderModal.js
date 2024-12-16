'use client';

import { useState } from 'react';
import { uploadFolderRequest } from '../../requests/requests';

export default function CreateFolderModal(props) {
  const [folderName, setFolderName] = useState('');

  const createFolder = () => {
    uploadFolderRequest(folderName, props.path)
      .then((contents) => {
        props.setFolderContents(contents);
        props.closeModal();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-overlay text-text">
      <div className="relative flex w-[300px] flex-col items-center justify-center rounded-base border-2 border-border bg-bg p-6 pt-12 font-base shadow-base">
        <button
          className="text-align-center w-18 absolute right-4 top-4 ml-2 flex cursor-pointer rounded-base border-2 border-black bg-main px-4 py-2 text-sm font-base shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
          onClick={props.closeModal}
        >
          X
        </button>
        <div className="grid grid-rows-[2em,1fr] gap-2">
          <label>Folder Name</label>
          <input
            type="text"
            className="h-12 w-full rounded-base border-2 border-black bg-bg p-[10px] font-base text-text outline-none ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
            onChange={(e) => {
              setFolderName(e.target.value);
            }}
            value={folderName}
          />
        </div>
        <button
          className="text-align-center w-18 ml-2 mt-4 flex cursor-pointer rounded-base border-2 border-black bg-main px-4 py-2 text-sm font-base shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
          onClick={() => createFolder()}
        >
          Ok
        </button>
      </div>
    </div>
  );
}
