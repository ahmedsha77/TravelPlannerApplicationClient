import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/"><h3>TravelPlanner ✈</h3></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
            <Link to="/" className="nav-link">Vacation Logs</Link>
            </NavItem>
            <NavItem>
            <Link to="/create" className="nav-link">Create a Vacation Log</Link>
            </NavItem>
            <NavItem>
            <Link to="/user" className="nav-link">Create User</Link>
            </NavItem>
            <NavItem>
            <Link to="/about" className="nav-link">About</Link>
            </NavItem>
           </Nav>
          <NavbarText>By Shiraz Ahmed</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;
