import { useEffect, useState, cloneElement } from "react";
import { TbMessageCircle } from "react-icons/tb";
// import { allGroups } from "@/mock/groups";
import useFetch from "@/components/useFetch";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import { RecentMessageItem } from "@/components/Chat/RecentMessageItem";
import UserLayout from "@/components/layouts/UserLayout/UserLayout";

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
  const { getGroups, getRecentGroup } = useFetch("KalCompany")

  useEffect(() => {
    getRecent()
  }, [priorityChange]);

  useEffect(() => {
    getData()
  }, []);

  useEffect(() => {
    setSelected(group)
  }, [group])


  const getRecent = async () => {
    const recentChat = await getRecentGroup();
    setRecent(recentChat);
  }

  const getData = async () => {
    const data = await getGroups();
    setGroups(data);
    setAllGroups(data);
  }

  const handleSelect = (member) => {
    setSelected(member.data)
    setEditMode(false)
    const elem = document.getElementById('message_send');
    if (elem) {
      elem.value = "";
    }
  }


  // search for groups using group name
  useEffect(() => {
    if (search.trim() != "") {
      setMessageTab("group");
    }

    const filteredData = allGroups.filter(
      (item) =>
        item?.data.Name && item?.data.Name.toLowerCase().includes(search.toLowerCase())
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
            recent.map((group, index) => (
              <Link
                href={`/user/chats/groupChat/${group.id}`}
                key={index}
                className={`flex flex-row items-center p-2 rounded-xl ${group.id === router.query.groupId
                  ? "bg-secondary text-white"
                  : "hover:bg-opacity-25 hover:bg-secondary"
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
            <div className="flex flex-row items-center p-2 hover:bg-opacity-25 hover:bg-secondary rounded-xl">
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
          <div className="flex w-full pr-4 mr-4 bg-white border rounded-md border-secondary ">
            <input
              type="search groups"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-11/12 py-2 pl-4 bg-transparent outline-none"
              placeholder="Search"
            />
            <AiOutlineSearch className="w-6 h-auto" />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          {groups.length > 0 &&
            groups.map((group, index) => (
              <Link
                href={`/user/chats/groupChat/${group.id}`}
                key={index}
                className={`flex flex-row items-center p-2  rounded-xl ${group.id === router.query.groupId
                  ? "bg-secondary text-white"
                  : "hover:bg-opacity-25 hover:bg-secondary"
                  }`}
                onClick={() => handleSelect(group)}
              >
                <div className="flex items-center justify-center w-8 h-8 bg-blue-200 rounded-full">
                  {group.data.Name[0]}
                </div>
                <div className="ml-2 text-sm font-semibold">{group.data.Name}</div>
              </Link>
            ))}

          {groups.length === 0 && (
            <div className="flex flex-row items-center p-2 hover:bg-opacity-25 hover:bg-secondary rounded-xl">
              <div className="ml-2 text-sm font-semibold">No groups found</div>
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
            className={`max-h-full px-4 py-5 bg-white shadow-md lg:col-span-1 col-span-full lg:block rounded-2xl ${router.query.groupId ? "hidden" : ""
              }`}
          >
            {/* Chat Logo with create message*/}
            <div className="flex items-center justify-center gap-2 text-3xl">
              <TbMessageCircle className="text-4xl text-secondary" />
              <h3 className="font-semibold">Group Chat</h3>
            </div>
            {/* profile part start */}
            {selected ? <div className="flex flex-col justify-center items-center px-4 py-6 mt-4 mr-6 border-gray-200 rounded-lg bg-light opacity-3">
              <div className="rounded-full h-50 w-50">
                <div className="items-center justify-center w-16 h-16 bg-blue-200 rounded-full md:flex lg:hidden xl:flex">
                  <div className="flex items-center justify-center w-full h-full">
                    {selected.Name[0]}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-sm font-semibold">{selected.Name}</div>
              <div className="text-xs text-gray-500">{selected.Type}</div>
              <div className="flex flex-row items-center mt-3">
              </div>
            </div> : <div className="flex flex-col justify-center items-center px-4 py-6 mt-4 mr-6 border-gray-200 rounded-lg bg-light opacity-3">
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
              <div className="mt-2 text-sm font-semibold">Select to view profile</div>
              <div className="text-xs text-gray-500"></div>
              <div className="flex flex-row items-center mt-3">
              </div>
            </div>}
            {/* profile part end */}

            {/* tab */}
            <div className="grid grid-cols-2 mt-6 font-semibold bg-gray-200 rounded-2xl">
              <button
                className={`py-2 rounded-2xl ${messageTab === "recent" ? "bg-primary" : ""
                  }`}
                onClick={() => setMessageTab("recent")}
              >
                Recent
              </button>
              <button
                className={`py-2 rounded-2xl ${messageTab === "group" ? "bg-primary" : ""
                  }`}
                onClick={() => setMessageTab("group")}
              >
                Groups
              </button>
            </div>

            <div className="w-full max-h-[450px] overflow-x-hidden overflow-y-auto mt-4">
              {messageTab === "recent" ? renderRecent() : renderGroups()}
            </div>
          </div>
          <div
            className={`lg:col-span-3 col-span-full lg:block ${router.query.groupId ? "" : "hidden"
              }`}
          >
            {children && cloneElement(children, { setPriorityChange: setPriorityChange, priorityChange: priorityChange, editMode: editMode, setEditMode: setEditMode })}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ChatLayout;
