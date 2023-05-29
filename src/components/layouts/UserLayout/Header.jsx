import { useState, useContext } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import {
  AiOutlineMenu,
  AiOutlineBell,
  AiOutlineUser,
  AiOutlineLogout,
} from "react-icons/ai";
import OpenSideBarContext from "./context/openSideBarContext";
import Link from "next/link";
import Notification from "./Notification";
const Header = () => {
  const [openSideBar, openSideBarDispatch] = useContext(OpenSideBarContext);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    if (openSideBar) {
      openSideBarDispatch({ type: "close" });
    } else {
      openSideBarDispatch({ type: "open" });
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full text-black shadow-xl bg-light">
        <div className="mx-auto ">
          <div className="flex items-stretch justify-between h-16">
            <div className="flex items-center md:hidden">
              <button
                type="button"
                onClick={toggleSidebar}
                className="inline-flex items-center justify-center p-2 text-white rounded-md hover:text-gray-700"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <BiMenuAltLeft className="w-10 h-auto" />
              </button>
            </div>
            <div className="flex items-center pl-6">
              <div className="flex-shrink-0 md:hidden">
                <a
                  href="#"
                  className="flex items-center space-x-2 text-white group"
                >
                  <div>
                    <svg
                      className="w-8 h-8 transition-transform duration-300 group-hover:-rotate-45 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  <div>
                    <span className="text-2xl font-extrabold">DO</span>
                    <span className="block text-xs">Communication</span>
                  </div>
                </a>
              </div>

              <div className="hidden lg:block">
                <form action="" className="app-search" method="GET">
                  <div className="relative group ">
                    <input
                      type="text"
                      className="form-input rounded-md bg-light_2 text-sm text-gray-700 pl-10 py-1.5 ml-5 border-transparent border-none outline-none focus:ring-0 focus:text-white transition-all duration-300 ease-in-out focus:w-60 w-48"
                      placeholder="Search..."
                      autoComplete="off"
                    />
                    <span className="absolute text-gray-400 transition-all duration-300 ease-in-out left-44 bottom-2 group-focus-within:left-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </span>
                  </div>
                </form>
              </div>
            </div>
            <div className="items-stretch hidden md:flex">
              <div className="flex ml-4 md:ml-6 ">
                {/* <!-- Profile dropdown --> */}
                <div className="relative px-4 text-sm text-gray-700 shadow-2xl cursor-pointer bg-light bright hover:text-white">
                  <div
                    className="flex items-center min-h-full"
                    onClick={() => setOpen(!open)}
                  >
                    <div
                      className="flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="w-10 h-10 rounded-full"
                        src="/images/pp.png"
                        alt=""
                      />
                    </div>

                    <div className="flex flex-col ml-4">
                      <span>Member1</span>
                      <span>Product Manager</span>
                    </div>
                  </div>
                  {open && (
                    <div
                      className="absolute right-0 min-w-full py-1 mt-0 transition duration-100 ease-out origin-top-right bg-white shadow rounded-b-md ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabindex="-1"
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        tabindex="-1"
                        id="user-menu-item-0"
                      >
                        My Profile
                      </a>

                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        tabindex="-1"
                        id="user-menu-item-1"
                      >
                        Projects
                      </a>

                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        tabindex="-1"
                        id="user-menu-item-1"
                      >
                        Sign out
                      </a>
                    </div>
                  )}
                </div>
              </div>
              {/* notification */}
              <Notification />
              {/* logout */}
              <div className="relative flex items-center justify-center mr-4">
                <div className="block p-1 text-gray-700 rounded-full bg-light_2 hover:text-black">
                  <span className="sr-only">View notifications</span>
                  <RiLogoutBoxRLine size={20} />
                </div>
              </div>
            </div>

            <div className="flex px-2 -mr-2 md:hidden">
              {/* <!-- Mobile menu button --> */}
              <button
                type="button"
                onClick={() => setMobileMenu(!mobileMenu)}
                className="inline-flex items-center justify-center p-2 text-white rounded-md hover:text-gray-700"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <AiOutlineMenu className="h-auto w-7" />
              </button>
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        {mobileMenu && (
          <div className="absolute w-full transition duration-100 ease-out bg-secondary md:hidden">
            <div className="pt-4 pb-3 border-t border-gray-700">
              {/* <!-- profile menue for mobile --> */}
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://assets.codepen.io/3321250/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1646800353&width=512"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-gray-800">
                    Senait Gobezie
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-600">
                    sen@example.com
                  </div>
                </div>
                <div className="flex-shrink-0 p-1 ml-auto">
                  <Notification />
                </div>
              </div>
              <div className="px-2 mt-3 space-y-1 border-t border-t-gray-700">
                <Link
                  href="/admin/profile"
                  className="flex items-center gap-2 px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-white hover:bg-primary"
                >
                  <AiOutlineUser className="w-5 h-auto" /> Your Profile
                </Link>

                <Link
                  href="/logout"
                  className="flex items-center gap-2 px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-white hover:bg-primary"
                >
                  <AiOutlineLogout className="w-5 h-auto" />
                  Sign out
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
