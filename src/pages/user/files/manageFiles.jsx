import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineClose,
  AiOutlinePlus,
  AiOutlineSearch,
  AiOutlineFile,
} from "react-icons/ai";
import { GiShare, GiOpenBook } from "react-icons/gi";
import { BiDotsVertical } from "react-icons/bi";
import { db } from "../../../../context/DbContext";
import {
  getDocs,
  collection,
} from "firebase/firestore";
import { auth } from "../../../../config/firebase";
import UserLayout from "@/components/layouts/UserLayout/UserLayout";
import useFetch from "@/components/useFetch";
import { toast } from "react-toastify";
import Router from "next/router";

const router = Router;

const ManageFiles = () => {
  const [files, setFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [update, setUpdate] = useState(false);
  const [showManageGroupMenu, setShowManageGroupMenu] = useState(false);
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const { deleteFile } = useFetch("KalCompany");

  const handleDelete = async () => {
    await deleteFile(selectedRows[0], setUpdate, update, setSelectedRows);
    setToggleClearRows(!toggledClearRows);
  };

  // search for groups using group name
  useEffect(() => {
    const filteredData = allFiles.filter(
      (item) =>
        (item.data.FileName &&
          item.data.FileName.toLowerCase().includes(search.toLowerCase())) ||
        (item.data.Description &&
          item.data.Description.toLowerCase().includes(search.toLowerCase()))
    );

    if (search) {
      setFiles(filteredData);
    } else {
      setFiles(allFiles);
    }
  }, [search]);

  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRows(allFiles);
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const columns = [
    {
      name: "File Name",
      selector: (row) => (
        <p className="flex items-center gap-2">
          <AiOutlineFile className="h-auto p-2 w-9" />

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
  const handleCopy = () => {
    navigator.clipboard.writeText(selectedRows[0].data.url);
    toast.success("Link Copied");
  };

  useEffect(() => { }, [selectedRows]);

  useEffect(() => {
    getFiles();
  }, [update]);

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
    <UserLayout>
      <div className="grid min-h-full grid-cols-3 gap-x-6 gap-y-6">
        <div className="order-last col-span-full md:order-first md:col-span-2">
          <h1 className="mb-5 text-2xl font-semibold">Manage Files</h1>
          <div className="flex items-center justify-between pb-0 mb-2">
            <Link
              href="/admin/files/create"
              className="flex items-center justify-center gap-2 px-4 py-2 text-base font-semibold rounded-lg bg-primary hover:bg-secondary"
            >
              <AiOutlinePlus /> Add File
            </Link>
            <div className="flex pr-4 bg-white border-gray-700 rounded-md ">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="py-2 pl-4 bg-transparent outline-none"
                placeholder="Search from files"
              />
              <AiOutlineSearch className="w-6 h-auto" />
            </div>
          </div>
          {/* try */}
          <DataTable
            columns={columns}
            data={files}
            selectableRows
            selectableRowsSingle={true}
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggledClearRows}
            progressPending={pending}
            pagination
          />
          {/* try */}
        </div>
        <div className="border-none col-span-full border-primary md:col-span-1 md:border-l-4">
          {/* if no row is selected */}
          {selectedRows.length === 0 && (
            <div className="flex items-center justify-center w-full h-full text-xl">
              <p>Select a file to see details</p>
            </div>
          )}
          {/* if multiple rows are selected */}
          {selectedRows.length > 1 && (
            <>
              <h3 className="flex justify-between px-2 pb-4 text-xl font-semibold">
                Selected files
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
                    <p>{row.data.FileName}</p>
                    <button
                      onClick={() => handleDeselectedRows(index, row)}
                      className="p-1 text-white bg-red-600 rounded-lg hover:bg-red-500"
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
                  <BiDotsVertical className="w-8 h-auto hover:text-gray-600" />
                </button>
                {showManageGroupMenu && (
                  <ul className="absolute right-2 top-9 z-10 flex w-52 flex-col gap-2 rounded border-2 border-secondary bg-[#90c7ea] p-2 duration-300">
                    <li className="p-1 rounded hover:bg-primary">
                      <Link
                        href={selectedRows[0].data.url}
                        className="flex items-center gap-2"
                        target="_blank"
                      >
                        <GiOpenBook className="w-5 h-auto" /> Open
                      </Link>
                    </li>
                    <li className="p-1 rounded hover:bg-primary">
                      <Link
                        href=""
                        className="flex items-center gap-2"
                        onClick={handleCopy}
                      >
                        <GiShare className="w-5 h-auto" /> Share
                      </Link>
                    </li>
                    <li className="p-1 rounded hover:bg-primary">
                      <button
                        onClick={() => { router.push(`/user/files/edit/${selectedRows[0].id}`) }}
                        className="flex items-center gap-2"
                      >
                        <AiFillEdit className="w-5 h-auto" /> Edit file
                      </button>
                    </li>
                    <li className="p-1 rounded hover:bg-primary">
                      <button
                        href="/user/groups/edit"
                        className="flex items-center gap-2"
                        onClick={handleDelete}
                      >
                        <AiFillDelete className="w-5 h-auto" /> Delete file
                      </button>
                    </li>
                  </ul>
                )}
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary">
                  {/* <MdGroup className="w-12 h-12" /> */}
                  <AiOutlineFile className="flex items-center justify-center w-10 h-10 m-2 rounded-full " />
                </div>
                <h4 className="mt-1 text-xl font-semibold capitalize">
                  {selectedRows[0].data.FileName}
                </h4>
              </div>
              <div className="relative flex justify-center py-4">
                <button
                  // onClick={() => setShowManageGroupMenu(!showManageGroupMenu)}
                  onClick={handleCopy}
                  className="p-2 text-white rounded-full bg-secondary bg-opacity-80"
                >
                  <GiShare className="w-8 h-auto" />
                </button>
              </div>

              <div className="w-full h-full p-2 ml-2 bg-gray-200 rounded-xl">
                <h3 className="p-2 text-lg font-bold text-center">
                  File Details
                </h3>

                <ul className="flex flex-col gap-2 overflow-y-auto max-h-64">
                  <div className="flex items-center justify-between p-2 rounded-sm hover:bg-secondary hover:bg-opacity-25">
                    <div className="flex gap-2">
                      <p className="flex items-center gap-1 p-1 px-2 font-semibold">
                        File Name
                      </p>
                    </div>
                    <p
                      className="w-40 text-sm truncate"
                      title="Lidiya Solomon Tamru"
                    >
                      {selectedRows[0].data.FileName}
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-sm hover:bg-secondary hover:bg-opacity-25">
                    <div className="flex gap-2">
                      <p className="flex items-center gap-1 p-1 px-2 font-semibold ">
                        Description
                      </p>
                    </div>
                    <p
                      className="w-40 text-sm truncate"
                      title="Product Manager"
                    >
                      {selectedRows[0].data.Description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-sm hover:bg-secondary hover:bg-opacity-25">
                    <div className="flex gap-2">
                      <p className="flex items-center gap-1 p-1 px-2 font-semibold">
                        Owner
                      </p>
                    </div>
                    <p
                      className="w-40 text-sm truncate"
                      title="Addis Ababa/Ethiopia"
                    >
                      {selectedRows[0].data.SenderName}
                    </p>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-sm hover:bg-secondary hover:bg-opacity-25">
                    <div className="flex gap-2">
                      <p className="flex items-center gap-1 p-1 px-2 font-semibold">
                        Shelf Location
                      </p>
                    </div>
                    <p className="w-40 text-sm truncate" title="+251910******">
                      {selectedRows[0].data.ShelfLocation}
                    </p>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-sm hover:bg-secondary hover:bg-opacity-25">
                    <div className="flex gap-2">
                      <p className="flex items-center gap-1 p-1 px-2 font-semibold">
                        Created At
                      </p>
                    </div>
                    <p className="w-40 text-sm truncate" title="+251910******">
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
    </UserLayout>
  );
};

export default ManageFiles;
