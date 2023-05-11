import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import { allTasks } from "@/mock/tasks";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
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
  const [tasks, setTasks] = useState( allTasks);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const [showManageTaskMenu, setShowManageTaskMenu] = useState(false);

  useEffect(() => {
    const filteredData = allTasks.filter(
      (item) => 
      item.name && item.name.toLowerCase().includes(search.toLowerCase())
      || item.assignedTo && item.assignedTo.toLowerCase().includes(search.toLowerCase()) 
      || item.status && item.status.toLowerCase().includes(search.toLowerCase())
      || item.priority && item.priority.toLowerCase().includes(search.toLowerCase()) 
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
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Assigned To",
      selector: (row) => row.assignedTo,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Issue Date",
      selector: (row) => row.issueDate,
    },
    {
      name: "Due Date",
      selector: (row) => row.dueDate,
    },
    {
      name: "Priority",
      selector: (row) => row.priority,
    }
  ];

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  },[]);

  return (
    <AdminLayout>
      <div className="grid min-h-full grid-cols-3 gap-x-6 gap-y-6">
        <div className="order-last md:col-span-2 col-span-full md:order-first">
          <h1 className="mb-4 text-3xl font-semibold">Manage Tasks</h1>
          <div className="flex items-center justify-between mb-4">
            <Link 
              href="/admin/task/create" 
              className="flex items-center justify-center gap-2 px-4 py-2 text-base font-semibold rounded-lg bg-primary hover:bg-secondary"
            >
            <AiOutlinePlus /> Assign Task
            </Link>
            <div className="flex pr-4 bg-white border-gray-700 rounded-md">
              <input 
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="py-2 pl-4 bg-transparent outline-none"
                placeholder="Search from Tasks" 
              />
              <AiOutlineSearch className="w-6 h-auto" />
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
        <div className="border-none md:border-l-4 md:col-span-1 border-primary col-span-full">
          {/* if no row is selected */}
          {selectedRows.length === 0 && (
            <div className="flex items-center justify-center w-full h-full text-xl">
              <p>Select task to see detail.</p>
            </div>
          )}
          {/* if multiple rows are selected */}
          {selectedRows.length>1 && (
            <>
            <h3 className="flex justify-between px-2 pb-4 text-xl font-semibold">
              Selected Tasks 
              <button className="flex items-center gap-1 px-2 py-1 text-base text-white bg-red-600 rounded-lg hover:bg-red-500">
                <AiOutlineClose className="w-5 h-auto" />
                Delete All
              </button>
            </h3>
            <ul className="flex flex-col gap-2 px-2">
              {selectedRows.map((row, index) => (
                <li
                  key={index}
                  className="flex justify-between px-4 py-2 bg-white rounded-lg shadow-sm shadow-black"
                >
                  <p>{row.name}</p>
                  <button className="p-1 text-white bg-red-600 rounded-lg hover:bg-red-500">
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
                <BiDotsVertical className="w-8 h-auto hover:text-gray-600" />
              </button>
              {showManageTaskMenu &&(
                <ul className="absolute z-10 flex flex-col gap-2 p-2 duration-300 border-2 rounded border-secondary bg-[#90c7ea] top-9 right-2 w-52">
                  <li className="p-1 rounded hover:bg-primary">
                    <Link
                      href="/admin/reports/{taskId}"
                      className="flex items-center gap-2"
                    >
                      <HiDocumentChartBar className="w-5 h-auto" /> Reports
                    </Link>
                  </li>
                  <li className="p-1 rounded hover:bg-primary">
                    <Link
                      href="/admin/task/edit/{taskId}"
                      className="flex items-center gap-2"
                    >
                      <AiFillEdit className="w-5 h-auto" /> Edit Task
                    </Link>
                  </li>
                  <li className="p-1 rounded hover:bg-primary">
                    <button
                      href="/admin/task/delete/{taskId}"
                      className="flex items-center gap-2"
                    >
                      <AiFillDelete className="w-5 h-auto" /> Delete Task
                    </button>
                  </li>
                </ul>
              )}
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center w-20 h-20 bg-green-400 rounded-full">
                  <MdTask className="w-12 h-12"/>
                </div>
                <h4 className="text-xl font-semibold capitalize" mt-1>
                  {selectedRows[0].name}
                </h4>
                <p className="text-sm">Assigned to {selectedRows[0].assignedTo}</p>
              </div>
              <div className="w-full h-full p-2 ml-2 bg-gray-200 rounded-xl">
                <h2 className="p-2 text-lg font-semibold">Task Detail</h2>
                <p className="flex flex-col p-2 gap-2 overflow-y-auto max-h-64">{selectedRows[0].detail}</p>
                <table>
                  <tr>
                    <td><h2 className="inline-block p-2 text-lg font-semibold">Priority:</h2></td>
                    <td><p className="inline-block gap-2">{selectedRows[0].priority}</p></td>
                  </tr>
                  <tr>
                    <td><h2 className="inline-block p-2 text-lg font-semibold">Status:</h2></td>
                    <td><p className="inline-block gap-2">{selectedRows[0].status}</p></td>
                  </tr>
                  <tr>
                    <td><h2 className="inline-block p-2 text-lg font-semibold">Issue Date:</h2></td>
                    <td><p className="inline-block gap-2">{selectedRows[0].issueDate}</p></td>
                  </tr>
                  <tr>
                    <td><h2 className="inline-block p-2 text-lg font-semibold">Due Date:</h2></td>
                    <td><p className="inline-block gap-2">{selectedRows[0].dueDate}</p></td>
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