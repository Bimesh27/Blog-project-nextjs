import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BookOpen, LayoutDashboard, MenuIcon } from "lucide-react";
import React from "react";

interface AdminSidebarForSmallScreenProps {
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminSidebarForSmallScreen = ({
  selectedOption,
  setSelectedOption,
  isOpen,
  setIsOpen,
}: AdminSidebarForSmallScreenProps) => {
  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <MenuIcon className="m-4" />
        </SheetTrigger>
        <SheetContent side={"left"} className="w-[16rem]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <div className="flex flex-col items-center gap-4 w-full p-4 cursor-pointer">
              <h1
                className={`${
                  selectedOption === "Dashboard" ? "bg-violet-400" : ""
                } w-full text-center py-3 flex justify-center gap-2`}
                onClick={() => {
                  setSelectedOption("Dashboard");
                  setIsOpen(false);
                }}
              >
                <LayoutDashboard />
                Dashboard
              </h1>
              <h1
                className={`${
                  selectedOption === "Contents" ? "bg-violet-400" : ""
                } w-full text-center py-3 flex justify-center gap-2`}
                onClick={() => {
                  setSelectedOption("Contents");
                  setIsOpen(false);
                }}
              >
                <BookOpen />
                Contents
              </h1>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default AdminSidebarForSmallScreen;
