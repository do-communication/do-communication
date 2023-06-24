import { useReducer } from "react";
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
  // console.log(auth.currentUser)
  const { logout } = useAuth();
  const [openSideBar, openSideBarDispatch] = useReducer(
    openSideBarReducer,
    false
  );
  // || auth.currentUser.displayName != "true"
  if (!auth.currentUser) {
    console.log("router going back");
    logout();
    router.push("/");
  } else {
    return (
      <div className="md:flex">
        <OpenSideBarContext.Provider value={[openSideBar, openSideBarDispatch]}>
          <Sidebar />
          <div className="flex flex-1 flex-col">
            {/* <!-- Top navbar --> */}
            <Header />
            {/* <!-- End Top navbar --> */}
            <main className="mb-auto flex-grow bg-[#f3f3f9] p-5">
              {children}
            </main>

            {!noFooter && (
              <footer className="border-t bg-gray-100 p-4 pb-3 text-xs">
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
