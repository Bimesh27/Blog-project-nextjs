import { BookOpen, LayoutDashboard } from "lucide-react";

interface AdminSidebarProps {
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

const AdminSidebar = ({
  selectedOption,
  setSelectedOption,
}: AdminSidebarProps) => {
  return (
    <div className="min-w-60 h-screen fixed left-0 flex justify-center max-md:hidden">
      <div className="flex flex-col items-center gap-4 w-full p-4 cursor-pointer">
        <h1
          className={`${
            selectedOption === "Dashboard" ? "bg-violet-400" : ""
          } w-full text-center py-3 flex justify-center gap-2`}
          onClick={() => setSelectedOption("Dashboard")}
        >
          <LayoutDashboard />
          Dashboard
        </h1>
        <h1
          className={`${
            selectedOption === "Contents" ? "bg-violet-400" : ""
          } w-full text-center py-3 flex justify-center gap-2`}
          onClick={() => setSelectedOption("Contents")}
        >
          <BookOpen />
          Contents
        </h1>
      </div>
    </div>
  );
};
export default AdminSidebar;
