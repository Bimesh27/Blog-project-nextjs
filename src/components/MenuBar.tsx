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
            <SheetTitle>Options</SheetTitle>
            <SheetDescription aria-disabled />
          </SheetHeader>
          {isLogin ? <AdminLogout setOpen={setOpen}/> : <AdminLogin setOpen={setOpen}/>}
          {isLogin && (
            <div className="w-full flex flex-col gap-4 items-start uppercase font-medium tracking-wider">
              <Link
                href={"/admin/admin-panel"}
                onClick={() => setOpen(false)}
                className="hover:underline transition-all"
              >
                Admin Panel
              </Link>

              <Link href="/" className="hover:underline transition-all">
                Available course
              </Link>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default MenuBar;
