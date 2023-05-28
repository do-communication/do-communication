import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import { allReports } from "@/mock/report";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineSearch } from "react-icons/ai";
import { BiDotsVertical, BiGroup } from "react-icons/bi";
import { HiDocumentChartBar, HiUsers } from "react-icons/hi2";
import { MdChecklist, MdTask } from "react-icons/md";

const Reports = () => {
  const [reports, setReports] = useState(allReports);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const filteredData = allReports.filter(
      (item) =>
        (item.name && item.name.toLowerCase().includes(search.toLowerCase())) ||
        (item.taskTitle &&
          item.taskTitle.toLowerCase().includes(search.toLowerCase()))
    );

    if (search) {
      setReports(filteredData);
    } else {
      setReports(allReports);
    }
  }, [search]);

  const columns = [
    {
      name: "Report By",
      selector: (row) => (
        <p className="flex items-center justify-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-200 rounded-full">
            {!row.user?.ProfilePic || row.user?.ProfilePic === "" ? (
              row.name[0]
            ) : (
              <img
                src={row.ProfilePic}
                width={50}
                height={50}
                alt="pp"
                className="rounded-full"
              />
            )}
          </div>
          <div>{row.name}</div>
        </p>
      ),
      sortable: true,
    },
    {
      name: "Task Title",
      selector: (row) => row.taskTitle,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
  ];

  const ClientOnlyTable = dynamic(() => import("react-data-table-component"), {
    ssr: false,
  });

  return (
    <AdminLayout>
      <div className="order-last md:col-span-2 col-span-full md:order-first">
        <h1 className="mb-5 text-2xl font-semibold">Reports</h1>
        <div className="flex flex-col gap-4 mb-4 md:items-center sm:justify-between sm:flex-row">
          <div className="flex pr-4 bg-white border-gray-700 rounded-md ">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-11/12 py-2 pl-4 bg-transparent outline-none"
              placeholder="Search reports"
            />
            <AiOutlineSearch className="w-6 h-auto" />
          </div>
        </div>
        <ClientOnlyTable
          columns={columns}
          data={reports}
          pagination={true}
          expandableRows
          expandableRowsComponent={ShowReportDetail}
        />
      </div>
    </AdminLayout>
  );
};

const ShowReportDetail = ({ data }) => (
  <div className="px-8 py-4">
    <h1 className="pb-2 text-lg font-semibold">Report Detail</h1>
    <p dangerouslySetInnerHTML={{ __html: data.report }}></p>
  </div>
);
export default Reports;
