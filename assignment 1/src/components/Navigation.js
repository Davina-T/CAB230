import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { NavLink as RRNavLink } from "react-router-dom"

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [])

  const toggle = () => setIsOpen(!isOpen)

  function handleLogout() {
    localStorage.removeItem("token")
    window.location.reload(false)
  }

  return (
    <Navbar className="navigation__bar" custom expand="md">
      <NavbarBrand href="/">
        <img
          className="brand__img"
          src="../img/icon.png"
          alt="brand"
        ></img>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink tag={RRNavLink} to="/">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to="/stocks">
              Stocks
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to="/quote">
              Quote
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to="/price_history">
              Price History (Restricted)
            </NavLink>
          </NavItem>
        </Nav>

        {!loggedIn ? (
          <div>
            <NavbarText className="navbar__link">
              <Link tag={RRNavLink} to="/register">
                Register
              </Link>
            </NavbarText>
            <NavbarText className="navbar__link">
              <Link tag={RRNavLink} to="/login">
                Login
              </Link>
            </NavbarText>
          </div>
        ) : (
          <NavbarText className="navbar__link">
            <button className="logout__button" onClick={handleLogout}>
              Logout
            </button>
          </NavbarText>
        )}
      </Collapse>
    </Navbar>
  )
}

export default Navigation
