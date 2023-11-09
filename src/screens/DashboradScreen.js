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
    <div className="dashboard-container">
      <div className="fixed-sidebar">
        <ul className="list-unstyled">
          <li className="nav-item">
            <Link to="laptopregister" className="nav-link">
              Laptop Registration
            </Link>
          </li>
          <li className="nav-item">
            <Link to="laptopList" className="nav-link">
              List all Laptop
            </Link>
          </li>
          <li className="nav-item">
            <Link to="laptopstats" className="nav-link">
              Laptop Statistics
            </Link>
          </li>
          <li className="nav-item">
            <Link to="laptopEdit" className="nav-link">
              Laptop Edit
            </Link>
          </li>
        </ul>
      </div>
      <div className="dashboard-content">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default DashboardScreen;
