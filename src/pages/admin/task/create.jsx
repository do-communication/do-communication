import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import { toast } from "react-toastify";
import { allMembers } from "@/mock/members";
import Select from "react-select";
import { useState } from "react";
const AddMember = () => {
  const [members, setMembers] = useState([]);

  const handleAssign = () => {
    console.log("submit");
    toast.success("Member added successfully");
  };
  
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
                      id="task_title"
                      className="h-10 border mt-1 rounded px-4  w-full bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label for="task">Task Description</label>
                    <textarea
                      type="text"
                      name="description"
                      id="description"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="Write some description about the task"
                      rows={16} cols={50}
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label for="address">Assigned To:</label>
                    <Select
                        isMulti
                        name="members"
                        options={allMembers.map((member) => {
                          return { label: member.name, value: member.name };
                        })}
                        val
                        onChange={(selectedMembers) => {
                          setMembers(
                            selectedMembers.map((member) => member.value)
                          );
                        }}
                      />
                  </div>

                  <div className="md:col-span-3">
                    <label for="priority">Priority</label>
                    <select className="h-10 border mt-1 rounded px-4 w-full bg-gray-50">
                      <option value="null">Select priority</option>
                      <option value="h">High</option>
                      <option value="m">Medium</option>
                      <option value="l">Low</option>
                    </select>
                  </div>

                  <div className="md:col-span-3">
                    <label for="startDate">Start Date</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input type="date"
                        onfocus="(this.type='date')" name="startDate"
                        placeholder="MM/DD/YYYY"
                        id="state"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"/>
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <label for="dueDate">Due Date</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input type="date"
                        onfocus="(this.type='date')" name="dueDate"
                        placeholder="MM/DD/YYYY"
                        id="state"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"/>
                    </div>
                  </div>

                  <div className="md:col-span-6 text-right ml-auto">
                    <div className="inline-flex items-end justify-end">
                      <div className="flex-row gap-10 pt-8">
                        <button className="bg-gray-300 hover:bg-primary text-balck  font-bold py-2 px-4 mr-6 rounded border-b-2">
                          Cancel
                        </button>
                        <button className="bg-primary hover:bg-bold text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleAssign()}
                        >
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
