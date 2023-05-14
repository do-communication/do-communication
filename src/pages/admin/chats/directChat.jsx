import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import { allMembers } from "@/mock/members";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { RiAttachment2 } from "react-icons/ri";

const DirectChat = () => {
  const [members, setMembers] = useState(allMembers);
  const [search, setSearch] = useState("");
  // search for groups using group name
  useEffect(() => {
    const filteredData = allMembers.filter(
      (item) =>
        item?.name && item?.name.toLowerCase().includes(search.toLowerCase())
    );

    if (search) {
      setMembers(filteredData);
    } else {
      setMembers(allMembers);
    }
  }, [search]);
  return (
    <AdminLayout>
      {/* <!-- component --> */}
      <div className="absolute flex h-full pb-20 antialiased text-gray-800 top-10">
        <div className="flex flex-row w-full h-full overflow-x-hidden">
          <div className="flex flex-col flex-shrink-0 py-5 pl-6 pr-2 bg-white w-80 rounded-2xl">
            <div className="flex flex-row items-center justify-center w-full h-12">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl text-primary">
                <img
                  src="/images/chat.png"
                  className="w-8 h-8 bg-transparent rounded-2xl"
                />
              </div>
              <div className="ml-2 text-2xl font-bold">Direct Chat</div>
            </div>
            {/* profile part start */}
            {/* <div className="flex flex-col items-center px-4 py-6 mt-4 mr-6 border-gray-200 rounded-lg bg-light opacity-3">
              <div className="rounded-full h-50 w-50">
                <img
                  src="/images/pp.png"
                  alt="Avatar"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
              <div className="mt-2 text-sm font-semibold">Lidiya Solomon</div>
              <div className="text-xs text-gray-500">Banner Designer</div>
              <div className="flex flex-row items-center mt-3">
                <div className="flex flex-col justify-center w-8 h-4 bg-green-700 rounded-full">
                  <div className="self-end w-3 h-3 mr-1 bg-white rounded-full"></div>
                </div>
                <div className="ml-1 text-xs leading-none">Active</div>
              </div>
            </div> */}
            {/* profile part end */}
            {/* chat list */}
            <div className="flex flex-col mt-8">
              <div className="flex flex-row items-center justify-between text-xs">
                <div className="flex w-full pr-4 mr-4 bg-white border rounded-md border-secondary ">
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-11/12 py-2 pl-4 bg-transparent outline-none"
                    placeholder="Search"
                  />
                  <AiOutlineSearch className="w-6 h-auto" />
                </div>
              </div>
              <div className="flex flex-col pt-4 mt-2 space-y-1 overflow-y-auto h-80">
                {members.length > 0 &&
                  members.map((member, index) => (
                    <button
                      key={index}
                      className={`flex flex-row items-center p-2  rounded-xl ${
                        index === 1
                          ? "bg-secondary text-white"
                          : "hover:bg-opacity-25 hover:bg-secondary"
                      }`}
                    >
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-200 rounded-full">
                        {member.name[0]}
                      </div>
                      <div className="ml-2 text-sm font-semibold">
                        {member.name}
                      </div>
                    </button>
                  ))}

                {members.length === 0 && (
                  <div className="flex flex-row items-center p-2 hover:bg-opacity-25 hover:bg-secondary rounded-xl">
                    <div className="ml-2 text-sm font-semibold">
                      No members found
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center mt-6 text-xs">
                <button className="flex items-center justify-center w-40 h-10 px-4 py-2 font-bold text-white rounded bg-primary hover:bg-bold">
                  Load More
                </button>
              </div>
            </div>
            {/* chat list end */}
          </div>
          <div className="flex flex-col flex-auto h-full ml-6">
            {/* chatbox start here */}
            <div className="relative bg-white rounded-2xl">
              {/* header */}
              <div className="flex flex-col h-full mb-4 overflow-x-auto">
                <div className="absolute top-0 z-10 w-full h-14 rounded-t-2xl bg-primary">
                  header
                </div>
                {/* chatbox */}
                <div className="flex flex-col h-full p-4">
                  {/* chat container */}
                  <div className="grid grid-cols-12 gap-y-2">
                    <div className="col-start-1 col-end-8 p-3 rounded-lg">
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-primary">
                          L
                        </div>
                        <div className="relative px-4 py-2 ml-3 text-sm bg-white shadow rounded-xl">
                          <div>Hey How are you today?</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-1 col-end-8 p-3 rounded-lg">
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-primary">
                          L
                        </div>
                        <div className="relative px-4 py-2 ml-3 text-sm bg-white shadow rounded-xl">
                          <div>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Vel ipsa commodi illum saepe numquam maxime
                            asperiores voluptate sit, minima perspiciatis.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-6 col-end-13 p-3 rounded-lg">
                      <div className="flex flex-row-reverse items-center justify-start">
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-primary">
                          A
                        </div>
                        <div className="relative px-4 py-2 mr-3 text-sm bg-indigo-100 shadow rounded-xl">
                          <div>I'm ok what about you?</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-6 col-end-13 p-3 rounded-lg">
                      <div className="flex flex-row-reverse items-center justify-start">
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-primary">
                          A
                        </div>
                        <div className="relative px-4 py-2 mr-3 text-sm bg-indigo-100 shadow rounded-xl">
                          <div>
                            Lorem ipsum dolor sit, amet consectetur adipisicing.
                            ?
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-1 col-end-8 p-3 rounded-lg">
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-primary">
                          L
                        </div>
                        <div className="relative px-4 py-2 ml-3 text-sm bg-white shadow rounded-xl">
                          <div>Lorem ipsum dolor sit amet !</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-6 col-end-13 p-3 rounded-lg">
                      <div className="flex flex-row-reverse items-center justify-start">
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-primary">
                          A
                        </div>
                        <div className="relative px-4 py-2 mr-3 text-sm bg-indigo-100 shadow rounded-xl">
                          <div>
                            Lorem ipsum dolor sit, amet consectetur adipisicing.
                            ?
                          </div>
                          <div className="absolute bottom-0 right-0 mr-2 -mb-5 text-xs text-gray-500">
                            Seen
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-1 col-end-8 p-3 rounded-lg">
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-primary">
                          L
                        </div>
                        <div className="relative px-4 py-2 ml-3 text-sm bg-white shadow rounded-xl">
                          <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Perspiciatis, in.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* chat sender */}
                  <div className="fixed bottom-0 flex flex-row items-center w-full h-16 px-4 bg-white rounded-xl">
                    <div>
                      <button className="flex items-center justify-center text-2xl text-gray-400 hover:text-gray-600">
                        <RiAttachment2 />
                      </button>
                    </div>
                    <div className="flex-grow ml-4">
                      <div className="relative w-full">
                        <input
                          type="text"
                          className="flex w-full h-10 pl-4 border rounded-xl focus:outline-none focus:border-indigo-300"
                        />
                        <button className="absolute top-0 right-0 flex items-center justify-center w-12 h-full text-gray-400 hover:text-gray-600">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="ml-4">
                      <button className="flex items-center justify-center flex-shrink-0 px-4 py-1 text-white bg-primary hover:bg-Bold rounded-xl">
                        <span>Send</span>
                        <span className="ml-2">
                          <svg
                            className="w-4 h-4 -mt-px transform rotate-45"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            ></path>
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DirectChat;
