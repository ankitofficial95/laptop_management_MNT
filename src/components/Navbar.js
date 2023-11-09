import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from '../slices/authSlice';

export const Navbar = () => {

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-info bg-gradient">
        <a className="navbar-brand" href="/home">
          Mindnerves
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <NavLink className='nav-link' to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className='nav-link' to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className='nav-link' to="/contact">Contact</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className='nav-link' to="/dashboard">Dashboard</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className='nav-link' to="/fetchapi">FetchAPI</NavLink>
            </li>
          </ul>

          {user ? (
            <div className="user-info ml-auto">
              {console.log(user.username)}
              <span>Welcome {user.username} !!! </span>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="ml-auto">
              <NavLink className='btn btn-success' to="/login">
                Login
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};
