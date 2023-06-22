import AdminLayout from "@/components/layouts/UserLayout/UserLayout";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineClose,
  AiOutlinePlus,
  AiOutlineSearch,
  AiFillFile,
  AiOutlineFile,
  AiFillLike,
} from "react-icons/ai";
import { TfiFiles } from "react-icons/tfi";
import { GiShare } from "react-icons/gi";
import { BiDotsVertical, BiGroup } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { HiDocumentChartBar, HiUsers } from "react-icons/hi2";
import { MdChecklist } from "react-icons/md";
import { TbMessage } from "react-icons/tb";
import { db } from "../../../../context/DbContext";
import {
  getDocs,
  collection,
  query,
  where,
  or,
  orderBy,
  and,
  addDoc,
} from "firebase/firestore";
import { auth } from "../../../../config/firebase";

const ManageFiles = () => {
  const [files, setFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  const [showManageGroupMenu, setShowManageGroupMenu] = useState(false);

  // search for groups using group name
  useEffect(() => {
    const filteredData = allFiles.filter(
      (item) =>
        item.data.FileName &&
        item.data.FileName.toLowerCase().includes(search.toLowerCase())
    );

    if (search) {
      setFiles(filteredData);
    } else {
      setFiles(allFiles);
    }
  }, [search]);

  const columns = [
    {
      name: "File Name",
      selector: (row) => (
        <p className="flex items-center gap-2">
          <AiOutlineFile className="h-auto w-9 p-2" />

          {row.data.FileName}
        </p>
      ),
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.data.Description,
    },
    {
      name: "Owner",
      selector: (row) => row.data.SenderName,
    },
  ];

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  const handleDeselectedRows = (index, row) => {
    let arr = [...selectedRows];
    console.log(selectedRows);
    arr.splice(index, 1);
    setSelectedRows(arr);
    const id = "select-row-" + row.id;
    document.querySelector(`input[name=${id}]`).classList.remove("checked");
  };
  useEffect(() => {}, [selectedRows]);

  useEffect(() => {
    getFiles();
  }, []);

  const getFiles = async () => {
    let arr = [];
    try {
      const all = collection(db, "KalCompany", "Files", auth.currentUser.uid);
      const doc = await getDocs(all);
      doc.forEach((d) => {
        arr.push({ id: d.id, data: d.data() });
      });
    } catch (err) {
      console.log(err);
    }
    setAllFiles(arr);
    setFiles(arr);
  };

  return (
    <AdminLayout>
      <div className="grid min-h-full grid-cols-3 gap-x-6 gap-y-6">
        <div className="order-last col-span-full md:order-first md:col-span-2">
          <h1 className="mb-5 text-2xl font-semibold">Manage Files</h1>
          <div className="mb-2 flex items-center justify-between pb-0">
            <Link
              href="/admin/files/create"
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-base font-semibold hover:bg-secondary"
            >
              <AiOutlinePlus /> Add File
            </Link>
            <div className="flex rounded-md border-gray-700 bg-white pr-4 ">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent py-2 pl-4 outline-none"
                placeholder="Search from files"
              />
              <AiOutlineSearch className="h-auto w-6" />
            </div>
          </div>
          {/* try */}
          <DataTable
            columns={columns}
            data={files}
            selectableRows
            onSelectedRowsChange={handleRowSelected}
            pagination
          />
          {/* try */}
        </div>
        <div className="col-span-full border-none border-primary md:col-span-1 md:border-l-4">
          {/* if no row is selected */}
          {selectedRows.length === 0 && (
            <div className="flex h-full w-full items-center justify-center text-xl">
              <p>Select a file to see details</p>
            </div>
          )}
          {/* if multiple rows are selected */}
          {selectedRows.length > 1 && (
            <>
              <h3 className="flex justify-between px-2 pb-4 text-xl font-semibold">
                Selected files
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
                    <p>{row.data.FileName}</p>
                    <button
                      onClick={() => handleDeselectedRows(index, row)}
                      className="rounded-lg bg-red-600 p-1 text-white hover:bg-red-500"
                    >
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
                  onClick={() => setShowManageGroupMenu(!showManageGroupMenu)}
                >
                  <BiDotsVertical className="h-auto w-8 hover:text-gray-600" />
                </button>
                {showManageGroupMenu && (
                  <ul className="absolute right-2 top-9 z-10 flex w-52 flex-col gap-2 rounded border-2 border-secondary bg-[#90c7ea] p-2 duration-300">
                    <li className="rounded p-1 hover:bg-primary">
                      <Link
                        href="/admin/tasks/{groupId}"
                        className="flex items-center gap-2"
                      >
                        <GiShare className="h-auto w-5" /> Share
                      </Link>
                    </li>
                    <li className="rounded p-1 hover:bg-primary">
                      <Link
                        href="/admin/groups/edit/{groupId}"
                        className="flex items-center gap-2"
                      >
                        <AiFillEdit className="h-auto w-5" /> Edit file
                      </Link>
                    </li>
                    <li className="rounded p-1 hover:bg-primary">
                      <button
                        href="/admin/groups/edit"
                        className="flex items-center gap-2"
                      >
                        <AiFillDelete className="h-auto w-5" /> Delete file
                      </button>
                    </li>
                  </ul>
                )}
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
                  {/* <MdGroup className="w-12 h-12" /> */}
                  <AiOutlineFile className="m-2 flex h-10 w-10 items-center justify-center rounded-full " />
                </div>
                <h4 className="text-xl font-semibold capitalize" mt-1>
                  {selectedRows[0].data.FileName}
                </h4>
              </div>
              <div className="relative flex justify-center py-4">
                <button
                  // onClick={() => setShowManageGroupMenu(!showManageGroupMenu)}
                  className="rounded-full bg-secondary bg-opacity-80 p-2 text-white"
                >
                  <GiShare className="h-auto w-8" />
                </button>
              </div>

              <div className="ml-2 h-full w-full rounded-xl bg-gray-200 p-2">
                <h3 className="p-2 text-center text-lg font-bold">
                  File Details
                </h3>

                <ul className="flex max-h-64 flex-col gap-2 overflow-y-auto">
                  <div className="flex items-center justify-between rounded-sm p-2 hover:bg-secondary hover:bg-opacity-25">
                    <div className="flex gap-2">
                      <p className="flex items-center gap-1 p-1 px-2 font-semibold">
                        File Name
                      </p>
                    </div>
                    <p
                      className="w-40 truncate text-sm"
                      title="Lidiya Solomon Tamru"
                    >
                      {selectedRows[0].data.FileName}
                    </p>
                  </div>

                  <div className="flex items-center justify-between rounded-sm p-2 hover:bg-secondary hover:bg-opacity-25">
                    <div className="flex gap-2">
                      <p className="flex items-center gap-1 p-1 px-2 font-semibold ">
                        Description
                      </p>
                    </div>
                    <p
                      className="w-40 truncate text-sm"
                      title="Product Manager"
                    >
                      {selectedRows[0].data.Description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between rounded-sm p-2 hover:bg-secondary hover:bg-opacity-25">
                    <div className="flex gap-2">
                      <p className="flex items-center gap-1 p-1 px-2 font-semibold">
                        Owner
                      </p>
                    </div>
                    <p
                      className="w-40 truncate text-sm"
                      title="Addis Ababa/Ethiopia"
                    >
                      {selectedRows[0].data.SenderName}
                    </p>
                  </div>
                  <div className="flex items-center justify-between rounded-sm p-2 hover:bg-secondary hover:bg-opacity-25">
                    <div className="flex gap-2">
                      <p className="flex items-center gap-1 p-1 px-2 font-semibold">
                        Location
                      </p>
                    </div>
                    <p className="w-40 truncate text-sm" title="+251910******">
                      {selectedRows[0].data.location}
                    </p>
                  </div>
                  <div className="flex items-center justify-between rounded-sm p-2 hover:bg-secondary hover:bg-opacity-25">
                    <div className="flex gap-2">
                      <p className="flex items-center gap-1 p-1 px-2 font-semibold">
                        Created At
                      </p>
                    </div>
                    <p className="w-40 truncate text-sm" title="+251910******">
                      {String(
                        selectedRows[0].data.CreatedAt.toDate().toDateString()
                      )}
                    </p>
                  </div>
                </ul>
              </div>
              {/* try */}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageFiles;
