/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import Logo from '../../assets/images/logo.jpg';
import avatar from '../../assets/svg/avatar.svg';
import './styles.css'
import axios from "axios";
import { useUser } from "../../pages/context/userContext";

function NavbarV2() {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null); // Add ref for dropdown

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    setIsDropdownOpen(false);
    navigate('/login');
  };

  const [currentTab, setCurrentTab] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userName = localStorage.getItem('username');
  const { userData, setUserData } = useUser();

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
    if (userName) {
      setIsLogin(true);
      // navigate('/start-design');
    } else {
      setIsLogin(false);
      navigate('/login');
    }
  }, [userName, navigate]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getUserInfo = async () => {
    try {
      const formData = new FormData();
      formData.append('user', userName);
      const response = await axios.post('http://3.132.248.171:4500/get_user_details', formData);
      console.log(response);
      setUserData(response?.data?.paymentinfo);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [userName]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            alt="logo"
          />
          {isLogin &&
           <Tabs
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
            {isLogin && <p style={{ cursor: 'pointer', '&:hover': { color: 'blue' } }} onClick={() => { navigate('/start-design') }}>Start Designing</p>}
            <p style={{ cursor: 'pointer', '&:hover': { color: 'blue' } }} onClick={() => { navigate('/pricing') }}>Pricing</p>
          </div>
          {isLogin && (
            <div className="dropdown" ref={dropdownRef}>
              <button className="dropdown-toggle" onClick={toggleDropdown}>
                <img src={avatar} style={{ width: "32px", marginRight: '5px' }} alt="avatar" />
                <span>{userData?.length>0 ? userData[0]?.replace('_', " ") :"Admin"}</span>
              </button>
              {isDropdownOpen && (
                <div className="dropdown33" style={{ minWidth: '280px' }}>
                  <div className="" style={{ cursor: 'default', padding: '5px', paddingLeft: '10px', fontWeight: 600 }}>{userData[0]?.replace('_', " ")}</div>
                  <div className="" style={{ cursor: 'default', padding: '5px', paddingLeft: '10px' }}>{userData[3] || "admin@gmail.com"}</div>
                  <div className="dropdown-item" style={{ fontWeight: 600 }} onClick={() => navigate('/billing')}>Account & Billing</div>
                  <div className="" style={{ cursor: 'default', padding: '5px', paddingLeft: '10px', fontWeight: 600 }}>{userData[2]} credits</div>
                  <hr />
                  <div className="dropdown-item" onClick={handleLogout}>Logout</div>
                </div>
              )}
            </div>
          )}
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
              onClick={() => handleLogout()}
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
