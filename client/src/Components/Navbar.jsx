import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/authContext";
import Logo from "../img/logo.png";

export const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
          <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=cat01">
            <h6>CATEGORY 1</h6>
          </Link>
          <Link className="link" to="/?cat=cat02">
            <h6>CATEGORY 2</h6>
          </Link>
          <Link className="link" to="/?cat=Cat03">
            <h6>CATEGORY 3</h6>
          </Link>
          <Link className="link" to="/?cat=cat04">
            <h6>CATEGORY 4</h6>
          </Link>
          <Link className="link" to="/?cat=cat05">
            <h6>CATEGORY 5</h6>
          </Link>
          <Link className="link" to="/?cat=cat06">
            <h6>CATEGORY 6</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;