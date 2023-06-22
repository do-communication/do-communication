import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import { db } from "context/DbContext";
import { doc, getDocs, getDoc, collection } from "firebase/firestore";
// import { useRouter } from 'next/router';
import { usePathname } from "next/navigation";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineClose,
  AiOutlinePlus,
  AiOutlineSearch,
} from "react-icons/ai";
import { BiDotsVertical, BiGroup } from "react-icons/bi";
import { HiDocumentChartBar, HiUsers } from "react-icons/hi2";
import { MdChecklist, MdTask } from "react-icons/md";

const ManageTasks = () => {
  const [allTasks, setallTasks] = useState([]);
  const [tasks, setTasks] = useState([allTasks]);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [showManageTaskMenu, setShowManageTaskMenu] = useState(false);
  const [user, setUser] = useState("");
  let tempTask = [];
  // const { asPath, pathname } = useRouter();
  const currentPage = usePathname();
  let i = currentPage.lastIndexOf("member/");
  const id = currentPage.slice(i + 7);

  const getMem = async () => {
    const docRef = doc(db, "KalCompany", "Users", "StaffMembers", id);
    const mem = await getDoc(docRef);
    setUser(mem._document.data.value.mapValue.fields.Name.stringValue);
    const tasks =
      mem._document.data.value.mapValue.fields.Tasks.arrayValue.values;
    if (tasks) {
      tasks.forEach((t) => {
        if (t) {
          tempTask.push(t.stringValue);
        }
      });
    }
  };
  getMem();
  const getData = async () => {
    let arr = [];
    let selected = [];
    const all = collection(db, "KalCompany", "Tasks", "Tasks");
    try {
      const doc = await getDocs(all);
      doc.forEach((d) => {
        arr.push(d.data());
      });
    } catch (err) {
      console.log(err);
      setTasks([{ Name: "check your connection" }]);
    }
    arr.map((element) => {
      if (tempTask.includes(element.Title)) {
        selected.push(element);
      }
    });
    setTasks(selected);
    setallTasks(selected);
  };
  useEffect(() => {
    const filteredData = allTasks.filter(
      (item) =>
        (item.Title &&
          item.Title.toLowerCase().includes(search.toLowerCase())) ||
        // || item.AssignedTo && item.AssignedTo.includes(search.toLowerCase())
        (item.Status &&
          item.Status.toLowerCase().includes(search.toLowerCase())) ||
        (item.Priority &&
          item.Priority.toLowerCase().includes(search.toLowerCase()))
    );

    if (search) {
      setTasks(filteredData);
    } else {
      setTasks(allTasks);
    }
  }, [search]);

  const columns = [
    {
      name: "Tasks",
      selector: (row) => row.Title,
      sortable: true,
    },
    {
      name: "Assigned To",
      selector: (row) => Array.from(new Set(row.AssignedTo)).toString(" "),
    },
    {
      name: "Status",
      selector: (row) => row.Status,
    },
    {
      name: "Issue Date",
      selector: (row) => row.StartDate,
    },
    {
      name: "Due Date",
      selector: (row) => row.DueDate,
    },
    {
      name: "Priority",
      selector: (row) => row.Priority,
    },
  ];

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);
  useEffect(() => {
    getData();
  }, []);
  return (
    <AdminLayout>
      <div className="grid min-h-full grid-cols-3 gap-x-6 gap-y-6">
        <div className="order-last col-span-full md:order-first md:col-span-2">
          <h1 className="mb-4 text-2xl font-semibold">{user} Tasks</h1>
          <div className="mb-4 mt-6 flex items-center justify-between">
            <Link
              href="/admin/task/create"
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-base font-semibold hover:bg-secondary"
            >
              <AiOutlinePlus /> Assign Task
            </Link>
            <div className="flex rounded-md border-gray-700 bg-white pr-4">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent py-2 pl-4 outline-none"
                placeholder="Search from Tasks"
              />
              <AiOutlineSearch className="h-auto w-6" />
            </div>
          </div>
          <DataTable
            columns={columns}
            data={tasks}
            selectableRows
            onSelectedRowsChange={handleRowSelected}
            pagination
          />
        </div>
        <div className="col-span-full border-none border-primary md:col-span-1 md:border-l-4">
          {/* if no row is selected */}
          {selectedRows.length === 0 && (
            <div className="flex h-full w-full items-center justify-center text-xl">
              <p>Select task to see detail.</p>
            </div>
          )}
          {/* if multiple rows are selected */}
          {selectedRows.length > 1 && (
            <>
              <h3 className="flex justify-between px-2 pb-4 text-xl font-semibold">
                Selected Tasks
                <button className="flex items-center gap-1 rounded-lg bg-red-600 px-2 py-1 text-base text-white hover:bg-red-500">
                  <AiOutlineClose className="h-auto w-5" />
                  Delete All
                </button>
              </h3>
              <ul className="flex flex-col gap-2 px-2">
                {selectedRows.map((row, index) => (
                  <li
                    key={index}
                    className="flex justify-between rounded-lg bg-white px-4 py-2 shadow-sm shadow-black"
                  >
                    <p>{row.Name}</p>
                    <button className="rounded-lg bg-red-600 p-1 text-white hover:bg-red-500">
                      <AiOutlineClose />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {selectedRows.length === 1 && (
            <div className="flex flex-col">
              <div className="relative flex justify-end">
                <button
                  onClick={() => setShowManageTaskMenu(!showManageTaskMenu)}
                >
                  <BiDotsVertical className="h-auto w-8 hover:text-gray-600" />
                </button>
                {showManageTaskMenu && (
                  <ul className="absolute right-2 top-9 z-10 flex w-52 flex-col gap-2 rounded border-2 border-secondary bg-[#90c7ea] p-2 duration-300">
                    <li className="rounded p-1 hover:bg-primary">
                      <Link
                        href="/admin/reports/member/id"
                        className="flex items-center gap-2"
                      >
                        <HiDocumentChartBar className="h-auto w-5" /> Reports
                      </Link>
                    </li>
                    <li className="rounded p-1 hover:bg-primary">
                      <Link
                        href="/admin/task/edit"
                        className="flex items-center gap-2"
                      >
                        <AiFillEdit className="h-auto w-5" /> Edit Task
                      </Link>
                    </li>
                    <li className="rounded p-1 hover:bg-primary">
                      <button
                        href="/admin/task/delete/{taskId}"
                        className="flex items-center gap-2"
                      >
                        <AiFillDelete className="h-auto w-5" /> Delete Task
                      </button>
                    </li>
                  </ul>
                )}
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-light">
                  <MdTask className="h-12 w-12" />
                </div>
                <h4 className="text-xl font-semibold capitalize" mt-1>
                  {selectedRows[0].Title}
                </h4>
                <p className="text-sm">
                  Assigned to{" "}
                  {Array.from(new Set(selectedRows[0].AssignedTo)).toString(
                    " "
                  )}{" "}
                </p>
              </div>
              <div className="ml-2 h-full w-full rounded-xl bg-gray-200 p-2">
                <h2 className="p-2 text-lg font-semibold">Task Detail</h2>
                <p className="flex max-h-64 flex-col gap-2 overflow-y-auto p-2">
                  {selectedRows[0].Description}
                </p>
                <table>
                  <tr>
                    <td>
                      <h2 className="inline-block p-2 text-lg font-semibold">
                        Priority:
                      </h2>
                    </td>
                    <td>
                      <p className="inline-block gap-2">
                        {selectedRows[0].Priority}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h2 className="inline-block p-2 text-lg font-semibold">
                        Status:
                      </h2>
                    </td>
                    <td>
                      <p className="inline-block gap-2">
                        {selectedRows[0].Status}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h2 className="inline-block p-2 text-lg font-semibold">
                        Issue Date:
                      </h2>
                    </td>
                    <td>
                      <p className="inline-block gap-2">
                        {selectedRows[0].StartDate}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h2 className="inline-block p-2 text-lg font-semibold">
                        Due Date:
                      </h2>
                    </td>
                    <td>
                      <p className="inline-block gap-2">
                        {selectedRows[0].DueDate}
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageTasks;
