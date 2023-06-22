import UserLayout from "@/components/layouts/UserLayout/UserLayout";
import { useEffect, useState, cloneElement } from "react";
import { TbMessageCircle } from "react-icons/tb";
// import { allMembers } from "@/mock/members";
import useFetch from "@/components/useFetch";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import { RecentMessageItem } from "@/components/Chat/RecentMessageItem";
// import { auth } from "../../../../../config/firebase";
// import { updateProfile } from "firebase/auth"

const ChatLayout = ({ children, user }) => {
  // console.log(auth.currentUser.displayName[auth.currentUser.displayName.length - 1])
  // updateProfile(auth.currentUser, { displayName: "Test user side" }).then(() => {
  //   console.log(auth.currentUser);
  // }).catch((err) => {
  //   console.log(err)
  // })
  const [messageTab, setMessageTab] = useState("recent");
  const [members, setMembers] = useState([]);
  const [allMembers, setallMembers] = useState([]);
  const [recent, setRecent] = useState([]);
  const [search, setSearch] = useState("");
  const [priorityChange, setPriorityChange] = useState(false);
  const [selected, setSelected] = useState(user);
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
  const { getMembersData, getRecentData } = useFetch("KalCompany");
  // search for groups using group name
  useEffect(() => {
    getRecent();
  }, [priorityChange]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setSelected(user);
  }, [user]);

  const getRecent = async () => {
    const recentChat = await getRecentData();
    setRecent(recentChat);
  };

  const getData = async () => {
    const data = await getMembersData();
    setMembers(data);
    setallMembers(data);
  };

  const handleSelect = (member) => {
    setSelected(member.data);
    setEditMode(false);
    const elem = document.getElementById("message_send");
    if (elem) {
      elem.value = "";
    }
  };

  useEffect(() => {
    if (search.trim() != "") {
      setMessageTab("member");
    }

    const filteredData = allMembers.filter(
      (item) =>
        item?.data.Name &&
        item?.data.Name.toLowerCase().includes(search.toLowerCase())
    );

    if (search) {
      setMembers(filteredData);
    } else {
      setMembers(allMembers);
    }
  }, [search]);

  const renderRecent = () => {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between text-sm">
          <div className="flex w-full pr-4 mr-4 bg-white border rounded-md border-secondary ">
            <input
              type="Search messages"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-11/12 py-2 pl-4 bg-transparent outline-none"
              placeholder="Search"
            />
            <AiOutlineSearch className="w-6 h-auto" />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          {recent.length > 0 &&
            recent.map((member, index) => (
              <Link
                href={`/user/chats/directChat/${member.id}`}
                key={index}
                className={`flex flex-row items-center p-2 rounded-xl  ${
                  member.id === router.query.userId
                    ? "bg-secondary text-white"
                    : "hover:bg-opacity-25 hover:bg-secondary"
                }`}
                onClick={() => handleSelect(member)}
              >
                <RecentMessageItem
                  name={member.data.Name}
                  msg={member.data.Content}
                />
              </Link>
            ))}

          {recent.length === 0 && (
            <div className="flex flex-row items-center p-2 hover:bg-opacity-25 hover:bg-secondary rounded-xl">
              <div className="ml-2 text-sm font-semibold">No members found</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderMembers = () => {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between text-sm">
          <div className="flex w-full pr-4 mr-4 bg-white border rounded-md border-secondary ">
            <input
              type="search members"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-11/12 py-2 pl-4 bg-transparent outline-none"
              placeholder="Search"
            />
            <AiOutlineSearch className="w-6 h-auto" />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          {members.length > 0 &&
            members.map((member, index) => (
              <Link
                href={`/user/chats/directChat/${member.id}`}
                key={index}
                className={`flex flex-row items-center p-2  rounded-xl ${
                  member.id === router.query.userId
                    ? "bg-secondary text-white"
                    : "hover:bg-opacity-25 hover:bg-secondary"
                }`}
              >
                <div className="flex items-center justify-center w-8 h-8 bg-blue-200 rounded-full">
                  {member.data.Name[0]}
                </div>
                <div className="ml-2 text-sm font-semibold">
                  {member.data.Name}
                </div>
              </Link>
            ))}

          {members.length === 0 && (
            <div className="flex flex-row items-center p-2 hover:bg-opacity-25 hover:bg-secondary rounded-xl">
              <div className="ml-2 text-sm font-semibold">No members found</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <UserLayout noFooter={true}>
      <div className="relative w-full md:h-full h-[calc(100vh-130px)]">
        <div className="absolute grid w-full h-full grid-cols-4 gap-5">
          {/* Sidebar */}
          <div
            className={`max-h-full px-4 py-5 bg-white shadow-md lg:col-span-1 col-span-full lg:block rounded-2xl ${
              router.query.userId ? "hidden" : ""
            }`}
          >
            {/* Chat Logo with create message*/}
            <div className="flex items-center justify-center gap-2 text-3xl">
              <TbMessageCircle className="text-4xl text-secondary" />
              <h3 className="font-semibold">Direct Chat</h3>
            </div>
            {/* profile part start */}
            {selected ? (
              <div className="flex flex-col items-center justify-center px-4 py-6 mt-4 mr-6 border-gray-200 rounded-lg bg-light opacity-3">
                <div className="rounded-full h-50 w-50">
                  <div className="items-center justify-center w-16 h-16 bg-blue-200 rounded-full md:flex lg:hidden xl:flex">
                    <div className="flex items-center justify-center w-full h-full">
                      {selected.ProfilePic === "" ? (
                        selected.Name[0]
                      ) : (
                        <img
                          src={selected.ProfilePic}
                          alt="Avatar"
                          className="rounded-full"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-sm font-semibold">
                  {selected.Name}
                </div>
                <div className="text-xs text-gray-500">
                  {selected.Department}
                </div>
                <div className="flex flex-row items-center mt-3"></div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center px-4 py-6 mt-4 mr-6 border-gray-200 rounded-lg bg-light opacity-3">
                <div className="rounded-full h-50 w-50">
                  <div className="items-center justify-center w-16 h-16 bg-blue-200 rounded-full md:flex lg:hidden xl:flex">
                    <div className="flex items-center justify-center w-full h-full">
                      <img
                        src="/images/pp.png"
                        alt="Avatar"
                        className="rounded-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-sm font-semibold">
                  Select to view profile
                </div>
                <div className="text-xs text-gray-500"></div>
                <div className="flex flex-row items-center mt-3"></div>
              </div>
            )}
            {/* profile part end */}

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

            <div className="w-full max-h-[270px] overflow-x-hidden overflow-y-auto mt-4">
              {messageTab === "recent" ? renderRecent() : renderMembers()}
            </div>
          </div>
          <div
            className={`lg:col-span-3 col-span-full lg:block ${
              router.query.userId ? "" : "hidden"
            }`}
          >
            {children &&
              cloneElement(children, {
                setPriorityChange: setPriorityChange,
                priorityChange: priorityChange,
                editMode: editMode,
                setEditMode: setEditMode,
              })}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ChatLayout;
