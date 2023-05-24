import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import { allReports } from "@/mock/report";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import DataTable from "react-data-table-component";
import {
    AiOutlineSearch,
  } from "react-icons/ai";
import { BiDotsVertical, BiGroup } from "react-icons/bi";
import { HiDocumentChartBar, HiUsers } from "react-icons/hi2";
import { MdChecklist, MdTask } from "react-icons/md";


const Reports = () => {
    const [reports, setReports] = useState(allReports);
    const [search, setSearch] = useState("");


    useEffect(() =>{
        const filteredData = allReports.filter(
            (item) => 
            item.name && item.name.toLowerCase().includes(search.toLowerCase())
            || item.taskTitle && item.taskTitle.toLowerCase().includes(search.toLowerCase())
        );

        if (search) {
            setReports(filteredData);
        } else {
            setReports(allReports);
        }
    }, [search]);


    return(

    <AdminLayout>
        <div className="grid min-h-full grid-cols-3 gap-x-6 gap-y-6">
            <div className="order-last md:col-span-3 col-span-full md:order-first">
                <h1 className="mb-4 text-3xl font-semibold">Reports</h1>
                <div className="flex items-center justify-between mb-4">
                   <div className="flex pr-4 bg-white border-gray-700 rounded-md">
                    <input 
                        type="search" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="py-2 pl-4 bg-transparent outline-none"
                        placeholder="Search from Reports" 
                    />
                    <AiOutlineSearch className="w-6 h-auto" />
                   </div>
                </div>


                <div className="flex items-center justify-between mb-4">
                    <table className="flex bg-white rounded-lg">
                        <tr>
                        {reports.map((listReport) => (
                            <div className="px-4 py-3 shadow-md">
                                <th className="text-left">
                                    {listReport.name} - {listReport.taskTitle}
                                </th>
                                <tr>
                                    {listReport.report}
                                </tr>
                                <tr className="text-right">
                                    <Link  href = {{ 
                                        pathname: '/admin/reports/reportDetail',
                                        query: listReport
                                    }} className= "text-cyan-700 pr-1">Read More </Link>
                                    Date: {listReport.date}
                                </tr>
                            </div>
                        ))}
                        </tr>
                    </table>
                </div>
                    
            </div>

           
           
        </div>

    </AdminLayout>

    );

};

export default Reports;