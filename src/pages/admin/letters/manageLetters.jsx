import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
// import { letters } from "@/mock/letters";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiPrinter } from "react-icons/bi";
import { db } from "../../../../context/DbContext"
import { doc, getDocs, getDoc, collection, deleteDoc } from "firebase/firestore";
import useFetch from "@/components/useFetch";
import { auth } from "../../../../config/firebase";
const user = auth.currentUser;

const Letters = () => {
  const { GetCompanyName } = useFetch("KalCompany")
  const [allLetters, setallLetters] = useState([]);
  const [letters, setLetters ] = useState([]);
  const [search, setSearch] = useState("");
  let comp = "";
  const getData = async () => {
    let arr = []
    let temp = []
    const all = collection(db, "KalCompany", "Letter", "Letter");
    try {
      const doc = await getDocs(all)
      doc.forEach(d => {
        if(d._document.data.value.mapValue.fields.From.stringValue === user.displayName){
        arr.push({id:d.id, data:d.data()})}
      });

    } catch (err) {
      console.log(err)
      setLetters([{ Name: "check your connection" }])
    }
    setLetters(arr)
    setallLetters(arr)
  }

  useEffect(async() => {
    getData();
    comp = await GetCompanyName()
  }, []);

  const columns = [
    {
      name: "Subject",
      selector: (row) => row.data.Subject,
    },
    {
      name: "To",
      selector: (row) => row.data.To,
    },
    {
      name: "Date",
      selector: (row) => row.data.Date,
    },
  ];

  const ClientOnlyTable = dynamic(() => import("react-data-table-component"), {
    ssr: false,
  });

  return (
    <AdminLayout>
      <div className="order-last col-span-full md:order-first md:col-span-2">
        <h1 className="mb-5 text-2xl font-semibold">My Letters</h1>
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:justify-between md:items-center">
          <div className="flex rounded-md border-gray-700 bg-white pr-4 ">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-11/12 bg-transparent py-2 pl-4 outline-none"
              placeholder="Search letters"
            />
            <AiOutlineSearch className="h-auto w-6" />
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
    <div className="flex flex-col gap-10 bg-gray-200 px-8 py-4">
      <div className="mx-auto flex w-3/4 items-center justify-between pt-4">
        <h3 className="text-2xl">View Letter</h3>
        {!isPrinting && (
          <button
            className="flex justify-center rounded bg-slate-600 px-5 py-1 text-white hover:bg-slate-500"
            onClick={handlePrint}
          >
            <BiPrinter className="h-auto w-6" />
          </button>
        )}
      </div>
      <div
        className="mx-auto flex w-3/4 flex-col gap-10 rounded bg-white px-10 py-24 "
        id="print-preview"
        ref={printPreviewRef}
      >
        <div className="flex flex-col gap-1">
          <p>{data.data.Company}</p>
          <p>{data.data.Address}</p>
        </div>
        <h3>{data.data.Date}</h3>
        <div className="flex flex-col gap-1">
          <p>{data.data.To}</p>
          <p>{data.data.Address}</p>
        </div>

        <h3 className="font-semibold">Subject: {data.data.Subject}</h3>

        <p>{data.data.Body}</p>
      </div>
    </div>
  );
};

export default Letters;
