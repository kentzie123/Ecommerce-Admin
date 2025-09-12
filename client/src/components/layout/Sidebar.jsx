// Stores
import { useSidebarStore } from "../../store/useSidebarStore";

// rizzui
import { Drawer } from "rizzui";

// Media Query
import { useMediaQuery } from "react-responsive";

// components layout
import SidebarContent from "./SidebarContent";

const Sidebar = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { sidebarOpen, setToggleSidebar } = useSidebarStore();
  return (
    <div>
      { isMobile &&
        <Drawer
        placement="left"
        size="sm"
        isOpen={sidebarOpen}
        onClose={() => setToggleSidebar(false)}
      >
        <div data-theme="light" className="p-6 text-base-300 bg-base-100">
          <SidebarContent />
        </div>
      </Drawer>
      }

      <div
        className={`hidden md:block fixed top-0 left-0 z-[52] bg-base-100 min-h-[100vh] border-r border-[rgba(0,0,0,0.1)] py-2 ${
          sidebarOpen ? "w-[20%] px-4" : "w-0"
        } transition-all`}
      >
        <SidebarContent />
      </div>
    </div>
  );
};

export default Sidebar;
