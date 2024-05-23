'use client'

import { sanitizePath } from "../utils/util";
import Image from "next/image";

function downloadFile(url, filename) {
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = filename;

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);
}

export default function File(props) {
    const api_url = process.env.NEXT_PUBLIC_JUSTENCRYPT_API_URL;

    const handleDownload = () => {
        const fileUrl = `${api_url}${sanitizePath(`file/${props.path}/${props.file.file_name}`)}`;
        const filename = props.file.file_name;

        downloadFile(fileUrl, filename);
    };

    return (
        <div className="w-40 h-40 cursor-pointer overflow-hidden rounded-base border-2 border-black bg-main font-base shadow-base" onClick={handleDownload}>
            <img className="w-full h-24 border-none" src={`${api_url}${sanitizePath(`file/${props.path}/${props.file.file_name}`)}`} alt="" />
            <div className="text-sm w-full border-t-2 border-black p-2 truncate text-wrap text-ellipsis overflow-hidden">
                {props.file.file_name}
            </div>
        </div>
    );
}
