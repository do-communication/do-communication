
import { useReducer } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import OpenSideBarContext, {
  openSideBarReducer,
} from "./context/openSideBarContext";

const UserLayout = ({ children }) => {
  const [openSideBar, openSideBarDispatch] = useReducer(
    openSideBarReducer,
    false
  );

  return (
    <div className="md:flex">
      <OpenSideBarContext.Provider value={[openSideBar, openSideBarDispatch]}>
        <Sidebar />
        <div className="flex flex-col flex-1">
          {/* <!-- Top navbar --> */}
          <Header />
          {/* <!-- End Top navbar --> */}
          <main className="bg-[#f3f3f9] mb-auto flex-grow p-5">{children}</main>
          <footer className="p-4 pb-3 text-xs bg-gray-100 border-t">
            2023 @ Do communication all right reserved.
          </footer>
        </div>
      </OpenSideBarContext.Provider>
    </div>
  );
};

export default UserLayout;
