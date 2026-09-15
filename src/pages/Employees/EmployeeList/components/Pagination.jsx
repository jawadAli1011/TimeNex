import React, { useState } from "react";

function Pagination({ filteredEmp, start, setStart, end, setEnd }) {
  const [activeTab, setActiveTab] = useState(1);
  const handleNext = () => {
    setStart(start + 7);
    setEnd(end + 7);
    setActiveTab(activeTab + 1);
  };

  const handlePrevious = () => {
    setStart(start - 7);
    setEnd(end - 7);
    setActiveTab(activeTab - 1);
  };
  return (
    <div
      className="flex justify-between items-center mt-5 text-xs text-gray-500 border-t border-gray-300 "
      style={{ paddingTop: "10px" }}
    >
      <div>
        Showing {start + 1} to {Math.min(end, filteredEmp.length)} of{" "}
        {filteredEmp.length} entries
      </div>
      <div className="flex gap-1.5">
        <button
          className="btn btn-secondary py-1 px-2.5"
          onClick={handlePrevious}
          disabled={start === 0}
        >
          Previous
        </button>
        <button className="btn activeTab">{activeTab} </button>

        <button
          className="btn btn-secondary "
          onClick={handleNext}
          disabled={end >= filteredEmp.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
