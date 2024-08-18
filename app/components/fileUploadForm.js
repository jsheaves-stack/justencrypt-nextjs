'use client';

import { useEffect, useState } from 'react';
import { uploadFilesRequest, uploadFolderRequest } from '../requests/requests';

export default function FileUploadForm(props) {
  const [showUploadFile, setShowUploadFile] = useState(false);
  const [files, setFiles] = useState(null);
  const [folderName, setFolderName] = useState('');

  useEffect(() => {
    if (!files) return;

    uploadFilesRequest(files, props.path)
      .then((contents) => {
        props.setFolderContents(contents);
      })
      .catch((err) => console.error(err));
  }, [files]);

  const createFolder = () => {
    uploadFolderRequest(folderName, props.path)
      .then((contents) => {
        props.setFolderContents(contents);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="fixed bottom-2 right-1 rounded px-4 py-2 font-bold">
      {showUploadFile && (
        <div className="relative mb-3 grid h-min w-min content-center justify-items-center gap-5 rounded-base border-2 border-black bg-mainAccent p-2 pb-6 shadow-light dark:shadow-dark">
          <div className="h-full w-40">
            <input
              id="file-upload"
              className="inset-0 h-10 w-32 cursor-pointer opacity-0"
              type="file"
              multiple={true}
              onChange={(e) => setFiles(e.target.files)}
            />

            <label
              htmlFor="file-upload"
              className="w-30 absolute left-3 top-3 cursor-pointer rounded-base border-2 border-black bg-main px-4 py-2 font-base shadow-light transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:shadow-dark"
            >
              Upload File
            </label>
          </div>
          <div className="h-full w-32">
            <input
              type="text"
              className="h-8 w-32"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />

            <button
              className="mt-2 cursor-pointer rounded-base border-2 border-black bg-main px-2 py-2 font-base shadow-light transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:shadow-dark"
              onClick={() => createFolder()}
            >
              Create Folder
            </button>
          </div>
        </div>
      )}

      <button
        className="text-align-center w-18 ml-auto flex cursor-pointer rounded-base border-2 border-black bg-main px-4 py-2 text-lg font-base shadow-light transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:shadow-dark"
        onClick={() => setShowUploadFile(!showUploadFile)}
      >
        +
      </button>
    </div>
  );
}
