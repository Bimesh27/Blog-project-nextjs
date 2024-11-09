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
import AdminLogout from "./AdminLogout";
import Link from "next/link";
import AdminLogin from "./AdminLogin";
import { Button } from "./ui/button";
import { useState } from "react";

interface MenuBarProps {
  isLogin: boolean;
}

const MenuBar = ({isLogin} : MenuBarProps) => {

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent className="flex flex-col items-center">
          <SheetHeader>
            <SheetTitle>Options</SheetTitle>
            <SheetDescription aria-disabled/>
          </SheetHeader>
          {isLogin ? <AdminLogout /> : <AdminLogin />}
          {isLogin && (
            <Link href={"/admin/admin-panel"}>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setOpen(false)}
              >
                Admin Panel
              </Button>
            </Link>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default MenuBar;
