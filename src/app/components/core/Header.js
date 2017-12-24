import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';

export default class Header extends Component {
  static displayName = 'Header'

  state = {
    isOpen: false
  }

  _toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className="Header">
        <Navbar color="faded" light expand="sm">
          <NavbarBrand href="/">
          <div className="Header-logo"></div>
          </NavbarBrand>
          <NavbarToggler onClick={this._toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/">Home</Link>
              </NavItem>
              <NavItem>
                <Link to="/funny-images">Funny Images</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
