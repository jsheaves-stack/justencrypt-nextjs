'use client';

import { useEffect, useState } from 'react';
import { getFolderRequest, uploadFilesRequest } from '../requests/requests';
import { sanitizePath, popPath } from '../utils/util';

import File from './file';
import Folder from './folder';
import LazyLoadWrapper from './lazyLoadWrapper';
import CreateFolderModal from './createFolderModal';

import CreateFolder from '../assets/icons/folder-plus.svg';
import AddFile from '../assets/icons/plus-square.svg';
import Logout from '../assets/icons/log-out.svg';
import Back from '../assets/icons/arrow-left-circle.svg';
import SortUp from '../assets/icons/sort-up.svg';
import SortDown from '../assets/icons/sort-down.svg';
import Sort from '../assets/icons/sort.svg';

const sortTypes = {
  Alphabetical: 'Alphabetical',
  Type: 'Type',
};

const sortDirections = {
  Ascending: 'Ascending',
  Descending: 'Descending',
};

function getSortedFolderContents(folderContents, sortType, sortDirection) {
  const folders = folderContents.filter((item) => !item.is_file);
  const files = folderContents.filter((item) => item.is_file);

  const sortByFileNameAscending = (a, b) => a.file_name.localeCompare(b.file_name);
  const sortByFileExtensionAscending = (a, b) => a.file_extension.localeCompare(b.file_extension);

  const sortByFileNameDescending = (a, b) => b.file_name.localeCompare(a.file_name);
  const sortByFileExtensionDescending = (a, b) => b.file_extension.localeCompare(a.file_extension);

  switch (sortType) {
    case sortTypes.Type: {
      switch (sortDirection) {
        default:
        case sortDirections.Ascending: {
          return folders
            .sort((a, b) => sortByFileNameAscending(a, b))
            .concat(files.sort((a, b) => sortByFileExtensionAscending(a, b)));
        }
        case sortDirections.Descending: {
          return folders
            .sort((a, b) => sortByFileNameDescending(a, b))
            .concat(files.sort((a, b) => sortByFileExtensionDescending(a, b)));
        }
      }
    }
    default:
    case sortTypes.Alphabetical: {
      switch (sortDirection) {
        default:
        case sortDirections.Ascending: {
          return folders
            .sort((a, b) => sortByFileNameAscending(a, b))
            .concat(files.sort((a, b) => sortByFileNameAscending(a, b)));
        }
        case sortDirections.Descending: {
          return folders
            .sort((a, b) => sortByFileNameDescending(a, b))
            .concat(files.sort((a, b) => sortByFileNameDescending(a, b)));
        }
      }
    }
  }
}

export default function FileExplorer(props) {
  const [path, setPath] = useState('/');
  const [folderContents, setFolderContents] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState(null);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [sortType, setSortType] = useState(sortTypes.Alphabetical);
  const [sortDirection, setSortDirection] = useState(sortDirections.Ascending);

  const sortedFolderContents = getSortedFolderContents(folderContents, sortType, sortDirection);

  const getSortDirectionIcon = () => {
    switch (sortDirection) {
      default:
      case sortDirections.Ascending:
        return SortUp.src;
      case sortDirections.Descending:
        return SortDown.src;
    }
  };

  const updatePath = (newPath) => {
    if (newPath == path) return;

    setFolderContents([]);
    setPath(sanitizePath(newPath));
  };

  const updateSortType = () => {
    const sortTypeArray = Object.values(sortTypes);
    const sortIndex = sortTypeArray.indexOf(sortType);

    if (sortIndex == sortTypeArray.length - 1) {
      setSortType(sortTypeArray[0]);
    } else {
      setSortType(sortTypeArray[sortIndex + 1]);
    }
  };

  const updateSortDirection = () => {
    const sortDirectionArray = Object.values(sortDirections);
    const sortIndex = sortDirectionArray.indexOf(sortDirection);

    if (sortIndex == sortDirectionArray.length - 1) {
      setSortDirection(sortDirectionArray[0]);
    } else {
      setSortDirection(sortDirectionArray[sortIndex + 1]);
    }
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
            className="text-align-center align-center ml-4 flex grid h-10 cursor-pointer grid-cols-[1.5em,1fr] justify-center gap-1 rounded-base border-2 border-black bg-main px-4 py-2 text-sm font-base shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
            onClick={() => updatePath(popPath(path))}
          >
            <img src={Back.src}></img>
            <span className="hidden sm:block">Back</span>
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
              className="text-align-center align-center flex grid h-10 cursor-pointer grid-cols-[1.5em,1fr] justify-center gap-1 rounded-base border-2 border-black bg-main px-4 py-2 text-sm font-base shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
            >
              <img src={AddFile.src}></img>
              <span className="hidden sm:block">Add File</span>
            </label>
            <button
              className="text-align-center align-center flex grid h-10 cursor-pointer grid-cols-[1.5em,1fr] justify-center gap-1 rounded-base border-2 border-black bg-main px-4 py-2 text-sm font-base shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
              onClick={() => {
                setShowCreateFolderModal(true);
              }}
            >
              <img src={CreateFolder.src}></img>
              <span className="hidden sm:block">Create Folder</span>
            </button>
            <button
              className="text-align-center align-center flex grid h-10 cursor-pointer grid-cols-[1.5em,1fr] justify-center gap-1 rounded-base border-2 border-black bg-main px-4 py-2 text-sm font-base shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
              onClick={() => props.submitLogout()}
            >
              <img src={Logout.src}></img>
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`grid h-full w-full grid-rows-[min-content,1fr] gap-4 overflow-scroll bg-bg ${dragging ? 'bg-white' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="grid h-14 w-full justify-items-end">
          <div className="mr-4 grid h-full grid-cols-2 items-end gap-4">
            <button
              className="text-align-center align-center flex grid h-10 cursor-pointer grid-cols-[1.5em,1fr] justify-center gap-1 rounded-base border-2 border-black bg-main px-4 py-2 text-sm font-base shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none sm:w-40"
              onClick={() => updateSortType()}
            >
              <img src={Sort.src}></img>
              <span className="hidden sm:block">{sortTypes[sortType]}</span>
            </button>
            <button
              className="text-align-center align-center flex grid h-10 cursor-pointer grid-cols-[1.5em,1fr] justify-center gap-1 rounded-base border-2 border-black bg-main px-4 py-2 text-sm font-base shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none sm:w-40"
              onClick={() => updateSortDirection()}
            >
              <img src={getSortDirectionIcon()}></img>
              <span className="hidden sm:block">{sortDirections[sortDirection]}</span>
            </button>
          </div>
        </div>
        <div className="h-full w-full">
          <div className="flex h-min w-full flex-row flex-wrap items-center justify-items-center gap-2 px-2 pb-2 sm:gap-4 sm:px-4 sm:pb-4">
            {(sortedFolderContents ? sortedFolderContents : []).map((item, index) => {
              return (
                <LazyLoadWrapper key={index} childClassName={'w-40 h-36 sm:w-52 sm:h-40'}>
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
    </div>
  );
}
