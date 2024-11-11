import AdminCourse from "@/components/admin-related/AdminCourse";
import AdminSidebar from "@/components/admin-related/AdminSidebar";

const AdminPanel = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex flex-col items-center">
      <div className="w-full h-full flex">
        <div className="relative min-w-60 max-md:min-w-0">
          <AdminSidebar />
        </div>
        <div className="w-full h-full">
          <AdminCourse />
        </div>
      </div>
    </div>
  );
};
export default AdminPanel;
