import { Outlet } from "react-router-dom"
import { Feed } from "../components/Feed.jsx"
import { Story } from "../components/Story.jsx"
import { SidebarRight } from "../components/SidebarRight.jsx"

export const Home = () => {
  return (
    <div className="ml-0 lg:ml-56 md:ml-18 sm:ml-18 flex overflow-auto bg-[white]">
      <div className="flex-grow">
        <Story />
        <Feed />
        <Outlet />
      </div>
      <SidebarRight />
    </div>
  )
}