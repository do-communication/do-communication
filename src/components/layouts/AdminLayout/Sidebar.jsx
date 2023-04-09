import { useState } from "react";

const Sidebar = () => {
  const [openSideBar, setOpenSideBar] = useState(true);
  const [selected, setSelected] = useState("Tasks");
  return (
    <div
      className={`${
        openSideBar ? "md:translate-x-0 md:sticky " : "-translate-x-full"
      } sidebar max-h-screen top-0 h-screen bg-gray-800 text-blue-100 w-64 fixed inset-y-0 left-0 transform transition duration-200 ease-in-out z-50`}
    >
      <header className=" h-[64px] py-2 shadow-lg px-4 md:sticky top-0 bg-gray-800 z-40">
        <a
          href="#"
          className="text-white flex items-center space-x-2 group hover:text-white"
        >
          <div>
            <svg
              className="h-8 w-8 transition-transform duration-300 group-hover:-rotate-45 "
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
            <span className="text-2xl font-extrabold">FARNOUS</span>
            <span className="text-xs block">Project Management</span>
          </div>
        </a>
      </header>

      <nav className="px-4 pt-4 scroller overflow-y-scroll max-h-[calc(100vh-64px)]">
        <ul className="flex flex-col space-y-2">
          {/* <!-- Sidebar items --> */}
          <li className="text-sm text-gray-500 ">
            <a
              href="#"
              className="flex items-center w-full py-1 px-2 rounded relative hover:text-white hover:bg-gray-700 "
            >
              <div className="pr-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>Dashboard </div>
            </a>
          </li>

          {/* Section Devider */}
          <div className="section border-b pt-4 mb-4 text-xs text-gray-600 border-gray-700 pb-1 pl-3">
            Managment
          </div>

          <li className="text-sm text-gray-500 ">
            <a
              href="#"
              onClick={() => setSelected(selected === "Team" ? "" : "Team")}
              className="flex items-center w-full py-1 px-2 rounded relative hover:text-white hover:bg-gray-700"
            >
              <div className="pr-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div>Team</div>
              <div
                className={`absolute right-1.5 transition-transform duration-300 ${
                  selected === "Team" ? "rotate-180" : ""
                }`}
              >
                <svg
                  className=" h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </a>

            <div
              className={`pl-4 pr-2 overflow-hidden transition-all transform translate duration-300 ${
                selected === "Team" ? "" : "max-h-0"
              }`}
            >
              <ul className="flex flex-col mt-2 pl-2 text-gray-500 border-l border-gray-700 space-y-1 text-xs">
                <li className="text-sm text-gray-500 ">
                  <a
                    href="#"
                    className="flex items-center w-full py-1 px-2 rounded relative hover:text-white hover:bg-gray-700"
                  >
                    <div> Users List </div>
                  </a>
                </li>
                <li className="text-sm text-gray-500 ">
                  <a
                    href="#"
                    className="flex items-center w-full py-1 px-2 rounded relative hover:text-white hover:bg-gray-700"
                  >
                    <div> Create User </div>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
