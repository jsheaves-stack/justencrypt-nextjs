'use client';

import { sanitizePath } from '../../../utils/util';
import 'react-medium-image-zoom/dist/styles.css';

export default function Editable(props) {
  const api_url = process.env.NEXT_PUBLIC_JUSTENCRYPT_API_URL;

  const file_path = `${props.path}/${props.file.file_name}`;
  const file_url = `${api_url}${sanitizePath(`${'/file'}/${file_path}`)}`;

  return <div className="relative grid h-full w-full cursor-pointer overflow-hidden"></div>;
}
