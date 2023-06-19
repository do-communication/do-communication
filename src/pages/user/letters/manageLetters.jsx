import UserLayout from "@/components/layouts/UserLayout/UserLayout";
import { letters } from "@/mock/letters";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Letters = () => {
  const [allLetters, setallLetters] = useState([]);
  const [letters, setLetters] = useState(allLetters);
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
      selector: (row) => row.createdAt,
    },
  ];

  const ClientOnlyTable = dynamic(() => import("react-data-table-component"), {
    ssr: false,
  });

  return (
    <UserLayout>
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
          data={letters}
          pagination={true}
          expandableRows
          expandableRowsComponent={ShowLetterDetail}
        />
      </div>
    </UserLayout>
  );
};

const ShowLetterDetail = ({ data }) => (
  <div className="px-8 py-4">
    <h1 className="pb-2 text-lg font-semibold">Letter Detail</h1>
    <p dangerouslySetInnerHTML={{ __html: data.Detail }}></p>
  </div>
);
export default Letters;
