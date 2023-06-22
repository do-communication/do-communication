import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { TbTrash } from "react-icons/tb";
import Link from "next/link";
import { BiFileBlank } from "react-icons/bi";
import useFetch from "../useFetch";
import { formatTimeAgo } from "@/utils/formatTimeAgo";

const SenderMessage = ({
  msg,
  setUpdate,
  update,
  sendData,
  setEditMode,
  isgroup,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { deleteMessage, deleteGroupMessage } = useFetch("KalCompany");

  const handleDelete = async () => {
    if (isgroup) {
      await deleteGroupMessage(selected, selectedFile, setUpdate, update);
    } else {
      await deleteMessage(selected, selectedFile, setUpdate, update);
    }
  };

  const handleEdit = () => {
    sendData(selected);
  };

  const handleOpen = (message, file) => {
    setOpen(!open);
    setSelected(message);
    setSelectedFile(file);
    setEditMode(false);
    document.getElementById("message_send").value = "";
  };

  return (
    <div
      onMouseLeave={() => setOpen(false)}
      className="relative col-start-6 col-end-13 rounded-lg p-3"
    >
      {msg.data.file ? (
        <div className="flex flex-row-reverse items-center justify-start">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary">
            {msg.data.SenderName[0]}
          </div>
          <div
            className="relative mr-3 cursor-pointer rounded-xl bg-indigo-100 px-4 py-2 text-sm shadow"
            onClick={() => handleOpen(null, msg)}
          >
            <div>
              <Link href={msg.data.url} className="flex flex-col">
                <BiFileBlank className="h-auto w-12 text-secondary" />
                <p
                  className="w-10 truncate text-xs font-semibold"
                  title={msg.data.Content}
                >
                  {msg.data.Content}
                  <small className="text-[10px]">
                    {formatTimeAgo(
                      new Date(msg.data.CreatedAt?.seconds * 1000)
                    )}
                  </small>
                </p>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-row-reverse items-center justify-start">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary">
            {msg.data.SenderName[0]}
          </div>
          <div
            className="relative mr-3 cursor-pointer rounded-xl bg-indigo-100 px-4 py-2 text-sm shadow"
            onClick={() => handleOpen(msg, null)}
          >
            <div>{msg.data.Content}</div>
            <small className="text-[10px]">
              {formatTimeAgo(new Date(msg.data.CreatedAt?.seconds * 1000))}
            </small>
          </div>
        </div>
      )}

      {open && (
        <div className="right-6 float-right mr-14 flex w-24 flex-col rounded-md bg-primary bg-opacity-50">
          {selectedFile === null ? (
            <button
              onClick={handleEdit}
              className="flex w-full items-center gap-2 rounded-t-md px-3 py-1 hover:bg-secondary"
            >
              <AiFillEdit /> Edit
            </button>
          ) : (
            <div></div>
          )}
          <button
            onClick={handleDelete}
            className="flex w-full items-center gap-2 rounded-b-md px-3 py-1 hover:bg-secondary"
          >
            <TbTrash /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default SenderMessage;
