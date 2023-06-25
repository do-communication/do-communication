import { useReducer } from "react";
import Header from "./Header";
import SidebarLeader from "./SidebarLeader";
import Sidebar from "./Sidebar"
import { auth } from "../../../../config/firebase";
import OpenSideBarContext, {
  openSideBarReducer,
} from "./context/openSideBarContext";
import Router from "next/router";
import { useAuth } from "../../../../context/AuthContext";

const router = Router;

const UserLayout = ({ children }) => {
  console.log(auth.currentUser)
  const { logout } = useAuth();
  const [openSideBar, openSideBarDispatch] = useReducer(
    openSideBarReducer,
    false
  );

  if (!auth.currentUser || auth.currentUser.displayName[auth.currentUser.displayName.length - 1] == "$") {
    console.log("router going back");
    logout();
    router.push("/");
  } else {
    return (
      <div className="md:flex">
        <OpenSideBarContext.Provider value={[openSideBar, openSideBarDispatch]}>
          {auth.currentUser.displayName[auth.currentUser.displayName.length - 1] == "~" ? <SidebarLeader /> : <Sidebar />}
          <div className="flex flex-1 flex-col">
            {/* <!-- Top navbar --> */}
            <Header />
            {/* <!-- End Top navbar --> */}
            <main className="mb-auto flex-grow bg-[#f3f3f9] p-5">
              {children}
            </main>
            <footer className="border-t bg-gray-100 p-4 pb-3 text-xs">
              2023 @ Do communication all right reserved.
            </footer>
          </div>
        </OpenSideBarContext.Provider>
      </div>
    );
  }
};

export default UserLayout;
