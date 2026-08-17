import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Footer from "../Footer/Footer";
import { ChevronLeft, ChevronDown } from "lucide-react";
import GitIcon from "../../utills/GitIcon";
import { useDashboard } from "../../context/DashboardContext";
import Tooltip from "@mui/material/Tooltip";
import RefreshIcon from "@mui/icons-material/Refresh";

function Sidebar() {
  const { menu } = useContext(AuthContext);
  const { fetchDashboard } = useDashboard();

  const sideMenu = {
    id: Date.now(),
    name: "Dashboard",
    route: "/",
  };

  const fullMenu = [sideMenu, ...menu];
  const [openMenu, setOpenMenu] = useState("Dashboard");
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <aside id="sidebar" className={`${openSidebar ? "" : "sidebar"}`}>
      <div className="sidebar-logo">
        <Tooltip title={openSidebar ? "Close Sidebar" : "Open Sidebar"}>
          <div
            className="logo-icon"
            onClick={() => setOpenSidebar(!openSidebar)}
          >
            TN
          </div>
        </Tooltip>
        <div className={`logo-text ${openSidebar ? "" : "collapsible"}`}>
          TimeNex <br />
          <span>Executive Summary</span>
        </div>
        <Tooltip title="Refresh" placement="right">
          <RefreshIcon
            className={`${openSidebar ? "" : "collapsible"}`}
            onClick={() => fetchDashboard()}
          />
        </Tooltip>
      </div>

      <nav className="flex flex-col ">
        {fullMenu.map((item) => {
          const isOpen = openMenu === item.name;

          const menuToggle = function (menu) {
            isOpen === true ? setOpenMenu(null) : setOpenMenu(menu);
          };

          return (
            <div key={item.id}>
              <NavLink
                key={item.id}
                to={item.route}
                onClick={() => {
                  {
                    menuToggle(item.name);
                    setOpenSidebar(true);
                  }
                }}
                className={`nav-item ${isOpen ? "activeTab" : ""}`}
              >
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <Tooltip
                      key={item.name}
                      title={openSidebar ? item.name : ""}
                      placement="right"
                    >
                      <span className="icon text-center">
                        {GitIcon(item.name)}
                      </span>
                    </Tooltip>

                    <span
                      className={`label ${openSidebar ? "" : "collapsible"}`}
                    >
                      {item.name}
                    </span>
                  </div>
                  {item.sub_menus && (
                    <span
                      className={`arrowIcon ${openSidebar ? "" : "collapsible"}`}
                    >
                      {isOpen ? (
                        <ChevronDown size={18} />
                      ) : (
                        <ChevronLeft size={18} />
                      )}
                    </span>
                  )}
                </div>
              </NavLink>
              {item.sub_menus && isOpen && (
                <div className="child">
                  {item.sub_menus?.map((subItem) => (
                    <NavLink
                      key={subItem.id}
                      to={subItem.route.replaceAll("#", "/")}
                      className="nav-item "
                      onClick={() => {
                        setOpenSidebar(false);
                        menuToggle(item.name);
                      }}
                    >
                      <div className="flex gap-2">
                        <span
                          className={`label ${openSidebar ? "collapsible" : ""}`}
                        >
                          {subItem.name}
                        </span>
                      </div>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <Footer />
    </aside>
  );
}

export default Sidebar;
