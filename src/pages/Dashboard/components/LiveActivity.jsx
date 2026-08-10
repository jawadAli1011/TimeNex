import React from "react";

function LiveActivity({ late, present }) {
  const recent = [...late, ...present].slice(0, 8);

  return (
    <>
      {/* //    <!-- Live Feed --> */}
      <div className="section-head mt-6">
        <h2>Live Activity</h2>
        <p>Employees recently checked in</p>
      </div>
      <div className="live-feed mb-6">
        {recent.length > 0 ? (
          recent.map((e) => (
            <div className="live-item" key={e.id}>
              <div className="avatar-sm">{e.name.charAt(0)}</div>
              <div>
                <div className="font-semibold text-(--text)">
                  {e.name.split(" ")[0]}
                </div>
                <div className="text-(--text-muted) text-[9px]">
                  Checked in live
                </div>
              </div>
            </div>
          ))
        ) : (
          <span className="text-3 text-(--text-muted) ">
            No live check-ins in the last hour.
          </span>
        )}
      </div>
    </>
  );
}

export default LiveActivity;
