import React from 'react';
import Container from 'react-bootstrap/Container';
import AppNavbar from './Navbar'; // Corrected import name

function MainLayout({ children }) {
  return (
    <>
      <AppNavbar />
      <Container style={{ paddingTop: '20px' }}>
        {children}
      </Container>
    </>
  );
}

export default MainLayout;