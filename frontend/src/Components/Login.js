import '../Styles/SignUp.css';
import React, { useState } from "react"
import { useLogin } from "./hooks/useLogin";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form,} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
 

function Login() {

  const [showConfirm, setShowConfirm] = useState(false);
  const handleCloseConfirm = () => setShowConfirm(false);
  const handleShowConfirm = () => setShowConfirm(true);

  const [showError, setShowError] = useState(false);
  const handleCloseError = () => setShowError(false);
  const handleShowError = () => setShowError(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login, error, isLoading} = useLogin();

  const handleSubmit = async(e) =>{
    e.preventDefault();

    await login(email, password);
    if (error === null) {
      handleShowConfirm();
    }
    else if (error !== null){
      handleShowError();
    }

  }
  const navigate = useNavigate();

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
        <h2 class="text-light bg-dark">Login:</h2>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='light-text'>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='light-text'>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
      </Form.Group>
      <Button style={{margin: '0.5rem'}} variant="primary"  onClick={() => navigate("/ForgetPassword")}>
        Forgot Password
      </Button>
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
        Log in sucessful! <a href="/HomePage">Click here to go to the HomePage...</a>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCloseConfirm}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal
      show={showError} 
      onHide={handleCloseError}
      centered
      size={'lg'}
      backdrop="static"
      style={{color: "red"}}
    >
      <Modal.Header closeButton>
        <Modal.Title>ERROR</Modal.Title>
      </Modal.Header>
      <Modal.Body textAlign="center">
        INCORECT EMAIL OR PASSWORD! TRY AGAIN!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCloseError}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
</>
    )
}
  
export default Login;