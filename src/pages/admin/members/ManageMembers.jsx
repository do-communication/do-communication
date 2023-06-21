import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import { db } from "../../../../context/DbContext";
import { toast } from "react-toastify";
import { doc, getDocs, getDoc, collection, deleteDoc } from "firebase/firestore";
import { auth } from "../../../../config/firebase";
const user = auth.currentUser;
import Router from 'next/router';
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
    let arr = []
    const all = collection(db, "KalCompany", "Users", "StaffMembers");
    try {
      const doc = await getDocs(all)
      doc.forEach(d => {
        arr.push({id:d.id, data:d.data()})
      });

    } catch (err) {
      console.log(err)
      setMembers([{ Name: "check your connection" }])
    }

    setMembers(arr)
    setallMembers(arr)
  }
  // search for groups using group name
  useEffect(() => {
    const filteredData = allMembers.filter(
      (item) =>
        item.data.Name && item.data.Name.toLowerCase().includes(search.toLowerCase())
        || item.data.Department && item.data.Department.toLowerCase().includes(search.toLowerCase())
        || item.data.Email && item.data.Email.toLowerCase().includes(search.toLowerCase())
    );

    if (search) {
      setMembers(filteredData);
    } else {
      setMembers(allMembers);
    }
  }, [search]);

  const columns = [
    {
      name: "Name",
      selector: (row) => (
        <p className="flex items-center justify-center gap-2"><div className="flex items-center justify-center w-8 h-8 bg-blue-200 rounded-full">
          {row.data && row.data.ProfilePic === '' ? row.data.Name[0] : <img
          src={row.data && row.data.ProfilePic}
          width={50}
          height={50}
          alt= "pp"
          className="rounded-full"
        />}
        </div>
        <div>
        {row.data && row.data.Name}
      </div></p>

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
    getData()
  }, []);

  return (
    <AdminLayout>
      <div className="grid min-h-full grid-cols-3 gap-x-6 gap-y-6">
        <div className="order-last md:col-span-2 col-span-full md:order-first">
          <h1 className="mb-5 text-2xl font-semibold">Manage Members</h1>
          <div className="flex flex-col gap-4 mb-4 md:items-center sm:justify-between sm:flex-row">
            <Link
              href="/admin/members/create"
              className="flex items-center justify-center gap-2 px-4 py-2 text-base font-semibold rounded-lg bg-primary hover:bg-secondary"
            >
              <AiOutlinePlus /> Add Member
            </Link>
            <div className="flex pr-4 bg-white border-gray-700 rounded-md ">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-11/12 py-2 pl-4 bg-transparent outline-none"
                placeholder="Search from members"
              />
              <AiOutlineSearch className="w-6 h-auto" />
            </div>
          </div>
          <ClientOnlyTable
            columns={columns}
            data={members}
            selectableRows
            onSelectedRowsChange={handleRowSelected}
            selectableRowsNoSelectAll={true}
            pagination={true}
          />
        </div>
        <div className="border-none md:border-l-4 md:col-span-1 border-primary col-span-full">
          {/* if no row is selected */}
          {selectedRows.length === 0 && (
            <div className="flex items-center justify-center w-full h-full text-xl">
              <p>Select Member to see details</p>
            </div>
          )}
          {/* if multiple rows are selected */}
          {selectedRows.length > 1 && (
            <>
              <h3 className="flex justify-between px-2 pb-4 text-xl font-semibold">
                Selected members
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
                  <BiDotsVertical className="w-8 h-auto hover:text-gray-600" />
                </button>
                {showManageGroupMenu && (
                  <ul className="absolute z-10 flex flex-col gap-2 p-2 duration-300 border-2 rounded border-secondary bg-[#90c7ea] top-9 right-2 w-52">
                    <li className="p-1 rounded hover:bg-primary">
                      <button
                        onClick={() => {router.push(`/admin/task/member/${selectedRows[0].id}`)}}
                        className="flex items-center gap-2"
                      >
                        <MdChecklist className="w-5 h-auto" /> Tasks
                      </button>
                    </li>
                    <li className="p-1 rounded hover:bg-primary">
                      <button
                        onClick={() => {router.push(`/admin/reports/member/${selectedRows[0].id}`)}}
                        className="flex items-center gap-2"
                      >
                        <HiDocumentChartBar className="w-5 h-auto" /> Reports
                      </button>
                    </li>
                    <li className="p-1 rounded hover:bg-primary">
                      <button
                        onClick={() => {router.push(`/admin/members/edit/${selectedRows[0].id}`)}}
                        className="flex items-center gap-2"
                      >
                        <AiFillEdit className="w-5 h-auto" /> Edit Member
                      </button>
                    </li>
                    <li className="p-1 rounded hover:bg-primary">
                      <button
                        onClick={async (e) => {e.stopPropagation();
                          const id = selectedRows[0].id
                          setSelectedRows([]);
                          setClearSelectedRows(true);
                          const check = confirm("Do you want to delete the member?");
                          if(check){
                          const docRef = doc(db,"KalCompany", "Users", "StaffMembers", id);
                          await deleteDoc(docRef)
                          getData();
                          toast.success("Member deleted successfully");
                        }}}
                        className="flex items-center gap-2"
                      >
                        <AiFillDelete className="w-5 h-auto" /> Delete Member
                      </button>
                    </li>
                  </ul>
                )}
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary">
                    {selectedRows[0].data.ProfilePic === '' ? selectedRows[0].data.Name[0] : 
                    <img
                    src={selectedRows[0].data.ProfilePic}
                    width={50}
                    height={50}
                    alt= "pp"
                    className="rounded-full"
                  />}
                </div>
                <h4 className="text-xl font-semibold capitalize" mt-1>
                  {selectedRows[0].data.Name}
                </h4>
                <p className="font-light text-md" mt-1>
                  {selectedRows[0].data.Email}
                </p>
                <p className="text-sm">{selectedRows[0].data.type}</p>
              </div>
              <div className="relative flex justify-center py-4">
                <button

                  className="p-2 text-white rounded-full bg-secondary bg-opacity-80"
                >
                  <TbMessage className="w-8 h-auto" />
                </button>
              </div>

              <div className="w-full h-full p-2 ml-2 bg-gray-200 rounded-xl">
                <h3 className="p-2 text-lg font-bold text-center">
                  Profile Details
                </h3>

                <ul className="flex flex-col gap-2 overflow-y-auto max-h-64">
                  <div className="flex items-center justify-between p-2 rounded-sm hover:bg-opacity-25 hover:bg-secondary">
                    <div className="flex gap-2">
                      <p className="flex items-center gap-1 p-1 px-2 font-semibold">
                        Full Name
                      </p>
                    </div>
                    <p className="w-40 truncate" title="Lidiya Solomon Tamru">
                      {selectedRows[0].data.Name}
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-sm hover:bg-opacity-25 hover:bg-secondary">
                    <div className="flex gap-2">
                      <p className="flex items-center gap-1 p-1 px-2 font-semibold ">
                        Department
                      </p>
                    </div>
                    <p className="w-40 truncate" title="Product Manager">
                      {selectedRows[0].data.Department}
                    </p>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-sm hover:bg-opacity-25 hover:bg-secondary">
                    <div className="flex gap-2">
                      <p className="flex items-center gap-1 p-1 px-2 font-semibold">
                        Address
                      </p>
                    </div>
                    <p className="w-40 truncate" title="Addis Ababa/Ethiopia">
                      {selectedRows[0].data.Address}
                    </p>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-sm hover:bg-opacity-25 hover:bg-secondary">
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
              <div className="w-full h-full p-2 mt-6 ml-2 bg-gray-200 rounded-xl">
                <h3 className="p-2 text-lg font-semibold text-center">
                  Joined Groups
                </h3>

                <ul className="flex flex-col gap-2 overflow-y-auto max-h-64">
                  {/* <Link
                    href="/admin/memebers/{userId}"
                    className="flex items-center justify-between p-2 rounded-md hover:bg-opacity-25 hover:bg-secondary"
                  >
                    <p className="flex items-center gap-1 p-1 px-4 rounded-lg ">
                      <BiGroup />
                      Group one
                    </p>
                    <button
                      type="submit"
                      className="flex items-center gap-1 px-2 text-white rounded-lg bg-primary hover:bg-secondary"
                    >
                      <BsEye /> View
                    </button>
                  </Link>
                  <Link
                    href="/admin/memebers/{userId}"
                    className="flex items-center justify-between p-2 rounded-md hover:bg-opacity-25 hover:bg-secondary"
                  >
                    <p className="flex items-center gap-1 p-1 px-4 rounded-lg ">
                      <BiGroup />
                      Group one
                    </p>
                    <button
                      type="submit"
                      className="flex items-center gap-1 px-2 text-white rounded-lg bg-primary hover:bg-secondary"
                    >
                      <BsEye /> View
                    </button>
                  </Link>
                  <Link
                    href="/admin/memebers/{userId}"
                    className="flex items-center justify-between p-2 rounded-md hover:bg-opacity-25 hover:bg-secondary"
                  >
                    <p className="flex items-center gap-1 p-1 px-4 rounded-lg ">
                      <BiGroup />
                      Group one
                    </p>
                    <button
                      type="submit"
                      className="flex items-center gap-1 px-2 text-white rounded-lg bg-primary hover:bg-secondary"
                    >
                      <BsEye /> View
                    </button>
                  </Link> */}
                  {selectedRows[0].data.GroupId && selectedRows[0].data.GroupId.map((row, index) => (
                  <li
                    key={index}
                    className="flex justify-between px-4 py-2 bg-white rounded-lg shadow-sm shadow-black"
                  >
                    <p>{row}</p>
                    <button
                      type="submit"
                      className="flex items-center gap-1 px-2 text-white rounded-lg bg-primary hover:bg-secondary"
                    >
                      <BsEye /> View
                    </button>
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
