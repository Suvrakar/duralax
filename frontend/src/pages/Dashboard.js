import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar/Navbar";

function DashboardLayout(props) {
  return (
    <>
      <div className="layout-wrapper layout-content-navbar ">
        <div className="layout-container">
          {/* Menu */}
          <Sidebar />
          {/* / Menu */}
          {/* Layout container */}
          <div className="layout-page">
            {/* Navbar */}
            <Navbar />
            {/* / Navbar */}
            {/* Content wrapper */}
            {props.children}
            {/* Content wrapper */}
          </div>
          {/* / Layout page */}
        </div>
        {/* Overlay */}
        <div className="layout-overlay layout-menu-toggle" />
        {/* Drag Target Area To SlideIn Menu On Small Screens */}
        <div className="drag-target" />
      </div>
    </>
  );
}

export default DashboardLayout;
