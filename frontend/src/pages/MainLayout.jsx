import { Outlet } from "react-router-dom";
import { SidebarLeft } from "../components/SidebarLeft";

export const MainLayout = () => {
  return (
    <div className="flex">
      <SidebarLeft />
      <div className="relative flex-1 mt-14 mb-16 sm:mb-0 sm:mt-0 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};
