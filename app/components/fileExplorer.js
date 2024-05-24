'use client'

import { useEffect, useState } from "react";
import { getFolderRequest } from "../requests/requests";
import { sanitizePath, popPath } from "../utils/util";

import File from './file';
import Folder from './folder';
import FileUploadForm from "./fileUploadForm";

export default function FileExplorer(props) {
    const [path, setPath] = useState("/");
    const [folderContents, setFolderContents] = useState([]);

    const updatePath = (path) => setPath(sanitizePath(path));

    useEffect(() => {
        getFolderRequest(sanitizePath(path)).then((contents) => {
            setFolderContents(contents);
        }).catch((err) => {
            console.error(err);
        });
    }, [path]);

    return (
        <div className="w-full h-full">
            <div className="bg-mainAccent h-16 border-b-4 border-black content-center">
                <div className="w-full mx-auto flex justify-between items-center">
                    <button
                        className="flex ml-2 text-align-center cursor-pointer rounded-base border-2 border-black bg-main w-18 px-4 py-2 text-sm font-base shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
                        onClick={() => updatePath(popPath(path))}
                    >
                        Back
                    </button>
                    <button
                        className="flex mr-3 text-align-center cursor-pointer rounded-base border-2 border-black bg-main w-18 px-4 py-2 text-sm font-base shadow-base transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
                        onClick={() => props.submitLogout()}
                    >
                        Logout
                    </button>
                </div>
            </div>
            <div className="w-full px-4 py-4 gap-4 flex flex-row flex-wrap h-min items-center justify-items-center">
                {
                    folderContents.map((item, index) => {
                        return item.is_file ?
                            <File key={index} file={item} path={path} /> :
                            <Folder key={index} file={item} path={path} setPath={updatePath} />
                    })
                }
            </div>

            <FileUploadForm path={path} setFolderContents={setFolderContents} />
        </div>
    );
}
