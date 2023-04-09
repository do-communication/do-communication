import Header from "./Header";
import Sidebar from "./Sidebar";
const AdminLayout = ({ children }) => {
  return (
    <div class="md:flex">
      <Sidebar />
      <div className="flex-1 flex-col flex">
        {/* <!-- Top navbar --> */}
        <Header />
        {/* <!-- End Top navbar --> */}
        <main className="bg-[#f3f3f9] mb-auto flex-grow p-5">{children}</main>
        <footer className="border-t p-4 pb-3 text-xs bg-gray-100">
          2023 @ Do communication all right reserved.
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
