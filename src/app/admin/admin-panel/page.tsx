"use client";
import AdminContent from "@/components/admin-related/AdminContent";
import AdminCourse from "@/components/admin-related/AdminCourse";
import AdminSidebar from "@/components/admin-related/AdminSidebar";
import AdminSidebarForSmallScreen from "@/components/admin-related/AdminSidebarForSmallScreen";
import { useState } from "react";

const AdminPanel = () => {
  const [selectedOption, setSelectedOption] = useState<string>("Dashboard");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex flex-col items-center">
      <div className="w-full h-full flex">
        <div className="relative min-w-60 max-md:min-w-0">
          <AdminSidebar
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          <AdminSidebarForSmallScreen
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
        <div className="w-full h-full">
          {selectedOption === "Dashboard" ? <AdminCourse /> : <AdminContent />}
        </div>
      </div>
    </div>
  );
};
export default AdminPanel;
