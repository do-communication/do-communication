import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import { toast } from "react-toastify";

const AddMember = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");

    const form = new FormData(e.target);

    const data = {
      fullName: form.get("full_name"),
      email: form.get("email"),
      address: form.get("address"),
      gender: form.get("gender"),
      department: form.get("department"),
      phoneNumber: form.get("phone_number"),
    };

    console.log(data);

    // clear form
    e.target.reset();

    toast.success("Member added successfully");
  };

  return (
    <AdminLayout>
      <div className="flex justify-center min-h-screen p-6 pt-8 bg-gray-100">
        <div className="container max-w-screen-lg mx-auto">
          <form onSubmit={handleSubmit}>
            <h2 className="pt-0 pb-4 text-xl font-semibold text-gray-600">
              Add Member
            </h2>
            <div className="p-4 px-4 mb-6 bg-white rounded shadow-sm md:p-8">
              <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="pb-3 pl-4 text-lg font-medium">
                    Employee Details
                  </p>
                  <img
                    src="/images/form1.svg"
                    alt="form"
                    width={250}
                    height={800}
                    className="pt-10 sm:pb-3"
                  />
                </div>

                <div className="lg:col-span-2 ">
                  <div className="grid grid-cols-1 gap-6 text-sm gap-y-5 md:grid-cols-6">
                    <div className="md:col-span-3">
                      <label for="full_name">Full Name</label>
                      <input
                        type="text"
                        name="full_name"
                        id="full_name"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                        required
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label for="email">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                        placeholder="email@employee.com"
                        required
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label for="address">Address</label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                        placeholder=""
                        required
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label for="Gender">Gender</label>
                      <select
                        name="gender"
                        className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                        required
                      >
                        <option value="">Select gender</option>
                        <option value="f">Female</option>
                        <option value="m">Male</option>
                      </select>
                    </div>

                    <div className="md:col-span-3">
                      <label for="phone_number">Phone Number</label>
                      <div className="flex items-center h-10 mt-1 border border-gray-200 rounded bg-gray-50">
                        <input
                          id="phone_number"
                          name="phone_number"
                          required
                          placeholder="+251 9 "
                          className="w-full px-4 text-gray-800 bg-transparent outline-none appearance-none"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-3">
                      <label for="department">Department</label>
                      <div className="flex items-center h-10 mt-1 border border-gray-200 rounded bg-gray-50">
                        <input
                          name="department"
                          id="department"
                          required
                          placeholder="Department"
                          className="w-full px-4 text-gray-800 bg-transparent outline-none appearance-none"
                        />
                      </div>
                    </div>

                    <div className="ml-auto text-right md:col-span-6">
                      <div className="inline-flex items-end justify-end">
                        <div className="flex-row gap-10 pt-8">
                          <button className="px-4 py-2 mr-6 font-bold bg-gray-300 border-b-2 rounded hover:bg-primary text-balck">
                            Cancel
                          </button>
                          <button className="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-bold">
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
    </AdminLayout>
  );
};

export default AddMember;
