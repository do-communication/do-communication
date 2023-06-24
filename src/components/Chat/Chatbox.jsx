import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BiChevronLeft, BiUser } from "react-icons/bi";
import { RiAttachment2 } from "react-icons/ri";
import { TbSend, TbEdit } from "react-icons/tb";
import ReceiverMessage from "./ReceiverMessage";
import SenderMessage from "./SenderMessage";
import useFetch from "../useFetch";

const Chatbox = ({
  messages,
  name,
  get,
  setPriorityChange,
  priorityChange,
  setUpdate,
  update,
  editMode,
  setEditMode,
  isgroup,
}) => {
  const [sendMessage, setSendMessage] = useState("");
  const [sendFile, setSendFile] = useState(null);
  const [selected, setSelected] = useState(null);
  const chatboxRef = useRef(null);
  const router = useRouter();
  let userId = router.query.userId;
  if (isgroup) {
    userId = router.query.groupId;
  }
  console.log(userId)

  const { user, send, sendGroup, editMessage, editGroupMessage } =
    useFetch("KalCompany");

  const sendData = (select) => {
    setEditMode(true);
    setSelected(select);
    document.getElementById("message_send").value = select.data.Content;
  };

  const editMess = async () => {
    if (isgroup) {
      await editGroupMessage(sendMessage, selected, setUpdate, update);
    } else {
      await editMessage(sendMessage, selected, setUpdate, update);
    }

    await get(userId);
    setSendMessage("");
    setSendFile(null);
    setEditMode(false);
    document.getElementById("message_send").value = "";
  };

  const sendMess = async () => {
    if (isgroup) {
      await sendGroup(
        sendMessage,
        sendFile,
        userId,
        setUpdate,
        update,
        setPriorityChange,
        priorityChange
      );
    } else {
      await send(
        sendMessage,
        sendFile,
        userId,
        setUpdate,
        update,
        setPriorityChange,
        priorityChange
      );
    }

    await get(userId);
    setSendMessage("");
    setSendFile(null);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (chatboxRef.current) {
        chatboxRef.current.scrollTo({
          top: chatboxRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 200);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="relative h-full flex-col rounded-2xl bg-white">
      <header className="absolute top-0 z-40 flex h-16 w-full flex-row items-center gap-4 rounded-t-2xl bg-primary px-4 text-2xl font-semibold text-white">
        <button
          onClick={() => {
            if (router.pathname === "/admin/chats/directChat/[userId]") {
              router.push("/admin/chats/directChat");
            } else if (router.pathname === "/admin/chats/groupChat/[groupId]") {
              router.push("/admin/chats/groupChat");
            } else if (router.pathname === "/user/chats/groupChat/[groupId]") {
              router.push("/user/chats/groupChat");
            } else if (router.pathname === "/user/chats/directChat/[userId]") {
              router.push("/user/chats/directChat");
            }
          }}
          className="block h-10 w-10 rounded-full hover:bg-secondary lg:hidden"
        >
          <BiChevronLeft className="h-auto w-10" />
        </button>
        <div className="flex items-center gap-4">
          {/* <BiUser className="w-10 h-10 text-4xl bg-gray-400 rounded-full" /> */}
          {name}
        </div>
      </header>
      {/* chatbox */}
      <div
        ref={chatboxRef}
        id="scroll"
        className="absolute grid h-full w-full grid-cols-12 gap-y-2 overflow-y-auto overflow-x-hidden py-16"
      >
        {messages.map((msg) => {
          return msg.data.SenderId === user.uid ? (
            <SenderMessage
              msg={msg}
              key={msg.id}
              setUpdate={setUpdate}
              update={update}
              sendData={sendData}
              setEditMode={setEditMode}
              isgroup={isgroup}
            />
          ) : (
            <ReceiverMessage msg={msg} key={msg.id} />
          );
        })}
      </div>
      {/* sender form */}
      <div className="absolute bottom-0 flex h-16 w-full flex-row items-center rounded-xl border-t bg-white px-4">
        <div>
          <label
            htmlFor="file_upload"
            className="flex items-center justify-center text-2xl text-gray-400 hover:text-gray-600"
          >
            <RiAttachment2 />
          </label>
          <input
            type="file"
            id="file_upload"
            name="file_upload"
            className="hidden"
            onChange={(e) => {
              if (e.target.files.length !== 0) {
                setSendFile(e.target.files[0]);
                document.getElementById("message_send").value =
                  e.target.files[0].name;
              }
            }}
          />
        </div>
        <div className="ml-4 flex-grow">
          <div className="relative w-full">
            <input
              type="text"
              id="message_send"
              className="flex h-10 w-full rounded-xl border pl-4 focus:border-indigo-300 focus:outline-none"
              onChange={(e) => {
                setSendMessage(e.target.value);
                document.getElementById("file_upload").value = "";
              }}
              onKeyUp={(e) => {
                if (e.key == "Enter") {
                  if (editMode) {
                    editMess();
                  } else {
                    sendMess();
                  }
                }
              }}
            />
          </div>
        </div>
        <div className="ml-4">
          {editMode ? (
            <button
              onClick={editMess}
              className="flex flex-shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-1 text-white hover:bg-Bold"
            >
              <span>Edit</span>
              <TbEdit />
            </button>
          ) : (
            <button
              onClick={sendMess}
              className="flex flex-shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-1 text-white hover:bg-Bold"
            >
              <span>Send</span>
              <TbSend />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
