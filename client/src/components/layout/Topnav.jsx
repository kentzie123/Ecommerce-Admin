// Icons
import { AlignLeft, Menu } from "lucide-react";

// Stores
import { useSidebarStore } from "../../store/useSidebarStore";

const Topnav = () => {
  const { setToggleSidebar, sidebarOpen } = useSidebarStore();
  return (
    <div
      className={`w-full h-[auto] py-2 ${
        sidebarOpen ? "pl-[22%]" : "px-0"
      } false shadow-md pr-7 bg-base-100  flex items-center justify-between transition-all fixed top-0 left-0 z-[50]`}
    >
      <div onClick={setToggleSidebar} className="btn btn-ghost btn-circle">
        {sidebarOpen ? <AlignLeft className="size-5" /> : <Menu className="size-5" />}
      </div>
      <img
        className="rounded-full border size-10"
        src="/default.png"
        alt="profile"
      />
    </div>
  );
};

export default Topnav;
