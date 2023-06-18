import { useContext } from "react";
import { AiFillAccountBook, AiFillFileAdd } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { RiTeamFill, RiLogoutBoxFill } from "react-icons/ri";
import { MdGroupWork } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import SideNav from "./SideNav";
import Link from "next/link";
import OpenSideBarContext from "./context/openSideBarContext";

const Sidebar = () => {
  const [openSideBar] = useContext(OpenSideBarContext);

  const navList = [
    {
      Icon: <AiFillAccountBook size={20} />,
      url: "/admin",
      name: "Dashboard",
    },
    {
      Icon: <BsFillChatDotsFill size={20} />,
      name: "Chat",
      children: [
        {
          url: "/admin/chats/groupChat",
          name: "Group Chat",
        },
        {
          url: "/admin/chats/directChat",
          name: "Direct Chat",
        },
      ],
    },
    {
      Icon: <RiTeamFill size={20}  />,
      name: "Members", //unqiue
      children: [
        {
          url: "/admin/members/create",
          name: "Add Member",
        },
        {
          url: "/admin/members/ManageMembers",
          name: "Manage Members",
        },
      ],
    },
    {
      Icon: <MdGroupWork  size={20} />,
      name: "Groups", //unqiue
      children: [
        {
          url: "/admin/groups/create",
          name: "Create Group",
        },
        {
          url: "/admin/groups/manage",
          name: "Manage Groups",
        },
      ],
    },

    {
      Icon: <FaTasks size={20}  />,
      name: "Tasks", //unqiue
      children: [
        {
          url: "/admin/task/create",
          name: "Create Task",
        },
        {
          url: "/admin/task/manage",
          name: "Manage Tasks",
        },
      ],
    },
    {
      Icon: <AiFillFileAdd size={20}  />,
      name: "Files", //unqiue
      children: [
        {
          url: "/admin/files/create",
          name: "Add File",
        },
        {
          url: "/admin/files/ManageFiles",
          name: "Manage files",
        },
      ],
    },
    {
      Icon: <TbReportAnalytics size={20}  />,
      url: "/admin/reports/reports",
      name: "Report",
    },
    {
      Icon: <RiLogoutBoxFill size={20} />,
      url: "/",
      name: "Sign Out",
    },
  ];

  return (
    <div
      className={`${!openSideBar && "-translate-x-full"
        } md:translate-x-0 md:sticky max-h-screen top-0 h-screen bg-white shadow-md shadow-black text-blue-100 w-64 fixed inset-y-0 left-0 transform transition duration-200 ease-in-out z-50`}
    >
      <nav className="h-[64px] py-2 shadow-lg px-4 md:sticky top-0 bg-primary flex items-center justify-start  z-40">
        <Link
          href="/admin"
          className="flex items-center space-x-2 text-white group hover:text-white"
        >
          <img src="/images/white_logo.png" alt="logo" width="80" />
        </Link>
      </nav>

      <nav className="px-4 pt-4 scroller overflow-y-scroll max-h-[calc(100vh-64px)]">
        <ul className="flex flex-col space-y-2">
          {navList.map((nav, index) => (
            <SideNav nav={nav} key={index} />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
