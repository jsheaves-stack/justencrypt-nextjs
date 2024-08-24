'use client';

import { useState } from 'react';
import { sanitizePath } from '../utils/util';
import { Controlled as ControlledZoom } from 'react-medium-image-zoom';
import Loading from './loading';
import 'react-medium-image-zoom/dist/styles.css';

export default function File(props) {
  const api_url = process.env.NEXT_PUBLIC_JUSTENCRYPT_API_URL;
  const supportedImages = ['APNG', 'AVIF', 'GIF', 'JPG', 'JPEG', 'PNG', 'SVG', 'WebP'];
  const file_extension = props.file.file_extension.toUpperCase();
  const image_is_supported = supportedImages.includes(file_extension);
  const [imageZoomed, setImageZoomed] = useState(false);
  const [imageLoading, setImageLoading] = useState(image_is_supported);

  const file_path = `${props.path}/${props.file.file_name}`;

  const image_url = `${api_url}${sanitizePath(`${'/file'}/${file_path}`)}`;
  const thumbnail_image_url = `${api_url}${sanitizePath(`${'/thumbnail'}/${file_path}`)}`;

  console.log('image zoomed: ', imageZoomed);

  return (
    <div className="relative grid h-full w-full cursor-pointer grid-rows-1 overflow-hidden rounded-base border-2 border-black bg-main font-base shadow-base">
      {image_is_supported ? (
        <ControlledZoom
          isZoomed={imageLoading ? false : imageZoomed}
          onZoomChange={(zoomed) => setImageZoomed(imageLoading ? false : zoomed)}
          zoomImg={{ src: image_url }}
        >
          <img
            className={`block h-[6.25em] w-full border-none object-contain ${imageLoading ? 'hidden' : ''}`}
            src={thumbnail_image_url}
            alt=""
            onLoad={() => {
              setImageLoading(false);
            }}
          />
          {imageLoading && (
            <div className="relative block h-[6.4rem] w-full content-center justify-center">
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
