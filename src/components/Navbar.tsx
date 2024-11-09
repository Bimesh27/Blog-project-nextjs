import Link from "next/link";
import { ModeToggle } from "./ToggleTheme";
import AdminLogin from "./AdminLogin";
import { checkLogin } from "@/app/admin/actions/auth";
import AdminLogout from "./AdminLogout";

const Navbar = async () => {
  
  const isLogin = await checkLogin();
  
  return (
    <div className="sticky flex w-full items-center px-10 h-16 backdrop-blur-lg transition-all border-b border-[#fafafa4f] top-0 justify-between">
      <Link href="/" className="text-3xl font-bold">
        C<span className="text-emerald-500">G</span>.
      </Link>
      <div className="flex gap-4">
        {isLogin ? <AdminLogout/> : <AdminLogin />}
        <ModeToggle />
      </div>
    </div>
  );
};
export default Navbar;
