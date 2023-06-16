import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { TbTrash } from "react-icons/tb";
import Link from "next/link";
import { BiFileBlank } from "react-icons/bi";

const SenderMessage = ({ msg }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative col-start-6 col-end-13 p-3 rounded-lg">
      {msg.data.file ?
        <div className="flex flex-row-reverse items-center justify-start">
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-primary">
            {msg.data.SenderName[0]}
          </div>
          <div
            className="relative px-4 py-2 mr-3 text-sm bg-indigo-100 shadow cursor-pointer rounded-xl"
            onClick={() => setOpen(!open)}
          >
            <div><Link href={msg.data.url} className="flex flex-col">
              <BiFileBlank className="w-12 h-auto text-secondary" />
              <p
                className="w-10 text-xs font-semibold truncate"
                title={msg.data.Content}
              >
                {msg.data.Content}
              </p>
            </Link></div>
          </div>
        </div> : <div className="flex flex-row-reverse items-center justify-start">
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-primary">
            {msg.data.SenderName[0]}
          </div>
          <div
            className="relative px-4 py-2 mr-3 text-sm bg-indigo-100 shadow cursor-pointer rounded-xl"
            onClick={() => setOpen(!open)}
          >
            <div>{msg.data.Content}</div>
          </div>
        </div>
      }

      {open && (
        <div className=" float-right flex flex-col bg-opacity-50 rounded-md bg-primary right-6  w-24 mr-14">
          <button className="flex items-center w-full gap-2 px-3 py-1 rounded-t-md hover:bg-secondary">
            <AiFillEdit /> Edit
          </button>
          <button className="flex items-center w-full gap-2 px-3 py-1 rounded-b-md hover:bg-secondary">
            <TbTrash /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default SenderMessage;
