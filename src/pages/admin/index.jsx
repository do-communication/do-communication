import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import { allMembers } from "@/mock/members";
import React, { useEffect, useState } from "react";
const Admin = () => {
  const [members, setMembers] = useState(allMembers);
  return (
    <AdminLayout>
      <body className="flex bg-gray-100 min-h-screen">
        <div className="flex-grow text-gray-800">
          <main className="p-6 sm:p-10 space-y-6">
            <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
              <div className="mr-6">
                <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
                <h2 className="text-gray-600 ml-0.5">SomeCompany@gmail.com</h2>
              </div>
            </div>
            <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              <div className="flex items-center p-8 bg-white shadow rounded-lg">
                <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 bg-sky-300 rounded-full mr-6">
                  <svg
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="block text-2xl font-bold">62</span>
                  <span className="block text-gray-500">Employees</span>
                </div>
              </div>
              <div className="flex items-center p-8 bg-white shadow rounded-lg">
                <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 bg-sky-300 rounded-full mr-6">
                  <svg
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div>
                  <span className="block text-2xl font-bold">110</span>
                  <span className="block text-gray-500">Tasks</span>
                </div>
              </div>
              <div className="flex items-center p-8 bg-white shadow rounded-lg">
                <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 bg-sky-300 rounded-full mr-6">
                  <svg
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                    />
                  </svg>
                </div>
                <div>
                  <span className="inline-block text-2xl font-bold">70</span>
                  <span className="block text-gray-500">70 Reports</span>
                </div>
              </div>
              <div className="flex items-center p-8 bg-white shadow rounded-lg">
                <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16  bg-sky-300 rounded-full mr-6">
                  <svg
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div>
                  <span className="block text-2xl font-bold">30</span>
                  <span className="block text-gray-500">Fles</span>
                </div>
              </div>
            </section>
            <section className="grid md:grid-cols-2 l:grid-cols-5 l:grid-rows-5 xl:grid-flow-col gap-6">
              <div className="row-span-2 bg-white shadow rounded-lg">
                <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
                  <span>Best performers </span>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md px-1 -mr-1 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-600"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    Completed Tasks
                    <svg
                      className="-mr-1 ml-1 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div className="overflow-y-auto">
                  <ul className="p-6 space-y-6">
                    <li className="flex items-center">
                      <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                        <img
                          src="images/pp.png"
                          alt="Annette Watson profile picture"
                        />
                      </div>
                      <span className="text-gray-600">member4</span>
                      <span className="ml-auto font-semibold">9</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                        <img
                          src="images/pp.png"
                          alt="Annette Watson profile picture"
                        />
                      </div>
                      <span className="text-gray-600">member7</span>
                      <span className="ml-auto font-semibold">8</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                        <img
                          src="images/pp.png"
                          alt="Annette Watson profile picture"
                        />
                      </div>
                      <span className="text-gray-600">member1</span>
                      <span className="ml-auto font-semibold">7</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                        <img
                          src="images/pp.png"
                          alt="Annette Watson profile picture"
                        />
                      </div>
                      <span className="text-gray-600">member3</span>
                      <span className="ml-auto font-semibold">5</span>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <!-- Recent Activities --> */}
              <div className="relative flex flex-col min-w-0 break-words bg-gray-50 dark:bg-gray-50 w-full shadow-lg rounded">
                <div className="rounded-t mb-0 px-0 border-0">
                  <div className="flex flex-wrap items-center px-4 py-2">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                      <h3 className="font-semibold text-base text-gray-900 dark:text-gray-00">
                        Recent Activities
                      </h3>
                    </div>
                    <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                      <button
                        className="bg-blue-500 dark:bg-gray-100 text-gray active:bg-blue-600 dark:text-gray-800 dark:active:text-gray-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        See all
                      </button>
                    </div>
                  </div>
                  <div className="block w-full">
                    <div className="px-4 bg-gray-10 bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Today
                    </div>
                    <ul className="my-1">
                      <li className="flex px-4">
                        <div className="w-9 h-9 rounded-full flex-shrink-0 bg-green-300 my-2 mr-3">
                          <svg
                            className="w-9 h-9 fill-current text-red-50"
                            viewBox="0 0 36 36"
                          >
                            <path d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z"></path>
                          </svg>
                        </div>
                        <div className="flex-grow flex items-center border-gray-100 text-sm text-gray-600 dark:text-gray-500 py-2">
                          <div className="flex-grow flex justify-between items-center">
                            <div className="self-center">
                              Some@member completed his task
                            </div>
                            <div className="flex-shrink-0 ml-2">
                              <a
                                className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                                href="#0"
                              >
                                View
                                <span>
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="transform transition-transform duration-500 ease-in-out"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                      clip-rule="evenodd"
                                    ></path>
                                  </svg>
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="flex px-4">
                        <div className="w-9 h-9 rounded-full flex-shrink-0 bg-green-300 my-2 mr-3">
                          <svg
                            className="w-9 h-9 fill-current text-red-50"
                            viewBox="0 0 36 36"
                          >
                            <path d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z"></path>
                          </svg>
                        </div>
                        <div className="flex-grow flex items-center border-gray-100 text-sm text-gray-600 dark:text-gray-500 py-2">
                          <div className="flex-grow flex justify-between items-center">
                            <div className="self-center">
                              Some@member added new report
                            </div>
                            <div className="flex-shrink-0 ml-2">
                              <a
                                className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                                href="#0"
                              >
                                View
                                <span>
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="transform transition-transform duration-500 ease-in-out"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                      clip-rule="evenodd"
                                    ></path>
                                  </svg>
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div className="px-4 bg-gray-10 bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Yesterday
                    </div>
                    <ul className="my-1">
                      <li className="flex px-4">
                        <div className="w-9 h-9 rounded-full flex-shrink-0 bg-sky-300 my-2 mr-3">
                          <svg
                            className="w-9 h-9 fill-current text-light-blue-50"
                            viewBox="0 0 36 36"
                          >
                            <path d="M23 11v2.085c-2.841.401-4.41 2.462-5.8 4.315-1.449 1.932-2.7 3.6-5.2 3.6h-1v2h1c3.5 0 5.253-2.338 6.8-4.4 1.449-1.932 2.7-3.6 5.2-3.6h3l-4-4zM15.406 16.455c.066-.087.125-.162.194-.254.314-.419.656-.872 1.033-1.33C15.475 13.802 14.038 13 12 13h-1v2h1c1.471 0 2.505.586 3.406 1.455zM24 21c-1.471 0-2.505-.586-3.406-1.455-.066.087-.125.162-.194.254-.316.422-.656.873-1.028 1.328.959.878 2.108 1.573 3.628 1.788V25l4-4h-3z"></path>
                          </svg>
                        </div>
                        <div className="flex-grow flex items-center border-gray-100 text-sm text-gray-600 dark:text-gray-500 py-2">
                          <div className="flex-grow flex justify-between items-center">
                            <div className="self-center">
                              <a
                                className="font-medium text-gray-800 hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-100"
                                href="#0"
                              >
                                240+
                              </a>{" "}
                              users have subscribed to{" "}
                              <a
                                className="font-medium text-gray-800 dark:text-gray-50 dark:hover:text-gray-100"
                                href="#0"
                              >
                                Newsletter #1
                              </a>
                            </div>
                            <div className="flex-shrink-0 ml-2">
                              <a
                                className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                                href="#0"
                              >
                                View
                                <span>
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="transform transition-transform duration-500 ease-in-out"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                      clip-rule="evenodd"
                                    ></path>
                                  </svg>
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* <!-- ./Recent Activities --> */}
            </section>

            <section>
              {/* <!-- Task Summaries --> */}
              <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-4 gap-12 text-black">
                <div class="md:col-span-2 xl:col-span-3 ">
                  <h3 class="text-lg font-semibold pt-4 ">Task summaries</h3>
                </div>
                <div class="md:col-span-2 xl:col-span-1">
                  <div class="rounded text-black bg-white p-3">
                    <div class="flex justify-between py-1 text-blac">
                      <h3 class="text-sm font-semibold">Tasks in TO DO</h3>
                      <svg
                        class="h-4 fill-current text-gray-600 dark:text-gray-500 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" />
                      </svg>
                    </div>
                    <div class="text-sm text-black dark:text-gray-50 mt-2 ">
                      <div class="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 mb-3 rounded mt-2 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                        Lorem ipsum dolor sit amet consectetur
                      </div>
                      <div class="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 mb-3 rounded mt-2 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                        Lorem ipsum dolor sit amet consectetur
                      </div>
                      <div class="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 mb-3 rounded mt-2 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                        Lorem ipsum dolor sit amet consectetur
                      </div>

                      <form class="mt-3 text-gray-600 dark:text-gray-400">
                        <div class="flex flex-col mt-2 ">
                          <label for="tel" class="hidden">
                            task
                          </label>
                          <input
                            type="text"
                            placeholder="Add a task"
                            class="w-100 mt-2 py-4 rounded-sm px-3 bg-white dark:bg-gray-600 text-white  font-semibold"
                          />
                        </div>
                        <button
                          type="submit"
                          className=" flex align-item-center justify-center md:w-32 bg-primary text-white font-bold py-3   rounded-lg mt-4 hover:bg-bold transition ease-in-out duration-300"
                        >
                        Add
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="md:col-span-2 xl:col-span-1">
                    <div class="rounded text-black bg-white  pb-6 p-3">
                      <div class="flex justify-between py-1 text-black">
                        <h3 class="text-sm font-semibold">Tasks in Progress</h3>
                        <svg
                          class="h-4 fill-current text-gray-600 dark:text-gray-500 cursor-pointer"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" />
                        </svg>
                      </div>
                      <div class="text-sm text-black dark:text-gray-50 mt-2">
                        <div class="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 mb-3 rounded mt-2 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                          Lorem ipsum dolor sit amet consectetur
                        </div>
                        <div class="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 mb-3 rounded mt-2 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                          Lorem ipsum dolor sit amet consectetur
                        </div>
                        <div class="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 mb-3 rounded mt-2 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                          Lorem ipsum dolor sit amet consectetur
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="md:col-span-2 xl:col-span-1">
                  <div class="rounded text-black bg-white  pb-6 p-3">
                    <div class="flex justify-between py-1 text-black">
                      <h3 class="text-sm font-semibold">Completed tasks</h3>
                      <svg
                        class="h-4 fill-current text-gray-600 dark:text-gray-500 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" />
                      </svg>
                    </div>
                    <div class="text-sm text-black dark:text-gray-50 mt-2 ">
                      <div class="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 mb-3 rounded mt-2 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                        Lorem ipsum dolor sit amet consectetur
                      </div>
                      <div class="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 mb-3 rounded mt-2 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                        Lorem ipsum dolor sit amet consectetur
                      </div>
                      <div class="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-3 mb-3 rounded mt-2 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                        Lorem ipsum dolor sit amet consectetur
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </body>
    </AdminLayout>
  );
};

export default Admin;
