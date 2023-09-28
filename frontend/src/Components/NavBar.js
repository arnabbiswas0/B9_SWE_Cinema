import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import MovieCard from './MovieCard';

function NavBar() {
    return (
    <BrowserRouter>
        <Navbar bg="primary" data-bs-theme="dark" sticky={'top'}>
        <Container>
                <Navbar.Brand href="/HomePage">Cinema B9</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/HomePage">Home</Nav.Link>
                    <Nav.Link href="/MovieCard">MovieCard</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
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
        
    );
}

export default NavBar;