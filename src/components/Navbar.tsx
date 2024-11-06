import Link from "next/link";

const Navbar = () => {
  return (
    <div className="sticky flex w-full items-center px-10 h-16 backdrop-blur-lg transition-all border-b border-[#fafafa4f] top-0">
      <Link href="/" className="text-3xl font-bold">
        C<span className="text-emerald-500">G</span>.
      </Link>
    </div>
  );
};
export default Navbar;
