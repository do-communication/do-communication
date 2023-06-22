import React, { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { useEffect } from "react";
import { firebaseCloudMessaging } from "./webpush";

const Notification = () => {
  const [openNotification, setOpenNotification] = useState(false);
  useEffect(() => {
    setToken();
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          getMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
    function getMessage() {
      const messaging = firebase.messaging();
      messaging.onMessage((message) => console.log("foreground ", message));
    }
  }, []);
  return (
    <div className="relative mr-4 flex items-center justify-center">
      <button
        onClick={() => setOpenNotification(!openNotification)}
        className="block rounded-full bg-light_2 p-1 text-gray-700 hover:text-black"
      >
        <span className="sr-only">View notifications</span>
        <IoNotificationsOutline className="h-auto w-6" />
      </button>
      {openNotification && (
        <div className="absolute -right-4 top-8 flex h-16 w-72 min-w-0 flex-col break-words rounded rounded-b-md bg-white shadow-lg md:top-16">
          <div className="mb-0 rounded-t border-0 px-0">
            <div className="flex flex-wrap items-center px-4 py-2">
              <div className="relative w-full max-w-full flex-1 flex-grow">
                <h3 className="text-base font-semibold text-gray-900 ">
                  Notifications
                </h3>
              </div>
            </div>
            <div className="block w-full">
              <div className="bg-gray-10 whitespace-nowrap border border-l-0 border-r-0 border-solid border-gray-200 bg-gray-600 px-4 py-3 text-left align-middle text-xs font-semibold uppercase text-gray-500 dark:border-gray-200 dark:text-gray-100">
                Today
              </div>
              <ul className="bg-white py-1">
                <li className="flex px-4">
                  <div className="my-2 mr-3 h-9 w-9 flex-shrink-0 rounded-full bg-green-300">
                    <svg
                      className="h-9 w-9 fill-current text-red-50"
                      viewBox="0 0 36 36"
                    >
                      <path d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-grow items-center border-gray-100 py-2 text-sm text-gray-600 dark:text-gray-500">
                    <div className="flex flex-grow items-center justify-between">
                      <div className="self-center">
                        Some@member added new report
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="bg-gray-10 whitespace-nowrap border border-l-0 border-r-0 border-solid border-gray-200 bg-gray-600 px-4 py-3 text-left align-middle text-xs font-semibold uppercase text-gray-500 dark:border-gray-200 dark:text-gray-100">
                Yesterday
              </div>
              <ul className="bg-white py-1">
                <li className="flex px-4">
                  <div className="my-2 mr-3 h-9 w-9 flex-shrink-0 rounded-full bg-sky-300">
                    <svg
                      className="text-light-blue-50 h-9 w-9 fill-current"
                      viewBox="0 0 36 36"
                    >
                      <path d="M23 11v2.085c-2.841.401-4.41 2.462-5.8 4.315-1.449 1.932-2.7 3.6-5.2 3.6h-1v2h1c3.5 0 5.253-2.338 6.8-4.4 1.449-1.932 2.7-3.6 5.2-3.6h3l-4-4zM15.406 16.455c.066-.087.125-.162.194-.254.314-.419.656-.872 1.033-1.33C15.475 13.802 14.038 13 12 13h-1v2h1c1.471 0 2.505.586 3.406 1.455zM24 21c-1.471 0-2.505-.586-3.406-1.455-.066.087-.125.162-.194.254-.316.422-.656.873-1.028 1.328.959.878 2.108 1.573 3.628 1.788V25l4-4h-3z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-grow items-center border-gray-100 py-2 text-sm text-gray-600">
                    <div className="flex flex-grow items-center justify-between">
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
      {/* <p>Note you!</p>  */}
    </div>
  );
};

export default Notification;
