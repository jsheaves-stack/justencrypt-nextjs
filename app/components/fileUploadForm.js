'use client'

import { useState } from "react";
import { uploadFilesRequest } from "../requests/requests";

export default function FileUploadForm(props) {
    const [showUploadFile, setShowUploadFile] = useState(false);
    const [files, setFiles] = useState(null);

    const uploadFiles = () => {
        uploadFilesRequest(files, props.path)
            .then((contents) => { props.setFolderContents(contents) })
            .catch((err) => console.error(err));
    };

    return (
        <div className="fixed bottom-2 right-1 font-bold py-2 px-4 rounded">
            {showUploadFile &&
                <div className="relative grid justify-items-center content-center h-40 p-2 w-min mb-3 rounded-base border-2 border-black shadow-base bg-mainAccent">
                    <div className="w-32 h-full">
                        <input
                            id="file-upload"
                            className="opacity-0 inset-0 w-32 h-10 cursor-pointer"
                            type="file"
                            multiple={true}
                            onChange={(e) => setFiles(e.target.files)}
                        />

                        <label htmlFor="file-upload" className="absolute top-3 left-3 w-30 cursor-pointer rounded-base border-2 border-black bg-main px-4 py-2 font-base shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none">
                            Choose File
                        </label>
                    </div>

                    <button
                        className="cursor-pointer mt-10 rounded-base border-2 border-black bg-main w-24 px-4 py-2 font-base shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
                        onClick={() => uploadFiles()}
                    >
                        Upload
                    </button>
                </div>
            }

            <button
                className="flex ml-auto text-lg text-align-center cursor-pointer rounded-base border-2 border-black bg-main w-18 px-4 py-2 font-base shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
                onClick={() => setShowUploadFile(!showUploadFile)}
            >
                +
            </button>
        </div>
    );
}
