import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Footer() {
  const { logoutUser } = useContext(AuthContext);
  return (
    <div className="sidebar-footer flex justify-end ">
      <button
        className="text-sm cursor-pointer logout rounded-md "
        onClick={() => logoutUser()}
      >
        Logout
      </button>
    </div>
  );
}

export default Footer;
