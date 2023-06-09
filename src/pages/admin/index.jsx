import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import { allMembers } from "@/mock/members";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiFillFileAdd } from "react-icons/ai";
import { RiTeamFill, RiLogoutBoxFill } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import useFetch from "@/components/useFetch";
import { auth } from "../../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../context/DbContext";
import { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const Admin = () => {
  const [members, setMembers] = useState(allMembers);
  const [user, setUser] = useState({});
  const { GetUser } = useFetch("KalCompany");
  const [Colleague, setColleague] = useState(0);
  const [NewTasks, setNewTask] = useState(0);
  const [Reports, setReports] = useState(0);
  const [Files, setFiles] = useState(0);
  const [todo, setTodo] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [completed, setComplete] = useState([]);

  const getData = async () => {
    if (auth.currentUser) {
      setUser(await GetUser(auth.currentUser.uid));
      const coll = collection(db, "KalCompany", "Users", "StaffMembers");
      const snapshot = await getDocs(coll);
      setColleague(snapshot.docs.length);

      const tasks = collection(db, "KalCompany", "Tasks", "Tasks");
      const taskSnap = await getDocs(tasks);
      setNewTask(taskSnap.docs.length);
      const q1 = query(tasks, where("Status", "==", "assigned"));
      const temp1 = [];
      try {
        const todoTask = await getDocs(q1);
        todoTask.forEach((d) => {
          temp1.push(d.data());
        });
      } catch (err) {
        console.log(err);
      }
      setTodo(temp1);
      const q2 = query(tasks, where("Status", "==", "inprogress"));
      const temp2 = [];
      try {
        const inprogressTask = await getDocs(q2);
        inprogressTask.forEach((d) => {
          temp2.push(d.data());
        });
      } catch (err) {
        console.log(err);
      }
      setInprogress(temp2);
      const q3 = query(tasks, where("Status", "==", "done"));
      const temp3 = [];
      try {
        const doneTask = await getDocs(q3);
        doneTask.forEach((d) => {
          temp3.push(d.data());
        });
      } catch (err) {
        console.log(err);
      }
      setComplete(temp3);
      const reports = collection(db, "KalCompany", "Reports", "Reports");
      const reportSnap = await getDocs(reports);
      setReports(reportSnap.docs.length);

      const files = collection(db, "KalCompany", "Files", auth.currentUser.uid);
      const fileSnap = await getDocs(files);
      setFiles(fileSnap.docs.length);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // const Admin = () => {
  //   const [members, setMembers] = useState(allMembers);

  const data = [
    { name: "New Task", value: 400 },
    { name: "In progress", value: 300 },
    { name: "Done", value: 300 },
  ];

  const COLORS = ["#298cc5", "#FFBB28", "#00C49F"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <AdminLayout>
      <div className="flex min-h-screen bg-gray-100">
        <div className="flex-grow text-gray-800">
          <div className="p-6 space-y-6 sm:p-10">
            <div className="flex flex-col justify-between space-y-6 md:flex-row md:space-y-0">
              <div className="mr-6">
                <h1 className="mb-2 text-4xl font-semibold">Dashboard</h1>
                <h2 className="ml-0.5 text-gray-600">
                  {auth?.currentUser.email}
                </h2>
              </div>
            </div>
            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="flex items-center p-8 bg-white rounded-lg shadow">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 rounded-full bg-sky-300">
                  <RiTeamFill size={23} />
                </div>
                <div>
                  <span className="block text-2xl font-bold">{Colleague}</span>
                  <span className="block text-gray-500">Employees</span>
                </div>
              </div>
              <div className="flex items-center p-8 bg-white rounded-lg shadow">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 rounded-full bg-sky-300">
                  <FaTasks size={23} />
                </div>
                <div>
                  <span className="block text-2xl font-bold">{NewTasks}</span>
                  <span className="block text-gray-500">Tasks</span>
                </div>
              </div>
              <div className="flex items-center p-8 bg-white rounded-lg shadow">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 rounded-full bg-sky-300">
                  <TbReportAnalytics size={23} />
                </div>
                <div>
                  <span className="inline-block text-2xl font-bold">
                    {Reports}
                  </span>
                  <span className="block text-gray-500"> Reports</span>
                </div>
              </div>
              <div className="flex items-center p-8 bg-white rounded-lg shadow">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 rounded-full bg-sky-300">
                  <AiFillFileAdd size={23} />
                </div>
                <div>
                  <span className="block text-2xl font-bold">{Files}</span>
                  <span className="block text-gray-500">Files</span>
                </div>
              </div>
            </section>
            <section className="grid gap-6 l:grid-cols-5 l:grid-rows-5 md:grid-cols-2 xl:grid-flow-col">
              <div className="row-span-2 bg-white rounded-lg shadow">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart width={400} height={200}>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={130}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend></Legend>
                  </PieChart>
                </ResponsiveContainer>
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
                        className="px-3 py-1 mb-1 mr-1 text-xs font-bold uppercase transition-all duration-150 ease-linear bg-blue-500 rounded outline-none text-gray focus:outline-none active:bg-blue-600 dark:bg-gray-100 dark:text-gray-800 dark:active:text-gray-700"
                        type="button"
                      >
                        See all
                      </button>
                    </div>
                  </div>
                  <div className="block w-full">
                    <div className="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase align-middle bg-gray-600 border border-l-0 border-r-0 border-gray-200 border-solid bg-gray-10 whitespace-nowrap dark:border-gray-200 dark:text-gray-100">
                      Today
                    </div>
                    <ul className="my-1">
                      <li className="flex px-4">
                        <div className="flex-shrink-0 my-2 mr-3 bg-green-300 rounded-full h-9 w-9">
                          <svg
                            className="fill-current h-9 w-9 text-red-50"
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
                                      fillRule="evenodd"
                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="flex px-4">
                        <div className="flex-shrink-0 my-2 mr-3 bg-green-300 rounded-full h-9 w-9">
                          <svg
                            className="fill-current h-9 w-9 text-red-50"
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
                            <div className="flex-shrink-0 ml-2 ">
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
                                      fillRule="evenodd"
                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div className="px-4 py-3 text-xs font-semibold text-left text-gray-500 uppercase align-middle bg-gray-600 border border-l-0 border-r-0 border-gray-200 border-solid bg-gray-10 whitespace-nowrap dark:border-gray-200 dark:text-gray-100">
                      Yesterday
                    </div>
                    <ul className="my-1">
                      <li className="flex px-4">
                        <div className="flex-shrink-0 my-2 mr-3 rounded-full h-9 w-9 bg-sky-300">
                          <svg
                            className="fill-current text-light-blue-50 h-9 w-9"
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
                                      fillRule="evenodd"
                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                      clipRule="evenodd"
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
                      {todo &&
                        todo.map((row, index) => (
                          <div
                            key={index}
                            className="p-3 mt-2 mb-3 bg-white border-b border-gray-100 rounded cursor-pointer hover:bg-gray-50 dark:border-gray-900 dark:bg-gray-600 dark:hover:bg-gray-700"
                          >
                            <h2> {row.Title}</h2>
                            <p className="text-sm">
                              Assigned to:{" "}
                              {Array.from(new Set(row.AssignedTo)).toString(
                                " "
                              )}{" "}
                            </p>
                          </div>
                        ))}

                      <form className="mt-3 text-gray-600 dark:text-gray-400">
                        <Link
                          href="admin/task/create"
                          className="flex justify-center w-32 py-3 mt-4 font-bold text-white transition duration-300 ease-in-out rounded-lg align-item-center bg-primary hover:bg-bold"
                        >
                          Add
                        </Link>
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
                        {inprogress &&
                          inprogress.map((row, index) => (
                            <div
                              key={index}
                              className="p-3 mt-2 mb-3 bg-white border-b border-gray-100 rounded cursor-pointer hover:bg-gray-50 dark:border-gray-900 dark:bg-gray-600 dark:hover:bg-gray-700"
                            >
                              <h2>{row.Title}</h2>
                              <p className="text-sm">
                                Assigned to:{" "}
                                {Array.from(new Set(row.AssignedTo)).toString(
                                  " "
                                )}{" "}
                              </p>
                            </div>
                          ))}
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
                      {completed &&
                        completed.map((row, index) => (
                          <div
                            key={index}
                            className="p-3 mt-2 mb-3 bg-white border-b border-gray-100 rounded cursor-pointer hover:bg-gray-50 dark:border-gray-900 dark:bg-gray-600 dark:hover:bg-gray-700"
                          >
                            <h2>{row.Title}</h2>
                            <p className="text-sm">
                              Assigned to:{" "}
                              {Array.from(new Set(row.AssignedTo)).toString(
                                " "
                              )}{" "}
                            </p>
                          </div>
                        ))}
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
