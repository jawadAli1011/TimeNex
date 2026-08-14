import React from "react";

function Footer() {
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
