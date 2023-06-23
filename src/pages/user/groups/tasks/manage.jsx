import UserLayout from "@/components/layouts/UserLayout/UserLayout";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import { db } from "../../../../context/DbContext";
import { toast } from "react-toastify";
import {
  doc,
  getDocs,
  getDoc,
  collection,
  deleteDoc,
} from "firebase/firestore";
import Router from "next/router";
const router = Router;
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
  const [clearSelectedRows, setClearSelectedRows] = useState(false);
  let assignedMem = [];
  const [showManageTaskMenu, setShowManageTaskMenu] = useState(false);
  const getData = async () => {
    let arr = [];
    let temp = [];
    const all = collection(db, "KalCompany", "Tasks", "Tasks");
    try {
      const doc = await getDocs(all);
      doc.forEach((d) => {
        arr.push({ id: d.id, data: d.data() });
      });
    } catch (err) {
      console.log(err);
      setTasks([{ Name: "check your connection" }]);
    }

    setTasks(arr);
    setallTasks(arr);
  };
  useEffect(() => {
    const filteredData = allTasks.filter(
      (item) =>
        (item.data.Title &&
          item.data.Title.toLowerCase().includes(search.toLowerCase())) ||
        (item.data.AssignedTo &&
          item.data.AssignedTo.includes(search.toLowerCase())) ||
        (item.data.Status &&
          item.data.Status.toLowerCase().includes(search.toLowerCase())) ||
        (item.data.Priority &&
          item.data.Priority.toLowerCase().includes(search.toLowerCase()))
    );

    if (search) {
      setTasks(filteredData);
    } else {
      setTasks(allTasks);
    }
  }, [search]);
  //loading till fetch
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(allTasks);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const columns = [
    {
      name: "Tasks",
      selector: (row) => row.data && row.data.Title,
      sortable: true,
    },
    {
      name: "Assigned To",
      selector: (row) =>
        row.data && Array.from(new Set(row.data.AssignedTo)).toString(" "),
    },
    {
      name: "Status",
      selector: (row) => row.data && row.data.Status,
    },
    {
      name: "Issue Date",
      selector: (row) => row.data && row.data.StartDate,
    },
    {
      name: "Due Date",
      selector: (row) => row.data && row.data.DueDate,
    },
    {
      name: "Priority",
      selector: (row) => row.data && row.data.Priority,
    },
  ];
  const handleClick = async (i, name) => {
    const memRef = doc(db, "KalCompany", "Users", "StaffMembers", i);
    const mem = await getDoc(memRef);
    let tempTask = [];
    let tempReport = [];
    let tempGroup = [];
    const temp =
      mem._document.data.value.mapValue.fields.Tasks.arrayValue.values;
    const report =
      mem._document.data.value.mapValue.fields.Reports.arrayValue.values;
    const group =
      mem._document.data.value.mapValue.fields.GroupId.arrayValue.values;
    if (temp) {
      temp.forEach((t) => {
        if (t) {
          if (t.stringValue != name) {
            tempTask.push(t.stringValue);
          }
        }
      });
    }
    if (report) {
      report.forEach((r) => {
        if (r) {
          tempReport.push(r.stringValue);
        }
      });
    }
    if (group) {
      group.forEach((g) => {
        if (g) {
          if (g.stringValue != name) {
            tempGroup.push(g.stringValue);
          }
        }
      });
    }
    const newData = {
      Name: mem._document.data.value.mapValue.fields.Name.stringValue,
      Address: mem._document.data.value.mapValue.fields.Address.stringValue,
      Email: mem._document.data.value.mapValue.fields.Email.stringValue,
      Gender: mem._document.data.value.mapValue.fields.Gender.stringValue,
      Department:
        mem._document.data.value.mapValue.fields.Department.stringValue,
      PhoneNumber:
        mem._document.data.value.mapValue.fields.PhoneNumber.stringValue,
      DateOfBirth:
        mem._document.data.value.mapValue.fields.DateOfBirth.stringValue,
      ProfilePic:
        mem._document.data.value.mapValue.fields.ProfilePic.stringValue,
      RegisteredAt:
        mem._document.data.value.mapValue.fields.RegisteredAt.stringValue,
      GroupId: tempGroup,
      Reports: tempReport,
      Tasks: tempTask,
    };
    updateDoc(memRef, newData)
      .then((memRef) => {
        console.log(
          "A New Document Field has been added to an existing document"
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);
  useEffect(() => {
    getData();
  }, []);
  return (
    <UserLayout>
      <div className="grid min-h-full grid-cols-3 gap-x-6 gap-y-6">
        <div className="order-last col-span-full md:order-first md:col-span-2">
          <h1 className="mb-4 text-3xl font-semibold">Manage Tasks</h1>
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/user/tasks/create"
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
            progressPending={pending}
            pagination
          />
        </div>
        <div className="border-none col-span-full border-primary md:col-span-1 md:border-l-4">
          {/* if no row is selected */}
          {selectedRows.length === 0 && (
            <div className="flex items-center justify-center w-full h-full text-xl">
              <p>Select task to see detail.</p>
            </div>
          )}
          {/* if multiple rows are selected */}
          {selectedRows.length > 1 && (
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
                    <p>{row.data.Name}</p>
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
                {showManageTaskMenu && (
                  <ul className="absolute right-2 top-9 z-10 flex w-52 flex-col gap-2 rounded border-2 border-secondary bg-[#90c7ea] p-2 duration-300">
                    <li className="p-1 rounded hover:bg-primary">
                      <Link
                        href="/user/groups/reports/member/id"
                        className="flex items-center gap-2"
                      >
                        <HiDocumentChartBar className="w-5 h-auto" /> Reports
                      </Link>
                    </li>
                    <li className="p-1 rounded hover:bg-primary">
                      <button
                        onClick={() => {
                          router.push(`/user/groups/tasks/edit/${selectedRows[0].id}`);
                        }}
                        className="flex items-center gap-2"
                      >
                        <AiFillEdit className="w-5 h-auto" /> Edit Task
                      </button>
                    </li>
                    <li className="p-1 rounded hover:bg-primary">
                      <button
                        className="flex items-center gap-2"
                        onClick={async (e) => {
                          e.stopPropagation();
                          setSelectedRows([]);
                          setClearSelectedRows(true);
                          // setClearSelectedRows(true);
                          const id = selectedRows[0].id;
                          // selectedRows[0].data.map(m => {
                          // handleClick(m.id, selectedRows[0].data.Title);
                          // console.log(selectedRows[0].data)
                          // })
                          const check = confirm(
                            "Do you want to delete the task?"
                          );
                          if (check) {
                            const docRef = doc(
                              db,
                              "KalCompany",
                              "Tasks",
                              "Tasks",
                              id
                            );
                            await deleteDoc(docRef);
                            getData();
                            toast.success("Task deleted successfully");
                          }
                        }}
                      >
                        <AiFillDelete className="w-5 h-auto" /> Delete Task
                      </button>
                    </li>
                  </ul>
                )}
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center w-20 h-20 bg-green-400 rounded-full">
                  <MdTask className="w-12 h-12" />
                </div>
                <h4 className="mt-1 text-xl font-semibold capitalize">
                  {selectedRows[0].data.Title}
                </h4>
                <p className="text-sm">
                  Assigned to{" "}
                  {Array.from(
                    new Set(selectedRows[0].data.AssignedTo)
                  ).toString(" ")}{" "}
                </p>
              </div>
              <div className="w-full h-full p-2 ml-2 bg-gray-200 rounded-xl">
                <h2 className="p-2 text-lg font-semibold">Task Detail</h2>
                <p className="flex flex-col gap-2 p-2 overflow-y-auto max-h-64">
                  {selectedRows[0].data.Description}
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
                        {selectedRows[0].data.Priority}
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
                        {selectedRows[0].data.Status}
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
                        {selectedRows[0].data.StartDate}
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
                        {selectedRows[0].data.DueDate}
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default ManageTasks;
