import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
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
import { auth } from "../../../../config/firebase";
const user = auth.currentUser;
import Router from "next/router";
const router = Router;
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineClose,
  AiOutlinePlus,
  AiOutlineSearch,
} from "react-icons/ai";
import { BiDotsVertical, BiGroup, BiX } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { HiDocumentChartBar, HiUsers } from "react-icons/hi2";
import { MdChecklist } from "react-icons/md";
import { TbMessage } from "react-icons/tb";
import dynamic from "next/dynamic";

const ClientOnlyTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

const ManageMembers = () => {
  const [allMembers, setallMembers] = useState([]);
  const [members, setMembers] = useState([allMembers]);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [clearSelectedRows, setClearSelectedRows] = useState(false); // this is used to clear the selected rows
  const [showManageGroupMenu, setShowManageGroupMenu] = useState(false);
  const getData = async () => {
    let arr = [];
    const all = collection(db, "KalCompany", "Users", "StaffMembers");
    try {
      const doc = await getDocs(all);
      doc.forEach((d) => {
        arr.push({ id: d.id, data: d.data() });
      });
    } catch (err) {
      console.log(err);
      setMembers([{ Name: "check your connection" }]);
    }

    setMembers(arr);
    setallMembers(arr);
  };
  // search for groups using group name
  useEffect(() => {
    const filteredData = allMembers.filter(
      (item) =>
        (item.data.Name &&
          item.data.Name.toLowerCase().includes(search.toLowerCase())) ||
        (item.data.Department &&
          item.data.Department.toLowerCase().includes(search.toLowerCase())) ||
        (item.data.Email &&
          item.data.Email.toLowerCase().includes(search.toLowerCase()))
    );

    if (search) {
      setMembers(filteredData);
    } else {
      setMembers(allMembers);
    }
  }, [search]);
  //loading till fetch
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(allMembers);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const columns = [
    {
      name: "Name",
      selector: (row) => (
        <p className="flex items-center justify-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-200">
            {row.data && row.data.ProfilePic === "" ? (
              row.data.Name[0]
            ) : (
              <img
                src={row.data && row.data.ProfilePic}
                width={50}
                height={50}
                alt="pp"
                className="rounded-full"
              />
            )}
          </div>
          <div>{row.data && row.data.Name}</div>
        </p>
      ),
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.data && row.data.Email,
    },
    {
      name: "Department",
      selector: (row) => row.data && row.data.Department,
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
          <h1 className="mb-5 text-2xl font-semibold">Manage Members</h1>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:justify-between md:items-center">
            <Link
              href="/admin/members/create"
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-base font-semibold hover:bg-secondary"
            >
              <AiOutlinePlus /> Add Member
            </Link>
            <div className="flex rounded-md border-gray-700 bg-white pr-4 ">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-11/12 bg-transparent py-2 pl-4 outline-none"
                placeholder="Search from members"
              />
              <AiOutlineSearch className="h-auto w-6" />
            </div>
          </div>
          <ClientOnlyTable
            columns={columns}
            data={members}
            selectableRows
            onSelectedRowsChange={handleRowSelected}
            selectableRowsNoSelectAll={true}
            progressPending={pending}
            pagination={true}
          />
        </div>
        <div className="col-span-full border-none border-primary md:col-span-1 md:border-l-4">
          {/* if no row is selected */}
          {selectedRows.length === 0 && (
            <div className="flex h-full w-full items-center justify-center text-xl">
              <p>Select Member to see details</p>
            </div>
          )}
          {/* if multiple rows are selected */}
          {selectedRows.length > 1 && (
            <>
              <h3 className="flex justify-between px-2 pb-4 text-xl font-semibold">
                Selected members
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
                    <p>{row.data.Name}</p>
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
              <div className="relative flex justify-between sm:justify-end">
                <button
                  onClick={() => {
                    setSelectedRows([]);
                    setClearSelectedRows(true);
                  }}
                  className="block sm:hidden"
                >
                  <BiX className="h-auto w-9 hover:text-gray-600" />
                </button>
                <button
                  onClick={() => setShowManageGroupMenu(!showManageGroupMenu)}
                >
                  <BiDotsVertical className="h-auto w-8 hover:text-gray-600" />
                </button>
                {showManageGroupMenu && (
                  <ul className="absolute right-2 top-9 z-10 flex w-52 flex-col gap-2 rounded border-2 border-secondary bg-[#90c7ea] p-2 duration-300">
                    <li className="rounded p-1 hover:bg-primary">
                      <button
                        onClick={() => {
                          router.push(
                            `/admin/task/member/${selectedRows[0].id}`
                          );
                        }}
                        className="flex items-center gap-2"
                      >
                        <MdChecklist className="h-auto w-5" /> Tasks
                      </button>
                    </li>
                    <li className="rounded p-1 hover:bg-primary">
                      <button
                        onClick={() => {
                          router.push(
                            `/admin/reports/member/${selectedRows[0].id}`
                          );
                        }}
                        className="flex items-center gap-2"
                      >
                        <HiDocumentChartBar className="h-auto w-5" /> Reports
                      </button>
                    </li>
                    <li className="rounded p-1 hover:bg-primary">
                      <button
                        onClick={() => {
                          router.push(
                            `/admin/members/edit/${selectedRows[0].id}`
                          );
                        }}
                        className="flex items-center gap-2"
                      >
                        <AiFillEdit className="h-auto w-5" /> Edit Member
                      </button>
                    </li>
                    <li className="rounded p-1 hover:bg-primary">
                      <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          const id = selectedRows[0].id;
                          setSelectedRows([]);
                          setClearSelectedRows(true);
                          const check = confirm(
                            "Do you want to delete the member?"
                          );
                          if (check) {
                            const docRef = doc(
                              db,
                              "KalCompany",
                              "Users",
                              "StaffMembers",
                              id
                            );
                            await deleteDoc(docRef);
                            getData();
                            toast.success("Member deleted successfully");
                          }
                        }}
                        className="flex items-center gap-2"
                      >
                        <AiFillDelete className="h-auto w-5" /> Delete Member
                      </button>
                    </li>
                  </ul>
                )}
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
                  {selectedRows[0].data.ProfilePic === "" ? (
                    selectedRows[0].data.Name[0]
                  ) : (
                    <img
                      src={selectedRows[0].data.ProfilePic}
                      width={50}
                      height={50}
                      alt="pp"
                      className="rounded-full"
                    />
                  )}
                </div>
                <h4 className="mt-1 text-xl font-semibold capitalize">
                  {selectedRows[0].data.Name}
                </h4>
                <p className="text-md mt-1 font-light">
                  {selectedRows[0].data.Email}
                </p>
                <p className="text-sm">{selectedRows[0].data.type}</p>
              </div>
              <div className="relative flex justify-center py-4">
                <button className="rounded-full bg-secondary bg-opacity-80 p-2 text-white">
                  <TbMessage className="h-auto w-8" />
                </button>
              </div>

              <div className="ml-2 h-full w-full rounded-xl bg-gray-200 p-2">
                <h3 className="p-2 text-center text-lg font-bold">
                  Profile Details
                </h3>

                <ul className="flex max-h-64 flex-col gap-2 overflow-y-auto">
                  <div className="flex items-center justify-between rounded-sm p-2 hover:bg-secondary hover:bg-opacity-25">
                    <div className="flex gap-2">
                      <p className="flex items-center gap-1 p-1 px-2 font-semibold">
                        Full Name
                      </p>
                    </div>
                    <p className="w-40 truncate" title="Lidiya Solomon Tamru">
                      {selectedRows[0].data.Name}
                    </p>
                  </div>

                  <div className="flex items-center justify-between rounded-sm p-2 hover:bg-secondary hover:bg-opacity-25">
                    <div className="flex gap-2">
                      <p className="flex items-center gap-1 p-1 px-2 font-semibold ">
                        Department
                      </p>
                    </div>
                    <p className="w-40 truncate" title="Product Manager">
                      {selectedRows[0].data.Department}
                    </p>
                  </div>
                  <div className="flex items-center justify-between rounded-sm p-2 hover:bg-secondary hover:bg-opacity-25">
                    <div className="flex gap-2">
                      <p className="flex items-center gap-1 p-1 px-2 font-semibold">
                        Address
                      </p>
                    </div>
                    <p className="w-40 truncate" title="Addis Ababa/Ethiopia">
                      {selectedRows[0].data.Address}
                    </p>
                  </div>
                  <div className="flex items-center justify-between rounded-sm p-2 hover:bg-secondary hover:bg-opacity-25">
                    <div className="flex gap-2">
                      <p className="flex items-center gap-1 p-1 px-2 font-semibold">
                        Phone Number
                      </p>
                    </div>
                    <p className="w-40 truncate" title="+251910******">
                      {selectedRows[0].data.PhoneNumber}
                    </p>
                  </div>
                </ul>
              </div>
              {/* try */}
              <div className="ml-2 mt-6 h-full w-full rounded-xl bg-gray-200 p-2">
                <h3 className="p-2 text-center text-lg font-semibold">
                  Joined Groups
                </h3>

                <ul className="flex max-h-64 flex-col gap-2 overflow-y-auto">
                  
                  {selectedRows[0].data.GroupId &&
                    selectedRows[0].data.GroupId.map((row, index) => (
                      <li
                        key={index}
                        className="flex justify-between rounded-lg bg-white px-4 py-2 shadow-sm shadow-black"
                      >
                        <p>{row}</p>
                        {/* <button
                          type="submit"
                          className="flex items-center gap-1 rounded-lg bg-primary px-2 text-white hover:bg-secondary"
                        >
                          <BsEye /> View
                        </button> */}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageMembers;
