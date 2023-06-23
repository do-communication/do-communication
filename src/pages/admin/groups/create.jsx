import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import {
  doc,
  getDocs,
  getDoc,
  addDoc,
  collection,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../../../context/DbContext";
import Select from "react-select";
import { toast } from "react-toastify";
import Router from "next/router";

const router = Router;
const CreateGroup = () => {
  const [allMembers, setallMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const [assigned, setassignedto] = useState([]);
  const [showCustomType, setShowCustomType] = useState(false);
  const selected = [];
  const ids = [];
  const [data, setData] = useState({
    Type: "",
    Name: "",
    Members: [],
    Learder: "",
    Tasks: [],
    Reports: [],
    People: [],
  });
  const customGroup = document.getElementById("customGroup");
  const type = document.getElementById("type");
  const groupName = document.getElementById("groupName");

  const getData = async () => {
    let arr = [];
    const all = collection(db, "KalCompany", "Users", "StaffMembers");
    try {
      const doc = await getDocs(all);
      doc.forEach((d) => {
        arr.push({ id: d.id, data: d.data() });
      });
    } catch (err) {
      console.log(err);
      setMembers([{ Name: "check your connection" }]);
    }

    setMembers(arr);
    setallMembers(arr);
  };
  const updateMember = async (i) => {
    const docRef = doc(db, "KalCompany", "Users", "StaffMembers", i);
    const mem = await getDoc(docRef);
    let tempGroup = [];
    let tempReport = [];
    let tempTask = [];
    const temp =
      mem._document.data.value.mapValue.fields.GroupId.arrayValue.values;
    const report =
      mem._document.data.value.mapValue.fields.Reports.arrayValue.values;
    const task =
      mem._document.data.value.mapValue.fields.Tasks.arrayValue.values;
    if (temp) {
      temp.forEach((t) => {
        if (t) {
          tempGroup.push(t.stringValue);
        }
      });
    }
    if (report) {
      report.forEach((r) => {
        if (r) {
          tempReport.push(r.stringValue);
        }
      });
    }
    if (task) {
      task.forEach((ts) => {
        if (ts) {
          tempTask.push(ts.stringValue);
        }
      });
    }
    tempGroup.push(data.Name);
    const newData = {
      Name: mem._document.data.value.mapValue.fields.Name.stringValue,
      Address: mem._document.data.value.mapValue.fields.Address.stringValue,
      Email: mem._document.data.value.mapValue.fields.Email.stringValue,
      Gender: mem._document.data.value.mapValue.fields.Gender.stringValue,
      Department:
        mem._document.data.value.mapValue.fields.Department.stringValue,
      PhoneNumber:
        mem._document.data.value.mapValue.fields.PhoneNumber.stringValue,
      DateOfBirth:
        mem._document.data.value.mapValue.fields.DateOfBirth.stringValue,
      ProfilePic:
        mem._document.data.value.mapValue.fields.ProfilePic.stringValue,
      Reports: tempReport,
      Tasks: tempTask,
      RegisteredAt:
        mem._document.data.value.mapValue.fields.RegisteredAt.stringValue,
      GroupId: tempGroup,
    };
    updateDoc(docRef, newData)
      .then((docRef) => {
        console.log(
          "A New Document Field has been added to an existing document"
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleCreateGroup = async () => {
    assigned.forEach((m) => {
      updateMember(m.id);
    });

    await addDoc(collection(db, "KalCompany", "Groups", "Groups"), data);
    clearForm();
    toast.success("Group created successfully");
  };

  const clearForm = () => {
    if (customGroup) {
      customGroup.value = "";
    }
    groupName.value = "";
    groupName.placeholder = "Enter Group Name";
    type.value = "";
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <AdminLayout>
      <div className="flex min-h-screen justify-center bg-gray-100 p-6 pt-8">
        <div className="container mx-auto max-w-screen-lg">
          <div>
            <h2 className="pb-4 pt-0 text-xl font-semibold text-gray-600">
              Create Group
            </h2>

            <div className="mb-6 rounded bg-white p-4 px-4 shadow-sm md:p-8">
              <div className="grid grid-cols-1 gap-4 gap-y-2 text-sm lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="pb-3 pl-4 text-lg font-medium">Group Detail</p>
                  <img
                    src="/images/form1.svg"
                    alt="form"
                    width={250}
                    height={800}
                    className="pt-10 sm:pb-3"
                  />
                </div>

                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 gap-6 gap-y-5 text-sm md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Group Name</label>
                      <input
                        type="text"
                        name="group_name"
                        id="groupName"
                        className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                        placeholder="Enter group name"
                        value={data.Name}
                        onChange={(e) => {
                          setData({
                            ...data,
                            Name: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="type">Group Type</label>
                      <select
                        id="type"
                        className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                        value={data.Type}
                        onChange={(e) => {
                          if (e.target.value.toLowerCase() == "custom") {
                            setShowCustomType(true);
                            setData({
                              ...data,
                              Type: "",
                            });
                          } else {
                            setData({
                              ...data,
                              Type: e.target.value,
                            });
                            setShowCustomType(false);
                          }
                        }}
                      >
                        <option value="">Select Group Type</option>
                        <option value="department">Department</option>
                        <option value="project">Project</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>

                    {/* if custom type is selected */}
                    {showCustomType && (
                      <div className="md:col-span-5">
                        <label htmlFor="custom_group_type">
                          Custom Group Type
                        </label>
                        <input
                          type="text"
                          name="custom_group_type"
                          id="customGroup"
                          className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                          placeholder="Enter custom group type"
                          disabled={!showCustomType}
                          value={data.Type}
                          onChange={(e) =>
                            setData({
                              ...data,
                              Type: e.target.value,
                            })
                          }
                        />
                      </div>
                    )}
                    <div className="md:col-span-5">
                      <label htmlFor="members">Add Members</label>
                      <Select
                        isMulti
                        name="members"
                        options={allMembers.map((member) => {
                          return {
                            label: member.data.Name,
                            value: member.data.Name,
                            GroupId: member.data.GroupId,
                            id: member.id,
                          };
                        })}
                        val
                        onChange={(selectedMembers) => {
                          setMembers(
                            selectedMembers.map((member) => member.value)
                          );

                          selectedMembers.map((member) => {
                            selected.push({
                              value: member.value,
                              id: member.id,
                            });
                            ids.push(member.id);
                          });
                          setassignedto(Array.from(new Set(selected)));
                          setData({
                            ...data,
                            Members: selectedMembers.map(
                              (member) => member.value
                            ),
                            People: Array.from(new Set(ids)),
                          });
                        }}
                      />
                    </div>
                    <div className="ml-auto text-right md:col-span-6">
                      <div className="inline-flex items-end justify-end">
                        <div className="flex-row gap-10 pt-8">
                          <button
                            onClick={clearForm}
                            className="text-balck mr-6 rounded border-b-2 bg-gray-300 px-4 py-2 font-bold hover:bg-primary"
                          >
                            Cancel
                          </button>
                          <button
                            disabled={
                              !data.Name || !data.Type || !data.Members.length
                            }
                            className="rounded bg-primary px-4 py-2 font-bold text-white hover:bg-bold disabled:cursor-not-allowed disabled:brightness-90"
                            onClick={handleCreateGroup}
                          >
                            Create Group
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateGroup;
