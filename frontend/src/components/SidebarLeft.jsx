import {
  RiNotification2Line,
  RiHome5Line,
  RiSearchLine,
  RiGlobalLine,
  RiMessage3Line,
  RiAddBoxLine,
  RiCamera2Line,
  RiSettings2Line,
  RiBookmark3Line,
  RiMoonLine,
  RiLineChartLine,
  RiAlignJustify,
  RiSunLine,
  RiErrorWarningLine,
  RiArrowLeftSLine,
} from "@remixicon/react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import React from "react";
import { Switch } from "@mui/material";

export const SidebarLeft = () => {
  const [checked, setChecked] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [showBottomItems, setShowBottomItems] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  const handleBottomItemClick = (label) => {
    setSelectedItem(label === selectedItem ? null : label);
    setShowBottomItems(false);
  };

  const handleBackButtonClick = () => {
    setSelectedItem(null);
    setShowBottomItems(true);
  };

  const handleToggleSideBarClick = () => {
    setShowBottomItems(!showBottomItems);
    setSelectedItem(null);
    setChecked(false);
  };

  const SidebarLeftItems = [
    {
      icon: <RiHome5Line size={30} color="black" className="my-icon" />,
      label: "Home",
    },
    {
      icon: <RiSearchLine size={30} color="black" className="my-icon" />,
      label: "Search",
    },
    {
      icon: <RiGlobalLine size={30} color="black" className="my-icon" />,
      label: "Explore",
    },
    {
      icon: <RiCamera2Line size={30} color="black" className="my-icon" />,
      label: "Buzz",
    },
    {
      icon: <RiMessage3Line size={30} color="black" className="my-icon" />,
      label: "Messages",
    },
    {
      icon: <RiNotification2Line size={30} color="black" className="my-icon" />,
      label: "Notification",
    },
    {
      icon: <RiAddBoxLine size={30} color="black" className="my-icon" />,
      label: "Create",
    },
    {
      icon: (
        <Avatar
          alt="Remy Sharp"
          src="/src/assets/Images/CarouselsImages/KunalMeet.jpg"
          sx={{ width: 28, height: 28 }}
        />
      ),
      label: "Profile",
    },
  ];

  const SidebarLeftBottomItems = [
    {
      icon: (
        <RiSettings2Line
          size={28}
          color="black"
          className="ToggleSideBarIcon"
        />
      ),
      label: "Settings",
    },
    {
      icon: (
        <RiLineChartLine
          size={28}
          color="black"
          className="TimeLineSidebarIcon"
        />
      ),
      label: "Your timeline",
    },
    {
      icon: (
        <RiBookmark3Line
          size={28}
          color="black"
          className="BookmarkSidebarIcon"
        />
      ),
      label: "Bookmarks",
    },
    {
      icon: checked ? (
        <RiMoonLine size={28} color="black" className="ThemeSideBarIcon" />
      ) : (
        <RiSunLine size={28} color="black" className="ToggleSideBarIcon" />
      ),
      label: "Theme appearance",
    },
    {
      icon: (
        <RiErrorWarningLine
          size={28}
          color="black"
          className="ReportProblemSidebarIcon"
        />
      ),
      label: "Report a problem",
    },
    {
      icon: "",
      label: "Logout",
    },
  ];

  return (
    <div className="fixed top-0 left-0 bg-[#e6e6e6] h-screen w-62 flex flex-col items-center justify-center">
      <div className="logo-container fixed top-0 left-0 p-10 flex w-full items-center">
        <p className="text-4xl font-light text-[#000000]">VibeHive</p>
      </div>

      <div className="SidebarItem-Container fixed top-30 left-0 gap-2 h-full w-62 p-2 flex flex-col justify-start items-start">
        {SidebarLeftItems.map((item, index) => (
          <Link
            to={item.path}
            className="SidebarItem h-13 w-full flex justify-start items-center gap-5 px-10 hover:bg-[#ffffff] rounded-xl transition duration-300 ease-in-out"
            key={index}
          >
            {item.icon}
            <p className="text-lg font-semibold text-[#000000]">{item.label}</p>
          </Link>
        ))}
      </div>

      <div className="SidebarBottom fixed bottom-0 left-0 gap-3 w-62 h-20 p-2 flex flex-col justify-center items-center">
        <span
          onClick={handleToggleSideBarClick}
          className="SidebarBottomItem h-13 w-full flex justify-start items-center gap-5 px-10 hover:bg-[#ffffff] rounded-xl transition duration-300 ease-in-out cursor-pointer"
        >
          <RiAlignJustify size={28} color="black" className="MoreIcon" />
          <p className="text-lg font-semibold text-[#000000]">More</p>
        </span>
        {showBottomItems && (
          <div className="SidebarBottomItem-Container absolute bottom-20 left-2 bg-amber-400 h-auto w-70 p-2 gap-[2px] flex flex-col justify-start items-start rounded-2xl shadow-[2px_3px_3px_rgba(0,0,0,0.35)] active:shadow-[2px_3px_3px_rgba(0,0,0,0.35)]">
            {SidebarLeftBottomItems.map((item, index) => (
              <span
                onClick={() => handleBottomItemClick(item.label)}
                className="SidebarBottomItem h-13 w-full flex justify-start items-center gap-5 px-8 hover:bg-[#ffffff] rounded-xl transition duration-300 ease-in-out cursor-pointer"
                key={index}
              >
                {item.icon}
                <p className="text-md font-semibold text-[#000000]">
                  {item.label}
                </p>
              </span>
            ))}
          </div>
        )}
        {selectedItem && selectedItem === "Theme appearance" && (
          <div className="ThemeToggleContainer absolute bottom-18 left-0 w-66 h-26 mx-2 flex flex-col justify-center items-start bg-amber-300 rounded-2xl transition duration-300 ease-in-out">
            <span className="ThemeLabelHeader h-10 w-full px-4  flex justify-between items-center">
              <span className="flex w-full">
                {
                  <RiArrowLeftSLine
                    className="cursor-pointer"
                    onClick={handleBackButtonClick}
                    size={28}
                    color="black"
                  />
                }{" "}
                <p className="text-md font-semibold text-[#000000]">
                  Theme appearence
                </p>
              </span>

              {checked ? (
                <RiMoonLine
                  size={28}
                  color="black"
                  className="ToggleSideBarIcon"
                />
              ) : (
                <RiSunLine
                  size={28}
                  color="black"
                  className="ToggleSideBarIcon"
                />
              )}
            </span>
            <span className="labelToggle w-full flex justify-center items-center px-2">
              <label className="ThemeToggleLabel flex justify-center items-center h-13 bg-amber-100 w-full text-md font-semibold text-[#000000] rounded-xl hover:bg-white transition duration-300 ease-in-out">
                <p>Dark Mode</p>{" "}
                <Switch
                color="warning"
                  type="checkbox"
                  checked={checked}
                  onChange={handleChange}
                  className="ThemeToggleCheckbox"
                />
              </label>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
