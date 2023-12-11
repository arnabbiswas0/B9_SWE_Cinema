import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import MovieCard from './MovieCard';
import SignUp from './SignUp';
import Login from './Login';
import ChangePassword from './ChangePassword';
import ChangePasswordConfirmationPage from './ChangePasswordConfirmationPage';
import EditProfile from './EditProfile';
import { useAuthContext } from './hooks/useAuthContext';
import { useLogout } from './hooks/useLogout';



function NavBar() {

   

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [admin, setAdmin] = useState(false);
    const handleAdmin = () => {
        if (localStorage.getItem("Admin")==="Admin") {
            localStorage.clear();
            setAdmin(false);
        } else {
            localStorage.setItem("Admin", "Admin");
            setAdmin(true);
        }
    };

    const { user } = useAuthContext();
    const { logout } = useLogout();
    const handleClick = () =>{
        logout();
      }

    return (
    <>
    <BrowserRouter>
        <Navbar bg="primary" data-bs-theme="dark" sticky={'top'}>
        <Container>
                <Navbar.Brand href="/HomePage">Cinema B9</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/HomePage">Home</Nav.Link>
                    <Nav.Link onClick={handleShow}>Promotions</Nav.Link>

                </Nav>
                <Nav>
                    {user && <Nav.Link href="/EditProfile">Edit Profile</Nav.Link>}
                    {!user && <Nav.Link href="/SignUp">Sign Up</Nav.Link> }
                    {user &&  <Button onClick={handleClick}>Log out</Button> }
                    {!user && <Nav.Link href="/Login">Log In</Nav.Link> }
                </Nav>
        </Container>
      </Navbar>
      <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/HomePage" element={<HomePage/>} />
            <Route path="/Login" element={<Login/>} /> 
            <Route path="/SignUp" element={<SignUp/>} />
            <Route path="/ChangePassword" element={<ChangePassword/>} />
            <Route path="/EditProfile" element={<EditProfile/>} />
            <Route path="/ForgetPassword" element={<ChangePasswordConfirmationPage/>} />

            <Route path="/NavBar" element={<NavBar/>} />

        </Routes>
    </BrowserRouter>
    
    <Offcanvas show={show} onHide={handleClose} scroll={true} placement={'end'} data-bs-theme="dark">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Promotions</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            No Promotions right now, Check again soon!
        </Offcanvas.Body>
    </Offcanvas>
    </>
    );
}

export default NavBar;