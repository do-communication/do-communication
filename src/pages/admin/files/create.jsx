import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import Select from 'react-select'
import { toast } from "react-toastify";
const AddFile= () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");

    e.target.reset();

    toast.success("File uploaded successfully");
  }


  return (
    <AdminLayout>
    <div className="min-h-screen p-6 pt-8 bg-gray-100 flex  justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <form onSubmit={handleSubmit}>
          <h2 className="font-semibold text-xl text-gray-600 pb-4 pt-0">Add File</h2>

          <div className="bg-white rounded shadow-sm p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg pb-3 pl-4">File Details</p>
                <img src="/images/addfile.svg" alt="form" width={235} height={600} className="pt-4 sm:pb-3" />
              </div>

              <div className="lg:col-span-2 ">
                <div className="grid gap-6 gap-y-7 text-sm grid-cols-1 md:grid-cols-6">
                  <div className="md:col-span-3">
                    <label for="full_name">File Name</label>
                    <input
                      type="text"
                      name="file_name"
                      id="full_name"
                      className="h-10 border mt-1 rounded px-4  w-full bg-gray-50"
                    />
                  </div>

                  

                  <div className="md:col-span-3">
                    <label for="state">Upload File</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                      <input
                        type="file"
                        name="file"
                        id="file"
                        placeholder=" "
                        className="px-4 appearance-none outline-none  text-gray-500 p-2 w-full bg-transparent text-sm border-none"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <label for="email">Description</label>
                    <textarea
                 
                      name="type"
                      id="type"
                      className="border mt-1 rounded px-4 w-full  h-24 bg-gray-50"
                      placeholder=" "
                    />
                  </div>
                

                  <div className="md:col-span-6 mb-10 text-right ml-auto">
                    <div className="inline-flex items-end justify-end">
                      <div className="flex-row gap-10 pt-2">
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
        </form>
      </div>
    </div>
    </AdminLayout>

  );
};

export default AddFile;
