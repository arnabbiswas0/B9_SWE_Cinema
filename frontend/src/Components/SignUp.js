import '../Styles/SignUp.css';
import React, { useState } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Container, Form,} from 'react-bootstrap';
 

function SignUp() {

  const [showConfirm, setShowConfirm] = useState(false);
  const handleCloseConfirm = () => setShowConfirm(false);
  const handleShowConfirm = () => setShowConfirm(true);


    return (
    <>
      <Container 
        data-bs-theme='dark' 
        style={{height:"42rem",
        width: "25rem", 
        textAlign: "center"}} 
      >
      <Form>
      <Form.Group >
        <h2 class="text-light bg-dark">Create Account:</h2>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='light-text'>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with any unauthorized third parties.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='light-text'>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='light-text'>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" />
      </Form.Group>
      <Button variant="primary"  onClick={handleShowConfirm}>
        Submit
      </Button>
    </Form>
    </Container>

    <Modal
      show={showConfirm} 
      onHide={handleCloseConfirm}
      centered
      size={'lg'}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body textAlign="center">
        Thank you for Signing Up! <a href="/Login">Log in to enjoy your favorite Movies!</a>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCloseConfirm}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
</>
    )
}
  
export default SignUp;
 
