import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import { allMembers } from "@/mock/members";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const DirectChat = () => {
  const [members, setMembers] = useState(allMembers);
  const [search, setSearch] = useState("");
  // search for groups using group name
  useEffect(() => {
    const filteredData = allMembers.filter(
      (item) =>
        item.name && item.name.toLowerCase().includes(search.toLowerCase())
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
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full pb-0 overflow-x-hidden">
          <div className="flex flex-col py-5 pl-6 pr-2   w-64 bg-white   rounded-2xl flex-shrink-0">
            <div className="flex flex-row items-center justify-center h-12 w-full">
              <div className="flex items-center justify-center rounded-xl text-primary  h-10 w-10">
                <img
                  src="/images/chat.png"
                  className="w-8 h-8 bg-transparent rounded-2xl"
                />
              </div>
              <div className="ml-2 font-bold text-2xl">Direct Chat</div>
            </div>
            {/* profile part start */}
            <div className="flex flex-col items-center bg-light opacity-3 border-gray-200 mt-4 mr-6 py-6 px-4 rounded-lg">
              <div className="h-50 w-50 rounded-full">
                <img
                  src="/images/pp.png"
                  alt="Avatar"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
              <div className="text-sm font-semibold mt-2">Lidiya Solomon</div>
              <div className="text-xs text-gray-500">Banner Designer</div>
              <div className="flex flex-row items-center mt-3">
                <div className="flex flex-col justify-center h-4 w-8 bg-green-700 rounded-full">
                  <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
                </div>
                <div className="leading-none ml-1 text-xs">Active</div>
              </div>
            </div>
            {/* profile part end */}
            {/* chat list */}
            <div className="flex flex-col mt-8">
              <div className="flex flex-row items-center justify-between text-xs">
                <div className="flex pr-4 bg-white border-gray-700 rounded-md ">
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="py-2 pl-4  w-48 border-gray-200 shadow-md outline-none"
                    placeholder="Search"
                  />
                  <AiOutlineSearch className="w-6 h-auto" />
                </div>
              </div>
              <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                <button className="flex flex-row items-center hover:bg-opacity-25  hover:bg-secondary rounded-xl p-2">
                  <div className="flex items-center justify-center h-8 w-8 bg-blue-200 rounded-full">
                    M
                  </div>
                  <div className="ml-2 text-sm font-semibold">
                    {members[0].name}
                  </div>
                </button>
                <button className="flex flex-row items-center hover:bg-opacity-25 hover:bg-secondary rounded-xl p-2">
                  <div className="flex items-center justify-center h-8 w-8 bg-primary rounded-full">
                    M
                  </div>
                  <div className="ml-2 text-sm font-semibold">
                    {members[1].name}
                  </div>
                  <div className="flex items-center justify-center ml-auto text-xs text-white bg-green-500 h-4 w-4 rounded leading-none">
                    2
                  </div>
                </button>
                <button className="flex flex-row items-center hover:bg-opacity-25 hover:bg-secondary rounded-xl p-2">
                  <div className="flex items-center justify-center h-8 w-8 bg-blue-200 rounded-full">
                    M
                  </div>
                  <div className="ml-2 text-sm font-semibold">
                    {members[2].name}
                  </div>
                </button>
                <button className="flex flex-row items-center hover:bg-opacity-25 hover:bg-secondary rounded-xl p-2">
                  <div className="flex items-center justify-center h-8 w-8  bg-primary rounded-full">
                    M
                  </div>
                  <div className="ml-2 text-sm font-semibold">
                    {members[3].name}
                  </div>
                </button>
                <button className="flex flex-row items-center hover:bg-opacity-25 hover:bg-secondary rounded-xl p-2">
                  <div className="flex items-center justify-center h-8 w-8 bg-primary rounded-full">
                    M
                  </div>
                  <div className="ml-2 text-sm font-semibold">
                    {members[4].name}
                  </div>
                </button>
              </div>
              <div className="flex flex-row items-center justify-between text-xs mt-6">
                <button className=" flex items-center justify-center h-10 w-40 bg-primary hover:bg-bold text-white font-bold py-2 px-4 rounded">
                  Load More
                </button>
              </div>
            </div>
            {/* chat list end */}
          </div>
          <div className="flex flex-col flex-auto h-full  ml-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-white h-full p-4">
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-12 gap-y-2">
                    <div className="col-start-1 col-end-8 p-3 rounded-lg">
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary flex-shrink-0">
                          L
                        </div>
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                          <div>Hey How are you today?</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-1 col-end-8 p-3 rounded-lg">
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary flex-shrink-0">
                          L
                        </div>
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                          <div>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Vel ipsa commodi illum saepe numquam maxime
                            asperiores voluptate sit, minima perspiciatis.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-6 col-end-13 p-3 rounded-lg">
                      <div className="flex items-center justify-start flex-row-reverse">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary flex-shrink-0">
                          A
                        </div>
                        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                          <div>I'm ok what about you?</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-6 col-end-13 p-3 rounded-lg">
                      <div className="flex items-center justify-start flex-row-reverse">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary flex-shrink-0">
                          A
                        </div>
                        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                          <div>
                            Lorem ipsum dolor sit, amet consectetur adipisicing.
                            ?
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-1 col-end-8 p-3 rounded-lg">
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary flex-shrink-0">
                          L
                        </div>
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                          <div>Lorem ipsum dolor sit amet !</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-6 col-end-13 p-3 rounded-lg">
                      <div className="flex items-center justify-start flex-row-reverse">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary flex-shrink-0">
                          A
                        </div>
                        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                          <div>
                            Lorem ipsum dolor sit, amet consectetur adipisicing.
                            ?
                          </div>
                          <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                            Seen
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-1 col-end-8 p-3 rounded-lg">
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary flex-shrink-0">
                          L
                        </div>
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                          <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Perspiciatis, in.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-1 col-end-8 p-3 rounded-lg">
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary flex-shrink-0">
                          L
                        </div>
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                          <div className="flex flex-row items-center">
                            <button className="flex items-center justify-center bg-bold hover:primary rounded-full h-8 w-10">
                              <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="1.5"
                                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                ></path>
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="1.5"
                                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                              </svg>
                            </button>
                            <div className="flex flex-row items-center space-x-px ml-4">
                              <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-4 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-12 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-6 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-5 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-4 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-3 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-1 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-1 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                              <div className="h-4 w-1 bg-gray-500 rounded-lg"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div>
                  <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="flex-grow ml-4">
                  <div className="relative w-full">
                    <input
                      type="text"
                      className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    />
                    <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
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
                  <button className="flex items-center justify-center bg-primary hover:bg-Bold rounded-xl text-white px-4 py-1 flex-shrink-0">
                    <span>Send</span>
                    <span className="ml-2">
                      <svg
                        className="w-4 h-4 transform rotate-45 -mt-px"
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
    </AdminLayout>
  );
};

export default DirectChat;
