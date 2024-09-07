'use client';

import { useState } from 'react';
import { sanitizePath } from '../utils/util';
import { deleteFileRequest } from '../requests/requests';
import { Controlled as ControlledZoom } from 'react-medium-image-zoom';
import Loading from './loading';
import 'react-medium-image-zoom/dist/styles.css';

import Delete from '../assets/icons/trash.svg';

export default function File(props) {
  const api_url = process.env.NEXT_PUBLIC_JUSTENCRYPT_API_URL;
  const supportedImages = ['APNG', 'AVIF', 'GIF', 'JPG', 'JPEG', 'PNG', 'SVG', 'WebP'];
  const file_extension = props.file.file_extension.toUpperCase();
  const image_is_supported = supportedImages.includes(file_extension);
  const [hover, setHover] = useState(false);
  const [imageZoomed, setImageZoomed] = useState(false);
  const [imageLoading, setImageLoading] = useState(image_is_supported);

  const file_path = `${props.path}/${props.file.file_name}`;

  const image_url = `${api_url}${sanitizePath(`${'/file'}/${file_path}`)}`;
  const thumbnail_image_url = `${api_url}${sanitizePath(`${'/thumbnail'}/${file_path}`)}`;

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

      {image_is_supported ? (
        <ControlledZoom
          isZoomed={imageLoading ? false : imageZoomed}
          onZoomChange={(zoomed) => setImageZoomed(imageLoading ? false : zoomed)}
          zoomImg={{ src: image_url }}
        >
          <img
            className={`block h-[6.25rem] w-full border-none object-contain sm:h-[7.25em] ${imageLoading ? 'hidden' : ''}`}
            src={thumbnail_image_url}
            alt=""
            onLoad={() => {
              setImageLoading(false);
            }}
          />
          {imageLoading && (
            <div className="relative block h-[6.25] w-full content-center justify-center sm:h-[7.4rem]">
              <div className="relative h-16 w-full content-center justify-center">
                <Loading showText={false} />
              </div>
            </div>
          )}
        </ControlledZoom>
      ) : (
        <div className="grid h-full w-full items-center justify-items-center text-4xl">{file_extension}</div>
      )}
      <div className="h-10 w-full overflow-hidden truncate text-ellipsis text-wrap border-t-2 border-black bg-mainAccent p-2 text-sm">
        <a href={`${api_url}${sanitizePath(`file/${file_path}`)}`}>
          <span className="overflow-hidden truncate text-ellipsis text-wrap text-text">{props.file.file_name}</span>
        </a>
      </div>
    </div>
  );
}
