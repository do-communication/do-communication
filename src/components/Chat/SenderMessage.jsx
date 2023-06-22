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
      className="relative col-start-6 col-end-13 p-3 rounded-lg"
    >
      {msg.data.file ? (
        <div className="flex flex-row-reverse items-center justify-start">
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-primary">
            {msg.data.SenderName[0]}
          </div>
          <div
            className="relative px-4 py-2 mr-3 text-sm bg-indigo-100 shadow cursor-pointer rounded-xl"
            onClick={() => handleOpen(null, msg)}
          >
            <div>
              <Link href={msg.data.url} className="flex flex-col">
                <BiFileBlank className="w-12 h-auto text-secondary" />
                <p
                  className="w-10 text-xs font-semibold truncate"
                  title={msg.data.Content}
                >
                  {msg.data.Content}
                </p>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-row-reverse items-center justify-start">
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-primary">
            {msg.data.SenderName[0]}
          </div>
          <div
            className="relative px-4 py-2 mr-3 text-sm bg-indigo-100 shadow cursor-pointer rounded-xl"
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
        <div className="flex flex-col float-right w-24 bg-opacity-50 rounded-md bg-primary right-6 mr-14">
          {selectedFile === null ? (
            <button
              onClick={handleEdit}
              className="flex items-center w-full gap-2 px-3 py-1 rounded-t-md hover:bg-secondary"
            >
              <AiFillEdit /> Edit
            </button>
          ) : (
            <div></div>
          )}
          <button
            onClick={handleDelete}
            className="flex items-center w-full gap-2 px-3 py-1 rounded-b-md hover:bg-secondary"
          >
            <TbTrash /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default SenderMessage;
