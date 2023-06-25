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
  const { GetAdmin, GetCompanyName } = useFetch("KalCompany");

  const getinfo = async () => {
    console.log(auth.currentUser);
    setUsr(await GetAdmin(auth.currentUser.uid));
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
                    <span className="text-2xl font-extrabold">DO</span>
                    <span className="block text-xs">Communication</span>
                  </div>
                </a>
              </div>

              <div className="hidden lg:block">
                <div>
                  <p className="font-sans text-2xl ">
                    <i>
                      <b>{company && company.companyName}</b>
                    </i>
                  </p>
                </div>
              </div>
            </div>
            <div className="items-stretch hidden md:flex">
              <div className="flex ml-4 md:ml-6 ">
                <Notification />

                {/* <!-- Profile dropdown --> */}
                <div className="relative px-4 text-sm text-gray-700 shadow-2xl cursor-pointer bright bg-light hover:text-white">
                  <div
                    className="flex items-center min-h-full"
                    onClick={() => setOpen(!open)}
                  >
                    <div
                      className="flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="w-8 h-8 rounded-full"
                        src={
                          usr
                            ? usr.ProfilePic
                              ? usr.ProfilePic
                              : "/images/admin.png"
                            : "/images/admin.png"
                        }
                        alt=""
                      />
                    </div>

                    <div className="flex flex-col ml-4">
                      <span>{usr && usr.Name}</span>
                      <span>Admin</span>
                    </div>
                  </div>
                  {open && (
                    <div
                      className="absolute right-0 min-w-full py-1 mt-0 transition duration-100 ease-out origin-top-right bg-white shadow rounded-b-md ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex="-1"
                    >
                      <Link
                        href="/admin/profile/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-0"
                      >
                        My Profile
                      </Link>

                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-1"
                        onClick={handleSingout}
                      >
                        Sign out
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex px-2 md:hidden">
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
                <button type="button">
                  <span className="sr-only">View notifications</span>
                  <AiOutlineBell className="w-6 h-6" />
                </button>
                <div className="flex-shrink-0 p-1 ml-auto">
                  <Notification />
                </div>
              </div>
              <div className="px-2 mt-3 space-y-1 border-t border-t-gray-700">
                <Link
                  href="/admin/profile/profile"
                  className="flex items-center gap-2 px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-primary hover:text-white"
                >
                  <AiOutlineUser className="w-5 h-auto" /> My Profile
                </Link>

                <Link
                  href="#"
                  onClick={handleSingout}
                  className="flex items-center gap-2 px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-primary hover:text-white"
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
