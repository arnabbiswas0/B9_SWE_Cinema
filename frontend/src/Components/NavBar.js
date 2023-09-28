import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import MovieCard from './MovieCard';

function NavBar() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
    <>
    <BrowserRouter>
        <Navbar bg="primary" data-bs-theme="dark" sticky={'top'}>
        <Container>
                <Navbar.Brand href="/HomePage">Cinema B9</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/HomePage">Home</Nav.Link>
                    <Nav.Link href="/MovieCard">All Movies</Nav.Link>
                    <Nav.Link onClick={handleShow}>Promotions</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#login">Log In</Nav.Link>
                </Nav>
        </Container>
      </Navbar>
      <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/HomePage" element={<HomePage/>} />
            <Route path="/MovieCard" element={<MovieCard/>} />
        </Routes>
    </BrowserRouter>
    
    <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
             Some text as placeholder. In real life you can have the elements you
             have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
    </Offcanvas>
    </>
    );
}

export default NavBar;