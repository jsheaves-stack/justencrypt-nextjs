'use client';

export default function Folder(props) {
  return (
    <div
      className="grid h-36 w-40 cursor-pointer grid-rows-1 overflow-hidden rounded-base border-2 border-black bg-main font-base shadow-light dark:shadow-dark"
      onClick={() => props.setPath(`${props.path}/${props.file.file_name}`)}
    >
      <img className="h-full w-full" alt="" />
      <div className="w-full overflow-hidden truncate text-ellipsis text-wrap border-t-2 border-black bg-bg p-2 text-sm text-text dark:bg-darkBg dark:text-darkText">
        {props.file.file_name}
      </div>
    </div>
  );
}
