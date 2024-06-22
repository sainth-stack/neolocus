import React from "react";
import './style.css'
import { Outlet, Navigate, useNavigate } from "react-router-dom"
import KPISidebar from "../components/Sidebar/kpiSidebar";
import Navbar from "../components/Navbar";
export function KPILayout(props) {
  const isAuthenticated = () => {
    return true
  }
  return (
    <div className="row p-0 m-0">
      <React.Fragment>
        {isAuthenticated() ? <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 p-0 m-0 bg-light">
          <Navbar />

          <div className="d-flex justify-content-between" >
            <div className={""}>
              <KPISidebar />
            </div>
            <div className="p-0 w-100 main-content">
              <Outlet />
            </div>
          </div>
        </div> : (
          <Navigate to="/login" replace />
        )}
      </React.Fragment>
    </div>
  );
}
