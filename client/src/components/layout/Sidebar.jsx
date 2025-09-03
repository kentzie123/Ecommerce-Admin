// Stores
import { useSidebarStore } from "../../store/useSidebarStore";

// React Router
import { Link } from "react-router-dom";

// icons
import {
  LayoutGrid,
  ChartColumnStacked,
  ShoppingCart,
  Users,
  ShoppingBag,
  List,
  Plus,
  Ruler,
  Dumbbell,
} from "lucide-react";

// UI
import Accordion from "../ui/Accordion";

const Sidebar = () => {
  const { sidebarOpen } = useSidebarStore();
  return (
    <div
      className={`fixed top-0 left-0 z-[52] bg-base-100 min-h-[100vh] border-r border-[rgba(0,0,0,0.1)] py-2 ${
        sidebarOpen ? "w-[20%] px-4" : "w-0"
      } transition-all`}
    >
      <div className={`${sidebarOpen ? "block" : "hidden"}`}>
        {/* Logo */}
        <div className="text-2xl font-bold mb-7 py-2">LOGO</div>

        {/* Menu */}
        <div className="flex flex-col gap-y-2">
          {/* Dashboard */}
          <Link
            className="flex items-center gap-3 hover:bg-base-300 text-base-content/80 px-3 py-2 rounded-md text-sm"
            to="/"
          >
            <LayoutGrid className="size-5" />
            <span className="font-bold">Dashboard</span>
          </Link>

          {/* Category */}
          <Accordion title={"Category"} Icon={ChartColumnStacked}>
            <ul>
              <li>
                <Link
                  className="flex items-center gap-3 hover:bg-base-200 text-base-content/60 px-3 py-2 rounded-md"
                  to="/categories"
                >
                  <List className="size-4" />
                  <span className="text-[13px]">Category List</span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-3 hover:bg-base-200 text-base-content/60 px-3 py-2 rounded-md"
                  to="/categories/create"
                >
                  <Plus className="size-4" />
                  <span className="text-[13px]">Add Category</span>
                </Link>
              </li>
            </ul>
          </Accordion>

          {/* Product */}
          <Accordion title={"Product"} Icon={ShoppingCart}>
            <ul>
              <li>
                <Link
                  className="flex items-center gap-3 hover:bg-base-200 text-base-content/60 px-3 py-2 rounded-md"
                  to="/products"
                >
                  <ShoppingBag className="size-4" />
                  <span className="text-[13px]">Product List</span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-3 hover:bg-base-200 text-base-content/60 px-3 py-2 rounded-md"
                  to="/"
                >
                  <Plus className="size-4" />
                  <span className="text-[13px]">Add Product</span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-3 hover:bg-base-200 text-base-content/60 px-3 py-2 rounded-md"
                  to="/"
                >
                  <Dumbbell className="size-4" />
                  <span className="text-[13px]">Add Weight</span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center gap-3 hover:bg-base-200 text-base-content/60 px-3 py-2 rounded-md"
                  to="/"
                >
                  <Ruler className="size-4" />
                  <span className="text-[13px]">Add Size</span>
                </Link>
              </li>
            </ul>
          </Accordion>

          <Link
            className="flex items-center gap-3 hover:bg-base-300 text-base-content/80 px-3 py-2 rounded-md text-sm"
            to="/"
          >
            <Users className="size-5" />
            <span className="font-bold">Users</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
