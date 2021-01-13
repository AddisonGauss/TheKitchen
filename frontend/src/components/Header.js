import React, { useEffect } from "react"
import { Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import Searchbox from "../components/SearchBox"
import { logout } from "../actions/userActions"
import { getMyFavorites } from "../actions/userActions"
import { withRouter } from "react-router"
import Loader from "./Loader"
const Header = ({ location }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userMyFavoritesList = useSelector((state) => state.userMyFavoritesList)
  const { loading, error, favorites } = userMyFavoritesList

  const logoutHandler = () => {
    dispatch(logout())
  }

  useEffect(() => {
    dispatch(getMyFavorites())
  }, [dispatch])

  return (
    <header>
      <Navbar variant="dark" bg="primary" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer exact to="/">
            <Nav.Link>
              <Navbar.Brand>TheKitchen</Navbar.Brand>
            </Nav.Link>
          </LinkContainer>
          <Route render={({ history }) => <Searchbox history={history} />} />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto" activeKey={location.pathname}>
              <LinkContainer exact to="/">
                <Nav.Link>
                  <i className="fas fa-home"></i>Home
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <>
                  <LinkContainer exact to="/profile">
                    <Nav.Link>
                      <i className="fas fa-heart"></i>
                      {favorites ? favorites.length : 0}
                    </Nav.Link>
                  </LinkContainer>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer exact to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer exact to="/login">
                    <Nav.Link>
                      <i className="fas fa-user"></i>Sign in
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <i className="fas fa-pen"></i>Register
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default withRouter(Header)
