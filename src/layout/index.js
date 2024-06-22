import React from "react";
import './style.css'
import { Outlet, Navigate,  } from "react-router-dom"
import NavbarV2 from "../components/NavbarV2";
export function AdminLayout(props) {
  const isAuthenticated = () => {
    const accessToken = localStorage.getItem("token")
    return true
  }
  return (
    <div className="row p-0 m-0">
      <React.Fragment>
        {isAuthenticated() ? <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 p-0 m-0 bg-light">
          {/* Top Navbar */}
          <NavbarV2 />
          {/* Main content */}
          <div className="p-0 w-100 main-content">
            <Outlet />
          </div>
        </div> : (
          <Navigate to="/login" replace />
        )}
      </React.Fragment>
    </div>
  );
}
