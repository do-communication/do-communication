import { useContext } from "react";
import { AiFillAccountBook, AiFillFileAdd, AiFillHome } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { RiTeamFill, RiLogoutBoxFill } from "react-icons/ri";
import { MdGroupWork } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { SlEnvolopeLetter } from "react-icons/sl";
import { TbReportAnalytics } from "react-icons/tb";
import SideNav from "./SideNav";
import Link from "next/link";
import OpenSideBarContext from "./context/openSideBarContext";
import { useRouter } from "next/router";

const Sidebar = () => {
  const [openSideBar] = useContext(OpenSideBarContext);
  const router = useRouter();

  const navList = [
    {
      Icon: <AiFillHome size={20} />,
      url: "/user",
      name: "Home",
    },
    {
      Icon: <BsFillChatDotsFill size={20} />,
      name: "Chat",
      children: [
        {
          url: "/user/chats/groupChat",
          name: "Group Chat",
        },
        {
          url: "/user/chats/directChat",
          name: "Direct Chat",
        },
      ],
    },
    {
      Icon: <FaTasks size={20} />,
      url: "/user/tasks",
      name: "My Tasks", //unqiue
    },

    {
      Icon: <TbReportAnalytics size={20} />,
      url: "/user/reports/report",
      name: "Report",
    },
    {
      Icon: <SlEnvolopeLetter size={20} />,
      name: "Letters", //unqiue
      children: [
        {
          url: "/user/letters/create",
          name: "Create Letter",
        },
        {
          url: "/user/letters/manageLetters",
          name: "My Letters",
        },
      ],
    },
    {
      Icon: <AiFillFileAdd size={20} />,
      name: "Files", //unqiue
      children: [
        {
          url: "/user/files/create",
          name: "Add File",
        },
        {
          url: "/user/files/manageFiles",
          name: "My Files",
        },
      ],
    },
    {
      Icon: <MdGroupWork size={20} />,
      name: "Groups", //unqiue
      url: "/user/groups/manage",
    },
    {
      Icon: <RiLogoutBoxFill size={20} />,
      url: "/",
      name: "Sign out",
    },
  ];

  const checkIsNavActive = (nav) => {
    const currentRoute = router.pathname;

    if (!nav.url && nav.children) {
      for (const link of nav.children) {
        if (currentRoute === link.url) {
          return true;
        }
      }
    } else {
      return currentRoute === nav.url;
    }

    return false;
  };

  return (
    <div
      className={`${
        !openSideBar && "-translate-x-full"
      } fixed inset-y-0 left-0 top-0 z-50 h-screen max-h-screen w-64 transform bg-white text-blue-100 shadow-md shadow-black transition duration-200 ease-in-out md:sticky md:translate-x-0`}
    >
      <nav className="top-0 z-40 flex h-[64px] items-center justify-start bg-primary px-4 py-2 shadow-lg  md:sticky">
        <Link
          href="/admin"
          className="group flex items-center space-x-2 text-white hover:text-white"
        >
          <img src="/images/white_logo.png" alt="logo" width="80" />
        </Link>
      </nav>

      <nav className="scroller max-h-[calc(100vh-64px)] overflow-y-scroll px-4 pt-4">
        <ul className="flex flex-col space-y-2">
          {navList.map((nav, index) => {
            const isActive = checkIsNavActive(nav);
            return (
              <SideNav
                nav={nav}
                key={index}
                isActive={isActive}
                currentPath={router.pathname}
              />
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
