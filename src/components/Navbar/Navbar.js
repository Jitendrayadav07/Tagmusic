import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Icon, Menu, Dropdown } from "semantic-ui-react";

const Navbar = ({ handleToggleSidebar }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Perform logout logic here

    // Navigate to the login page after logout
    navigate("/");
  };

  const logoutOptions = [
    { key: "logout", text: "Logout", onClick: handleLogout },
  ];

  return (
    <Menu fixed="top" inverted className="navbar" style={{ backgroundColor: '#192438' }}>
      <Menu.Item onClick={handleToggleSidebar} className="sidebar-toggle">
        <Icon name="sidebar" />
      </Menu.Item>
      <Menu.Item as={NavLink} to="/" exact>
        Chat GPT
      </Menu.Item>
      <Menu.Menu position="right" >
        <Dropdown item icon="user" simple>
          <Dropdown.Menu>
            <Dropdown.Item {...logoutOptions[0]} />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
