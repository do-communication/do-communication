import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import { useState } from "react";
import { allMembers } from "@/mock/members";
import Select from "react-select";
import { toast } from "react-toastify";

const CreateGroup = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [members, setMembers] = useState([]);
  const [showCustomType, setShowCustomType] = useState(false);

  const handleCreateGroup = () => {
    console.log("create group");
    const newGroup = {
      name,
      type,
      members,
    };

    toast.success("Group created successfully");
    console.log(newGroup);
  };

  const clearForm = () => {
    setName("");
    setType("");
    setMembers([]);
  };

  return (
    <AdminLayout>
      <div className="flex justify-center min-h-screen p-6 pt-8 bg-gray-100">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="pt-0 pb-4 text-xl font-semibold text-gray-600">
              Create Group
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
                        id="group_name"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                        placeholder="Enter group name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="type">Group Type</label>
                      <select
                        id="type"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                        value={type}
                        onChange={(e) => {
                          if (e.target.value.toLowerCase() == "custom") {
                            setShowCustomType(true);
                            setType("");
                          } else {
                            setShowCustomType(false);
                            setType(e.target.value);
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
                          id="custom_group_type"
                          className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                          placeholder="Enter custom group type"
                          disabled={!showCustomType}
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                        />
                      </div>
                    )}
                    <div className="md:col-span-5">
                      <label htmlFor="members">Add Members</label>
                      <Select
                        isMulti
                        name="members"
                        options={allMembers.map((member) => {
                          return { label: member.name, value: member.id };
                        })}
                        val
                        onChange={(selectedMembers) => {
                          setMembers(
                            selectedMembers.map((member) => member.value)
                          );
                        }}
                      />
                    </div>
                    <div className="ml-auto text-right md:col-span-6">
                      <div className="inline-flex items-end justify-end">
                        <div className="flex-row gap-10 pt-8">
                          <button
                            onClick={() => void clearForm()}
                            className="px-4 py-2 mr-6 font-bold bg-gray-300 border-b-2 rounded hover:bg-primary text-balck"
                          >
                            Cancel
                          </button>
                          <button
                            disabled={!name || !type || !members.length}
                            className="px-4 py-2 font-bold text-white rounded disabled:brightness-90 disabled:cursor-not-allowed bg-primary hover:bg-bold"
                            onClick={() => void handleCreateGroup()}
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
