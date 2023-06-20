import { useReducer, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import OpenSideBarContext, {
  openSideBarReducer,
} from "./context/openSideBarContext";
import { auth } from "../../../../config/firebase";
import Router from "next/router";
import { useAuth } from "../../../../context/AuthContext";
// import useFetch from "@/components/useFetch";

const router = Router;

const AdminLayout = ({ children, noFooter = false }) => {
  const { logout } = useAuth();
  const [openSideBar, openSideBarDispatch] = useReducer(
    openSideBarReducer,
    false
  );
  // || auth.currentUser.displayName != "true"
  if (!auth.currentUser) {
    console.log("router going back")
    logout();
    router.push("/");
  }
  else {

    return (
      <div className="md:flex">
        <OpenSideBarContext.Provider value={[openSideBar, openSideBarDispatch]}>
          <Sidebar />
          <div className="flex flex-col flex-1">
            {/* <!-- Top navbar --> */}
            <Header />
            {/* <!-- End Top navbar --> */}
            <main className="bg-[#f3f3f9] mb-auto flex-grow p-5">{children}</main>

            {!noFooter && (
              <footer className="p-4 pb-3 text-xs bg-gray-100 border-t">
                2023 @ Do communication all right reserved.
              </footer>
            )}
          </div>
        </OpenSideBarContext.Provider>
      </div>
    );
  }
};

export default AdminLayout;
