import UserLayout from "@/components/layouts/UserLayout/UserLayout";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import useFetch from "@/components/useFetch";
import { auth } from "../../../config/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../context/DbContext";
 
const User = () => {
  const [user, setUser] = useState({});
  const { GetUser } = useFetch("KalCompany")
  const [Colleague, setColleague] = useState(0);
  const [NewTasks, setNewTask] = useState(0);

  const getData = async () => {
    if (auth.currentUser) {
      setUser(await GetUser(auth.currentUser.uid));
      const coll = collection(db, "KalCompany", "Users", "StaffMembers");
      const snapshot = await getDocs(coll);
      setColleague(snapshot.docs.length)

      const task = collection(db, "KalCompany", "Tasks", "Tasks");
      const q = query(task, where("AssignedTo", "array-contains", auth.currentUser.displayName), where("Status", "==", "assigned"));
      const taskSnap = await getDocs(q);
      setNewTask(taskSnap.docs.length)

    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <UserLayout>
      <div className="px-10 pt-0">
        <div className="p-6 bg-white shadow mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-2 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p className="font-bold  ml-16 rounded-2xl w-10 bg-light text-white text-xl">{Colleague}</p>
                <p className="text-gray-400">Colleague</p>
              </div>
              <div>
                <p className="font-bold text-white ml-20 rounded-2xl w-10 bg-green-700 text-xl">{NewTasks}</p>
                <p className="text-gray-400 ml-3">New Tasks</p>
              </div>
            </div>
            <div className="relative">
              <div className="w-48 h-48 bg-sky-200 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-gray-700">
                {/* <CgProfile size={90} /> */}
                {user ? user.ProfilePic ? <img src={user.ProfilePic}></img> : <CgProfile size={90} /> : <CgProfile size={90} />}
              </div>
            </div>

            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <Link href="/user/tasks">
                <button className="text-white py-2 px-6 uppercase rounded-full bg-primary hover:bg-sky-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                  Tasks
                </button>
              </Link>
              <Link href="/user/chats/directChat">
                <button className="text-white py-2 px-4 uppercase rounded-full bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                  Message
                </button>
              </Link>
            </div>
          </div>

          <div className="mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-gray-700">
              {user.Name}
            </h1>
            <p className="font-light text-gray-600 mt-3">
              {user.Email}
            </p>

            <p className="mt-8 text-gray-500">Department of {user.Department}</p>
          </div>
          <div className=" flex justify-center items-center py-6 mt-2">
            <button className="text-white py-3 capitalize px-6 rounded-full bg-primary hover:bg-sky-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              <Link
                href="/user/profile/profile"
              >
                Edit your profile
              </Link>
            </button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};
export default User;