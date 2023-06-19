import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BiChevronLeft, BiUser } from "react-icons/bi";
import { RiAttachment2 } from "react-icons/ri";
import { TbSend, TbEdit } from "react-icons/tb";
import ReceiverMessage from "./ReceiverMessage";
import SenderMessage from "./SenderMessage";
import useFetch from "../useFetch";

const Chatbox = ({ messages, name, get, setPriorityChange, priorityChange, setUpdate, update, editMode, setEditMode, isgroup }) => {
  const [sendMessage, setSendMessage] = useState("");
  const [sendFile, setSendFile] = useState(null);
  const [selected, setSelected] = useState(null);
  const chatboxRef = useRef(null);
  const router = useRouter();
  let userId = router.query.userId;
  if (isgroup) {
    userId = router.query.groupId;
  }

  const { user, send, sendGroup, editMessage, editGroupMessage } = useFetch("KalCompany");

  const sendData = (select) => {
    setEditMode(true);
    setSelected(select)
    document.getElementById('message_send').value = select.data.Content;
  }

  const editMess = async () => {
    if (isgroup) { await editGroupMessage(sendMessage, selected, setUpdate, update); }
    else { await editMessage(sendMessage, selected, setUpdate, update); }

    await get(userId);
    setSendMessage('');
    setSendFile(null);
    setEditMode(false);
    document.getElementById('message_send').value = "";
  }

  const sendMess = async () => {
    if (isgroup) { await sendGroup(sendMessage, sendFile, userId, setUpdate, update, setPriorityChange, priorityChange); }
    else { await send(sendMessage, sendFile, userId, setUpdate, update, setPriorityChange, priorityChange); }

    await get(userId);
    setSendMessage('');
    setSendFile(null);
    scrollToBottom();
  }

  const scrollToBottom = () => {

    setTimeout(() => {
      if (chatboxRef.current) {
        chatboxRef.current.scrollTo({
          top: chatboxRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 200);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  return (
    <div className="relative flex-col h-full bg-white rounded-2xl">
      <header className="absolute top-0 z-40 flex flex-row items-center w-full h-16 gap-4 px-4 text-2xl font-semibold text-white bg-primary rounded-t-2xl">
        <button
          onClick={() => {
            if (router.pathname === "/admin/chats/directChat/[userId]") {
              router.push("/admin/chats/directChat");
            } else {
              router.push("/admin/chats/groupChat");
            }
          }}
          className="block w-10 h-10 rounded-full hover:bg-secondary lg:hidden"
        >
          <BiChevronLeft className="w-10 h-auto" />
        </button>
        <div className="flex items-center gap-4">
          <BiUser className="w-10 h-10 text-4xl bg-gray-400 rounded-full" />
          {name}
        </div>
      </header>
      {/* chatbox */}
      <div
        ref={chatboxRef}
        id="scroll"
        className="absolute grid w-full h-full grid-cols-12 py-16 overflow-x-hidden overflow-y-auto gap-y-2"
      >
        {messages.map((msg) => {
          return msg.data.SenderId === user.uid ? (
            <SenderMessage msg={msg} key={msg.id} setUpdate={setUpdate} update={update} sendData={sendData} setEditMode={setEditMode} isgroup={isgroup} />
          ) : (
            <ReceiverMessage msg={msg} key={msg.id} />
          );
        })}
      </div>
      {/* sender form */}
      <div className="absolute bottom-0 flex flex-row items-center w-full h-16 px-4 bg-white border-t rounded-xl">
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
            onChange={(e) => { if (e.target.files.length !== 0) { setSendFile(e.target.files[0]); document.getElementById("message_send").value = e.target.files[0].name; } }}
          />
        </div>
        <div className="flex-grow ml-4">
          <div className="relative w-full">
            <input
              type="text"
              id="message_send"
              className="flex w-full h-10 pl-4 border rounded-xl focus:outline-none focus:border-indigo-300"
              onChange={(e) => { setSendMessage(e.target.value); document.getElementById("file_upload").value = "" }}
              onKeyUp={(e) => {
                if (e.key == "Enter") {
                  if (editMode) {
                    editMess();
                  }
                  else {
                    sendMess();
                  }
                }
              }}
            />
          </div>
        </div>
        <div className="ml-4">
          {editMode ?
            <button onClick={editMess} className="flex items-center justify-center flex-shrink-0 gap-2 px-4 py-1 text-white bg-primary hover:bg-Bold rounded-xl">
              <span>Edit</span>
              <TbEdit />
            </button>
            :
            <button onClick={sendMess} className="flex items-center justify-center flex-shrink-0 gap-2 px-4 py-1 text-white bg-primary hover:bg-Bold rounded-xl">
              <span>Send</span>
              <TbSend />
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
