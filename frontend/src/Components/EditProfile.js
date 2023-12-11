import '../Styles/SignUp.css';
import React, { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Container, Form,} from 'react-bootstrap';
import { useEditProfile } from './hooks/useEditProfile';
import { useAddCard } from './hooks/useAddCard';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import MovieCard from './MovieCard';
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel';
 

function EditProfile() {

  const [account, setAccount] = useState([]);
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [state, setState] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [type, setType] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [exp, setExp] = useState('');
  const [cvv, setCVV] = useState('');
  const [edit, setEdit] = useState(false);
  const [addingCard, setAddingCard] = useState(false);
  const [credits, setCredits] = useState([]);
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
    axios.get('http://localhost:8000/api/movies')
         .then((res) => {
            setData(res.data);
           
         })
         .catch((err) =>{
           
         })
  }, []);

  const reduceMovies = (acc, cur, index) => {
    const groupIndex = Math.floor(index / 3);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(cur);
    return acc;
  };

  const {editProfile, error, isLoading} = useEditProfile();
  const handleSubmit = async(e) =>{
    e.preventDefault();

    await editProfile(userData.email, name, phone, street, city, zip, state);
    setEdit(false);
    window.location.reload();
    }
  useEffect(()=> {
      axios.post('http://localhost:8000/api/getProfile', {
        email: userData.email
        })
          .then((res) => {
              setAccount(res.data[0]);
           })
           .catch((err) =>{
              console.log("Err");
           })
    }, [userData.email]);
    useEffect(()=> {
      axios.post('http://localhost:8000/api/getPaymentCards', {
        email: userData.email
        })
          .then((res) => {
              setCredits(res.data);
              console.log(res.data);
              console.log(credits);
           })
           .catch((err) =>{
              console.log("Err");
           })
    }, [userData.email]);

    const{addCard, deleteCard} = useAddCard();
    const handleAddCard = async(e) => {
      await addCard(userData.email, cardNumber, type, cvv, exp, nameOnCard);
      setAddingCard(false);
    }
    const handleDeleteCard = async(e) => {
      await deleteCard(userData.email, cardNumber);
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
                <h3>{account.name}</h3>
                <p className="text-muted mb-4">{account.streetName}, {account.city}, {account.state}, {account.zip}</p>
                <div className="d-flex justify-content-center mb-2">
                  {edit ? 
                    <Button size="lg" onClick={handleSubmit}>Submit</Button>
                  :
                    <Button type="submit" size="lg" onClick={handleEdit}>Edit Profile</Button> 
                  }
                </div>
              </Card.Body>
            </Card>

            <Card className="mb-4 mb-lg-0">
              <Card.Body className="p-0">
                <ListGroup flush className="rounded-3">
                  <ListGroup.Item className="bg-secondary d-flex justify-content-between align-items-center p-3">
                    <h3>Credit Cards: </h3>
                  </ListGroup.Item>
                  {addingCard ? 
                  <Form.Group>
                    <Form.Label className='light-text'>Card Number:</Form.Label>
                    <Form.Control onChange={(e) => setCardNumber(e.target.value)} value={cardNumber}/>
                    <Form.Label className='light-text'>Name On Card:</Form.Label>
                    <Form.Control onChange={(e) => setNameOnCard(e.target.value)} value={nameOnCard}/>
                    <Form.Label className='light-text'>Expiration Date:</Form.Label>
                    <Form.Control onChange={(e) => setExp(e.target.value)} value={exp}/>
                    <Form.Label className='light-text'>CVV:</Form.Label>
                    <Form.Control onChange={(e) => setCVV(e.target.value)} value={cvv}/>
                    <Button onClick={handleAddCard}>Add</Button>
                  </Form.Group>
                  :
                  <>
                  {credits.slice(0,3).map((credit) => 
                    <ListGroup.Item className="bg-secondary d-flex justify-content-between align-items-center fs-5 p-3">
                    <Image src="https://www.clipartmax.com/png/small/110-1105083_computer-icons-credit-card-bank-card-clip-art-card-icon-white-png.png" roundedCircle width={"50rem"}/>
                    <Card.Text>{credit.nameOnCard} &nbsp;&nbsp;&nbsp; {credit.cardNumber}</Card.Text>
                    {edit &&
                    <Button size="sm" onClick={handleDeleteCard} value={credit.cardNumber}>Delete</Button>
                    }
                  </ListGroup.Item>
                    )}
                  </>
                  }
                  {edit &&
                  <ListGroup.Item className="bg-secondary d-flex justify-content-between align-items-center p-3">
                    <Button size="lg" onClick={(e) => {setAddingCard(true)}}>Add Credit Card</Button>
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
                    placeholder={account.name}
                    defaultValue={account.name}
                    style={{textAlign:'left',width:"15rem"}}
                    onChange={(e) => setName(e.target.value)} 
                    value={name}/>
                    :
                    <Card.Text className="text-muted">{account.name}</Card.Text>
                    }
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col sm="3">
                    <Card.Text>Email</Card.Text>
                  </Col>
                  <Col sm="9">
                    <Card.Text className="text-muted">{account.email}</Card.Text>
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
                    placeholder={account.phone} 
                    defaultValue={account.phone}
                    style={{textAlign:'left',width:"15rem"}}
                    onChange={(e) => setPhone(e.target.value)} 
                    value={phone}/>
                    :
                    <Card.Text className="text-muted">{account.phone}</Card.Text>
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
                      <Form.Control type="light-text" placeholder={account.streetName} defaultValue={account.streetName} style={{textAlign:'left',width:"15rem"}} onChange={(e) => setStreet(e.target.value)} value={street}/>
                      <Form.Label className='light-text'>City</Form.Label>
                      <Form.Control type="light-text" placeholder={account.city} defaultValue={account.city} style={{textAlign:'left',width:"15rem"}} onChange={(e) => setCity(e.target.value)} value={city}/>
                      <Form.Label className='light-text'>Zip</Form.Label>
                      <Form.Control type="light-text" placeholder={account.zip} defaultValue={account.zip} style={{textAlign:'left',width:"15rem"}} onChange={(e) => setZip(e.target.value)} value={zip}/>
                      <Form.Label className='light-text'>State</Form.Label>
                      <Form.Control type="light-text" placeholder={account.state} defaultValue={account.state} style={{textAlign:'left',width:"15rem"}} onChange={(e) => setState(e.target.value)} value={state}/>
                  </Form.Group>
                    :
                    <Card.Text className="text-muted">{account.streetName}, {account.city}, {account.state}, {account.zip} </Card.Text>
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
          
    </Container>

  
</>
    )
}
  
export default EditProfile;