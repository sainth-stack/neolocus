import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tab, Tabs, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Import the MenuIcon
import Logo from "../../assets/images/logo.jpg";
import avatar from "../../assets/svg/avatar.svg";
import "./styles.css";
import axios from "axios";
import { useUser } from "../../pages/context/userContext";
export const baseURL = "https://maya.otamat.com/api";

function NavbarV2() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    setIsDropdownOpen(false);
    navigate("/login");
  };

  const [currentTab, setCurrentTab] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const userName = localStorage.getItem("username");
  const { userData, setUserData } = useUser();

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    if (newValue === 0) {
      navigate("/start-design");
    } else {
      navigate("/graph-view");
    }
  };

  useEffect(() => {
    if (userName) {
      setIsLogin(true);
      // navigate('/start-design');
    } else {
      setIsLogin(false);
      // navigate('/login');
    }
  }, [userName]);

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname == "/start-design") {
      setCurrentTab(0);
    } else if (pathname === "/graph-view") {
      setCurrentTab(1);
    }
  }, [location]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getUserInfo = async () => {
    try {
      if (userName) {
        const formData = new FormData();
        formData.append("user", userName);
        const response = await axios.post(
          `${baseURL}/get_user_details`,
          formData
        );
        console.log(response);
        if (response?.data?.paymentinfo.length > 2) {
          localStorage.setItem("email", response?.data?.paymentinfo[3]);
        }
        setUserData(response?.data?.paymentinfo);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleNavigate = (pathname) => {
    const confirmation = window.confirm(
      "Are you sure you want to Navigate To other Page?"
    );
    if (confirmation) {
      navigate(pathname);
    }
    /* navigate("/start-design"); */
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
      <nav className="navbar navbar-expand-lg navbar-light sticky-top">
        <div className="navbar-container">
          <div className="logo-container">
            <img src={Logo} alt="logo" />
            <h1>May</h1>
            {isLogin && !isSmallScreen && (
              <Tabs
                value={currentTab}
                onChange={handleTabChange}
                sx={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  "& .MuiTabs-flexContainer": {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "baseline",
                  },
                  "& .MuiTab-root": {
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "24px",
                    fontFamily: "Poppins",
                    color: "#242424",
                    margin: "4px",
                    padding: "4px 10px",
                    ":hover": {
                      background: "#E6EDF5",
                    },
                  },
                  "& .Mui-selected": {
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
              </Tabs>
            )}
          </div>
          <button className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            <MenuIcon />
          </button>
          <div className={`menu-items ${menuOpen ? "active" : ""}`}>
            {isLogin && isSmallScreen && (
              <Tabs
                value={currentTab}
                onChange={handleTabChange}
                sx={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  "& .MuiTabs-flexContainer": {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "baseline",
                  },
                  "& .MuiTab-root": {
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: "400",
                    lineHeight: "24px",
                    fontFamily: "Poppins",
                    color: "#242424",
                    margin: "4px",
                    padding: "4px 10px",
                    ":hover": {
                      background: "#E6EDF5",
                    },
                  },
                  "& .Mui-selected": {
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
              </Tabs>
            )}
            <div className="menu-options">
              {isLogin && (
                <p
                  onClick={() => {
                    handleNavigate("start-design");
                  }}
                >
                  Start Designing
                </p>
              )}
              <p
                onClick={() => {
                  handleNavigate("/pricing");
                }}
              >
                Pricing
              </p>
              {isLogin && (
                <div className="dropdown" ref={dropdownRef}>
                  <button className="dropdown-toggle" onClick={toggleDropdown}>
                    <img
                      src={avatar}
                      alt="avatar"
                      style={{
                        width: "2.5rem",
                        marginRight: ".2rem",
                      }}
                      className="img"
                    />
                    <span>
                      {userData?.length > 0
                        ? userData[0]?.replace("_", " ")
                        : "Admin"}
                    </span>
                  </button>
                  {isDropdownOpen && (
                    <div className="dropdown33">
                      {userData?.length > 1 && (
                        <div className="dropdown-item">
                          {userData[0]?.replace("_", " ")}
                        </div>
                      )}
                      {userData?.length > 1 && (
                        <div className="dropdown-item">
                          {userData[3] || "admin@gmail.com"}
                        </div>
                      )}
                      {userData?.length > 1 && (
                        <div
                          className="dropdown-item"
                          onClick={() => {
                            handleNavigate("/billing");
                          }}
                        >
                          Account & Billing
                        </div>
                      )}
                      {userData?.length > 1 && (
                        <div className="dropdown-item">
                          {userData[2]} credits
                        </div>
                      )}
                      <hr />
                      <div className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </div>
                    </div>
                  )}
                </div>
              )}
              {!isLogin && (
                <button className="btn" onClick={handleLogout}>
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavbarV2;
