import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Footer from "../Footer/Footer";
import { ChevronLeft, ChevronDown } from "lucide-react";

function Sidebar() {
  const { menu, logoutUser } = useContext(AuthContext);

  const sideMenu = {
    id: Date.now(),
    name: "Dashboard",
    route: "/",
  };

  const fullMenu = [sideMenu, ...menu];
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <aside id="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">TN</div>
        <div className="logo-text collapsible">
          TimeNex <br />
          <span>Executive Summary</span>
        </div>
      </div>

      <div className="nav-label collapsible">Navigation</div>

      <nav className="flex flex-col ">
        {fullMenu.map((item) => {
          const isOpen = openMenu === item.name;

          return (
            <div key={item.id}>
              <NavLink
                key={item.id}
                to={item.route}
                onClick={() => setOpenMenu(item.name)}
                className={`nav-item ${isOpen ? "activeTab" : ""}`}
              >
                <div className="flex justify-between">
                  {/* <span className="icon text-center "> {item.icon} </span> */}
                  <span className="label collapsible">{item.name}</span>
                  {item.sub_menus && (
                    <span>
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
                    >
                      <div className="flex gap-2">
                        {/* <span className="icon text-center "> {item.icon} </span> */}
                        <span className="label collapsible">
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
