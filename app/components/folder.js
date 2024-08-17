'use client'

export default function Folder(props) {

    return (
        <div className="w-56 h-60 overflow-hidden rounded-base border-2 border-black bg-main font-base shadow-base cursor-pointer" onClick={() => props.setPath(`${props.path}/${props.file.file_name}`)}>
            <img className="w-full h-44" alt="" />
            <div className="text-sm w-full border-t-2 border-black p-2 truncate text-wrap text-ellipsis overflow-hidden">
                {props.file.file_name}
            </div>
        </div>
    );
}
