import React from "react";
import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

export const Navbar = () => {
  return (
    <Nav className="main-nav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <NavLink to="/login">Login</NavLink>
    </Nav>
  );
};
