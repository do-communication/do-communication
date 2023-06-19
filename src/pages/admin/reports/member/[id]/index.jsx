import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineSearch } from "react-icons/ai";
import { BiDotsVertical, BiGroup } from "react-icons/bi";
import { HiDocumentChartBar, HiUsers } from "react-icons/hi2";
import { MdChecklist, MdTask } from "react-icons/md";
import { db} from "context/DbContext";
import { doc, getDocs, getDoc, collection } from "firebase/firestore";
import { usePathname } from 'next/navigation';

const Reports = () => {
  const [search, setSearch] = useState("");
  const [allReports, setallReports] = useState([]);
  const [reports, setReports] = useState(allReports);
  const [user, setUser] = useState("");
  let tempReport = [];
  const currentPage = usePathname();
  let i = currentPage.lastIndexOf("member/");
  const id = currentPage.slice(i+7)
  console.log(id);
  const getMem = async() => {
    const docRef = doc(db, "KalCompany", "Users", "StaffMembers", id);
    const mem = await getDoc(docRef);
    setUser(mem._document.data.value.mapValue.fields.Name.stringValue);
    const reports = mem._document.data.value.mapValue.fields.Reports.arrayValue.values;
    if(reports){
      reports.forEach(r => {
        if(r){
        tempReport.push(r.stringValue);
      }
      });}
  }
  getMem();
  const getData = async () => {
    let arr = []
    let selected = []
    const all = collection(db, "KalCompany", "Reports", "Reports");
    try {
      const doc = await getDocs(all)
      doc.forEach(d => {
        arr.push(d.data())
      });

    } catch (err) {
      console.log(err)
      setReports([{ Name: "check your connection" }])
    }
    arr.map(element => {
      if(tempReport.includes(element.Title)){
        selected.push(element)
      } 
    })
    setReports(selected)
    setallReports(selected)
  }

  useEffect(() => {
    const filteredData = allReports.filter(
      (item) =>
        (item.Title && item.Title.toLowerCase().includes(search.toLowerCase())) ||
        (item.ReportBy &&
          item.ReportBy.toLowerCase().includes(search.toLowerCase()))
    );

    if (search) {
      setReports(filteredData);
    } else {
      setReports(allReports);
    }
  }, [search]);

  const columns = [
   
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
        <h1 className="mb-5 text-2xl font-semibold">{user} Reports</h1>
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

