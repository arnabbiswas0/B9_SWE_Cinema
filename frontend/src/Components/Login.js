import '../Styles/SignUp.css';
import React, { useState } from "react"
import { useLogin } from "./hooks/useLogin";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Card, Row, Col} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
 

function Login() {

  const [showConfirm, setShowConfirm] = useState(false);
  const handleCloseConfirm = () => setShowConfirm(false);
  const handleShowConfirm = () => setShowConfirm(true);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);


  const [showError, setShowError] = useState(false);
  const handleCloseError = () => setShowError(false);
  const handleShowError = () => setShowError(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login, error, isLoading} = useLogin();

  const handleForgotPassword = () => {
    setShowForgotPasswordModal(true);
  };
  

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
      <Container className='my-5 justify-content-center align-items-center'
      data-bs-theme='dark' 
      style={{height:"77.05rem",
      width: "100rem", 
      textAlign: "center"}}
      >
      <Card className='bg-secondary justify-content-center align-items-center w-50 mx-auto'>
          <Card.Header className='bg-secondary w-100'>
            <h2 class="text-light">Login:</h2>
          </Card.Header>
            <Card.Body className='justify-content-center mx-auto w-100'>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='light-text'>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className='light-text'>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
              </Form.Group>
              <div className="d-flex justify-content-center mx-4 mb-4">
                <Button variant="link" onClick={handleForgotPassword} className="text-light">Forgot password?</Button>

              </div>
              <Button variant="primary"  onClick={handleSubmit} disabled={isLoading}>
                Submit
              </Button>
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
        Log in sucessful! <a href="/HomePage">Click here to go to the HomePage...</a>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCloseConfirm}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    <Modal
  show={showForgotPasswordModal}
  onHide={() => setShowForgotPasswordModal(false)}
  centered
  backdrop="static"
>
  <Modal.Header closeButton>
    <Modal.Title>Reset Password</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form.Group className="mb-3">
      <Form.Label>Email address</Form.Label>
      <Form.Control
        type="email"
        placeholder="Enter your email"
        // You can add a state to manage this value
      />
      <Form.Text className="text-muted">
        We'll send you a link to reset your password.
      </Form.Text>
    </Form.Group>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowForgotPasswordModal(false)}>
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