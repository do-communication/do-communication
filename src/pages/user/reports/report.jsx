import UserLayout from "@/components/layouts/UserLayout/UserLayout";
import { toast } from "react-toastify";
import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import { doc, getDocs, getDoc, addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "../../../../context/DbContext";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const AddReport = () => {
  const [reportDetail, setReportDetail] = useState("");
  const [allMembers, setallMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const [data, setData] = useState({
    AssignedTo: [],
    Priority: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");

    toast.success("Report submitted successfully");
  };
  const getData = async () => {
    let arr = []
    const all = collection(db, "KalCompany", "Users", "StaffMembers");
    try {
      const doc = await getDocs(all)
      doc.forEach(d => {
        arr.push({id:d.id, data:d.data()})
      });
    } catch (err) {
      console.log(err)
      setMembers([{ Name: "check your connection" }])
    }

    setMembers(arr)
    setallMembers(arr)
  }

  return (
    <UserLayout>
      <div className="flex justify-center min-h-screen p-6 pt-4 bg-gray-100">
        <div className="container max-w-screen-lg mx-auto">
          <form>
            <h2 className="pt-0 pb-4 text-xl font-semibold text-gray-600">
              Write Report
            </h2>
            <div className="p-4 px-4 mb-6 bg-white rounded shadow-sm md:p-8">
              <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="pb-3 pl-4 text-lg font-medium">Report</p>
                  <img
                    src="/images/task.svg"
                    alt="form"
                    width={250}
                    height={800}
                    className="pt-10 sm:pb-3"
                  />
                </div>
                <div className="lg:col-span-2 ">
                  <div className="grid grid-cols-1 gap-6 text-sm gap-y-5 md:grid-cols-6">
                    <div className="md:col-span-6">
                      <label for="full_name">Report Title</label>
                      <input
                        type="text"
                        name="report_title"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                        id="task_title"
                        placeholder="enter report title"
                      />
                    </div>
                    
                    <div className="md:col-span-6">
                      <label for="detail">Detail Description</label>
                      <QuillNoSSRWrapper
                        theme="snow"
                        value={reportDetail}
                        onChange={setReportDetail}
                        placeholder="Write some description about the report"
                        style={{ height: 180 }}
                      />
                    </div>
                    <div className="md:col-span-6 mt-10 ">
                    <label for="address">Submitted To:</label>
                    <Select
                        // ref={selectInputRef}
                        isMulti
                        name="members"
                        id="assigned"
                        options={allMembers.map((member) => {
                          return { label: member.data.Name, value: member.data.Name, id:member.id, Tasks:member.data.Tasks };
                        })}
                        onChange={(selectedMembers) => {
                          setMembers(
                            selectedMembers.map((member) => member.value)
                          );
                          setData({
                            ...data,
                            AssignedTo: selectedMembers.map((member) => member.value)
                          })
                          selectedMembers.map(member => {
                            temp.push({Tasks:member.Tasks, value:member.value, id:member.id})
                          });
                          setassignedto(Array.from(new Set(temp)))
                          
                          if (assigned && assigned.classList.contains("ring-red-600")) {
                            assigned.classList.remove("ring-red-600");
                            assigned.classList.remove("ring-2");
                            assigned.placeholder = "search for a member or a group";
                          }

                        }}
                      />
                    </div>
                    <div className="md:col-span-6 ">
                      <label for="full_name">Attach File</label>
                      <input
                        type="file"
                        name="report_title"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                        id="task_title"
                        placeholder="Attach File"
                      />
                    </div>
          
                    <div className="ml-auto text-right md:col-span-6">
                      <div className="inline-flex items-end justify-end">
                        <div className="flex-row gap-10 pt-6">
                          <button className="px-4 py-2 mr-6 font-bold bg-gray-300 border-b-2 rounded hover:bg-primary text-balck">
                            Cancel
                          </button>
                          <button
                            className="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-bold"
                            onClick={handleSubmit}
                          >
                            Submit
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

export default AddReport;
