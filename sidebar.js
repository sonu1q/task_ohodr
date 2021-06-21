import React from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/image/Rectangle 4.svg";
import { BiHomeAlt, BiHeart } from "react-icons/bi";
import { RiStethoscopeLine, RiStarSLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";

function Sidebar(page) {
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push("/");
    window.location.reload(false);
  };

  return (
    <>
      <div className="sidebar-container">
        <div className="sidebar-logo-container">
          <img src={logo} alt="logo" className="inline" />
          <h3 className="inline sidebar-icon-title"> Welly </h3>
        </div>
        <div
          className={
            page.page === "dashboard" ? "sidebar-item-active" : "sidebar-item"
          }
        >
          <Link to="/">
            <BiHomeAlt className="inline sidebar-icons" />
            <h5 className="inline sidebar-icon-label">Dashboard</h5>
          </Link>
        </div>
        <div
          className={
            page.page === "patient" ? "sidebar-item-active" : "sidebar-item"
          }
        >
          <Link to="/patient-list">
            <BiHeart className="inline sidebar-icons" />
            <h5 className="inline sidebar-icon-label">Patient List</h5>
          </Link>
        </div>
        <div
          className={
            page.page === "doctor" ? "sidebar-item-active" : "sidebar-item"
          }
        >
          <Link to="/doctor-list">
            <RiStethoscopeLine className="inline sidebar-icons" />
            <h5 className="inline sidebar-icon-label">Doctor List</h5>
          </Link>
        </div>
        <div
          className={
            page.page === "specialty" ? "sidebar-item-active" : "sidebar-item"
          }
        >
          <Link to="/specialty-list">
            <RiStarSLine className="inline sidebar-icons" />
            <h5 className="inline sidebar-icon-label">Specialty List</h5>
          </Link>
        </div>
        <div className="sidebar-item">
          <FiLogOut className="inline sidebar-icons ml-1" />
          <button onClick={logout} className="inline sidebar-icon-label">
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
