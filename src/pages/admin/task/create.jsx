import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import {
  doc,
  getDocs,
  getDoc,
  addDoc,
  collection,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { db } from "../../../../context/DbContext";
import { toast } from "react-toastify";
import Select from "react-select";
import { auth } from "../../../../config/firebase";
const user = auth.currentUser;
// const selectInputRef = useRef();

const AddMember = () => {
  const [allMembers, setallMembers] = useState([]);
  const temp = [];
  const [assignedto, setassignedto] = useState([]);
  const [members, setMembers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [allgroups, setallGroups] = useState([]);
  const taskTo = [];
  const [data, setData] = useState({
    Title: "",
    Description: "",
    AssignedTo: [],
    Priority: "",
    StartDate: new Date("10/10/2030"),
    DueDate: new Date("10/10/2030"),
    Status: "assigned",
    AssignedBy: user.displayName,
  });
  const getData = async () => {
    let arr = [];
    let groups = [];
    const all = collection(db, "KalCompany", "Users", "StaffMembers");
    const allGroup = collection(db, "KalCompany", "Groups", "Groups");
    try {
      const doc = await getDocs(all);
      doc.forEach((d) => {
        arr.push({ id: d.id, data: d.data() });
      });
    } catch (err) {
      console.log(err);
      setMembers([{ Name: "check your connection" }]);
    }
    try {
      const doc = await getDocs(allGroup);
      doc.forEach((d) => {
        groups.push({ id: d.id, data: d.data() });
      });
    } catch (err) {
      console.log(err);
      setGroups([{ Name: "check your connection" }]);
    }
    arr.map((m) => {
      taskTo.push(m);
    });
    groups.map((m) => {
      taskTo.push(m);
    });
    setMembers(taskTo);
    setallMembers(taskTo);
    setGroups(groups);
    setallGroups(groups);
  };
  // useEffect(()=>{
  //   setTaskTo(Object.assign(allMembers, allgroups))
  // },[allgroups, allMembers] )
  const updateMember = async (i) => {
    const docRef = doc(db, "KalCompany", "Users", "StaffMembers", i);
    const mem = await getDoc(docRef);
    if (mem._document) {
      let tempTask = [];
      let tempReport = [];
      let tempGroup = [];
      const temp =
        mem._document.data.value.mapValue.fields.Tasks.arrayValue.values;
      const report =
        mem._document.data.value.mapValue.fields.Reports.arrayValue.values;
      const group =
        mem._document.data.value.mapValue.fields.GroupId.arrayValue.values;
      if (temp) {
        temp.forEach((t) => {
          if (t) {
            tempTask.push(t.stringValue);
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
      tempTask.push(data.Title);
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
        RegisteredAt:
          mem._document.data.value.mapValue.fields.RegisteredAt.stringValue,
        GroupId: tempGroup,
        Reports: tempReport,
        Tasks: tempTask,
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
    } else {
      const groupRef = doc(db, "KalCompany", "Groups", "Groups", i);
      const group = await getDoc(groupRef);
      let tempTask = [];
      let tempReport = [];
      let tempGroup = [];
      let tempPeople = [];
      const task =
        group._document.data.value.mapValue.fields.Tasks.arrayValue.values;
      const report =
        group._document.data.value.mapValue.fields.Reports.arrayValue.values;
      const members =
        group._document.data.value.mapValue.fields.Members.arrayValue.values;
      const people =
        group._document.data.value.mapValue.fields.People.arrayValue.values;
      if (people) {
        people.forEach((p) => {
          if (p) {
            tempPeople.push(p.stringValue);
          }
        });
      }
      if (task) {
        task.forEach((t) => {
          if (t) {
            tempTask.push(t.stringValue);
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
      if (members) {
        members.forEach((g) => {
          if (g) {
            tempGroup.push(g.stringValue);
          }
        });
      }
      tempTask.push(data.Title);
      const newGroup = {
        People: tempPeople,
        Type: group._document.data.value.mapValue.fields.Type.stringValue,
        Name: group._document.data.value.mapValue.fields.Name.stringValue,
        Members: tempGroup,
        Reports: tempReport,
        Tasks: tempTask,
        Learder: group._document.data.value.mapValue.fields.Learder.stringValue,
      };
      updateDoc(groupRef, newGroup)
        .then((groupRef) => {
          console.log(
            "A New Document Field has been added to an existing document"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const select = document.getElementById("selectPriority");
  const title = document.getElementById("title");
  const start = document.getElementById("start");
  const end = document.getElementById("end");
  const description = document.getElementById("description");
  const assigned = document.getElementById("assigned");
  const startDate = document.getElementById("startDate");
  const endDate = document.getElementById("endDate");

  select &&
    select.addEventListener("change", function handleChange(event) {
      setData({
        ...data,
        Priority: event.target.value,
      });
      if (select && select.classList.contains("ring-red-600")) {
        select.classList.remove("ring-red-600");
        select.classList.remove("ring-2");
      }
    });
  const handleTitle = (e) => {
    e.preventDefault();
    setData({
      ...data,
      Title: e.target.value,
    });
    if (title && title.classList.contains("ring-red-600")) {
      title.classList.remove("ring-red-600");
      title.classList.remove("ring-2");
      title.placeholder = "";
    }
  };
  const handleDescription = (e) => {
    e.preventDefault();
    setData({
      ...data,
      Description: e.target.value,
    });
    if (description && description.classList.contains("ring-red-600")) {
      description.classList.remove("ring-red-600");
      description.classList.remove("ring-2");
      description.placeholder = "Write some description about the task";
    }
  };
  const handleStart = (e) => {
    e.preventDefault();
    setData({
      ...data,
      StartDate: e.target.value,
    });
    if (start && start.classList.contains("ring-red-600")) {
      start.classList.remove("ring-red-600");
      start.classList.remove("ring-2");
      startDate.placeholder = "MM/DD/YYYY";
    }
  };
  const handleEnd = (e) => {
    e.preventDefault();
    setData({
      ...data,
      DueDate: e.target.value,
    });
    if (end && end.classList.contains("ring-red-600")) {
      end.classList.remove("ring-red-600");
      end.classList.remove("ring-2");
      endDate.placeholder = "MM/DD/YYYY";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && data.Title == "") {
      title.placeholder = "You should enter the Title";
      title.classList.add("ring-red-600");
      title.classList.add("ring-2");
    }
    if (assigned && data.AssignedTo === []) {
      assigned.placeholder = "Fill name of the member or group";
      assigned.classList.add("ring-red-600");
      assigned.classList.add("ring-2");
    }
    if (description && data.Description == "") {
      description.placeholder = "You should enter a task description";
      description.classList.add("ring-red-600");
      description.classList.add("ring-2");
    }
    if (select && (data.Priority == "null" || data.Priority === "")) {
      select.classList.add("ring-red-600");
      select.classList.add("ring-2");
    }
    if (start && data.StartDate > new Date()) {
      start.classList.add("ring-red-600");
      start.classList.add("ring-2");
      startDate.placeholder = "Please select the start date";
    }
    if (end && data.DueDate > new Date()) {
      end.classList.add("ring-red-600");
      end.classList.add("ring-2");
      endDate.placeholder = "Please select the due date";
    }
    assignedto.forEach((m) => {
      updateMember(m.id);
    });
    if (
      data.Title != "" &&
      data.Description != "" &&
      data.AssignedTo != "" &&
      data.StartDate != null &&
      data.DueDate != null &&
      data.Priority != "null"
    ) {
      await addDoc(collection(db, "KalCompany", "Tasks", "Tasks"), data);
      handleClear();
      toast.success("Task Assigned successfully");
    }
  };
  const handleClear = (e) => {
    title.value = "";
    data.Title = "";
    title.placeholder = "";
    description.value = "";
    data.Description = "";
    description.placeholder = "Write some description about the task";
    assigned.value = [];
    data.AssignedTo = [];
    assigned.value = "";
    assigned.placeholder = "search for a member or group";
    startDate.value = null;
    data.StartDate = new Date("10/10/2030");
    startDate.placeholder = "MM/DD/YYYY";
    endDate.value = null;
    data.DueDate = new Date("10/10/2030");
    endDate.placeholder = "MM/DD/YYYY";
    select.value = "null";
    data.Priority = "";
    // selectInputRef.current.select.clearValue();
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <AdminLayout>
      <div className="flex justify-center min-h-screen p-6 pt-8 bg-gray-100">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="pt-0 pb-4 text-xl font-semibold text-gray-600">
              Assign Task
            </h2>

            <div className="p-4 px-4 mb-6 bg-white rounded shadow-sm md:p-8">
              <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="pb-3 pl-4 text-lg font-medium">Task Details</p>
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
                    <div className="md:col-span-3">
                      <label htmlFor="full_name">Task Title</label>
                      <input
                        type="text"
                        name="task_title"
                        id="title"
                        onChange={handleTitle}
                        value={data.Title}
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="task">Task Description</label>
                      <textarea
                        type="text"
                        name="description"
                        id="description"
                        onChange={handleDescription}
                        value={data.Description}
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                        placeholder="Write some description about the task"
                        rows={16}
                        cols={50}
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="address">Assigned To:</label>
                      <Select
                        // ref={selectInputRef}
                        isMulti
                        name="members"
                        id="assigned"
                        options={allMembers.map((member) => {
                          return {
                            label: member.data.Name,
                            value: member.data.Name,
                            id: member.id,
                            Tasks: member.data.Tasks,
                          };
                        })}
                        onChange={(selectedMembers) => {
                          setMembers(
                            selectedMembers.map((member) => member.value)
                          );
                          setData({
                            ...data,
                            AssignedTo: selectedMembers.map(
                              (member) => member.value
                            ),
                          });
                          selectedMembers.map((member) => {
                            temp.push({
                              Tasks: member.Tasks,
                              value: member.value,
                              id: member.id,
                            });
                          });
                          setassignedto(Array.from(new Set(temp)));

                          if (
                            assigned &&
                            assigned.classList.contains("ring-red-600")
                          ) {
                            assigned.classList.remove("ring-red-600");
                            assigned.classList.remove("ring-2");
                            assigned.placeholder =
                              "search for a member or a group";
                          }
                        }}
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="Gender">Priority</label>
                      <select
                        required
                        id="selectPriority"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                      >
                        <option value="null">Select priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="state">Start Date</label>
                      <div
                        id="start"
                        className="flex items-center h-10 mt-1 border border-gray-200 rounded bg-gray-50"
                      >
                        <input
                          required
                          type="date"
                          onFocus="(this.type='date')"
                          name="startDate"
                          placeholder="MM/DD/YYYY"
                          onChange={handleStart}
                          id="startDate"
                          value={data.StartDate}
                          className="w-full px-4 text-gray-800 bg-transparent outline-none appearance-none"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="state">Due Date</label>
                      <div
                        id="end"
                        className="flex items-center h-10 mt-1 border border-gray-200 rounded bg-gray-50"
                      >
                        <input
                          required
                          type="date"
                          onChange={handleEnd}
                          value={data.DueDate}
                          id="endDate"
                          onFocus="(this.type='date')"
                          name="dueDate"
                          placeholder="MM/DD/YYYY"
                          className="w-full px-4 text-gray-800 bg-transparent outline-none appearance-none"
                        />
                      </div>
                    </div>

                    <div className="ml-auto text-right md:col-span-6">
                      <div className="inline-flex items-end justify-end">
                        <div className="flex-row gap-10 pt-8">
                          <button
                            onClick={handleClear}
                            className="px-4 py-2 mr-6 font-bold bg-gray-300 border-b-2 rounded text-balck hover:bg-primary"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSubmit}
                            className="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-bold"
                          >
                            {" "}
                            Assign
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
export default AddMember;
