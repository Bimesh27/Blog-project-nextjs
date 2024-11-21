"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import AdminLogin from "./admin-related/AdminLogin";
import { useState } from "react";
import AdminLogout from "./admin-related/AdminLogout";

interface MenuBarProps {
  isLogin: boolean;
}

const MenuBar = ({ isLogin }: MenuBarProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger aria-label="Menu" role="button">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent className="flex flex-col items-center">
          <SheetHeader>
            <SheetTitle className="text-md uppercase">Options</SheetTitle>
            <SheetDescription aria-disabled />
          </SheetHeader>
          {isLogin ? (
            <AdminLogout setOpen={setOpen} />
          ) : (
            <AdminLogin setOpen={setOpen} />
          )}
          {isLogin && (
            <div className="w-full flex flex-col gap-4 items-start uppercase font-medium tracking-wider">
              <Link
                href={"/admin/admin-panel"}
                onClick={() => setOpen(false)}
                className="transition-all w-full text-center hover:bg-gray-200 dark:hover:bg-gray-900 py-2 font-semibold text-sm hover:scale-105"
              >
                Admin Panel
              </Link>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default MenuBar;
