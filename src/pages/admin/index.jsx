import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import { allMembers } from "@/mock/members";
import React, { useState } from "react";
import { AiFillFileAdd } from "react-icons/ai";
import { RiTeamFill, RiLogoutBoxFill } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
const Admin = () => {
  const [members, setMembers] = useState(allMembers);
  return (
    <AdminLayout>
      <div className="flex min-h-screen bg-gray-100">
        <div className="flex-grow text-gray-800">
          <div className="p-6 space-y-6 sm:p-10">
            <div className="flex flex-col justify-between space-y-6 md:space-y-0 md:flex-row">
              <div className="mr-6">
                <h1 className="mb-2 text-4xl font-semibold">Dashboard</h1>
                <h2 className="text-gray-600 ml-0.5">SomeCompany@gmail.com</h2>
              </div>
            </div>
            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="flex items-center p-8 bg-white rounded-lg shadow">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 rounded-full bg-sky-300">
                  <RiTeamFill size={23} />
                </div>
                <div>
                  <span className="block text-2xl font-bold">12</span>
                  <span className="block text-gray-500">Employees</span>
                </div>
              </div>
              <div className="flex items-center p-8 bg-white rounded-lg shadow">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 rounded-full bg-sky-300">
                  <FaTasks size={23} />
                </div>
                <div>
                  <span className="block text-2xl font-bold">110</span>
                  <span className="block text-gray-500">Tasks</span>
                </div>
              </div>
              <div className="flex items-center p-8 bg-white rounded-lg shadow">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 rounded-full bg-sky-300">
                  <TbReportAnalytics size={23} />
                </div>
                <div>
                  <span className="inline-block text-2xl font-bold">70</span>
                  <span className="block text-gray-500"> Reports</span>
                </div>
              </div>
              <div className="flex items-center p-8 bg-white rounded-lg shadow">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 rounded-full bg-sky-300">
                  <AiFillFileAdd size={23} />
                </div>
                <div>
                  <span className="block text-2xl font-bold">30</span>
                  <span className="block text-gray-500">Files</span>
                </div>
              </div>
            </section>
            <section className="grid gap-6 md:grid-cols-2 l:grid-cols-5 l:grid-rows-5 xl:grid-flow-col">
              <div className="row-span-2 bg-white rounded-lg shadow">
                <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
                  <span>Best performers </span>
                  <button
                    type="button"
                    className="inline-flex justify-center px-1 -mr-1 text-sm font-medium leading-5 text-gray-500 bg-white rounded-md hover:text-gray-600"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    Completed Tasks
                    <svg
                      className="w-5 h-5 ml-1 -mr-1"
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
                      <div className="w-10 h-10 mr-3 overflow-hidden bg-gray-100 rounded-full">
                        <img
                          src="images/pp.png"
                          alt="Annette Watson profile picture"
                        />
                      </div>
                      <span className="text-gray-600">member4</span>
                      <span className="ml-auto font-semibold">9</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-10 h-10 mr-3 overflow-hidden bg-gray-100 rounded-full">
                        <img
                          src="images/pp.png"
                          alt="Annette Watson profile picture"
                        />
                      </div>
                      <span className="text-gray-600">member7</span>
                      <span className="ml-auto font-semibold">8</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-10 h-10 mr-3 overflow-hidden bg-gray-100 rounded-full">
                        <img
                          src="images/pp.png"
                          alt="Annette Watson profile picture"
                        />
                      </div>
                      <span className="text-gray-600">member1</span>
                      <span className="ml-auto font-semibold">7</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-10 h-10 mr-3 overflow-hidden bg-gray-100 rounded-full">
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
              <div className="relative flex flex-col w-full min-w-0 break-words rounded shadow-lg bg-gray-50 dark:bg-gray-50">
                <div className="px-0 mb-0 border-0 rounded-t">
                  <div className="flex flex-wrap items-center px-4 py-2">
                    <div className="relative flex-1 flex-grow w-full max-w-full">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-00">
                        Recent Activities
                      </h3>
                    </div>
                    <div className="relative flex-1 flex-grow w-full max-w-full text-right">
                      <button
                        className="px-3 py-1 mb-1 mr-1 text-xs font-bold uppercase transition-all duration-150 ease-linear bg-blue-500 rounded outline-none dark:bg-gray-100 text-gray active:bg-blue-600 dark:text-gray-800 dark:active:text-gray-700 focus:outline-none"
                        type="button"
                      >
                        See all
                      </button>
                    </div>
                  </div>
                  <div className="block w-full">
                    <div className="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase align-middle bg-gray-600 border border-l-0 border-r-0 border-gray-200 border-solid bg-gray-10 dark:text-gray-100 dark:border-gray-200 whitespace-nowrap">
                      Today
                    </div>
                    <ul className="my-1">
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
                                    className="transition-transform duration-500 ease-in-out transform"
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
                                    className="transition-transform duration-500 ease-in-out transform"
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
                    <div className="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase align-middle bg-gray-600 border border-l-0 border-r-0 border-gray-200 border-solid bg-gray-10 dark:text-gray-100 dark:border-gray-200 whitespace-nowrap">
                      Yesterday
                    </div>
                    <ul className="my-1">
                      <li className="flex px-4">
                        <div className="flex-shrink-0 my-2 mr-3 rounded-full w-9 h-9 bg-sky-300">
                          <svg
                            className="fill-current w-9 h-9 text-light-blue-50"
                            viewBox="0 0 36 36"
                          >
                            <path d="M23 11v2.085c-2.841.401-4.41 2.462-5.8 4.315-1.449 1.932-2.7 3.6-5.2 3.6h-1v2h1c3.5 0 5.253-2.338 6.8-4.4 1.449-1.932 2.7-3.6 5.2-3.6h3l-4-4zM15.406 16.455c.066-.087.125-.162.194-.254.314-.419.656-.872 1.033-1.33C15.475 13.802 14.038 13 12 13h-1v2h1c1.471 0 2.505.586 3.406 1.455zM24 21c-1.471 0-2.505-.586-3.406-1.455-.066.087-.125.162-.194.254-.316.422-.656.873-1.028 1.328.959.878 2.108 1.573 3.628 1.788V25l4-4h-3z"></path>
                          </svg>
                        </div>
                        <div className="flex items-center flex-grow py-2 text-sm text-gray-600 border-gray-100 dark:text-gray-500">
                          <div className="flex items-center justify-between flex-grow">
                            <div className="self-center">
                              <p>
                                Lorem ipsum dolor consectetur adipisicing elit.
                              </p>
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
                                    className="transition-transform duration-500 ease-in-out transform"
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
              <div className="grid grid-cols-1 gap-12 p-4 text-black md:grid-cols-2 xl:grid-cols-3">
                <div className="md:col-span-2 xl:col-span-3 ">
                  <h3 className="pt-4 text-lg font-semibold ">
                    Task summaries
                  </h3>
                </div>

                <div className="md:col-span-2 xl:col-span-1">
                  <div className="p-3 text-black bg-white rounded">
                    <div className="flex justify-between py-1 text-blac">
                      <h3 className="text-sm font-semibold">Tasks in TO DO</h3>
                      <svg
                        className="h-4 text-gray-600 cursor-pointer fill-current dark:text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" />
                      </svg>
                    </div>
                    <div className="mt-2 text-sm text-black dark:text-gray-50 ">
                      <div className="p-3 mt-2 mb-3 bg-white border-b border-gray-100 rounded cursor-pointer dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-900">
                        Lorem ipsum dolor sit amet consectetur
                      </div>
                      <div className="p-3 mt-2 mb-3 bg-white border-b border-gray-100 rounded cursor-pointer dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-900">
                        Lorem ipsum dolor sit amet consectetur
                      </div>
                      <div className="p-3 mt-2 mb-3 bg-white border-b border-gray-100 rounded cursor-pointer dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-900">
                        Lorem ipsum dolor sit amet consectetur
                      </div>

                      <form className="mt-3 text-gray-600 dark:text-gray-400">
                        <div className="flex flex-col mt-2 ">
                          <label for="tel" className="hidden">
                            task
                          </label>
                          <input
                            type="text"
                            placeholder="Add a task"
                            className="px-3 py-4 mt-2 font-semibold text-white bg-white rounded-sm w-100 dark:bg-gray-600"
                          />
                        </div>
                        <button
                          type="submit"
                          className="flex justify-center w-32 py-3 mt-4 font-bold text-white transition duration-300 ease-in-out rounded-lg align-item-center bg-primary hover:bg-bold"
                        >
                          Add
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="md:col-span-2 xl:col-span-1">
                    <div className="p-3 pb-6 text-black bg-white rounded">
                      <div className="flex justify-between py-1 text-black">
                        <h3 className="text-sm font-semibold">
                          Tasks in Progress
                        </h3>
                        <svg
                          className="h-4 text-gray-600 cursor-pointer fill-current dark:text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" />
                        </svg>
                      </div>
                      <div className="mt-2 text-sm text-black dark:text-gray-50">
                        <div className="p-3 mt-2 mb-3 bg-white border-b border-gray-100 rounded cursor-pointer dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-900">
                          Lorem ipsum dolor sit amet consectetur
                        </div>
                        <div className="p-3 mt-2 mb-3 bg-white border-b border-gray-100 rounded cursor-pointer dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-900">
                          Lorem ipsum dolor sit amet consectetur
                        </div>
                        <div className="p-3 mt-2 mb-3 bg-white border-b border-gray-100 rounded cursor-pointer dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-900">
                          Lorem ipsum dolor sit amet consectetur
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 xl:col-span-1">
                  <div className="p-3 pb-6 text-black bg-white rounded">
                    <div className="flex justify-between py-1 text-black">
                      <h3 className="text-sm font-semibold">Completed tasks</h3>
                      <svg
                        className="h-4 text-gray-600 cursor-pointer fill-current dark:text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" />
                      </svg>
                    </div>
                    <div className="mt-2 text-sm text-black dark:text-gray-50 ">
                      <div className="p-3 mt-2 mb-3 bg-white border-b border-gray-100 rounded cursor-pointer dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-900">
                        Lorem ipsum dolor sit amet consectetur
                      </div>
                      <div className="p-3 mt-2 mb-3 bg-white border-b border-gray-100 rounded cursor-pointer dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-900">
                        Lorem ipsum dolor sit amet consectetur
                      </div>
                      <div className="p-3 mt-2 mb-3 bg-white border-b border-gray-100 rounded cursor-pointer dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-900">
                        Lorem ipsum dolor sit amet consectetur
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;
