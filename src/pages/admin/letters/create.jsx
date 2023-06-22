import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import { toast } from "react-toastify";
import {
  doc,
  getDocs,
  getDoc,
  addDoc,
  collection,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { auth } from "../../../../config/firebase";
const user = auth.currentUser;
import { db } from "../../../../context/DbContext";
import { RiAttachment2 } from "react-icons/ri";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const AddReport = () => {
  const [reportDetail, setReportDetail] = useState("");
  const [data, setData] = useState({
    To: "",
    Address: "",
    Subject: "",
    Body: "",
    From: user.displayName,
  });
  const to = document.getElementById("to");
  const address = document.getElementById("address");
  const body = document.getElementById("body");
  const subject = document.getElementById("subject");
  const handleClear = () => {
    // setReportDetail("");
    to.value = "";
    to.placeholder = "enter recipient name";
    address.value = "";
    address.placeholder = "enter recipient address";
    body.placeholder = "Write body part of the letter";
    subject.value = "";
    subject.placeholder = "enter report title";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "KalCompany", "Letter", "Letter"), data);
    handleClear();
    toast.success("Letter Created successfully");
    // create it in firestore
    // redirect to /letters/[letterId]
  };
  useEffect(() => {
    const value = { ...data, Body: reportDetail };
    setData(value);
  }, [reportDetail]);

  return (
    <AdminLayout>
      <div className="flex min-h-screen justify-center bg-gray-100 p-6 pt-2">
        <div className="container mx-auto max-w-screen-lg">
          <form>
            <h2 className="pb-4 pt-0 text-xl font-semibold text-gray-600">
              Write a Letter
            </h2>
            <div className="mb-6 rounded bg-white p-4 px-4 shadow-sm md:p-8">
              <div className="grid grid-cols-1 gap-4 gap-y-2 text-sm lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="pb-3 pl-4 text-lg font-medium">Letter</p>
                  <img
                    src="/images/letter.svg"
                    alt="form"
                    width={250}
                    height={800}
                    className="pt-10 sm:pb-3"
                  />
                </div>
                <div className="flex flex-col gap-3 lg:col-span-2 ">
                  <div className="md:col-span-6">
                    <label htmlFor="full_name"> To:</label>
                    <input
                      type="text"
                      name="report_title"
                      className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                      id="to"
                      placeholder="enter recipient name"
                      value={data.To}
                      onChange={(e) => {
                        setData({ ...data, To: e.target.value });
                      }}
                    />
                  </div>
                  <div className="md:col-span-6">
                    <label htmlFor="full_name">Address:</label>
                    <input
                      type="text"
                      name="report_title"
                      className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                      id="address"
                      placeholder="enter recipient address"
                      value={data.Address}
                      onChange={(e) => {
                        setData({ ...data, Address: e.target.value });
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-6 gap-y-5 text-sm md:grid-cols-6">
                    <div className="md:col-span-6">
                      <label htmlFor="full_name"> Subject:</label>
                      <input
                        type="text"
                        name="report_title"
                        className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                        id="subject"
                        placeholder="enter report title"
                        value={data.Subject}
                        onChange={(e) => {
                          setData({ ...data, Subject: e.target.value });
                        }}
                      />
                    </div>

                    <div className="md:col-span-6">
                      <label htmlFor="detail">Body</label>
                      <QuillNoSSRWrapper
                        theme="snow"
                        id="body"
                        value={reportDetail}
                        onChange={(e) => {
                          setReportDetail(e.slice(3, e.lastIndexOf("</p>")));
                        }}
                        placeholder="Write body part of the letter"
                        style={{ height: 180 }}
                      />
                    </div>
                    <div className="mt-10 md:col-span-6 "></div>
                    <div className="ml-auto text-right md:col-span-6">
                      <div className="inline-flex items-end justify-end">
                        <div className="flex-row gap-10 ">
                          <button
                            onClick={handleClear}
                            className="text-balck mr-6 rounded border-b-2 bg-gray-300 px-4 py-2 font-bold hover:bg-primary"
                          >
                            Cancel
                          </button>
                          <button
                            className="rounded bg-primary px-4 py-2 font-bold text-white hover:bg-bold"
                            onClick={handleSubmit}
                          >
                            Compose Letter
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddReport;
