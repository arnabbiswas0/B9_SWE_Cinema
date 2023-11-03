import '../Styles/SignUp.css';
import React, { useState } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Container, Form,} from 'react-bootstrap';
import { useChangePassword } from './hooks/useChangePassword';
 

function ChangePasswordConfirmationPage() {

  const [showConfirm, setShowConfirm] = useState(false);
  const handleCloseConfirm = () => setShowConfirm(false);
  const handleShowConfirm = () => setShowConfirm(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {changePassword, error, isLoading} = useChangePassword();  
  const handleSubmit = async(e) => {
    // perform all neccassary validations
    if (password !== confirmPassword) {
        alert("Passwords don't match! Try again!");
    } else {
      e.preventDefault();
    
      await changePassword(email, password);
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
        <h2 class="text-light bg-dark">Reset Password:</h2>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='light-text'>Email</Form.Label>
        <Form.Control type="email" placeholder="your@email.com" onChange={(e) => setEmail(e.target.value)} value={email}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='light-text'>New Password</Form.Label>
        <Form.Control type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='light-text'>Confirm New Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm New Password"onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
      </Form.Group>

      <Button variant="primary"  onClick={handleSubmit}>
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
        Password sucessfully changed! <a href="/HomePage">Click here to go to the HomePage...</a>
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
  
export default ChangePasswordConfirmationPage;