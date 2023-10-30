import '../Styles/SignUp.css';
import { useSignup } from "./hooks/useSignup";
import React, { useState } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form,} from 'react-bootstrap';

 

function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const {signup, error, isLoading} = useSignup()  


  const [showConfirm, setShowConfirm] = useState(false);
  const handleCloseConfirm = () => setShowConfirm(false);
  const handleShowConfirm = () => setShowConfirm(true);
  const handleSubmit = async(e) => {
    // perform all neccassary validations
    if (password !== confirmPassword) {
        alert("Passwords don't match! Try again!");
    } else {
      e.preventDefault()
    
      await signup(email, password)
    }
}

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
        <Form.Label className='light-text'>Name</Form.Label>
        <Form.Control type="Name" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} value={name} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='light-text'>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email}/>
        <Form.Text className="text-muted">
          We will NEVER share your email with any unauthorized third parties.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='light-text'>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='light-text'>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password"onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
      </Form.Group>
      <Button variant="primary"  onClick={handleSubmit} disabled={isLoading}>
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
 
