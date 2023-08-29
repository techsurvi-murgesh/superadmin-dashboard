import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import MenuIcon from "@mui/icons-material/Menu";
import "./adminSidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Discounts from "../pages/discount/Discounts";
import PricingPlans from "../pages/pricing_plans/PricingPlans";
import LoginPage from "../Auth/login/login";
import ChecklistIcon from "@mui/icons-material/Checklist";
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from "@mui/material";
import Stores from "../pages/stores/Stores";
import StorefrontIcon from '@mui/icons-material/Storefront';

function AdminSidebar() {

  const btnStyle2 = {
    border:"1px solid #252929",
    color: "#252929",
    fontWeight: "bold",
    minWidth: "30px",
    padding: "5px 5px",
    margin: "1rem 0.5rem",
    "&:hover": {
      borderColor: "#252929",
      color: "white",
      backgroundColor: "#252929",
    },
  };

  const [collapsed, setCollapsed] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const styleIcon = {
    color: "#808080",
  };


  const navigate = useNavigate();

  const [activeMenuItem, setActiveMenuItem] = useState(null);
  // Function to handle menu item click and set the active item
  const handleActive = (index) => {
    setActiveMenuItem(index);
  };

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    navigate("/");
    navigate(0);
  };

  const activeClass = "active-menu-item";

  const sidebarStyles = {
    background: "black",
    height:"100%",
  };

  return (
    
    <div style={{ display: "flex", height: "100vh"}}>
      <Sidebar
        style={sidebarStyles}
        className='app'
        collapsed={collapsed}
        onClick={handleActive}
      >
        <Menu         sx={{position:'fixed'}}>
          <MenuItem
            className="menu1"
            icon={<MenuIcon onClick={() => setCollapsed(!collapsed)} />}
          >
            <h3> CUSTOMERFLO</h3>
          </MenuItem>

          <MenuItem
            icon={<HomeIcon style={styleIcon} />}
            component={<Link to="/home" className="link" />}
            className={activeMenuItem === 1 ? activeClass : ""}
            onClick={() => handleActive(1)}
          >
            Home
          </MenuItem>

          <MenuItem
            icon={<LocalOfferIcon style={styleIcon} />}
            component={<Link to="discounts" className="link" />}
          >
            Discounts
          </MenuItem>
          <MenuItem
            icon={<ChecklistIcon style={styleIcon} />}
            component={<Link to="pricingplans" className="link" />}
          >
            Plans
          </MenuItem>
          <MenuItem
            icon={<StorefrontIcon style={styleIcon} />}
            component={<Link to="stores" className="link" />}
          >
            Stores
          </MenuItem>
        </Menu>
        <Button onClick={handleLogOut} sx={btnStyle2}> <LogoutIcon sx={{marginRight:'10px'}}/> Logout </Button>
      </Sidebar>
      <section style={{ width: "100%" }}>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="/" element={<Discounts />} />
          <Route path="discounts" element={<Discounts />} />
          <Route path="pricingplans" element={<PricingPlans />} />
          <Route path="stores" element={<Stores />} />
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </section>
    </div>
  );
}

export default AdminSidebar;
