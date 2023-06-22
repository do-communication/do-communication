import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import { letters } from "@/mock/letters";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiPrinter } from "react-icons/bi";

const Letters = () => {
  const [allLetters, setallLetters] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setallLetters(letters);
  }, []);

  const columns = [
    {
      name: "Subject",
      selector: (row) => row.subject,
    },
    {
      name: "To",
      selector: (row) => row.to,
    },
    {
      name: "Date",
      selector: (row) => row.createdAt.toDateString(),
    },
  ];

  const ClientOnlyTable = dynamic(() => import("react-data-table-component"), {
    ssr: false,
  });

  return (
    <AdminLayout>
      <div className="order-last md:col-span-2 col-span-full md:order-first">
        <h1 className="mb-5 text-2xl font-semibold">My Letters</h1>
        <div className="flex flex-col gap-4 mb-4 md:items-center sm:justify-between sm:flex-row">
          <div className="flex pr-4 bg-white border-gray-700 rounded-md ">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-11/12 py-2 pl-4 bg-transparent outline-none"
              placeholder="Search letters"
            />
            <AiOutlineSearch className="w-6 h-auto" />
          </div>
        </div>
        <ClientOnlyTable
          columns={columns}
          data={allLetters}
          pagination={true}
          expandableRows
          expandableRowsComponent={ShowLetterDetail}
        />
      </div>
    </AdminLayout>
  );
};

const ShowLetterDetail = ({ data }) => {
  const [isPrinting, setIsPrinting] = useState(false);
  const printPreviewRef = useRef(null);

  const handlePrint = () => {
    setIsPrinting(true);
    const printContent = printPreviewRef.current.innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    setIsPrinting(false);
  };

  return (
    <div className="flex flex-col gap-10 px-8 py-4 bg-gray-200">
      <div className="flex justify-between items-center w-3/4 mx-auto pt-4">
        <h3 className="text-2xl">View Letter</h3>
        {!isPrinting && (
          <button
            className="bg-slate-600 text-white px-5 py-1 hover:bg-slate-500 flex justify-center rounded"
            onClick={handlePrint}
          >
            <BiPrinter className="w-6 h-auto" />
          </button>
        )}
      </div>
      <div
        className="bg-white flex flex-col gap-10 w-3/4 mx-auto rounded px-10 py-24 "
        id="print-preview"
        ref={printPreviewRef}
      >
        <div className="flex flex-col gap-1">
          <p>Company Name</p>
          <p>Address, Location</p>
        </div>
        <h3>{data.createdAt.toString()}</h3>
        <div className="flex flex-col gap-1">
          <p>Mr. Name</p>
          <p>Address, Location</p>
        </div>

        <h3 className="font-semibold">Subject: {data.subject}</h3>

        <p>{data.body}</p>
      </div>
    </div>
  );
};

export default Letters;
