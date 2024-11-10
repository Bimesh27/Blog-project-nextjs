"use client";
import { Book, DonutIcon, FlaskConical, LayoutDashboard } from "lucide-react";
import { useState } from "react";

const AdminSidebar = () => {
  const [selectedOption, setSelectedOption] = useState("Dashboard");

  return (
    <div className="min-w-60 h-screen fixed left-0 flex justify-center">
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
            selectedOption === "Courses" ? "bg-violet-400" : ""
          } w-full text-center py-3 flex justify-center gap-2`}
          onClick={() => setSelectedOption("Courses")}
        >
          <Book />
          Courses
        </h1>
        <h1
          className={`${
            selectedOption === "Categories" ? "bg-violet-400" : ""
          } w-full text-center py-3 flex justify-center gap-2`}
          onClick={() => setSelectedOption("Categories")}
        >
          <FlaskConical />
          Categories
        </h1>
        <h1
          className={`${
            selectedOption === "Completed Courses" ? "bg-violet-400" : ""
          } w-full text-center py-3 flex justify-center gap-2`}
          onClick={() => setSelectedOption("Completed Courses")}
        >
          <DonutIcon />
          Completed Courses
        </h1>
      </div>
    </div>
  );
};
export default AdminSidebar;
