import '../Styles/SignUp.css';
import { useSignup } from "./hooks/useSignup";
import React, { useState } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Card} from 'react-bootstrap';

 

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
    
      await signup(name,email, password)
    }
}

    return (
    <>
      <Container className='my-5 justify-content-center align-items-center'
      data-bs-theme='dark' 
      style={{height:"77.05rem",
      width: "100rem", 
      textAlign: "center"}}
      >
      <Card className='bg-secondary justify-content-center align-items-center w-50 mx-auto'>
          <Card.Header className='bg-secondary w-100'>
            <h2 class="text-light">Create Account:</h2>
          </Card.Header>
            <Card.Body className='justify-content-center mx-auto w-100'>
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
              <Form.Group>
                <Form.Label className='light-text'>Already Signed up? <a href="/Login">Log in here!</a></Form.Label>
              </Form.Group>
              <Button variant="primary"  onClick={handleSubmit} disabled={isLoading}>
                Submit
              </Button>
              {error && <div className="error">{error}</div>}
            </Card.Body>
      </Card>
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
 
