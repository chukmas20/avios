import React from 'react';
import {Container, Navbar, Nav} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";

const Header = () => {
  return (
      <>
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/">Avios Online Shop</Navbar.Brand>
            <Nav className="me-auto">
            {/* <Nav.Link href="/nowhere">N</Nav.Link> */}
            </Nav>
            </Container>
            <LinkContainer to="/cart">
                 <Nav.Link ><i className="fas fa-shopping-cart " style={{color:"white"}}></i>
                    <span style={{color:"white"}}> Cart </span> 
                  </Nav.Link>
            </LinkContainer>
        </Navbar>               
    </>
  );
};

export default Header;
