import { useState, useContext, useEffect } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import {
  AiOutlineMenu,
  AiOutlineBell,
  AiOutlineUser,
  AiOutlineLogout,
} from "react-icons/ai";
import OpenSideBarContext from "./context/openSideBarContext";
import Link from "next/link";
import { auth } from "../../../../config/firebase";
import { useAuth } from "../../../../context/AuthContext";
import Router from "next/router";
import Notification from "./Notification";
import useFetch from "@/components/useFetch";

const router = Router;

const Header = () => {
  const { user, logout } = useAuth();
  const [usr, setUsr] = useState(null);
  const [company, setCompany] = useState(null);
  const [openSideBar, openSideBarDispatch] = useContext(OpenSideBarContext);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const { GetCompanyName, GetUser } = useFetch("KalCompany");

  const getinfo = async () => {
    console.log(auth.currentUser.uid);
    setUsr(await GetUser(auth.currentUser.uid));
    setCompany(await GetCompanyName());
  };

  useEffect(() => {
    getinfo();
  }, [user]);

  const handleSingout = (e) => {
    e.preventDefault();
    try {
      logout().then(() => router.push("/"));
    } catch (err) {
      console.log(err);
    }
  };

  const toggleSidebar = () => {
    if (openSideBar) {
      openSideBarDispatch({ type: "close" });
    } else {
      openSideBarDispatch({ type: "open" });
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-light text-black shadow-xl">
        <div className="mx-auto ">
          <div className="flex h-16 items-stretch justify-between">
            <div className="flex items-center md:hidden">
              <button
                type="button"
                onClick={toggleSidebar}
                className="inline-flex items-center justify-center rounded-md p-2 text-white hover:text-gray-700"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <BiMenuAltLeft className="h-auto w-10" />
              </button>
            </div>
            <div className="flex items-center pl-6">
              <div className="flex-shrink-0 md:hidden">
                <a
                  href="#"
                  className="group flex items-center space-x-2 text-white"
                >
                  <div>
                    <svg
                      className="h-8 w-8 transition-transform duration-300 group-hover:-rotate-45 "
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
                <div>
                  <p className="font-sans text-2xl">
                    <i>
                      <b>{company && company.companyName}</b>
                    </i>
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden items-stretch md:flex">
              {/* notification */}
              <Notification />
              <div className="ml-4 flex md:ml-6 ">
                {/* <!-- Profile dropdown --> */}
                <div className="bright relative cursor-pointer bg-light px-4 text-sm text-gray-700 shadow-2xl hover:text-white">
                  <div
                    className="flex min-h-full items-center"
                    onClick={() => setOpen(!open)}
                  >
                    <div
                      className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-10 w-10 rounded-full"
                        src={
                          usr
                            ? usr.ProfilePic
                              ? usr.ProfilePic
                              : "/images/pp.png"
                            : "/images/pp.png"
                        }
                        alt=""
                      />
                    </div>

                    <div className="ml-4 flex flex-col">
                      <span>{usr && usr.Name}</span>
                      <span>{usr && usr.Department}</span>
                    </div>
                  </div>
                  {open && (
                    <div
                      className="absolute right-0 mt-0 min-w-full origin-top-right rounded-b-md bg-white py-1 shadow ring-1 ring-black ring-opacity-5 transition duration-100 ease-out focus:outline-none"
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
                        <Link href="/user/profile/profile">My Profile</Link>
                      </a>

                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        tabindex="-1"
                        id="user-menu-item-1"
                        onClick={handleSingout}
                      >
                        <Link href="#">Sign out</Link>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="-mr-2 flex px-2 md:hidden">
              {/* <!-- Mobile menu button --> */}
              <button
                type="button"
                onClick={() => setMobileMenu(!mobileMenu)}
                className="inline-flex items-center justify-center rounded-md p-2 text-white hover:text-gray-700"
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
          <div className="absolute w-full bg-secondary transition duration-100 ease-out md:hidden">
            <div className="border-t border-gray-700 pb-3 pt-4">
              {/* <!-- profile menue for mobile --> */}
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="/images/admin.png"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-gray-800">
                    {usr && usr.Name}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-600">
                    {usr && usr.Email}
                  </div>
                </div>
                <div className="ml-auto flex-shrink-0 p-1">
                  <Notification />
                </div>
              </div>
              <div className="mt-3 space-y-1 border-t border-t-gray-700 px-2">
                <Link
                  href="/user/profile/profile"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-primary hover:text-white"
                >
                  <AiOutlineUser className="h-auto w-5" /> My Profile
                </Link>

                <Link
                  href="/logout"
                  onClick={handleSingout}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-primary hover:text-white"
                >
                  <AiOutlineLogout className="h-auto w-5" />
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
