"use client";
import { logoutAdmin } from "@/app/admin/actions/auth";
import { toast } from "@/hooks/use-toast";
import { LucideLogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import React from "react";

interface AdminLogoutProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminLogout = ({setOpen}: AdminLogoutProps) => {
  const router = useRouter();
  const handleLogout = async () => {
    const response = await logoutAdmin();
    if (response.success) {
      toast({
        className: "bg-emerald-600",
        description: response.message,
      });
      router.push("/");

      setOpen(false);
    } else {
      toast({
        variant: "destructive",
        className: "bg-red-500",
        description: response.message,
      });
    }
  };

  return (
    <Button onClick={handleLogout} className="absolute bottom-4 left-4">
      <LucideLogOut />
    </Button>
  );
};
export default AdminLogout;
