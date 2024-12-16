'use client';

import { useState } from 'react';
import { sanitizePath } from '../../utils/util';
import { deleteFileRequest } from '../../requests/requests';

import Image from './files/image';
import Video from './files/video';
import Editable from './files/editable';

import 'react-medium-image-zoom/dist/styles.css';

import Delete from '../../assets/icons/trash.svg';

const supportedImages = ['APNG', 'AVIF', 'GIF', 'JPG', 'JPEG', 'PNG', 'SVG', 'WEBP'];
const supportedVideos = ['MP4', 'WEBM', 'OGG'];
const supportedEditableExtensions = [];

function getFileType(props, file_extension) {
  if (supportedImages.includes(file_extension)) return <Image file={props.file} path={props.path} />;
  else if (supportedVideos.includes(file_extension)) return <Video file={props.file} path={props.path} />;
  else if (supportedEditableExtensions.includes(file_extension))
    return <Editable file={props.file} path={props.path} />;
  else return <div className="grid h-full w-full items-center justify-items-center text-4xl">{file_extension}</div>;
}

export default function File(props) {
  const [hover, setHover] = useState(false);
  const api_url = process.env.NEXT_PUBLIC_JUSTENCRYPT_API_URL;
  const file_extension = props.file.file_extension.toUpperCase();
  const file_path = `${props.path}/${props.file.file_name}`;

  const deleteFile = () => {
    deleteFileRequest(props.file.file_name, props.path)
      .then((contents) => {
        props.setFolderContents(contents);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
      className="relative grid h-full w-full cursor-pointer grid-rows-1 overflow-hidden rounded-base border-2 border-black bg-main font-base shadow-base"
      onMouseEnter={() => {
        if (!hover) setHover(true);
      }}
      onMouseLeave={() => {
        if (hover) setHover(false);
      }}
    >
      {getFileType(props, file_extension)}

      {hover && (
        <div className="absolute right-2 top-2">
          <button
            className="text-align-center align-center flex grid h-8 cursor-pointer grid-cols-[1em,1fr] justify-center gap-1 rounded-base border-2 border-black bg-main px-2 py-2 pl-3 text-sm font-base shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
            onClick={() => deleteFile()}
          >
            <img className="absolute left-2 top-1 h-6 w-6" src={Delete.src} />
          </button>
        </div>
      )}

      <div className="h-10 w-full overflow-hidden truncate text-ellipsis text-wrap border-t-2 border-black bg-mainAccent p-2 text-sm">
        <a href={`${api_url}${sanitizePath(`file/${file_path}`)}`}>
          <span className="overflow-hidden truncate text-ellipsis text-wrap text-text">{props.file.file_name}</span>
        </a>
      </div>
    </div>
  );
}
