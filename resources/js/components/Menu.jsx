import Container from 'react-bootstrap/Container';
import React, { useContext } from 'react';
import { MyContext } from "../Context";
import Nav from 'react-bootstrap/Nav';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faGamepad, faShoppingCart, faListAlt, faUsers, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Menu() {
  const { token, setGlobalToken } = useContext(MyContext);
  const { id, setGlobalId } = useContext(MyContext);
  const { id_rol, setGlobalId_rol } = useContext(MyContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    setGlobalToken(null);
    setGlobalId(null);
    setGlobalId_rol(null);
    navigate({
      pathname: "/videogamestore/public/login",
    });
  };
  return (
    <>
      <Navbar bg="dark" expand="md" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to=""><img src={"http://localhost/videogamestore/public/icono.png"} width="30" height="30" className="d-inline-block align-top" alt="Geingemmu logo" /> GeinGeemmu</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to=""><FontAwesomeIcon icon={faHome} /> Home</Nav.Link>
              <Nav.Link as={Link} to="ListCards"><FontAwesomeIcon icon={faGamepad} /> VideoGames</Nav.Link>
             
              {id_rol == '1' && (
                <>
                  <Nav.Link as={Link} to="CategoryList"><FontAwesomeIcon icon={faListAlt} /> Category List</Nav.Link>
                   <Nav.Link as={Link} to="UserList"><FontAwesomeIcon icon={faUsers} /> Users</Nav.Link>
                </>
              )}
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="profile"><FontAwesomeIcon icon={faUser} /> Profile</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /> Log Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section>
        <Container>
          <Outlet>
          </Outlet>
        </Container>
      </section>
    </>
  );
}

export default Menu;
