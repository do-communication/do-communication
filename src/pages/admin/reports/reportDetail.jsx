import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import { allReports } from "@/mock/report";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";


const ReportDetail = () => {
    const [reports, setReports] = useState(allReports);
    const router = useRouter();
    const listReport = router.query;

return(
    <AdminLayout>
        <div className="flex items-center justify-between mb-4">
            <table className="flex bg-white rounded-lg">
            
                
                    <div className="px-4 py-3 shadow-md">
                        <th className="text-left">
                            {listReport.name} - {listReport.taskTitle}
                        </th>
                <tr>
                    {listReport.report}
                </tr>
                <tr className="text-right">
                    
                    Date: {listReport.date}
                </tr>
                    </div>

                
            </table>
        </div>
    </AdminLayout>
);

};

export default ReportDetail;