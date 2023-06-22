import UserLayout from "@/components/layouts/UserLayout/UserLayout";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import useFetch from "@/components/useFetch";
import { auth } from "../../../config/firebase";
import { useEffect, useState } from "react";

const User = () => {
  const [user, setUser] = useState({});
  const { GetUser } = useFetch("KalCompany");

  const getData = async () => {
    setUser(await GetUser(auth.currentUser.uid));
  };

  useEffect(() => {
    getData();
  }, [user]);

  return (
    <UserLayout>
      <div className="px-10 pt-0">
        <div className="mt-20 bg-white p-6 shadow">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="order-last mt-20 grid grid-cols-2 text-center md:order-first md:mt-0">
              <div>
                <p className="text-xl font-bold text-gray-700">12</p>
                <p className="text-gray-400">Colleague</p>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-700">10</p>
                <p className="text-gray-400">New Tasks</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-x-0 top-0 mx-auto -mt-24 flex h-48 w-48 items-center justify-center rounded-full bg-sky-200 text-gray-700 shadow-2xl">
                {/* <CgProfile size={90} /> */}
                {user ? (
                  user.ProfilePic ? (
                    <img src={user.ProfilePic}></img>
                  ) : (
                    <CgProfile size={90} />
                  )
                ) : (
                  <CgProfile size={90} />
                )}
              </div>
            </div>

            <div className="mt-32 flex justify-between space-x-8 md:mt-0 md:justify-center">
              <button className="transform rounded-full bg-primary px-6 py-2 font-medium uppercase text-white shadow transition hover:-translate-y-0.5 hover:bg-sky-500 hover:shadow-lg">
                Tasks
              </button>
              <button className="transform rounded-full bg-gray-700 px-4 py-2 font-medium uppercase text-white shadow transition hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg">
                Message
              </button>
            </div>
          </div>

          <div className="mt-20 border-b pb-12 text-center">
            <h1 className="text-4xl font-medium text-gray-700">{user.Name}</h1>
            <p className="mt-3 font-light text-gray-600">{user.Email}</p>

            <p className="mt-8 text-gray-500">
              Department of {user.Department}
            </p>
          </div>
          <div className=" mt-2 flex items-center justify-center py-6">
            <button className="transform rounded-full bg-primary px-6 py-3 font-medium capitalize text-white shadow transition hover:-translate-y-0.5 hover:bg-sky-500 hover:shadow-lg">
              <Link href="/user/profile/profile">Edit your profile</Link>
            </button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};
export default User;
