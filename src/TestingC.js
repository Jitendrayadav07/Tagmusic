import React from 'react';
import { Menu, Sidebar, SidebarPushable } from 'semantic-ui-react';
// import "./SidebarComponent.css";

const TestingC = ({ visible, children }) => {
  return (
    <Sidebar.Pushable  style={{ marginTop: "2.5rem" }} className="sidebar">
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        vertical
        visible
        width="thin"
        className="sidebar"
      >
        {/* Sidebar menu items */}
      </Sidebar>
      <SidebarPushable.Pusher>
        {children}
      </SidebarPushable.Pusher>
    </Sidebar.Pushable>
  );
};

export default TestingC;
