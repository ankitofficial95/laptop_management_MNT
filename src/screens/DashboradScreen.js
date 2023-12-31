import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

function DashboardScreen() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <div>
        <p className="lead text-center">
          Login first to see the dashboard data
        </p>
      </div>
    );
  }

  return (
   <div>
     <div className="d-flex">
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-dark"
        style={{ width: "240px", height: "100vh" }}
      >
        <hr />
        <ul className="nav flex-column mb-auto">
          <li className="nav-item">
            <Link to="laptopregister" className="nav-link reduced-font btn btn-outline-warning rounded-pill">
              Laptop Registration
            </Link>
          </li>
          <br />

          <li className="nav-item">
            <Link to="laptopList" className="nav-link reduced-font btn btn-outline-warning rounded-pill">
              List all Laptop
            </Link>
          </li>
          <br />

          <li className="nav-item">
            <Link to="laptopstats" className="nav-link reduced-font btn btn-outline-warning rounded-pill">
              Laptop Statistics
            </Link>
          </li>
          <br />

          <li className="nav-item">
            <Link to="repairHistory" className="nav-link reduced-font btn btn-outline-warning rounded-pill">
              Repair History
            </Link>
          </li>
          <br />
        </ul>
        <hr />
      </div>

      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
   </div>
  );
}

export default DashboardScreen;
