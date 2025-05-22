import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function AppNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Appraisal Data App</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;