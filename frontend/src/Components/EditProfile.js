import '../Styles/SignUp.css';
import React, { useState } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Container, Form,} from 'react-bootstrap';
 

function EditProfile() {

  const [showConfirm, setShowConfirm] = useState(false);
  const handleCloseConfirm = () => setShowConfirm(false);
  const handleShowConfirm = () => setShowConfirm(true);


    return (
    <>
      <Container 
        data-bs-theme='dark' 
        style={{height:"100%",
        width: "25rem", 
        textAlign: "center"}} 
      >
      <Form>
      <Form.Group >
        <h2 class="text-light bg-dark">Edit Profile:</h2>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='light-text'>Change Name</Form.Label>
        <Form.Control type="email" placeholder="name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='light-text'>Change Password</Form.Label>
        <Form.Control type="password" placeholder="**********" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='light-text'>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="**********" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='light-text'>Change Billing Address</Form.Label>
        <Form.Control type="light-text" placeholder="Street Name" />
        <Form.Control type="light-text" placeholder="City" />
        <Form.Control type="light-text" placeholder="ZIP" />
        <Form.Control type="light-text" placeholder="State" />

        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='light-text'>Change Payment Info</Form.Label>
        <Form.Control type="light-text" placeholder="Card Number" />
        <Form.Control type="light-text" placeholder="Expiration Date" />
        <Form.Control type="light-text" placeholder="CVV/Security Code" />
        
      </Form.Group>

      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
        <label class="form-check-label" for="defaultCheck1" className='light-text'>
             I want to receive promotions. 
        </label>
            </div>
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
        Profile sucessfully updated! <a href="/HomePage">Click here to go to the HomePage...</a>
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
  
export default EditProfile;