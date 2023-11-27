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
            <Link to="laptopregister" className="btn btn-outline-primary">
              Laptop Registration
            </Link>
            
          </li>
          <br></br>
          <li className="nav-item">
            <Link to="laptopList" className="btn btn-outline-primary">
              List all Laptop
            </Link>
          </li>
          <br></br>
          <li className="nav-item">
            <Link to="laptopstats" className="btn btn-outline-primary">
              Laptop Statistics
            </Link>
          </li>
          <br></br>
          <li className="nav-item">
            <Link to="repairHistory" className="btn btn-outline-primary">
              Repair History
            </Link>
          </li>
          <br></br>
        </ul>
      </div>
      <div className="dashboard-content">
        <Outlet></Outlet>
      </div>
    </div>

  );
}

export default DashboardScreen;
