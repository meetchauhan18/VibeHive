import React, { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Switch } from "@mui/material";
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
import axios from "axios";
import { toast } from "sonner";

export const SidebarLeft = () => {
  const [checked, setChecked] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [showBottomItems, setShowBottomItems] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    // close more when screen size is changed
    const handleResize = () => {
      setShowBottomItems(false);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const handleChange = () => setChecked(!checked);
  const handleBottomItemClick = (label) => {
    setSelectedItem(label === selectedItem ? null : label);
    setShowBottomItems(false);
  };
  const handleToggleSideBarClick = () => {
    setShowBottomItems(!showBottomItems);
    setSelectedItem(null);
  };

  const handleLogout = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/hive/logout", {
        withCredentials: true,
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        navigate("/accounts/signin");
      }

      console.log(res);
    } catch (error) {
      console.error(error.response.data.message);
    }
  }, [navigate]);

  const SidebarLeftItems = [
    { icon: <RiHome5Line size={30} color="black" />, label: "Home", path: "/" },
    {
      icon: <RiSearchLine size={30} color="black" />,
      label: "Search",
      path: "/search",
    },
    {
      icon: <RiGlobalLine size={30} color="black" />,
      label: "Explore",
      path: "/explore",
    },
    {
      icon: <RiCamera2Line size={30} color="black" />,
      label: "Buzz",
      path: "/buzz",
    },
    {
      icon: <RiMessage3Line size={30} color="black" />,
      label: "Messages",
      path: "/messages",
    },
    {
      icon: <RiNotification2Line size={30} color="black" />,
      label: "Notification",
      path: "/notifications",
    },
    {
      icon: <RiAddBoxLine size={30} color="black" />,
      label: "Create",
      path: "/create",
    },
    {
      icon: (
        <Avatar
          alt="Profile"
          src="/src/assets/Images/CarouselsImages/KunalMeet.jpg"
          sx={{ width: 28, height: 28 }}
        />
      ),
      label: "Profile",
      path: "/profile",
    },
  ];

  const SidebarLeftBottomItems = [
    { icon: <RiSettings2Line size={28} color="black" />, label: "Settings" },
    {
      icon: <RiLineChartLine size={28} color="black" />,
      label: "Your timeline",
    },
    { icon: <RiBookmark3Line size={28} color="black" />, label: "Bookmarks" },
    {
      icon: checked ? (
        <RiMoonLine size={28} color="black" />
      ) : (
        <RiSunLine size={28} color="black" />
      ),
      label: "Theme appearance",
    },
    {
      icon: <RiErrorWarningLine size={28} color="black" />,
      label: "Report a problem",
    },
    { icon: "", label: "Logout" },
  ];

  return (
    <>
      <div className="SidebarLeft z-50 hidden lg:flex md:flex sm:flex flex-col justify-between bg-[#e6e6e6] fixed top-0 left-0 h-screen w-18 lg:w-56 overflow-visible">
        <div className="SidebarLeftItemsContainer flex flex-col p-2 mb-18">
          <Link
            to="/"
            className="Logo text-4xl px-0 lg:px-10 xl:px-10 py-4 font-light text-black"
          >
            <span className="hidden lg:block">VibeHive</span>
            <img
              src="/src/assets/Images/Logo/VibeHive-logo-removebg.png"
              alt="Logo"
              className="hidden lg:hidden md:block sm:block w-16 h-16 hover:scale-130 transition duration-300 ease-in-out cursor-pointer"
            />
          </Link>
          {SidebarLeftItems.map((item, index) => (
            <Link
              to={item.path}
              className="flex items-center gap-4 px-0 justify-center lg:px-8 lg:justify-start py-3 hover:bg-white rounded-xl transition duration-300 ease-in-out cursor-pointer"
              key={index}
            >
              {item.icon}
              <p className="text-lg font-semibold text-black hidden lg:block">
                {item.label}
              </p>
            </Link>
          ))}
        </div>

        <div className="BottomSideBarContainer p-2">
          <span
            onClick={handleToggleSideBarClick}
            className="hidden lg:flex md:flex sm:flex xl:justify-start lg:justify-start md:justify-center sm:justify-center items-center gap-4 cursor-pointer hover:bg-white rounded-xl px-0 xl:px-8 lg:px-8 py-4 transition duration-300 ease-in-out"
          >
            <RiAlignJustify size={28} color="black" />
            <div className="text-lg font-semibold text-black block lg:block md:hidden sm:hidden">
              More
            </div>
          </span>
          {showBottomItems && (
            <div className="SidebarLeftBottomItemsContainer hidden md:flex sm:flex absolute bottom-20 left-2 bg-amber-400 p-2 lg:flex flex-col justify-start items-start rounded-2xl shadow-[2px_3px_3px_rgba(0,0,0,0.35)]">
              {SidebarLeftBottomItems.map((item, index) => (
                <Link
                  to={item.path}
                  onClick={() => handleBottomItemClick(item.label)}
                  className="flex items-center w-full gap-4 px-8 py-4 hover:bg-white rounded-xl transition duration-300 ease-in-out cursor-pointer"
                  key={index}
                >
                  {item.icon}
                  <p className="text-md w-38 font-semibold text-black hidden lg:block md:block sm:block">
                    {item.label}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedItem && selectedItem === "Theme appearance" && (
        <div className=" z-50 absolute bottom-22 p-2 left-0 bg-amber-400 ml-2 rounded-2xl">
          <span className="flex items-center gap-4 p-6 py-4">
            <RiArrowLeftSLine
              className="cursor-pointer"
              size={28}
              color="black"
              onClick={() => {
                setSelectedItem(null), setShowBottomItems(true);
              }}
            />
            <p>{selectedItem}</p>
            {checked ? (
              <RiMoonLine size={28} color="black" />
            ) : (
              <RiSunLine size={28} color="black" />
            )}
          </span>
          <span className="flex w-full justify-between items-center bg-amber-200 gap-4 px-7 py-4 rounded-xl hover:bg-white transition duration-300 ease-in-out">
            <p className="text-lg font-semibold text-black">Dark Mode</p>
            <Switch
              color="warning"
              type="checkbox"
              checked={checked}
              onChange={handleChange}
            />
          </span>
        </div>
      )}

      {useEffect(() => {
        if (selectedItem && selectedItem === "Logout") {
          handleLogout();
        }
      }, [handleLogout, selectedItem])}

      <div className="z-50 lg:hidden md:hidden sm:hidden fixed bottom-0 left-0 w-full bg-[#e6e6e6] flex justify-around items-center p-2 shadow-md">
        {SidebarLeftItems.filter(
          (item) => item.label !== "Search" && item.label !== "Notification"
        ).map((item, index) => (
          <Link
            to={item.path}
            className="flex flex-col items-center justify-center p-2 cursor-pointer hover:bg-white rounded-xl transition duration-300 ease-in-out"
            key={index}
          >
            {item.icon}
          </Link>
        ))}

        <span
          onClick={handleToggleSideBarClick}
          className="hidden lg:flex md:flex flex-col items-center justify-center p-2 cursor-pointer hover:bg-white rounded-xl transition duration-300 ease-in-out"
        >
          <RiAlignJustify size={28} color="black" />
          <p className="text-xs font-semibold text-black">More</p>
        </span>

        {showBottomItems && (
          <div className="absolute bottom-20 left-0 bg-amber-400 w-full p-4 rounded-xl shadow-md">
            {SidebarLeftBottomItems.map(
              (item, index) =>
                item.label ===
                (
                  <Link
                    to={item.path}
                    className="flex flex-col items-center justify-center p-2 cursor-pointer hover:bg-white rounded-xl transition duration-300 ease-in-out"
                    key={index}
                  >
                    {item.icon}
                    <p className="text-xs font-semibold text-black">
                      {item.label}
                    </p>
                  </Link>
                )
            )}
          </div>
        )}

        <div className=" lg:hidden md:hidden sm:hidden fixed top-0 left-0 h-14 w-full bg-[#e6e6e6] flex justify-between items-center p-2 shadow-md">
          <div className="logo-top-small-size">
            <Link to="/" className="flex items-center pl-2">
              <span className="text-2xl font-light text-black">VibeHive</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <input
                type="text"
                name="search"
                placeholder="Search"
                className="flex items-center h-9 w-auto justify-center px-10 cursor-pointer bg-white rounded-lg transition duration-300 ease-in-out active:outline-none focus:outline-none"
              />
              <RiSearchLine
                size={18}
                color="gray"
                className="absolute left-3 border-0"
              />
            </div>

            {SidebarLeftItems.filter(
              (item) => item.label === "Notification"
            ).map((item, index) => (
              <Link
                to={item.path}
                className="flex items-center w-auto justify-center p-2 cursor-pointer"
                key={index}
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
