import UserLayout from "@/components/layouts/UserLayout/UserLayout";
import { CgProfile } from "react-icons/cg";
const User = () => {
  return (
    <UserLayout>
      <div className="px-10 pt-0">
        <div className="p-6 bg-white shadow mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-2 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl">12</p>
                <p className="text-gray-400">Colleague</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">10</p>
                <p className="text-gray-400">New Tasks</p>
              </div>
            </div>
            <div className="relative">
              <div className="w-48 h-48 bg-sky-200 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-gray-700">
                <CgProfile size={90} />
              </div>
            </div>

            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <button className="text-white py-2 px-6 uppercase rounded-full bg-primary hover:bg-sky-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Tasks
              </button>
              <button className="text-white py-2 px-4 uppercase rounded-full bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Message
              </button>
            </div>
          </div>

          <div className="mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-gray-700">
              Lidiya Solomon
            </h1>
            <p className="font-light text-gray-600 mt-3">
              lidiyanasolomon@gmail.com
            </p>

            <p className="mt-8 text-gray-500">Product Manager</p>
            <p className="mt-2 text-gray-500">Department of something</p>
          </div>
          <div className=" flex justify-center items-center py-6 mt-2">
            <button className="text-white py-3 capitalize px-6 rounded-full bg-primary hover:bg-sky-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Edit your profile
            </button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};
export default User;
