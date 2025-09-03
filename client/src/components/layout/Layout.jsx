// React Router
import { Outlet } from "react-router-dom";

// Components
import Sidebar from "./Sidebar";
import Topnav from "./Topnav";

// Store
import { useSidebarStore } from "../../store/useSidebarStore";

const Layout = () => {
  const { sidebarOpen } = useSidebarStore();
  return (
    <div className="h-full">
      <Topnav />
      <div className="flex transition-all h-full">
        <Sidebar />
        <div className={`pt-[60px]  ${sidebarOpen ? "pl-[20%]" : "pl-0"} w-[100%]`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
