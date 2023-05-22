import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { db } from "../../../../context/DbContext"
import { getDocs, collection, query, where, or, orderBy, and, addDoc } from "firebase/firestore";
import { auth } from "../../../../config/firebase";
import { serverTimestamp } from '@firebase/firestore'
import { Img } from 'react-image'


const DirectChat = () => {
  const [members, setMembers] = useState([]);
  const [allMembers, setallMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState([]);
  const [index, setIndex] = useState(-1);
  const [selected, setSelected] = useState("");
  const [sendMessage, setSendMessage] = useState("");
  // Get members in the system
  const getMembersData = async () => {
    let arr = []
    try {
      const all = collection(db, "KalCompany", "Users", "StaffMembers")
      const doc = await getDocs(all)
      doc.forEach(d => {
        arr.push({ id: d.id, data: d.data() })
      });

    } catch (err) {
      console.log(err)
      // setMembers([{ Name: "check your connection" }])
    }

    setMembers(arr)
    setallMembers(arr)
  }
  // get message between two members
  const getMessage = async () => {
    let arr = []
    const allMessages = collection(db, "KalCompany", "Messages", "Messages")

    const q = query(allMessages,
      or(and(where("SenderId", "==", auth.currentUser.uid), where("RecieverId", "==", selected)),
        and(where("SenderId", "==", selected), where("RecieverId", "==", auth.currentUser.uid))
      ), orderBy("CreatedAt")
    );

    const docs = await getDocs(q)

    docs.forEach(d => {
      arr.push({ id: d.id, data: d.data() })
    });

    setMessages(arr)
    setTimeout(() => {
      let objDiv = document.getElementById("scroll");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 100);
  }
  // send message
  const send = async () => {

    if (sendMessage.trim() !== "") {
      await addDoc(collection(db, "KalCompany", "Messages", "Messages"), {
        Content: sendMessage,
        CreatedAt: serverTimestamp(),
        RecieverId: selected,
        SenderId: auth.currentUser.uid,
        SenderName: auth.currentUser.displayName,
        seen: false
      });
    }
    document.getElementById('sendMessageId').value = ''
    await getMessage()
    setSendMessage('')
    setTimeout(() => {
      let objDiv = document.getElementById("scroll");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 100);

  }


  useEffect(() => {
    const filteredData = allMembers.filter(
      (item) =>
        item?.data.Name && item?.data.Name.toLowerCase().includes(search.toLowerCase())
    );

    if (search) {
      setMembers(filteredData);
    } else {
      setMembers(allMembers);
    }

  }, [search]);

  useEffect(() => {
    getMembersData();
  }, []);

  useEffect(() => {
    getMessage();
  }, [selected])



  return (
    <AdminLayout>
      {/* <!-- component --> */}
      <div className="flex h-[600px] antialiased text-gray-800">
        <div className="flex flex-row w-full h-full pb-0 overflow-x-hidden">
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
            <div className="flex flex-col items-center px-4 py-6 mt-4 mr-6 border-gray-200 rounded-lg bg-light opacity-3">
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
            </div>
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
              <div className="flex flex-col h-48 mt-4 -mx-2 space-y-1 overflow-y-auto">
                {members &&
                  members.map((member, i) => (
                    <button
                      key={i}
                      className={`flex flex-row items-center p-2  rounded-xl ${index === i
                        ? "bg-secondary text-white"
                        : "hover:bg-opacity-25 hover:bg-secondary"
                        }`}
                      onClick={() => { setIndex(i); setSelected(member.id); }}
                    >

                      <div className="flex items-center justify-center w-8 h-8 bg-blue-200 rounded-full">
                        {member.data.ProfilePic === "" ? member.data.Name[0] : <Img className="flex items-center justify-center w-9 h-9 rounded-full" src={member.data.ProfilePic} />}

                      </div>
                      <div className="ml-2 text-sm font-semibold">
                        {member.data.Name}
                      </div>
                    </button>
                  ))
                }

                {!members && (
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
            <div className="flex flex-col flex-auto flex-shrink-0 h-full p-4 bg-white rounded-2xl">
              <div id="scroll" scrollHeight className="flex flex-col h-full mb-4 overflow-x-auto">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-12 gap-y-2">

                    {messages.map(({ data: { Content, SenderId, SenderName, seen } }, i) => (
                      <div key={i} className={`${SenderId === auth.currentUser.uid ? 'col-start-6 col-end-13 p-3 rounded-lg' : 'col-start-1 col-end-8 p-3 rounded-lg'}`}>
                        <div key={i} className={`${SenderId === auth.currentUser.uid ? 'flex flex-row-reverse items-center justify-start' : 'flex flex-row items-center'}`}>
                          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-primary">
                            {SenderName[0]}
                          </div>
                          <div key={i} className={`${SenderId === auth.currentUser.uid ? 'relative px-4 py-2 mr-3 text-sm bg-indigo-100 shadow rounded-xl' : 'relative px-4 py-2 ml-3 text-sm bg-white shadow rounded-xl'}`}>
                            <div>{Content}</div>
                            <div key={i} className="absolute bottom-0 right-0 mr-2 -mb-5 text-xs text-gray-500">
                              {`${(messages.length === i + 1) && (SenderId === auth.currentUser.uid) ? `${seen ? "seen" : "delevered"}` : ''}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {(messages.length === 0 && index < 0) && (
                    <div className="flex flex-row items-center p-2 justify-center">
                      <div className="ml-2 text-lg font-semibold">
                        Select a member to start chatting
                      </div>
                    </div>
                  )}

                  {(messages.length === 0 && index > -1) && (
                    <div className="flex flex-row items-center p-2  justify-center">
                      <div className="ml-2 text-lg font-semibold">
                        Send the first message
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-row items-center w-full h-16 px-4 bg-white rounded-xl">
                <div>
                  <button onClick={() => document.getElementById("file").click()} className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                    <input id="file" className="hidden" type="file"></input>
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
                      className="flex w-full h-10 pl-4 border rounded-xl focus:outline-none focus:border-indigo-300"
                      id="sendMessageId"
                      onChange={(e) => setSendMessage(e.target.value)}
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
                  <button onClick={() => send()} className="flex items-center justify-center flex-shrink-0 px-4 py-1 text-white bg-primary hover:bg-Bold rounded-xl">
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
    </AdminLayout>
  );
};

export default DirectChat;
