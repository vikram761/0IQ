import NavbarDasboard from "@/components/NavbarDashboard";
import Sidebar from "@/components/Sidebar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <div className="hidden md:flex md:fixed md:flex-col h-full md:w-72 md:inset-y-0 bg-gray-900 z-[80]">
        <div className="">
          <Sidebar />
        </div>
      </div>
      <div className="md:pl-72 h-screen w-full ">
        <NavbarDasboard />
        {children}
      </div>
    </div>
  );
};

export default RootLayout;
