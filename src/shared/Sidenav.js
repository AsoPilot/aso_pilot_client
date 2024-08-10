import React from "react";
import { Nav } from "react-bootstrap";

const SideNav = () => {
  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      <Nav.Link href="/dashboard">Dashboard</Nav.Link>
      <Nav.Link href="/reviews-feed">Reviews Feed</Nav.Link>
      <Nav.Link href="/integration">Integration</Nav.Link>
      <Nav.Link href="/about-us">About Us</Nav.Link>
      <Nav.Link href="/contact-us">Contact Us</Nav.Link>
    </Nav>
  );
};

export default SideNav;
