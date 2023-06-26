import {Button, NavDropdown} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

function Header() {

  const user = JSON.parse(localStorage.getItem('user-info'));
  const navigate = useNavigate();

  function logout(){
    localStorage.clear();
    navigate('/login');
  }
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link to="/home">Home</Nav.Link>
          </Nav>

          <Nav>
            <NavDropdown title={user && user.name}>
              <NavDropdown.Item onClick={logout}> Logout </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
