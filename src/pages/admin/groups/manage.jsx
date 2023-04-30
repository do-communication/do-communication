import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import { allGroups } from "@/mock/groups";
import { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";

const ManageGroup = () => {
  const [groups, setGroups] = useState(allGroups);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  // search for groups using group name
  // useEffect(() => {
  //   const filteredData = allGroups.filter(
  //     (item) =>
  //       item.name && item.name.toLowerCase().includes(search.toLowerCase())
  //   );

  //   if (search) {
  //     setGroups(filteredData);
  //   } else {
  //     setGroups(allGroups);
  //   }
  // }, [search]);

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
      <div className="grid grid-cols-3">
        <div className="flex flex-col col-span-2 gap-4">
          <div className="flex">
            <h1>Manage Groups</h1>
            <input
              type="search"
              value={search}
              onChange={(e) => setGroups(e.target.value)}
            />
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
