import UserLayout from "@/components/layouts/UserLayout/UserLayout";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { auth } from "../../../../config/firebase";
import { db } from "../../../../context/DbContext";
import dynamic from "next/dynamic";
import useFetch from "@/components/useFetch";

const ClientOnlyEditor = dynamic(
  () => import("@tinymce/tinymce-react").then((module) => module.Editor),
  { ssr: false, loading: () => <p>Loading ...</p> }
);

const AddLetter = () => {
  const { GetCompanyName } = useFetch("KalCompany");
  const editorRef = useRef(null);
  const [comp, setcomp] = useState("");
  const setComp = async () => {
    setcomp(await GetCompanyName());
  };
  setComp();
  const [reportDetail, setReportDetail] = useState("");
  const [data, setData] = useState({
    To: "",
    Address: "",
    Subject: "",
    Body: "",
    From: auth.currentUser.displayName,
    Date: new Date().toDateString(),
    Company: comp.companyName,
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

  useEffect(() => {
    const value = { ...data, Company: comp.companyName };
    setData(value);
  }, [comp]);

  return (
    <UserLayout>
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
                      <ClientOnlyEditor
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        apiKey="g1yw7n29lj6bkf1dco2yof3tac3lznaq0g325pdit2lczvxk"
                        init={{
                          height: 200,
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
                    <div className="mt-4 md:col-span-6 "></div>
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
    </UserLayout>
  );
};

export default AddLetter;
