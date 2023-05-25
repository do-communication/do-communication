import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import { doc, getDocs, getDoc, addDoc, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../../../context/DbContext";
import { toast } from "react-toastify";
import Select from "react-select";
// import { useAuth } from "../../../../context/AuthContext";
// const { user } = useAuth()
const AddMember = () => {
  const [allMembers, setallMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const [data, setData] = useState({
    Title: '',
    Description: '',
    AssignedTo: [],
    Priority: '',
    StartDate: new Date("10/10/2030"),
    DueDate: new Date("10/10/2030"),
    Status: "Assigned",
    AssignedBy: "Admin" //it should be id of the current user
  });
  const getData = async () => {
    let arr = []
    const all = collection(db, "KalCompany", "Users", "StaffMembers");
    try {
      const doc = await getDocs(all)
      doc.forEach(d => {
        arr.push(d.data())
      });
    } catch (err) {
      console.log(err)
      setMembers([{ Name: "check your connection" }])
    }

    setMembers(arr)
    setallMembers(arr)
  }

  const select = document.getElementById('selectPriority');
  const title = document.getElementById('title');
  const start = document.getElementById('start');
  const end = document.getElementById('end');
  const description = document.getElementById('description');
  const assigned = document.getElementById('assigned');
  const startDate = document.getElementById('startDate');
  const endDate = document.getElementById('endDate');

  select && select.addEventListener('change', function handleChange(event) {
    setData({
      ...data,
      Priority: event.target.value
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
      Title: e.target.value
    })
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
      Description: e.target.value
    })
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
      StartDate: e.target.value
    })
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
      DueDate: e.target.value
    })
    if (end && end.classList.contains("ring-red-600")) {
      end.classList.remove("ring-red-600");
      end.classList.remove("ring-2");
      endDate.placeholder = "MM/DD/YYYY";
    }
  };
  // const handleAssigned = (e) =>{
  //   e.preventDefault();
  //   setData({
  //     ...data,
  //     AssignedTo: e.target.value
  //   })
  //   if (assigned && assigned.classList.contains("ring-red-600")) {
  //     assigned.classList.remove("ring-red-600");
  //     assigned.classList.remove("ring-2");
  //     assigned.placeholder = "search for a member or a group";
  //   }

  // };

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
    if (select && (data.Priority == "null" || data.Priority === '')) {
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
    if (data.Title != "" && data.Description != "" && data.AssignedTo != "" && data.StartDate != null && data.DueDate != null && data.Priority != "null") {
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
    data.StartDate = new Date("10/10/2030")
    startDate.placeholder = "MM/DD/YYYY";
    endDate.value = null;
    data.DueDate = new Date("10/10/2030")
    endDate.placeholder = "MM/DD/YYYY";
    select.value = "null";
    data.Priority = "";
  };
  useEffect(() => {
    getData()
  }, []);
  return (
    <AdminLayout>
      <div className="min-h-screen p-6 pt-8 bg-gray-100 flex  justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600 pb-4 pt-0">Assign Task</h2>

            <div className="bg-white rounded shadow-sm p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg pb-3 pl-4">Task Details</p>
                  <img src="/images/task.svg" alt="form" width={250} height={800} className="pt-10 sm:pb-3" />
                </div>

                <div className="lg:col-span-2 ">
                  <div className="grid gap-6 gap-y-5 text-sm grid-cols-1 md:grid-cols-6">
                    <div className="md:col-span-3">
                      <label for="full_name">Task Title</label>
                      <input
                        type="text"
                        name="task_title"
                        id="title"
                        onChange={handleTitle}
                        value={data.Title}
                        className="h-10 border mt-1 rounded px-4  w-full bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label for="task">Task Description</label>
                      <textarea
                        type="text"
                        name="description"
                        id="description"
                        onChange={handleDescription}
                        value={data.Description}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Write some description about the task"
                        rows={16} cols={50}
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label for="address">Assigned To:</label>
                      {/* <input
                      type="text"
                      name="assignedTo"
                      id="assigned"
                      onChange={handleAssigned}
                      value={data.AssignedTo}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="search for a member or group"
                    /> */}
                      <Select
                        isMulti
                        name="members"
                        id="assigned"
                        options={allMembers.map((member) => {
                          return { label: member.Name, value: member.Name };
                        })}
                        onChange={(selectedMembers) => {
                          setMembers(
                            selectedMembers.map((member) => member.value)
                          );
                          selectedMembers.map(member => {
                            data.AssignedTo.push(member.value)
                          });
                          if (assigned && assigned.classList.contains("ring-red-600")) {
                            assigned.classList.remove("ring-red-600");
                            assigned.classList.remove("ring-2");
                            assigned.placeholder = "search for a member or a group";
                          }

                        }}
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label for="Gender">Priority</label>
                      <select required id="selectPriority" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50">
                        <option value="null">Select priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>

                    <div className="md:col-span-3">
                      <label for="state">Start Date</label>
                      <div id="start" className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input required type="date"
                          onfocus="(this.type='date')" name="startDate"
                          placeholder="MM/DD/YYYY"
                          onChange={handleStart}
                          id="startDate"
                          value={data.StartDate}
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
                      </div>
                    </div>

                    <div className="md:col-span-3">
                      <label for="state">Due Date</label>
                      <div id="end" className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input required type="date"
                          onChange={handleEnd}
                          value={data.DueDate}
                          id="endDate"
                          onfocus="(this.type='date')" name="dueDate"
                          placeholder="MM/DD/YYYY"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" />
                      </div>
                    </div>

                    <div className="md:col-span-6 text-right ml-auto">
                      <div className="inline-flex items-end justify-end">
                        <div className="flex-row gap-10 pt-8">
                          <button onClick={handleClear} className="bg-gray-300 hover:bg-primary text-balck  font-bold py-2 px-4 mr-6 rounded border-b-2">
                            Cancel
                          </button>
                          <button onClick={handleSubmit} className="bg-primary hover:bg-bold text-white font-bold py-2 px-4 rounded"> Assign
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
