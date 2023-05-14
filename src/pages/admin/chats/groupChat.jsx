import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import { useState } from "react";
import { render } from "react-dom";
import { BiPlus } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";

const GroupChat = () => {
  const [messageTab, setMessageTab] = useState("recent");

  const renderRecent = () => {
    return <h1>Recent</h1>;
  };

  const renderMembers = () => {
    return <h1>Members</h1>;
  };

  return (
    <AdminLayout>
      <div class="relative w-full h-full">
        <div className="absolute grid w-full h-full grid-cols-4 gap-5 ">
          {/* Sidebar */}
          <div className="max-h-full col-span-1 px-4 py-5 bg-white shadow-md rounded-2xl">
            {/* Chat Logo with create message*/}
            <div className="flex items-center justify-between mx-auto">
              <div className="flex items-center gap-2 text-3xl">
                <TbMessageCircle className="text-4xl text-secondary" />
                <h3 className="font-semibold">Group Chat</h3>
              </div>
              <div>
                <button className="flex items-center justify-center gap-2 p-2 font-medium text-white rounded-full bg-primary">
                  <BiPlus className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* tab */}
            <div className="grid grid-cols-2 mt-6 font-semibold bg-gray-200 rounded-2xl">
              <button
                className={`py-2 rounded-2xl ${
                  messageTab === "recent" ? "bg-primary" : ""
                }`}
                onClick={() => setMessageTab("recent")}
              >
                Recent
              </button>
              <button
                className={`py-2 rounded-2xl ${
                  messageTab === "member" ? "bg-primary" : ""
                }`}
                onClick={() => setMessageTab("member")}
              >
                Members
              </button>
            </div>

            <div className="w-full bg-red-100 max-h-[450px] overflow-x-hidden overflow-y-auto mt-4">
              {messageTab === "recent" ? renderRecent() : renderMembers()}
            </div>
          </div>
          {/* chatbox */}
          <div className="col-span-3 bg-white"></div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default GroupChat;
