"use client";
import { logoutAdmin } from "@/app/admin/actions/auth";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";

const AdminLogout = () => {
  const handleLogout = async () => {
    const response = await logoutAdmin();
    if (response.success) {
      toast({
        description: response.message,
      });
    } else {
      toast({
        description: response.message,
      });
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};
export default AdminLogout;
