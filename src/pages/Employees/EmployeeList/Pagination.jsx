import React from "react";

function Pagination() {
  return (
    <div className="flex justify-between items-center mt-5 text-xs text-gray-500 border-t border-gray-300 pt-4">
      <div>Showing 1 to 4 of 45 entries</div>
      <div className="flex gap-1.5">
        <button className="btn btn-secondary" className="py-1 px-2.5" disabled>
          Previous
        </button>
        <button
          className="btn btn-secondary"
          className="px-2.5 py-1 bg-amber-100/20 text-amber-700 border border-amber-300"
        >
          1
        </button>
        <button className="btn btn-secondary" className="py-1 px-2.5">
          2
        </button>
        <button className="btn btn-secondary" className="py-1 px-2.5">
          3
        </button>
        <button className="btn btn-secondary" className="py-1 px-2.5">
          ...
        </button>
        <button className="btn btn-secondary" className="py-1 px-2.5">
          10
        </button>
        <button className="btn btn-secondary" className="py-1 px-2.5">
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
