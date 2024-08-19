'use client';

import FolderIcon from '../assets/icons/folder.svg';

export default function Folder(props) {
  return (
    <div
      className="grid h-36 w-40 cursor-pointer grid-rows-1 overflow-hidden rounded-base border-2 border-black bg-main font-base shadow-base"
      onClick={() => props.setPath(`${props.path}/${props.file.file_name}`)}
    >
      <div className="grid h-full w-full items-center">
        <img className="h-16 w-full" alt="" src={FolderIcon.src} />
      </div>
      <div className="w-full overflow-hidden truncate text-ellipsis text-wrap border-t-2 border-black bg-mainAccent p-2 text-sm text-text">
        {props.file.file_name}
      </div>
    </div>
  );
}
