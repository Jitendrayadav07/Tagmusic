import React, { useState } from "react";
import { Menu, Sidebar, Segment, Icon } from "semantic-ui-react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom";

import "./Dashboard.css";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import Outlets from "../Outlets/Outlets";
import Contact from "../Contact/Contact";
import Razorpay from "../Razorpay/Razorpay";
import AddOrg from "../AddOrg/AddOrg";
import Today from "../Today/Today"

const Dashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div>
      <Navbar handleToggleSidebar={handleToggleSidebar} />

      <Sidebar.Pushable style={{ marginTop: "2.5rem" }} className="sidebar">
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          vertical
          visible={sidebarVisible}
          width="thin"
          style={{ backgroundColor: "#192438" }}
        >
          <Menu.Item as={NavLink} to="/dashboard/home">
            Dashboard
          </Menu.Item>
          <Menu.Item as={NavLink} to="/dashboard/outlets">
            Outlets
          </Menu.Item>
          <Menu.Item as={NavLink} to="/dashboard/contact">
            Customer
          </Menu.Item>
          <Menu.Item as={NavLink} to="/dashboard/razorpay">
            Payment
          </Menu.Item>
          <Menu.Item as={NavLink} to="/dashboard/today">
            Today
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher>
          <Segment
            basic
            className={`main-content ${
              sidebarVisible ? "sidebar-open" : "sidebar-hidden"
            }`}
          >
            <Routes>
              <Route path="/home" exact element={<Home />} />
              <Route path="/outlets" exact element={<Outlets />} />
              <Route path="/contact" exact element={<Contact />} />
              <Route path="/razorpay" exact element={<Razorpay />} />
              <Route path="/outlets/addOrg" element={<AddOrg />} />
              <Route path="/today" exact element={<Today />} />
            </Routes>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
};

export default Dashboard;
