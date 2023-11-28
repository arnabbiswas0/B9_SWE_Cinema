import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Ratio from 'react-bootstrap/Ratio';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';

function MovieCard({ title, poster, trailer }) {

  const [showTrailer, setShowTrailer] = useState(false);
  const [bookMovie, setBookMovie] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [checkout, setCheckout] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState('');

  const handleCloseTrailer = () => setShowTrailer(false);
  const handleShowTrailer = () => setShowTrailer(true);
  const handleCloseBookMovie = () => setBookMovie(false);
  const handleShowBookMovie = () => setBookMovie(true);
  const handleShowCheckout = () => setCheckout(true);
  const handleCloseCheckout = () => setCheckout(false);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleSubmitBooking = () => {
    console.log("Selected Seats:", selectedSeats);
    const bookingDetails = {
      movieTitle: title,    
      bookingDate: selectedDateTime,
      selectedSeats
    };

    fetch('http://localhost:8080/api/book-movie', { // Replace with your actual API endpoint
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingDetails),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Booking response:', data);
      handleCloseCheckout(); // Close the modal after booking
    })
    .catch(error => {
      console.error('Error booking movie:', error);
    });
  };

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
        <Button style={{margin: '0.5rem'}} variant="primary" onClick={handleShowTrailer}>View Trailer</Button>
        <Button variant="primary" onClick={handleShowBookMovie}>Book Movie</Button>
        {(localStorage.getItem("Admin")==="Admin") &&
          <Button variant="primary" onClick={handleShowTrailer}>Edit Movie</Button>
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
          <iframe className="embed-responsive-item" src={trailer}></iframe>
        </Ratio>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCloseTrailer}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal
      show={bookMovie} 
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
            <Form.Label>Select Date and Time:</Form.Label>
            <Form.Control 
              type="datetime-local" 
              id="Time" 
              name="bookingtime"
              value={selectedDateTime}
              onChange={(e) => setSelectedDateTime(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Select Seats:</Form.Label>
            <Row className="g-4">
              {[...Array(6)].map((_, index) => (
                <Col key={index}>
                  <Button 
                    variant={selectedSeats.includes(index + 1) ? "success" : "primary"}
                    onClick={() => handleSeatClick(index + 1)}
                  >
                    Seat {index + 1}
                  </Button>
                </Col>
              ))}
            </Row>
          </Form.Group>
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
      show={checkout} 
      onHide={handleCloseCheckout}
      centered
      size={'md'}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Checkout Summary:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Existing checkout summary code */}
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
              <legend>Enter Credit/Debit Details: </legend>
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="Name on Card">Name on Card</label>
                <div className="col-md-4">
                  <input id="Name on Card" name="Name on Card" type="text" placeholder="" className="form-control input-md" required="" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="textinput">Card Number</label>
                <div className="col-md-4">
                  <input id="textinput" name="textinput" type="text" placeholder="" className="form-control input-md" required="" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="CVV">CVV</label>
                <div className="col-md-4">
                  <input id="CVV" name="CVV" type="password" placeholder="" className="form-control input-md" />
                </div>
              </div>
            </fieldset>
          </form>
          <Button style={{margin: '0.5rem'}} variant="primary" onClick={handleSubmitBooking}>
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
    </>
  );
}

export default MovieCard;
