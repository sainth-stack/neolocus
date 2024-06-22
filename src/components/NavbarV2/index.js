/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import Logo from '../../assets/images/logo.jpg';
import avatar from '../../assets/svg/avatar.svg';
import './styles.css'
function NavbarV2() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    // localStorage.removeItem("token");
    navigate('/login');
  };

  const [currentTab, setCurrentTab] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    if (newValue === 0) {
      navigate('/start-design');
    } else {
      navigate('/graph-view');
    }
  };

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === '/login' || pathname === '/register' || pathname === '/pricing') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [location]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  console.log(isDropdownOpen)
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light sticky-top" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        borderBottom: '1px solid lightgrey',
        background: 'rgb(255 252 245)'
      }}>
        <div className="collapse navbar-collapse" style={{ marginLeft: '20px', display: 'flex', gap: '20px' }} id="navbarNav">
          <img
            src={Logo}
            style={{ width: '100px', height: '62px' }}
            id="logo_RL"
          />
          {isLogin && <Tabs
            value={currentTab}
            onChange={handleTabChange}
            sx={{
              marginTop: '10px',
              marginBottom: '10px',
              '& .MuiTabs-flexContainer': {
                display: 'flex',
                flexDirection: 'row',
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: '400',
                lineHeight: '24px',
                fontFamily: 'Poppins',
                color: '#242424',
                margin: '4px',
                padding: '4px 10px',
                ':hover': {
                  background: '#E6EDF5'
                }
              },
              '& .Mui-selected': {
                fontWeight: 700,
              },
              svg: {
                width: 16,
                height: 16,
              },
            }}
          >
            <Tab label="Text View" />
            <Tab label="Graphical View" />
          </Tabs>}
        </div>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center', paddingRight: '10px' }}>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
            <p style={{ cursor: 'pointer', '&:hover': { color: 'blue' } }} onClick={() => { navigate('/start-design') }}>Start Designing</p>
            <p style={{ cursor: 'pointer', '&:hover': { color: 'blue' } }} onClick={() => { navigate('/pricing') }}>Pricing</p>
          </div>
        {   isLogin &&<div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              <img src={avatar} style={{ width: "32px", marginRight: '5px' }} alt="avatar" />
              <span>{localStorage.getItem("userName") !=='undefined' ? localStorage.getItem("userName") : "Admin"}</span>
            </button>
            {(isDropdownOpen) && (
            <div className="dropdown33">
              <div className="" style={{cursor:'default',padding:'5px',paddingLeft:'10px',fontWeight:600}}>Sainathreddy Guraka</div>
              <div className="" style={{cursor:'default',padding:'5px',paddingLeft:'10px'}}>sainathreddyguraka@gmail.com</div>
              <div className="dropdown-item" style={{fontWeight:600}}>Account & Billing</div>
              <div className="" style={{cursor:'default',padding:'5px',paddingLeft:'10px',fontWeight:600}}>0 credits</div>
              <hr />
              <div className="dropdown-item" onClick={handleLogout}>Logout</div>
            </div>
            )}
          </div>}
          {!isLogin && (
            <button
              style={{
                padding: '8px 10px',
                background: 'rgb(72, 136, 200)',
                width: '100px',
                borderRadius: '15px',
                color: 'white',
                border: "none"
              }}
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavbarV2;
