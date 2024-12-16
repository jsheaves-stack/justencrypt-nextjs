'use client';

import { useState } from 'react';
import { sanitizePath } from '../../../utils/util';
import { Controlled as ControlledZoom } from 'react-medium-image-zoom';
import Loading from '../../loading';
import 'react-medium-image-zoom/dist/styles.css';

export default function Image(props) {
  const api_url = process.env.NEXT_PUBLIC_JUSTENCRYPT_API_URL;

  const [imageZoomed, setImageZoomed] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const file_path = `${props.path}/${props.file.file_name}`;
  const file_url = `${api_url}${sanitizePath(`${'/file'}/${file_path}`)}`;
  const thumbnail_url = `${api_url}${sanitizePath(`${'/thumbnail'}/${file_path}`)}`;

  return (
    <div className="relative grid h-full w-full cursor-pointer overflow-hidden">
      <ControlledZoom
        isZoomed={imageLoading ? false : imageZoomed}
        onZoomChange={(zoomed) => setImageZoomed(imageLoading ? false : zoomed)}
        zoomImg={{ src: file_url }}
      >
        <img
          className={`block h-[6.25rem] w-full border-none object-contain sm:h-[7.25em] ${imageLoading ? 'hidden' : ''}`}
          src={thumbnail_url}
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
    </div>
  );
}
