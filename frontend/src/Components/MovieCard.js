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
  const [times, setTimes] = useState([]);
  const [startDate, setStartDate] = useState(Date);
  const [endDate, setEndDate] = useState(Date);
  const [room, setRoom] = useState(0);
  const [validated, setValidated] = useState(false);
  const handleCloseTrailer = () => setShowTrailer(false);
  const handleShowTrailer = () => setShowTrailer(true);
  const handleCloseBookMovie = () => setBookMovie(false);
  const handleShowBookMovie = () => setBookMovie(true);
  const handleAgeClick = () => setAgeList(... ageList,{age: ""});

  const handleShowCheckout = () => setCheckout(true);
  const handleCloseCheckout = () => setCheckout(false);
  const handleAddShowTime = () => setAddShowTime(true);
  const handleCloseAddShowTime = () => setAddShowTime(false);
  const handleTimes1 = () => {
    if (times.includes("9:00 AM")){
        setTimes( times.filter(item => item !== "9:00 AM"));
    } else {
        setTimes([ ...times,"9:00 AM" ])
    }
  }
  const handleTimes2 = () => {
    if (times.includes("12:00 PM")){
        setTimes( times.filter(item => item !== "12:00 PM"));
    } else {
        setTimes([ ...times,"12:00 PM" ])
    }
  }
  const handleTimes3 = () => {
    if (times.includes("3:00 PM")){
        setTimes( times.filter(item => item !== "3:00 PM"));
    } else {
        setTimes([ ...times,"3:00 PM" ])
    }
  }
  const handleTimes4 = () => {
    if (times.includes("6:00 PM")){
        setTimes( times.filter(item => item !== "6:00 PM"));
    } else {
        setTimes([ ...times,"6:00 PM" ])
    }
  }
  const handleTimes5 = () => {
    if (times.includes("9:00 PM")){
        setTimes( times.filter(item => item !== "9:00 PM"));
    } else {
        setTimes([ ...times,"9:00 PM" ])
    }
  }

  const handleSubmitShowtime = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
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
              &emsp; {title}: $10
              <Button size='sm'> Delete Ticket</Button> 
              <br></br>
              &emsp; total: $10

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
        <Modal.Body style={{textAlign: "center"}}>
            <Form noValidate validated={validated} onSubmit={handleSubmitShowtime}>
                <Form.Group >
                    <h5>Choose the range for the movie:</h5>
                    <Row>
                        <Col style={{width:"50%"}}>
                            <Form.Label>Starting Day:</Form.Label> 
                            <Form.Control type="date" name="startDate"onChange={(e) => setStartDate(e.target.value)} required/>
                            <Form.Control.Feedback type="invalid">
                                You must provide a start date.
                            </Form.Control.Feedback>
                        </Col>
                        <Col style={{width:"50%"}}>
                            <Form.Label>Ending Day:</Form.Label> 
                            <Form.Control type="date" name="endDate"onChange={(e) => setEndDate(e.target.value)} required/>
                            <Form.Control.Feedback type="invalid">
                                You must provide an end date.
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <h5>Choose the time(s) for the movie:</h5>
                    <Form.Check inline label="9:00 AM" name="9am" onClick={handleTimes1}/>
                    <Form.Check inline label="12:00 PM" name="12pm" onClick={handleTimes2}/>
                    <Form.Check inline label="3:00 PM" name="3pm" onClick={handleTimes3}/>
                    <Form.Check inline label="6:00 PM" name="6pm" onClick={handleTimes4}/>
                    <Form.Check inline label="9:00 PM" name="9pm" onClick={handleTimes5}/>
                </Form.Group>
                <Form.Control.Feedback type="invalid">
                    You must choose a time.
                </Form.Control.Feedback>
                {console.log(times)}
                <Form.Group>
                    <Form.Control as="select" onChange={(e) => setRoom(e.target.value)} required>
                        <option value="">Which room do you want this movie to play in?</option>
                        <option value="1">Room 1</option>
                        <option value="2">Room 2</option>
                        <option value="3">Room 3</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        You must provide a room.
                    </Form.Control.Feedback>
                </Form.Group>
                {console.log(room)}
                { room ?
                    <> 
                        <h5>Showtime Summary:</h5>
                        <h4> This movie will play in room #{room} during the times {times.map(time => <> {time},</>)} start on {startDate}, and end on {endDate}.</h4>
                    </>
                    : null
                }
                <Form.Group>
                    <Button type="submit">Submit Showtime</Button>
                </Form.Group>
            </Form>
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