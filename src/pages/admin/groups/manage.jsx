import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import { allGroups } from "@/mock/groups";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlinePlus,
  AiOutlineSearch,
} from "react-icons/ai";
import { BiDotsVertical, BiUserPlus, BiX } from "react-icons/bi";
import { HiDocumentChartBar } from "react-icons/hi2";
import { MdChecklist, MdGroup } from "react-icons/md";
import { TbMessage } from "react-icons/tb";
import dynamic from "next/dynamic";

const ClientOnlyTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});

const ManageGroup = () => {
  const [groups, setGroups] = useState(allGroups);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [clearSelectedRows, setClearSelectedRows] = useState(false); // this is used to clear the selected rows
  const [showManageGroupMenu, setShowManageGroupMenu] = useState(false);

  // search for groups using group name
  useEffect(() => {
    const filteredData = allGroups.filter(
      (item) =>
        item.name && item.name.toLowerCase().includes(search.toLowerCase()) || item.type && item.type.toLowerCase().includes(search.toLowerCase())
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
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
    },
  ];

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  return (
    <AdminLayout>
      <div className="grid min-h-full grid-cols-3 gap-x-6 gap-y-6">
        <div className="order-last md:col-span-2 col-span-full md:order-first">
          <h1 className="mb-4 text-3xl font-semibold">Manage Groups</h1>
          <div className="flex flex-col gap-4 mb-4 md:items-center sm:justify-between sm:flex-row">
            <Link
              href="/admin/groups/create"
              className="flex items-center justify-center gap-2 px-4 py-2 text-base font-semibold rounded-lg bg-primary hover:bg-secondary"
            >
              <AiOutlinePlus /> Create Group
            </Link>
            <div className="flex justify-between pr-4 bg-white border-gray-700 rounded-md ">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-11/12 py-2 pl-4 bg-transparent outline-none"
                placeholder="Search from groups"
              />
              <AiOutlineSearch className="w-6 h-auto" />
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
        <div className="border-none md:border-l-4 md:col-span-1 border-primary col-span-full">
          {/* if no row is selected */}
          {selectedRows.length === 0 && (
            <div className="flex items-center justify-center w-full h-full text-xl">
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
                  <BiDotsVertical className="w-8 h-auto hover:text-gray-600" />
                </button>
                {showManageGroupMenu && (
                  <ul className="absolute z-10 flex flex-col gap-2 p-2 duration-300 border-2 rounded border-secondary bg-[#90c7ea] top-9 right-2 w-52">
                    <li className="p-1 rounded hover:bg-primary">
                      <Link
                        href="/admin/tasks/{groupId}"
                        className="flex items-center gap-2"
                      >
                        <MdChecklist className="w-5 h-auto" /> Tasks
                      </Link>
                    </li>
                    <li className="p-1 rounded hover:bg-primary">
                      <Link
                        href="/admin/reports/{groupId}"
                        className="flex items-center gap-2"
                      >
                        <HiDocumentChartBar className="w-5 h-auto" /> Reports
                      </Link>
                    </li>
                    <li className="p-1 rounded hover:bg-primary">
                      <Link
                        href="/admin/groups/edit/{groupId}"
                        className="flex items-center gap-2"
                      >
                        <AiFillEdit className="w-5 h-auto" /> Edit Group
                      </Link>
                    </li>
                    <li className="p-1 rounded hover:bg-primary">
                      <button
                        href="/admin/groups/delete/{groupId}"
                        className="flex items-center gap-2"
                      >
                        <AiFillDelete className="w-5 h-auto" /> Delete Group
                      </button>
                    </li>
                  </ul>
                )}
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center w-20 h-20 bg-red-400 rounded-full">
                  <MdGroup className="w-12 h-12" />
                </div>
                <h4 className="text-xl font-semibold capitalize" mt-1>
                  {selectedRows[0].name}
                </h4>
                <p className="text-sm">{selectedRows[0].type}</p>
              </div>
              <div className="relative flex justify-center py-4">
                <button
                  className="p-2 text-white rounded-full bg-secondary bg-opacity-80"
                >
                  <TbMessage className="w-8 h-auto" />
                </button>
              </div>

              <div className="w-full h-full p-2 ml-2 bg-gray-200 rounded-xl">
                <h3 className="p-2 text-lg font-semibold">Members</h3>

                <ul className="flex flex-col gap-2 overflow-y-auto max-h-64">
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
                  </Link>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageGroup;
