import '../Styles/SignUp.css';
import React, { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Container, Form,} from 'react-bootstrap';
import { useEditProfile } from './hooks/useEditProfile';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import MovieCard from './MovieCard';
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel';
 

function EditProfile() {

  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [state, setState] = useState('');
  const [card, setCard] = useState('');
  const [exp, setExp] = useState('');
  const [cvv, setCVV] = useState('');
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    if(edit) {
      setEdit(false);
    } else {
      setEdit(true);
    }
  };


  const user = localStorage.getItem('user');
  const userData = JSON.parse(user);

  useEffect(()=> {
    axios.get('http://arnabbiswas1.ddns.net:8000/api/movies')
         .then((res) => {
            setData(res.data);
            console.log(res.data);
         })
         .catch((err) =>{
            console.log("Err");
         })
  }, []);

  const reduceMovies = (acc, cur, index) => {
    const groupIndex = Math.floor(index / 3);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(cur);
    console.log(acc);
    return acc;
  };

  const {editProfile, error, isLoading} = useEditProfile();
  const handleSubmit = async(e) =>{
    e.preventDefault();

    await editProfile(userData.email, name, street, city, zip, state, exp, cvv);

    }



    return (
    <>
      <Container 
        data-bs-theme='dark' 
        className="py-5"
      >
        <Row>
          <Col className="bg-secondary rounded-3 p-3 mb-4">
            <h2 class="text-light">Your Profile:</h2>
          </Col>
        </Row>

        <Row>
          <Col lg="4">
            <Card className="bg-secondary rounded-3 p-3 mb-4">
              <Card.Body className="text-center">
                <Card.Img
                  src="https://www.shutterstock.com/shutterstock/photos/518740741/display_1500/stock-vector-default-avatar-profile-icon-grey-photo-placeholder-518740741.jpg"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <h3>CJ Remley</h3>
                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                <div className="d-flex justify-content-center mb-2">
                <Button size="lg" onClick={handleEdit}>{edit ? 'Submit':'Edit Profile'}</Button>
                </div>
              </Card.Body>
            </Card>

            <Card className="mb-4 mb-lg-0">
              <Card.Body className="p-0">
                <ListGroup flush className="rounded-3">
                  <ListGroup.Item className="bg-secondary d-flex justify-content-between align-items-center p-3">
                    <h3>Credit Cards: </h3>
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-secondary d-flex justify-content-between align-items-center fs-5 p-3">
                    <Image src="https://www.clipartmax.com/png/small/110-1105083_computer-icons-credit-card-bank-card-clip-art-card-icon-white-png.png" roundedCircle width={"50rem"}/>
                    <Card.Text>CJ Remley &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **** **** **** 1111</Card.Text>
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-secondary d-flex justify-content-between align-items-center fs-5 p-3">
                    <Image src="https://www.clipartmax.com/png/small/110-1105083_computer-icons-credit-card-bank-card-clip-art-card-icon-white-png.png" roundedCircle width={"50rem"}/>
                    <Card.Text>CJ Remley &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **** **** **** 1111</Card.Text>
                  </ListGroup.Item>
                  {edit &&
                  <ListGroup.Item className="bg-secondary d-flex justify-content-between align-items-center p-3">
                    <Button size="lg">Add Credit Card</Button>
                    <Button size="lg">Delete Credit Card</Button>
                  </ListGroup.Item>
                  }
                </ListGroup>
              </Card.Body>
            </Card>
            </Col>

            <Col lg="8">
            <Card className="mb-4 bg-secondary">
              <Card.Body>
                <Row>
                  <Col sm="3">
                    <Card.Text>Full Name</Card.Text>
                  </Col>
                  <Col sm="9">
                    {edit ? 
                    <Form.Control 
                    type="textarea" 
                    placeholder="name" 
                    style={{textAlign:'left',width:"15rem"}}
                    onChange={(e) => setName(e.target.value)} 
                    value={name}/>
                    :
                    <Card.Text className="text-muted">CJ Remley</Card.Text>
                    }
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Email</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">example@example.com</Card.Text>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Phone</Card.Text>
                  </Col>
                  <Col sm="9">
                    {edit ? 
                    <Form.Control 
                    type="textarea" 
                    placeholder="000-000-0000" 
                    style={{textAlign:'left',width:"15rem"}}
                    onChange={(e) => setName(e.target.value)} 
                    value={name}/>
                    :
                    <Card.Text className="text-muted">(097) 234-5678</Card.Text>
                    }
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Address</Card.Text>
                  </Col>
                  <Col sm="9">
                    {edit ? 
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className='light-text'>Street</Form.Label>
                      <Form.Control type="light-text" placeholder="Street Name" style={{textAlign:'left',width:"15rem"}} onChange={(e) => setStreet(e.target.value)} value={street}/>
                      <Form.Label className='light-text'>City</Form.Label>
                      <Form.Control type="light-text" placeholder="City" style={{textAlign:'left',width:"15rem"}} onChange={(e) => setCity(e.target.value)} value={city}/>
                      <Form.Label className='light-text'>Zip</Form.Label>
                      <Form.Control type="light-text" placeholder="ZIP" style={{textAlign:'left',width:"15rem"}} onChange={(e) => setZip(e.target.value)} value={zip}/>
                      <Form.Label className='light-text'>State</Form.Label>
                      <Form.Control type="light-text" placeholder="State" style={{textAlign:'left',width:"15rem"}} onChange={(e) => setState(e.target.value)} value={state}/>
                  </Form.Group>
                    :
                    <Card.Text className="text-muted">Bay Area, San Francisco, CA</Card.Text>
                    }
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Row>
              <Col className="bg-secondary justify-content-between align-items-center rounded-3 p-3 mb-4">
                <h2 class="text-light">Your Movies:</h2>
              </Col>
            </Row>
            <Row>
            <Carousel data-bs-theme="dark">
              {data.reduce(reduceMovies, []).map((movie, index) => (
                <Carousel.Item key={index}>
                  <div className="d-flex justify-content-center">
                    {movie.map((movie, index) => {
                      return (
                        <MovieCard title={movie.title} poster={movie.poster} trailer={movie.trailer} />
                      );
                    })}
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
            </Row>
            </Col>
          </Row>
          
      <Row>
        <Form style={{width:"33rem"}}>
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
    </Row>

    </Container>

  
</>
    )
}
  
export default EditProfile;