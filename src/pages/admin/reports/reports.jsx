import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineSearch } from "react-icons/ai";
import { BiDotsVertical, BiGroup } from "react-icons/bi";
import { HiDocumentChartBar, HiUsers } from "react-icons/hi2";
import { MdChecklist, MdTask } from "react-icons/md";
import { db } from "../../../../context/DbContext"
import { doc, getDocs, getDoc, collection, deleteDoc } from "firebase/firestore";

const Reports = () => {
  const [allReports, setallReports] = useState([]);
  const [reports, setReports] = useState(allReports);
  const [search, setSearch] = useState("");

  const getData = async () => {
    let arr = []
    const all = collection(db, "KalCompany", "Reports", "Reports");
    try {
      const doc = await getDocs(all)
      doc.forEach(d => {
        arr.push(d.data())
      });

    } catch (err) {
      console.log(err)
      setMembers([{ Name: "check your connection" }])
    }

    setReports(arr)
    setallReports(arr)
  }

  useEffect(() => {
    const filteredData = allReports.filter(
      (item) =>
        (item.ReportBy && item.ReportBy.toLowerCase().includes(search.toLowerCase())) ||
        (item.Title &&
          item.Title.toLowerCase().includes(search.toLowerCase()))
    );

    if (search) {
      setReports(filteredData);
    } else {
      setReports(allReports);
    }
  }, [search]);
   //loading till fetch
   const [pending, setPending] =useState(true);
   const [rows, setRows] = useState([]);
   useEffect(() => {
     const timeout = setTimeout(() => {
       setRows(allReports);
       setPending(false);
     }, 2000);
     return () => clearTimeout(timeout);
   }, []);

  const columns = [
    {
      name: "Report By",
      selector: (row) => (
        <p className="flex items-center justify-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-200 rounded-full">
            {!row.user?.ProfilePic || row.user?.ProfilePic === "" ? (
              row.ReportBy[0]
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
          <div>{row.ReportBy}</div>
        </p>
      ),
      sortable: true,
    },
    {
      name: "Task Title",
      selector: (row) => row.Title,
    },
    {
      name: "Date",
      selector: (row) => row.Date,
    },
  ];

  const ClientOnlyTable = dynamic(() => import("react-data-table-component"), {
    ssr: false,
  });

  useEffect(() => {
    getData()
  }, []);

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
          progressPending={pending}
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
    <p dangerouslySetInnerHTML={{ __html: data.Detail }}></p>
    { data.File && <Link target="_blank" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href={data.File}> File Link </Link>}
  </div>
);
export default Reports;
