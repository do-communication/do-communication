import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { BiChevronLeft, BiUser } from "react-icons/bi";
import { RiAttachment2 } from "react-icons/ri";
import { TbSend } from "react-icons/tb";
import ReceiverMessage from "./ReceiverMessage";
import SenderMessage from "./SenderMessage";

const Chatbox = ({ messages, name }) => {
  const chatboxRef = useRef(null);
  const router = useRouter();

  const scrollToBottom = () => {
    chatboxRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log("scroll");
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="relative flex-col h-full bg-white rounded-2xl">
      <header className="sticky top-0 flex flex-row items-center w-full h-16 gap-4 px-4 text-2xl font-semibold text-white bg-primary rounded-t-2xl">
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
        className="absolute w-full grid grid-cols-12 gap-y-2 h-[440px] bottom-16 overflow-x-hidden overflow-y-auto"
      >
        {messages.map((msg) => {
          return msg.from.id === 1 ? (
            <ReceiverMessage msg={msg} key={msg.id} />
          ) : (
            <SenderMessage msg={msg} key={msg.id} />
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
          />
        </div>
        <div className="flex-grow ml-4">
          <div className="relative w-full">
            <input
              type="text"
              className="flex w-full h-10 pl-4 border rounded-xl focus:outline-none focus:border-indigo-300"
            />
          </div>
        </div>
        <div className="ml-4">
          <button className="flex items-center justify-center flex-shrink-0 gap-2 px-4 py-1 text-white bg-primary hover:bg-Bold rounded-xl">
            <span>Send</span>
            <TbSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
