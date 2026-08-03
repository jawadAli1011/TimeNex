import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", icon: "◫", path: "/" },
  {
    name: "Employees",
    icon: "👥",
    path: "/employees/list",
    // children: [
    //   { name: "Employees List", path: "/employees/list" },
    //   { name: "Add Employee", path: "/employees/add" },
    // ],
  },
  { name: "Attendance", icon: "◫", path: "/attendance" },
  { name: "Locations", icon: "📍", path: "/locations" },
  { name: "Departments", icon: "◫", path: "/departments" },
  { name: "Reports", icon: "◫", path: "/reports" },
  { name: "Settings", icon: "◫", path: "/settings" },
];

function Sidebar() {
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
        {links.map((link) => (
          <div key={link.path}>
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
              key={link.path}
              to={link.path}
              onClick={() => setOpenMenu("")}
              className="nav-item"
            >
              <div className="flex gap-2">
                <span className="icon text-center "> {link.icon} </span>
                <span className="label collapsible">{link.name}</span>
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
