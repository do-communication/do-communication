import UserLayout from "@/components/layouts/UserLayout/UserLayout";
import Link from "next/link";
import { db } from "../../../../context/DbContext";
import { toast } from "react-toastify";
import {
  doc,
  getDocs,
  getDoc,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { useState, useEffect, useCallback } from "react";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineMinus,
  AiOutlineSearch,
} from "react-icons/ai";
import { BiDotsVertical, BiUserMinus, BiUserPlus, BiX } from "react-icons/bi";
import { HiDocumentChartBar } from "react-icons/hi2";
import { MdChecklist, MdGroup } from "react-icons/md";
import { TbMessage } from "react-icons/tb";
import dynamic from "next/dynamic";

const ClientOnlyTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

const ManageGroup = () => {
  const [allGroups, setallGroups] = useState([]);
  const [groups, setGroups] = useState(allGroups);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [clearSelectedRows, setClearSelectedRows] = useState(false); // this is used to clear the selected rows
  const [showManageGroupMenu, setShowManageGroupMenu] = useState(false);

  const getData = async () => {
    let arr = [];
    const all = collection(db, "KalCompany", "Groups", "Groups");
    try {
      const doc = await getDocs(all);
      doc.forEach((d) => {
        arr.push(d.data());
      });
    } catch (err) {
      console.log(err);
      setTasks([{ Name: "check your connection" }]);
    }

    setGroups(arr);
    setallGroups(arr);
  };
  // search for groups using group name
  useEffect(() => {
    const filteredData = allGroups.filter(
      (item) =>
        (item.Name && item.Name.toLowerCase().includes(search.toLowerCase())) ||
        (item.Type && item.Type.toLowerCase().includes(search.toLowerCase()))
    );

    if (search) {
      setGroups(filteredData);
    } else {
      setGroups(allGroups);
    }
  }, [search]);

  const columns = [
    {
      name: "Group Name",
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.Type,
    },
  ];

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
          <h1 className="mb-4 text-3xl font-semibold">Your Groups</h1>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:justify-between md:items-center">
            <Link
              href="/user/groups/edit/id"
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-base font-semibold hover:bg-secondary"
            >
              Edit Group
            </Link>
            <div className="flex justify-between rounded-md border-gray-700 bg-white pr-4 ">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-11/12 bg-transparent py-2 pl-4 outline-none"
                placeholder="Search from groups"
              />
              <AiOutlineSearch className="h-auto w-6" />
            </div>
          </div>
          <ClientOnlyTable
            columns={columns}
            data={groups}
            selectableRows
            onSelectedRowsChange={handleRowSelected}
            selectableRowsSingle={true}
            selectableRowsNoSelectAll={true}
            clearSelectedRows={clearSelectedRows}
            pagination={true}
          />
        </div>
        <div className="col-span-full border-none border-primary md:col-span-1 md:border-l-4">
          {/* if no row is selected */}
          {selectedRows.length === 0 && (
            <div className="flex h-full w-full items-center justify-center text-xl">
              <p>Select group to see details</p>
            </div>
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
                      {JSON.stringify(selectedRows[0].id, null, 9)}
                      <Link
                        href={`/user/groups/tasks/${selectedRows[0].id}`}
                        className="flex items-center gap-2"
                      >
                        <MdChecklist className="h-auto w-5" /> Tasks
                      </Link>
                    </li>

                    <li className="rounded p-1 hover:bg-primary">
                      <Link
                        href="/admin/groups/edit"
                        className="flex items-center gap-2"
                      >
                        <AiFillEdit className="h-auto w-5" /> Edit Group
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-400">
                  <MdGroup className="h-12 w-12" />
                </div>
                <h4 className="text-xl font-semibold capitalize" mt-1>
                  {selectedRows[0].Name}
                </h4>
                <p className="text-sm">{selectedRows[0].Type}</p>
              </div>
              <div className="relative flex justify-center py-4">
                <button className="rounded-full bg-secondary bg-opacity-80 p-2 text-white">
                  <TbMessage className="h-auto w-8" />
                </button>
              </div>

              <div className="ml-2 h-full w-full rounded-xl bg-gray-200 p-2">
                <h3 className="p-2 text-lg font-semibold">Members</h3>

                <ul className="flex max-h-64 flex-col gap-2 overflow-y-auto">
                  {selectedRows[0].Members &&
                    selectedRows[0].Members.map((row, index) => (
                      <Link
                        key={index}
                        href="/admin/memebers/{userId}"
                        className="flex items-center justify-between rounded-md p-2 hover:bg-secondary hover:bg-opacity-25"
                      >
                        <p>{row.value}</p>
                        <div className="flex gap-2">
                          <button className="flex items-center gap-1 rounded-lg bg-secondary p-1 px-2 text-white hover:bg-primary">
                            <BiUserMinus className="h-auto w-5" />
                            Remove
                          </button>
                        </div>
                      </Link>
                    ))}
                  {/* <Link
                    href="/admin/memebers/{userId}"
                    className="flex items-center justify-between p-2 rounded-md hover:bg-opacity-25 hover:bg-secondary"
                  >
                    <p>Senait Gobezie</p>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1 p-1 px-2 text-white rounded-lg bg-secondary hover:bg-primary">
                        <BiUserPlus className="w-5 h-auto" />
                        Assign Leader
                      </button>
                    </div>
                  </Link>
                  <Link
                    href="/admin/memebers/{userId}"
                    className="flex items-center justify-between p-2 rounded-md hover:bg-opacity-25 hover:bg-secondary"
                  >
                    <p>Senait Gobezie</p>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1 p-1 px-2 text-white rounded-lg bg-secondary hover:bg-primary">
                        <BiUserPlus className="w-5 h-auto" />
                        Assign Leader
                      </button>
                    </div>
                  </Link> */}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default ManageGroup;
