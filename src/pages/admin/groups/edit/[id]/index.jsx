import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import { useState, useEffect } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import Router from "next/router";
const router = Router
import { doc, getDocs, getDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import { usePathname } from 'next/navigation';
import { db } from "../../../../../../context/DbContext";

const CreateGroup = () => {
  const [allMembers, setallMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const [showCustomType, setShowCustomType] = useState(false);
  const selected = [];
  const ids = [];
  const currentPage = usePathname();
  let i = currentPage.lastIndexOf("edit/");
  const id = currentPage.slice(i + 5)
  const [data, setData] = useState({
    Type: '',
    Name: '',
    Members: [],
    Learder: '',
    Tasks: [],
    Reports: [],
    People: []
  });
  const customGroup = document.getElementById("customGroup");
  const type = document.getElementById("type");
  const groupName = document.getElementById("groupName");
  const getMem = async () => {
    const docRef = doc(db, "KalCompany", "Groups", "Groups", id);
    // const user = ;
    const mem = await getDoc(docRef);
    let tempTask = [];
    let tempReport = [];
    let tempGroup = [];
    let tempPeople = [];
    const task = mem._document.data.value.mapValue.fields.Tasks.arrayValue.values;
    const report = mem._document.data.value.mapValue.fields.Reports.arrayValue.values;
    const group = mem._document.data.value.mapValue.fields.Members.arrayValue.values;
    const people = mem._document.data.value.mapValue.fields.People.arrayValue.values;
    if (task) {
      task.forEach(t => {
        if (t) {
          tempTask.push(t.stringValue);
        }
      });
    }
    if (report) {
      report.forEach(r => {
        if (r) {
          tempReport.push(r.stringValue);
        }
      });
    }
    if (group) {
      group.forEach(g => {
        if (g) {
          tempGroup.push(g.stringValue);
        }
      });
    }
    if (people) {
      people.forEach(p => {
        if (p) {
          tempPeople.push(p.stringValue);
        }
      });
    }
    setData({
      Type: mem._document.data.value.mapValue.fields.Type.stringValue,
      Name: mem._document.data.value.mapValue.fields.Name.stringValue,
      Learder: mem._document.data.value.mapValue.fields.Learder.stringValue,
      Members: tempGroup,
      Reports: tempReport,
      Tasks: tempTask,
      People: tempPeople
    })
  }
  useEffect(() => {
    getMem()

  }, [])
  const getData = async () => {
    let arr = []
    const all = collection(db, "KalCompany", "Users", "StaffMembers");
    try {
      const doc = await getDocs(all)
      doc.forEach(d => {
        arr.push({ id: d.id, data: d.data() })
      });
    } catch (err) {
      console.log(err)
      setMembers([{ Name: "check your connection" }])
    }

    setMembers(arr)
    setallMembers(arr)
  }
  const updateMember = async (i) => {
    const docRef = doc(db, "KalCompany", "Users", "StaffMembers", i);
    const mem = await getDoc(docRef)
    let tempGroup = [];
    let tempReport = [];
    let tempTask = [];
    const temp = mem._document.data.value.mapValue.fields.GroupId.arrayValue.values;
    const report = mem._document.data.value.mapValue.fields.Reports.arrayValue.values;
    const task = mem._document.data.value.mapValue.fields.Tasks.arrayValue.values;
    if (temp) {
      temp.forEach(t => {
        if (t) {
          tempGroup.push(t.stringValue);
        }
      });
    }
    if (report) {
      report.forEach(r => {
        if (r) {
          tempReport.push(r.stringValue);
        }
      });
    }
    if (task) {
      task.forEach(ts => {
        if (ts) {
          tempTask.push(ts.stringValue);
        }
      });
    }
    tempGroup.push(data.Name)
    const newData = {
      Name: mem._document.data.value.mapValue.fields.Name.stringValue,
      Address: mem._document.data.value.mapValue.fields.Address.stringValue,
      Email: mem._document.data.value.mapValue.fields.Email.stringValue,
      Gender: mem._document.data.value.mapValue.fields.Gender.stringValue,
      Department: mem._document.data.value.mapValue.fields.Department.stringValue,
      PhoneNumber: mem._document.data.value.mapValue.fields.PhoneNumber.stringValue,
      DateOfBirth: mem._document.data.value.mapValue.fields.DateOfBirth.stringValue,
      ProfilePic: mem._document.data.value.mapValue.fields.ProfilePic.stringValue,
      Reports: tempReport,
      Tasks: tempTask,
      RegisteredAt: mem._document.data.value.mapValue.fields.RegisteredAt.stringValue,
      GroupId: tempGroup
    }
    updateDoc(docRef, newData)
      .then(docRef => {
        console.log("A New Document Field has been added to an existing document");
      })
      .catch(error => {
        console.log(error);
      })
  }
  const handleCreateGroup = async () => {
    data.People.forEach(m => {
      updateMember(m);
    });

    const docRef = doc(db, "KalCompany", "Groups", "Groups", id);
    updateDoc(docRef, data)
      .then(docRef => {
        clearForm();
        toast.success("Group edited successfully");
      })
      .catch(error => {
        console.log(error);
      })

  };

  const clearForm = () => {
    if (customGroup) { customGroup.value = ""; }
    groupName.value = "";
    groupName.placeholder = "Enter Group Name";
    type.value = "";
  };
  useEffect(() => {
    getData()
  }, []);
  return (
    <AdminLayout>
      <div className="flex justify-center min-h-screen p-6 pt-8 bg-gray-100">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="pt-0 pb-4 text-xl font-semibold text-gray-600">
              Edit Group
            </h2>

            <div className="p-4 px-4 mb-6 bg-white rounded shadow-sm md:p-8">
              <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3">
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
                  <div className="grid grid-cols-1 gap-6 text-sm gap-y-5 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Group Name</label>
                      <input
                        type="text"
                        name="group_name"
                        id="groupName"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                        placeholder="Enter group name"
                        value={data.Name}
                        onChange={(e) => {
                          setData({
                            ...data,
                            Name: e.target.value
                          })
                        }}
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="type">Group Type</label>
                      <select
                        id="type"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                        value={data.Type}
                        onChange={(e) => {
                          if (e.target.value.toLowerCase() == "custom") {
                            setShowCustomType(true);
                            setData({
                              ...data,
                              Type: ""
                            })
                          } else {
                            setData({
                              ...data,
                              Type: e.target.value
                            })
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
                          className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                          placeholder="Enter custom group type"
                          disabled={!showCustomType}
                          value={data.Type}
                          onChange={(e) =>

                            setData({
                              ...data,
                              Type: e.target.value
                            })}
                        />
                      </div>
                    )}
                    <div className="md:col-span-5">
                      <label htmlFor="members">Add Members</label>
                      <Select
                        isMulti
                        name="members"
                        options={allMembers.map((member) => {
                          return { label: member.data.Name, value: member.data.Name, GroupId: member.data.GroupId, id: member.id };
                        })}
                        val
                        onChange={(selectedMembers) => {
                          setMembers(
                            selectedMembers.map((member) => member.value)
                          );

                          selectedMembers.map(member => {
                            selected.push({ GroupId: member.GroupId, value: member.value, id: member.id });
                            ids.push(member.id);
                          });
                          setData({
                            ...data,
                            Members: selectedMembers.map((member) => member.value),
                            People: Array.from(new Set(ids))
                          })
                        }}
                      />
                    </div>
                    <div className="ml-auto text-right md:col-span-6">
                      <div className="inline-flex items-end justify-end">
                        <div className="flex-row gap-10 pt-8">
                          <button
                            onClick={clearForm}
                            className="px-4 py-2 mr-6 font-bold bg-gray-300 border-b-2 rounded hover:bg-primary text-balck"
                          >
                            Cancel
                          </button>
                          <button
                            disabled={!data.Name || !data.Type || !data.Members.length}
                            className="px-4 py-2 font-bold text-white rounded disabled:brightness-90 disabled:cursor-not-allowed bg-primary hover:bg-bold"
                            onClick={handleCreateGroup}
                          >
                            Edit
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
