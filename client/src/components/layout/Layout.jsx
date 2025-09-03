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
      <div className="flex transition">
        <Sidebar />
        <div className={` pt-[60px]  ${sidebarOpen ? "w-[80%]" : "w-[100%]"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
