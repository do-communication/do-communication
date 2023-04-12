import { useState, useContext } from "react";
import { AiFillAccountBook, AiFillAlert } from "react-icons/ai";
import SideNav from "./SideNav";
import Link from "next/link";
import OpenSideBarContext from "./context/openSideBarContext";

const Sidebar = () => {
  const [openSideBar] = useContext(OpenSideBarContext);

  const navList = [
    {
      Icon: <AiFillAccountBook />,
      url: "/admin",
      name: "Dashbaord",
    },
    {
      Icon: <AiFillAlert />,
      name: "Team", //unqiue
      children: [
        {
          url: "/admin/team/create",
          name: "Creat Team",
        },
        {
          url: "/admin/team/manage",
          name: "Manage Team",
        },
      ],
    },
  ];

  return (
    <div
      className={`${
        openSideBar ? "md:translate-x-0 md:sticky " : "-translate-x-full"
      } max-h-screen top-0 h-screen bg-white shadow-md shadow-black text-blue-100 w-64 fixed inset-y-0 left-0 transform transition duration-200 ease-in-out z-50`}
    >
      <header className=" h-[64px] py-2 shadow-lg px-4 md:sticky top-0 bg-bold flex items-center justify-start  z-40">
        <Link
          href="/admin"
          className="flex items-center space-x-2 text-white group hover:text-white"
        >
          <img src="/images/white_logo.png" alt="logo" width="80" />
        </Link>
      </header>

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
