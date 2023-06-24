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

const ClientOnlyEditor = dynamic(
  () => import("@tinymce/tinymce-react").then((module) => module.Editor),
  { ssr: false, loading: () => <p>Loading ...</p> }
);

const AddLetter = () => {
  const [reportDetail, setReportDetail] = useState("");
  const editorRef = useRef(null);
  const [data, setData] = useState({
    To: "",
    Address: "",
    Subject: "",
    Body: "",
    From: user.displayName,
  });
  const to = document.getElementById("to");
  const address = document.getElementById("address");
  const subject = document.getElementById("subject");
  const handleClear = () => {
    // setReportDetail("");
    to.value = "";
    to.placeholder = "enter recipient name";
    address.value = "";
    address.placeholder = "enter recipient address";
    subject.value = "";
    subject.placeholder = "enter report title";
    editorRef.current.setContent("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newLetter = {
      ...data,
      Body: editorRef.current.getContent(),
    };

    await addDoc(collection(db, "KalCompany", "Letter", "Letter"), newLetter);
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
      <div className="flex justify-center min-h-screen p-6 pt-2 bg-gray-100">
        <div className="container max-w-screen-lg mx-auto">
          <form>
            <h2 className="pt-0 pb-4 text-xl font-semibold text-gray-600">
              Write a Letter
            </h2>
            <div className="p-4 px-4 mb-6 bg-white rounded shadow-sm md:p-8">
              <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3">
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
                      className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
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
                      className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      id="address"
                      placeholder="enter recipient address"
                      value={data.Address}
                      onChange={(e) => {
                        setData({ ...data, Address: e.target.value });
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-6 text-sm gap-y-5 md:grid-cols-6">
                    <div className="md:col-span-6">
                      <label htmlFor="full_name"> Subject:</label>
                      <input
                        type="text"
                        name="report_title"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
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
                      {/* <QuillNoSSRWrapper
                        theme="snow"
                        id="body"
                        value={reportDetail}
                        onChange={(e) => {
                          setReportDetail(e.slice(3, e.lastIndexOf("</p>")));
                        }}
                        placeholder="Write body part of the letter"
                        style={{ height: 180 }}
                      /> */}
                      <ClientOnlyEditor
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        apiKey="g1yw7n29lj6bkf1dco2yof3tac3lznaq0g325pdit2lczvxk"
                        init={{
                          height: 500,
                          menubar: false,
                          plugins: [
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "help",
                            "wordcount",
                          ],
                          toolbar:
                            "undo redo | casechange blocks | bold italic backcolor | " +
                            "alignleft aligncenter alignright alignjustify | " +
                            "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
                          content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                      />
                    </div>
                    <div className="mt-10 md:col-span-6 "></div>
                    <div className="ml-auto text-right md:col-span-6">
                      <div className="inline-flex items-end justify-end">
                        <div className="flex-row gap-10 ">
                          <button
                            onClick={handleClear}
                            type="button"
                            className="px-4 py-2 mr-6 font-bold bg-gray-300 border-b-2 rounded text-balck hover:bg-primary"
                          >
                            Cancel
                          </button>
                          <button
                            className="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-bold"
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

export default AddLetter;
