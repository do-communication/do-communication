import { useState, useContext } from "react";
import { BiMenuAltLeft } from 'react-icons/bi'
import OpenSideBarContext from "./context/openSideBarContext";
const Header = () => {
  const [openSideBar, openSideBarDispatch] = useContext(OpenSideBarContext);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    if(openSideBar) {
      openSideBarDispatch({ type: 'close' })
    } else {
      openSideBarDispatch({ type: 'open' })
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full text-black shadow-xl bg-light">
        <div className="mx-auto ">
          <div className="flex items-stretch justify-between h-16">
            <div className="flex items-center md:hidden" />
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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
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

              {/* <!-- toggel sidebar --> */}
              <div
                className="hidden text-white cursor-pointer md:block"
                onClick={toggleSidebar}
              >
                <BiMenuAltLeft className="w-10 h-auto"/>
              </div>

              <div className="hidden lg:block">
                <form action="" className="app-search" method="GET">
                  <div className="relative group ">
                    <input
                      type="text"
                      className="form-input rounded-md bg-light_2 text-sm text-gray-700 pl-10 py-1.5 ml-5 border-transparent border-none outline-none focus:ring-0 focus:text-white transition-all duration-300 ease-in-out focus:w-60 w-48"
                      placeholder="Search..."
                      autocomplete="off"
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
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
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
                <div className="relative flex items-center justify-center mr-4">
                  <div className="block p-1 text-gray-700 bg-light_2 rounded-full hover:text-black">
                    <span className="sr-only">View notifications</span>
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </div>
                </div>

                {/* <!-- Profile dropdown --> */}
                <div className="relative px-4 text-sm text-gray-700 bg-light bright shadow-2xl cursor-pointer hover:text-white">
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
                        className="w-8 h-8 rounded-full"
                        src="https://assets.codepen.io/3321250/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1646800353&width=512"
                        alt=""
                      />
                    </div>

                    <div className="flex flex-col ml-4">
                      <span>Senait Gobezie</span>
                      <span>Admin</span>
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
            </div>

            <div className="flex -mr-2 md:hidden">
              {/* <!-- Mobile menu button --> */}
              <button
                type="button"
                onClick={() => setMobileMenu(!mobileMenu)}
                className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        {mobileMenu && (
          <div className="absolute w-full transition duration-100 ease-out bg-gray-800 md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium text-white bg-gray-900 rounded-md"
                aria-current="page"
              >
                Dashboard
              </a>

              <a
                href="#"
                className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
              >
                Team
              </a>
            </div>

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
                  <div className="text-base font-medium leading-none text-white">
                    Senait Gobezie
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    sen@example.com
                  </div>
                </div>
                <button
                  type="button"
                  className="flex-shrink-0 p-1 ml-auto text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
              </div>
              <div className="px-2 mt-3 space-y-1">
                <a
                  href="#"
                  className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700"
                >
                  Your Profile
                </a>

                <a
                  href="#"
                  className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:text-white hover:bg-gray-700"
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
