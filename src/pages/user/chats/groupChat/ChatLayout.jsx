import { useEffect, useState, cloneElement } from "react";
import { TbMessageCircle } from "react-icons/tb";
// import { allGroups } from "@/mock/groups";
import useFetch from "@/components/useFetch";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import { RecentMessageItem } from "@/components/Chat/RecentMessageItem";
import UserLayout from "@/components/layouts/UserLayout/UserLayout";
import { auth } from "../../../../../config/firebase";

const ChatLayout = ({ children, group }) => {
  const [messageTab, setMessageTab] = useState("recent");
  const [groups, setGroups] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [recent, setRecent] = useState([]);
  const [search, setSearch] = useState("");
  const [priorityChange, setPriorityChange] = useState(false);
  const [selected, setSelected] = useState(group);
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
  const { getGroupsUser, getRecentGroupUser } = useFetch("KalCompany");

  useEffect(() => {
    getRecent();
  }, [priorityChange]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setSelected(group);
  }, [group]);

  const getRecent = async () => {
    await getRecentGroupUser(setRecent, auth.currentUser.uid);
  };

  const getData = async () => {
    await getGroupsUser(setGroups, setAllGroups, auth.currentUser.uid);
  };

  const handleSelect = (member) => {
    setSelected(member.data);
    setEditMode(false);
    const elem = document.getElementById("message_send");
    if (elem) {
      elem.value = "";
    }
  };

  // search for groups using group name
  useEffect(() => {
    if (search.trim() != "") {
      setMessageTab("group");
    }

    const filteredData = allGroups.filter(
      (item) =>
        item?.data.Name &&
        item?.data.Name.toLowerCase().includes(search.toLowerCase())
    );

    if (search) {
      setGroups(filteredData);
    } else {
      setGroups(allGroups);
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
            recent.map((group, index) => (
              <Link
                href={`/user/chats/groupChat/${group.id}`}
                key={index}
                className={`flex flex-row items-center rounded-xl p-2 ${
                  group.id === router.query.groupId
                    ? "bg-secondary text-white"
                    : "hover:bg-secondary hover:bg-opacity-25"
                }`}
                onClick={() => handleSelect(group)}
              >
                <RecentMessageItem
                  name={group.data.Name}
                  msg={group.data.Content}
                />
              </Link>
            ))}

          {recent.length === 0 && (
            <div className="flex flex-row items-center rounded-xl p-2 hover:bg-secondary hover:bg-opacity-25">
              <div className="ml-2 text-sm font-semibold">
                No Recent Message found
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderGroups = () => {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between text-sm">
          <div className="mr-4 flex w-full rounded-md border border-secondary bg-white pr-4 ">
            <input
              type="search groups"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-11/12 bg-transparent py-2 pl-4 outline-none"
              placeholder="Search"
            />
            <AiOutlineSearch className="h-auto w-6" />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {groups.length > 0 &&
            groups.map((group, index) => (
              <Link
                href={`/user/chats/groupChat/${group.id}`}
                key={index}
                className={`flex flex-row items-center rounded-xl  p-2 ${
                  group.id === router.query.groupId
                    ? "bg-secondary text-white"
                    : "hover:bg-secondary hover:bg-opacity-25"
                }`}
                onClick={() => handleSelect(group)}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-200">
                  {group.data.Name[0]}
                </div>
                <div className="ml-2 text-sm font-semibold">
                  {group.data.Name}
                </div>
              </Link>
            ))}

          {groups.length === 0 && (
            <div className="flex flex-row items-center rounded-xl p-2 hover:bg-secondary hover:bg-opacity-25">
              <div className="ml-2 text-sm font-semibold">No groups found</div>
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
            className={`col-span-full max-h-full rounded-2xl bg-white px-4 py-5 shadow-md lg:col-span-1 lg:block ${
              router.query.groupId ? "hidden" : ""
            }`}
          >
            {/* Chat Logo with create message*/}
            <div className="flex items-center justify-center gap-2 text-3xl">
              <TbMessageCircle className="text-4xl text-secondary" />
              <h3 className="font-semibold">Group Chat</h3>
            </div>
            {/* profile part start */}
            {selected ? (
              <div className="opacity-3 mr-6 mt-4 flex flex-col items-center justify-center rounded-lg border-gray-200 bg-light px-4 py-6">
                <div className="h-50 w-50 rounded-full">
                  <div className="h-16 w-16 items-center justify-center rounded-full bg-blue-200 md:flex lg:hidden xl:flex">
                    <div className="flex h-full w-full items-center justify-center">
                      {selected.Name[0]}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-sm font-semibold">
                  {selected.Name}
                </div>
                <div className="text-xs text-gray-500">{selected.Type}</div>
                <div className="mt-3 flex flex-row items-center"></div>
              </div>
            ) : (
              <div className="opacity-3 mr-6 mt-4 flex flex-col items-center justify-center rounded-lg border-gray-200 bg-light px-4 py-6">
                <div className="h-50 w-50 rounded-full">
                  <div className="h-16 w-16 items-center justify-center rounded-full bg-blue-200 md:flex lg:hidden xl:flex">
                    <div className="flex h-full w-full items-center justify-center">
                      <img
                        src="/images/pp.png"
                        alt="Avatar"
                        className="flex h-full w-full items-center justify-center rounded-full"
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
                className={`rounded-2xl py-2 ${
                  messageTab === "recent" ? "bg-primary" : ""
                }`}
                onClick={() => setMessageTab("recent")}
              >
                Recent
              </button>
              <button
                className={`rounded-2xl py-2 ${
                  messageTab === "group" ? "bg-primary" : ""
                }`}
                onClick={() => setMessageTab("group")}
              >
                Groups
              </button>
            </div>

            <div className="mt-4 max-h-[270px] w-full overflow-y-auto overflow-x-hidden">
              {messageTab === "recent" ? renderRecent() : renderGroups()}
            </div>
          </div>
          <div
            className={`col-span-full lg:col-span-3 lg:block ${
              router.query.groupId ? "" : "hidden"
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
