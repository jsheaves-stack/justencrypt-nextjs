'use client';

import { useState } from 'react';
import { sanitizePath } from '../utils/util';
import { Controlled as ControlledZoom } from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

function downloadFile(url, filename) {
  fetch(url, { credentials: 'include' })
    .then((response) => response.blob())
    .then((blob) => {
      const blobUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');

      anchor.href = blobUrl;
      anchor.download = filename;

      document.body.appendChild(anchor);

      anchor.click();

      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(blobUrl);
    })
    .catch((error) => console.error('Error downloading file:', error));
}

export default function File(props) {
  const api_url = process.env.NEXT_PUBLIC_JUSTENCRYPT_API_URL;
  const supported_images = ['APNG', 'AVIF', 'GIF', 'JPG', 'JPEG', 'PNG', 'SVG', 'WebP'];
  const file_extension = props.file.file_extension.toUpperCase();
  const image_is_supported = supported_images.includes(file_extension);
  const [image_zoomed, set_image_zoomed] = useState(false);

  const file_path = `${props.path}/${props.file.file_name}`;

  const image_url = `${api_url}${sanitizePath(`${'/file'}/${file_path}`)}`;
  const thumbnail_image_url = `${api_url}${sanitizePath(`${'/thumbnail'}/${file_path}`)}`;

  const handleDownload = (e) => {
    const fileUrl = `${api_url}${sanitizePath(`file/${file_path}`)}`;
    const filename = props.file.file_name;

    downloadFile(fileUrl, filename);
  };

  return (
    <div className="grid h-full w-full cursor-pointer grid-rows-1 overflow-hidden rounded-base border-2 border-black bg-main font-base shadow-light dark:shadow-dark">
      {image_is_supported ? (
        <ControlledZoom
          isZoomed={image_zoomed}
          onZoomChange={(zoomed) => set_image_zoomed(zoomed)}
          zoomImg={{ src: image_url }}
        >
          <img className="h-[6.25em] w-full border-none object-contain" src={thumbnail_image_url} alt="" />
        </ControlledZoom>
      ) : (
        <div className="grid h-full w-full items-center justify-items-center text-4xl">{file_extension}</div>
      )}

      <div
        className="h-10 w-full overflow-hidden truncate text-ellipsis text-wrap border-t-2 border-black bg-bg p-2 text-sm dark:bg-darkBg"
        onClick={handleDownload}
      >
        <span className="overflow-hidden truncate text-ellipsis text-wrap text-text dark:text-darkText">
          {props.file.file_name}
        </span>
      </div>
    </div>
  );
}
