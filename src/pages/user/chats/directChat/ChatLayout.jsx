import UserLayout from "@/components/layouts/UserLayout/UserLayout";
import { useEffect, useState, cloneElement } from "react";
import { TbMessageCircle } from "react-icons/tb";
// import { allMembers } from "@/mock/members";
import useFetch from "@/components/useFetch";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import { RecentMessageItem } from "@/components/Chat/RecentMessageItem";
import { auth } from "../../../../../config/firebase";
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
  const { getMembersDataUser, getRecentData } = useFetch("KalCompany");
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
    await getRecentData(setRecent);
  };

  const getData = async () => {
    await getMembersDataUser(setMembers, setallMembers);
  }

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
          <div className="mr-4 flex w-full rounded-md border border-secondary bg-white pr-4 ">
            <input
              type="Search messages"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-11/12 bg-transparent py-2 pl-4 outline-none"
              placeholder="Search"
            />
            <AiOutlineSearch className="h-auto w-6" />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {recent.length > 0 &&
            recent.map((member, index) => (
              <Link
                href={`/user/chats/directChat/${member.id}`}
                key={index}
                className={`flex flex-row items-center rounded-xl p-2  ${member.id === router.query.userId
                    ? "bg-secondary text-white"
                    : "hover:bg-secondary hover:bg-opacity-25"
                  }`}
                onClick={() => handleSelect(member)}
              >
                <RecentMessageItem
                  name={
                    member.data.RecieverId == auth.currentUser.uid
                      ? member.data.SenderName
                      : member.data.RecieverName
                  }
                  msg={member.data.Content}
                />
              </Link>
            ))}

          {recent.length === 0 && (
            <div className="flex flex-row items-center rounded-xl p-2 hover:bg-secondary hover:bg-opacity-25">
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
          <div className="mr-4 flex w-full rounded-md border border-secondary bg-white pr-4 ">
            <input
              type="search members"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-11/12 bg-transparent py-2 pl-4 outline-none"
              placeholder="Search"
            />
            <AiOutlineSearch className="h-auto w-6" />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {members.length > 0 &&
            members.map((member, index) => (
              <Link
                href={`/user/chats/directChat/${member.id}`}
                key={index}
                className={`flex flex-row items-center rounded-xl  p-2 ${member.id === router.query.userId
                    ? "bg-secondary text-white"
                    : "hover:bg-secondary hover:bg-opacity-25"
                  }`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-200">
                  {member.data.Name[0]}
                </div>
                <div className="ml-2 text-sm font-semibold">
                  {member.data.Name}
                </div>
              </Link>
            ))}

          {members.length === 0 && (
            <div className="flex flex-row items-center rounded-xl p-2 hover:bg-secondary hover:bg-opacity-25">
              <div className="ml-2 text-sm font-semibold">No members found</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <UserLayout noFooter={true}>
      <div className="relative h-[calc(100vh-130px)] w-full md:h-full">
        <div className="absolute grid h-full w-full grid-cols-4 gap-5">
          {/* Sidebar */}
          <div
            className={`col-span-full max-h-full rounded-2xl bg-white px-4 py-5 shadow-md lg:col-span-1 lg:block ${router.query.userId ? "hidden" : ""
              }`}
          >
            {/* Chat Logo with create message*/}
            <div className="flex items-center justify-center gap-2 text-3xl">
              <TbMessageCircle className="text-4xl text-secondary" />
              <h3 className="font-semibold">Direct Chat</h3>
            </div>
            {/* profile part start */}
            {selected ? (
              <div className="opacity-3 mr-6 mt-4 flex flex-col items-center justify-center rounded-lg border-gray-200 bg-light px-4 py-6">
                <div className="h-50 w-50 rounded-full">
                  <div className="h-16 w-16 items-center justify-center rounded-full bg-blue-200 md:flex lg:hidden xl:flex">
                    <div className="flex h-full w-full items-center justify-center rounded-full">
                      {selected.ProfilePic === "" ? (
                        selected.Name ? (
                          selected.Name[0]
                        ) : (
                          selected.RecieverName[0]
                        )
                      ) : (
                        <img
                          src={selected.ProfilePic}
                          alt="Avatar"
                          className="flex h-full w-full items-center justify-center rounded-full"
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
                <div className="mt-3 flex flex-row items-center"></div>
              </div>
            ) : (
              <div className="opacity-3 mr-6 mt-4 flex flex-col items-center justify-center rounded-lg border-gray-200 bg-light px-4 py-6">
                <div className="h-50 w-50 rounded-full">
                  <div className="h-16 w-16 items-center justify-center rounded-full bg-blue-200 md:flex lg:hidden xl:flex">
                    <div className="flex h-full w-full items-center justify-center rounded-full">
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
                <div className="mt-3 flex flex-row items-center"></div>
              </div>
            )}
            {/* profile part end */}

            {/* tab */}
            <div className="mt-6 grid grid-cols-2 rounded-2xl bg-gray-200 font-semibold">
              <button
                className={`rounded-2xl py-2 ${messageTab === "recent" ? "bg-primary" : ""
                  }`}
                onClick={() => setMessageTab("recent")}
              >
                Recent
              </button>
              <button
                className={`rounded-2xl py-2 ${messageTab === "member" ? "bg-primary" : ""
                  }`}
                onClick={() => setMessageTab("member")}
              >
                Members
              </button>
            </div>

            <div className="mt-4 max-h-[270px] w-full overflow-y-auto overflow-x-hidden">
              {messageTab === "recent" ? renderRecent() : renderMembers()}
            </div>
          </div>
          <div
            className={`col-span-full lg:col-span-3 lg:block ${router.query.userId ? "" : "hidden"
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
