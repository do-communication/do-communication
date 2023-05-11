import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import { db } from "../../../context/DbContext";
import { useAuth } from "../../../context/AuthContext";

const Admin = () => {
  const { user } = useAuth()

  return (
    <AdminLayout>
      <div>
        {user && user.email}
      </div>
    </AdminLayout>
  );
};

export default Admin;
