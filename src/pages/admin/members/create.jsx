import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";

const AddMember = () => {
  
  return (
    <AdminLayout>
    <div className="min-h-screen p-6 pt-8 bg-gray-100 flex  justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600 pb-4 pt-0">Add Member</h2>

          <div className="bg-white rounded shadow-sm p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg pb-3 pl-4">Employee Details</p>
                <img src="/images/form1.svg" alt="form" width={250} height={800} className="pt-10 sm:pb-3" />
              </div>

              <div className="lg:col-span-2 ">
                <div className="grid gap-6 gap-y-5 text-sm grid-cols-1 md:grid-cols-6">
                  <div className="md:col-span-3">
                    <label for="full_name">Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      id="full_name"
                      className="h-10 border mt-1 rounded px-4  w-full bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label for="email">Email Address</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder="email@employee.com"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label for="address">Address</label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      placeholder=""
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label for="Gender">Gender</label>
                    <select className="h-10 border mt-1 rounded px-4 w-full bg-gray-50">
                      <option value="null">Select gender</option>
                      <option value="f">Female</option>
                      <option value="m">Male</option>
                    </select>
                  </div>

                  <div className="md:col-span-3">
                    <label for="country">Phone Number</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        type="tel"
                        pattern="[789][0-9]{9}" required
                        name="country"
                        placeholder="+251 9 "
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                   
                      />
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <label for="state">Department</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        name="state"
                        id="state"
                        placeholder="Department"
                        className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <label for="state">Date of Birth</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input type="date"
                        onfocus="(this.type='date')" name="DB"
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
                        <button className="bg-primary hover:bg-bold text-white font-bold py-2 px-4 rounded">
                          Submit
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
