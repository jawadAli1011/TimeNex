import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Sidebar() {
  const { menu } = useContext(AuthContext);

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

      <nav>
        {fullMenu.map((item) => (
          <div key={item.id}>
            {/* {link.children ? (
              <div>
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === link.name ? null : link.name)
                  }
                  className="nav-item"
                >
                  <div>
                    <span> {link.icon} </span>
                    <span className="collapsible">{link.name} </span>
                    <span className="collapsible">
                      {" "}
                      {openMenu === link.name ? "v" : ">"}{" "}
                    </span>
                  </div>
                </button>

                {openMenu === link.name && (
                  <div>
                    {link.children.map((child) => (
                      <NavLink
                        className="nav-item nav-item-child"
                        key={child.path}
                        to={child.path}
                      >
                        . {child.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div> */}
            {/* // ) :  */}
            {/* ( */}
            <NavLink
              key={item.id}
              to={item.route}
              onClick={() => setOpenMenu("")}
              className="nav-item"
            >
              <div className="flex gap-2">
                {/* <span className="icon text-center "> {item.icon} </span> */}
                <span className="label collapsible">{item.name}</span>
              </div>
            </NavLink>
            {/* // )} */}
          </div>
        ))}
      </nav>
      <div className="sidebar-footer collapsible">
        TimeNex Dashboard <br /> System Active{" "}
      </div>
    </aside>
  );
}

export default Sidebar;
