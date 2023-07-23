import React from 'react';
import { Menu, Sidebar, SidebarPushable, Segment } from 'semantic-ui-react';
import "./SidebarComponent.css";

const SidebarComponent = ({ visible, children }) => {
  return (
    <Sidebar.Pushable  style={{ marginTop: "2.5rem" }} className="sidebar" as={Segment}>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        vertical
        visible
        width="thin"
      >
        {/* Sidebar menu items */}
      </Sidebar>
      <SidebarPushable.Pusher>
        {children}
      </SidebarPushable.Pusher>
    </Sidebar.Pushable>
  );
};

export default SidebarComponent;
