import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import { allGroups } from "@/mock/groups";
import { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineSearch } from "react-icons/ai";
const ManageGroup = () => {
  const [groups, setGroups] = useState(allGroups);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  // search for groups using group name
  useEffect(() => {
    const filteredData = allGroups.filter(
      (item) =>
        item.name && item.name.toLowerCase().includes(search.toLowerCase())
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
      <div className="grid grid-cols-3 gap-x-6">
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">Manage Groups</h1>
            <div className="flex pr-2 bg-white border-gray-700 rounded-md ">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="py-1 pl-2 bg-transparent outline-none"
                placeholder="search from groups"
              />
              <AiOutlineSearch className="w-6 h-auto" />
            </div>
          </div>
          <DataTable
            columns={columns}
            data={groups}
            selectableRows
            onSelectedRowsChange={handleRowSelected}
            pagination
          />
        </div>
        <div>
          <pre>{JSON.stringify(selectedRows, null, 4)}</pre>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageGroup;
