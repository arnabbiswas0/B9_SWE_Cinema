import '../Styles/SignUp.css';
import React, { useState } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Container, Form,} from 'react-bootstrap';
import { useEditProfile } from './hooks/useEditProfile';
 

function EditProfile() {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [state, setState] = useState('');
  const [card, setCard] = useState('');
  const [exp, setExp] = useState('');
  const [cvv, setCVV] = useState('');

  const user = localStorage.getItem('user');
  const userData = JSON.parse(user);

  const {editProfile, error, isLoading} = useEditProfile();
  const handleSubmit = async(e) =>{
    e.preventDefault();

    await editProfile(userData.email, name, street, city, zip, state, exp, cvv);

    }


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
        <Form.Control type="email" placeholder="name" onChange={(e) => setName(e.target.value)} value={name}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='light-text'>Change Password</Form.Label>
        <Form.Control type="password" placeholder="**********" onChange={(e) => setPassword(e.target.value)} value={password}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className='light-text'>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="**********" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='light-text'>Change Billing Address</Form.Label>
        <Form.Control type="light-text" placeholder="Street Name" onChange={(e) => setStreet(e.target.value)} value={street}/>
        <Form.Control type="light-text" placeholder="City" onChange={(e) => setCity(e.target.value)} value={city}/>
        <Form.Control type="light-text" placeholder="ZIP" onChange={(e) => setZip(e.target.value)} value={zip}/>
        <Form.Control type="light-text" placeholder="State" onChange={(e) => setState(e.target.value)} value={state}/>

        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='light-text'>Change Payment Info</Form.Label>
        <Form.Control type="light-text" placeholder="Card Number" onChange={(e) => setCard(e.target.value)} value={card}/>
        <Form.Control type="light-text" placeholder="Expiration Date" onChange={(e) => setExp(e.target.value)} value={exp}/>
        <Form.Control type="light-text" placeholder="CVV/Security Code" onChange={(e) => setCVV(e.target.value)} value={cvv}/>
        
      </Form.Group>

      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
        <label class="form-check-label" for="defaultCheck1" className='light-text'>
             I want to receive promotions. 
        </label>
            </div>
      <Button variant="primary" onClick ={handleSubmit} disabled={isLoading}>
        Submit
      </Button>
    </Form>
    </Container>

  
</>
    )
}
  
export default EditProfile;