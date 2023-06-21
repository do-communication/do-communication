import React, { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";

const Notification = () => {
  const [openNotification, setOpenNotification] = useState(false);

  return (
    <div className="relative flex items-center justify-center mr-4">
      <button
        onClick={() => setOpenNotification(!openNotification)}
        className="block p-1 text-gray-700 rounded-full bg-light_2 hover:text-black"
      >
        <span className="sr-only">View notifications</span>
        <IoNotificationsOutline className="w-6 h-auto" />
      </button>
      {openNotification && (
        <div className="absolute flex flex-col h-16 min-w-0 break-words bg-white rounded shadow-lg w-72 -right-4 top-8 md:top-16 rounded-b-md">
          <div className="px-0 mb-0 border-0 rounded-t">
            <div className="flex flex-wrap items-center px-4 py-2">
              <div className="relative flex-1 flex-grow w-full max-w-full">
                <h3 className="text-base font-semibold text-gray-900 ">
                  Notifications
                </h3>
              </div>
            </div>
            <div className="block w-full">
              <div className="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase align-middle bg-gray-600 border border-l-0 border-r-0 border-gray-200 border-solid bg-gray-10 dark:text-gray-100 dark:border-gray-200 whitespace-nowrap">
                Today
              </div>
              <ul className="py-1 bg-white">
                <li className="flex px-4">
                  <div className="flex-shrink-0 my-2 mr-3 bg-green-300 rounded-full w-9 h-9">
                    <svg
                      className="fill-current w-9 h-9 text-red-50"
                      viewBox="0 0 36 36"
                    >
                      <path d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z"></path>
                    </svg>
                  </div>
                  <div className="flex items-center flex-grow py-2 text-sm text-gray-600 border-gray-100 dark:text-gray-500">
                    <div className="flex items-center justify-between flex-grow">
                      <div className="self-center">
                        Some@member added new report
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase align-middle bg-gray-600 border border-l-0 border-r-0 border-gray-200 border-solid bg-gray-10 dark:text-gray-100 dark:border-gray-200 whitespace-nowrap">
                Yesterday
              </div>
              <ul className="py-1 bg-white">
                <li className="flex px-4">
                  <div className="flex-shrink-0 my-2 mr-3 rounded-full w-9 h-9 bg-sky-300">
                    <svg
                      className="fill-current w-9 h-9 text-light-blue-50"
                      viewBox="0 0 36 36"
                    >
                      <path d="M23 11v2.085c-2.841.401-4.41 2.462-5.8 4.315-1.449 1.932-2.7 3.6-5.2 3.6h-1v2h1c3.5 0 5.253-2.338 6.8-4.4 1.449-1.932 2.7-3.6 5.2-3.6h3l-4-4zM15.406 16.455c.066-.087.125-.162.194-.254.314-.419.656-.872 1.033-1.33C15.475 13.802 14.038 13 12 13h-1v2h1c1.471 0 2.505.586 3.406 1.455zM24 21c-1.471 0-2.505-.586-3.406-1.455-.066.087-.125.162-.194.254-.316.422-.656.873-1.028 1.328.959.878 2.108 1.573 3.628 1.788V25l4-4h-3z"></path>
                    </svg>
                  </div>
                  <div className="flex items-center flex-grow py-2 text-sm text-gray-600 border-gray-100">
                    <div className="flex items-center justify-between flex-grow">
                      <div className="self-center">
                        <p>Lorem ipsum dolor consectetur adipisicing elit.</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
