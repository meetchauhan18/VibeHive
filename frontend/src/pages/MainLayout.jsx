import { Outlet } from "react-router-dom";
import { SidebarLeft } from "../components/SidebarLeft";

export const MainLayout = () => {
  return (
    <div>
      <SidebarLeft />
      <div>
        <Outlet />
      </div>
    </div>
  );
};
