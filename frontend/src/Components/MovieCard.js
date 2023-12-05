import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Ratio from 'react-bootstrap/Ratio';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';

  

function MovieCard({title, poster, trailer}) {

  const [showTrailer, setShowTrailer] = useState(false);
  const [BookMovie, setBookMovie] = useState(false);
  const [ageList, setAgeList] = useState([]);
  const [Checkout, setCheckout] = useState(false);
  const [date, setDate] = useState("");
  const [addShowTime, setAddShowTime] = useState(false);
  const handleCloseTrailer = () => setShowTrailer(false);
  const handleShowTrailer = () => setShowTrailer(true);
  const handleCloseBookMovie = () => setBookMovie(false);
  const handleShowBookMovie = () => setBookMovie(true);
  const handleAgeClick = () => setAgeList(... ageList,{age: ""});

  const handleShowCheckout = () => setCheckout(true);
  const handleCloseCheckout = () => setCheckout(false);
  const handleAddShowTime = () => setAddShowTime(true);
  const handleCloseAddShowTime = () => setAddShowTime(false);

  return (
    <> 
    <Card 
        bg={'secondary'}
        text={'light'}
        style={{ width: '18rem', textAlign: 'center', margin: '0.5rem'}} 
    > 
      <Card.Img variant="top" src={poster} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Button style={{margin: '0.5rem'}}variant="primary" onClick={handleShowTrailer}>View trailer</Button>
        <Button variant="primary" onClick={handleShowBookMovie}>Book Movie</Button>
        {(localStorage.getItem('user'))!= null && (JSON.parse(localStorage.getItem('user')).email === "cremley29@gmail.com") &&
            <Button variant="primary" onClick={handleAddShowTime}>Add ShowTime</Button>
        }
      </Card.Body>
    </Card>

    <Modal
        show={showTrailer} 
        onHide={handleCloseTrailer}
        centered
        size={'lg'}
        backdrop="static"
    >
        <Modal.Header closeButton>
            <Modal.Title>Trailer:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Ratio aspectRatio="16x9">
                <iframe class="embed-responsive-item" src={trailer}></iframe>
            </Ratio>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleCloseTrailer}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>

    <Modal
        show={BookMovie} 
        onHide={handleCloseBookMovie}
        centered
        size={'md'}
        backdrop="static"
        style={{ textAlign: "center"}}
    >
        <Modal.Header closeButton>
            <Modal.Title>Booking:</Modal.Title>
        </Modal.Header>
        <Modal.Body textAlign={"center"}>
            <Form>
            <Form.Group className="mb-3">
                <Form.Label >Select Date and Time:</Form.Label>
                <Form.Control type="date" id="Time" name="bookingtime" onChange={(e) => setDate(e.target.value.toString())} value={date}/>
                <p>{date}</p>
            </Form.Group>
            <Form.Group>
                <Form.Label >Select Seats:</Form.Label>
                <Row className="g-4" bg={"dark"}>
                    <Col>
                        <Button variant="primary" onclick={handleAgeClick}> </Button>
                        <Button variant="primary" onclick={handleAgeClick}> </Button>
                        <Button variant="primary" onclick={handleAgeClick}> </Button>
                        <Button variant="primary"onclick={handleAgeClick}> </Button>
                        <Button variant="primary"onclick={handleAgeClick}> </Button>
                        <Button variant="primary"onclick={handleAgeClick}> </Button>
                    </Col>
                </Row>
                <Row className="g-4" bg={"dark"}>
                    <Col>
                        <Button variant="primary"onclick={handleAgeClick}> </Button>
                        <Button variant="primary"onclick={handleAgeClick}> </Button>
                        <Button variant="primary"onclick={handleAgeClick}> </Button>
                        <Button variant="primary"onclick={handleAgeClick}> </Button>
                        <Button variant="primary"onclick={handleAgeClick}> </Button>
                        <Button variant="primary"onclick={handleAgeClick}> </Button>
                    </Col>
                </Row>
                <Row className="g-4" bg={"dark"}>
                    <Col>
                        <Button variant="primary"onclick={handleAgeClick}> </Button>
                        <Button variant="primary"onclick={handleAgeClick}> </Button>
                        <Button variant="primary"onclick={handleAgeClick}> </Button>
                        <Button variant="primary"onclick={handleAgeClick}> </Button>
                        <Button variant="primary"onclick={handleAgeClick}> </Button>
                        <Button variant="primary"onclick={handleAgeClick}> </Button>
                    </Col>
                </Row>
            </Form.Group>
            {ageList.map((age) => (
            <Form.Group className="mb-3">
                <Form.Label>Add age for seat:</Form.Label>
                <Form.Control type="textarea"/>
            </Form.Group>
            ))}
            </Form>
            <Button style={{margin: '0.5rem'}} variant="primary" onClick={handleShowCheckout}>
                Checkout
            </Button>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleCloseBookMovie}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>

    <Modal
        show={Checkout} 
        onHide={handleCloseCheckout}
        centered
        size={'md'}
        backdrop="static"
    >
        <Modal.Header closeButton>
            <Modal.Title>Checkout Summary:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              Ticket Details: <br></br>
              &emsp; dummy ticket: 18+ $20 &emsp;
              <Button size='sm'> Delete Ticket</Button> 
              <br></br>
              &emsp; dummy ticket: 18+ $20 &emsp;
              <Button size='sm'> Delete Ticket</Button> 
              <br></br>
              &emsp; dummy ticket: 18+ $20 &emsp;
              <Button size='sm'> Delete Ticket</Button> 
              <br></br>
              &emsp; dummy ticket: 18+ $20 &emsp;
              <Button size='sm'> Delete Ticket</Button> 
              <br></br>
              &emsp; total: $80

            <div>
            <form className="form-horizontal">
            <fieldset>
            {/* Form Name */}
            <legend>Enter Credit/Debit Details: </legend>
            {/* Text input*/}
            <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="Name on Card">
                Name on Card
              </label>
            <div className="col-md-4">
            <input
              id="Name on Card"
              name="Name on Card"
              type="text"
              placeholder=""
              className="form-control input-md"
              required=""
            />
            </div>
            </div>
            {/* Text input*/}
            <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="textinput">
              Card Number
            </label>
            <div className="col-md-4">
             <input
              id="textinput"
              name="textinput"
              type="text"
              placeholder=""
              className="form-control input-md"
              required=""
              />
            </div>
            </div>
          {/* Password input*/}
            <div className="form-group">
              <label className="col-md-4 control-label" htmlFor="CVV">
                CVV
              </label>
            <div className="col-md-4">
              <input
                id="CVV"
                name="CVV"
                type="password"
                placeholder=""
                className="form-control input-md"
              />
            </div>
            </div>
            </fieldset>
            </form>
            <Button style={{margin: '0.5rem'}} variant="primary" onClick={handleCloseCheckout}>
                Submit
            </Button>

            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleCloseCheckout}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>

    <Modal
        show={addShowTime} 
        onHide={handleCloseAddShowTime}
        centered
        size={'lg'}
        backdrop="static"
    >
        <Modal.Header closeButton>
            <Modal.Title>Add Showtime:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleCloseAddShowTime}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
    
    
    
    </>






    );
           
}

export default MovieCard;