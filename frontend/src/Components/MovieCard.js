import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Ratio from 'react-bootstrap/Ratio';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAddShowtime } from './hooks/useAddShowtime';
import { useGetShowtime } from './hooks/useGetShowtime';
import { useBookTicket } from './hooks/useBookTicket';
import axios from "axios";

function MovieCard({title, poster, trailer}) {
  const [total, setTotal] = useState(0);
  const [seatNum, setSeatNum] = useState(0)
  const [selecter, setSelecter] = useState();
  const [shows, setShows] = useState();
  const [showtimeID, setShowtimeID] = useState();
  const [showTrailer, setShowTrailer] = useState(false);
  const [BookMovie, setBookMovie] = useState(false);
  const [ageList, setAgeList] = useState([]);
  const [res_Arr, setRes_Arr] = useState([]);
  const [Checkout, setCheckout] = useState(false);
  const [date, setDate] = useState("");
  const [addShowTime, setAddShowTime] = useState(false);
  const [times, setTimes] = useState([]);
  const [startDate, setStartDate] = useState(Date);
  const [endDate, setEndDate] = useState(Date);
  const [room, setRoom] = useState(0);
  const [validated, setValidated] = useState(false);
  const [showtimes, setShowtimes] = useState([]);
  const [seats, setSeats] = useState([ "A1","A2","A3","A4","A5",
  "B1","B2","B3","B4","B5",
  "C1","C2","C3","C4","C5",
  "D1","D2","D3","D4","D5",
  "E1","E2","E3","E4","E5",
  "F1","F2","F3","F4","F5",]);
  const[unreservedSeats, setUnreservedSeats] = useState([]);
  const [credits, setCredits] = useState([]);
  const handleCloseTrailer = () => setShowTrailer(false);
  const handleShowTrailer = () => setShowTrailer(true);
  const handleCloseBookMovie = () => {setBookMovie(false)};
  const handleShowBookMovie = () => setBookMovie(true);
  const handleAgeClick = () => setAgeList(... ageList,{age: ""});

  const handleShowCheckout = () => setCheckout(true);
  const handleCloseCheckout = () => setCheckout(false);
  const handleAddShowTime = () => setAddShowTime(true);
  const handleCloseAddShowTime = () => setAddShowTime(false);
  const user = localStorage.getItem('user');
  const userData = JSON.parse(user);
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

  const {addShowtime, error, isLoading} = useAddShowtime();
  const handleSubmitShowtime = async(event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    setValidated(true);
    //console.log("startdate: " + startDate)
    await addShowtime(startDate, endDate, times, room, title);
  };

  const {getShowtime} = useGetShowtime();
  const handleSelectDate = async(e) => {
    //const s = await getShowtime(title, date);
    setShows(await getShowtime(title, date));
    console.log(shows);
    setSelecter(1);
  }
  const res_array = []; 
  useEffect(()=> {
    axios.post('http://localhost:8000/api/getUnreservedSeats', {
      showtimeID: showtimeID
      })
        .then((res) => {
            setUnreservedSeats(res.data);
         })
         .catch((err) =>{
            console.log("Err");
         })
        for(let i in unreservedSeats) { 
            res_array.push(unreservedSeats[i].seatName); 
        }; 
        setRes_Arr(res_array);
  },[res_array]);
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

 
  const {bookTicket} = useBookTicket();
  const handleBookSeat = async(e) => {
    e.preventDefault();
    const seatN = e.target.value;
    setSeatNum(seatNum+1);
    await bookTicket(userData.email, seatN, showtimeID);
    
  }

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
        {((localStorage.getItem('user'))!= null) &&
            <>
            {credits.length !== 0 ?
                <Button variant="primary" onClick={handleShowBookMovie}>Book Movie</Button>
            :
                <Button onClick={(e)=> alert("You do not have any payment cards on file. Please add a card on the edit profile page.")}>Book Movie</Button>
            }
            </>
            
        }
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
                <Row>
                    <Col xs={8}>
                        <Form.Group className="mb-3">
                            <Form.Label >Select Date:</Form.Label>
                            <Form.Control type="date" id="Time" name="bookingtime" onChange={(e) => setDate(e.target.value)} value={date}/>
                        </Form.Group>
                    </Col>
                    <Col style={{textAlign:'center'}}>
                        <Button style={{marginTop:'2rem'}} onClick={handleSelectDate}>Confirm Date</Button>
                    </Col>
                </Row>
            
            {selecter ?
            <>
            {console.log(shows)}
            {shows.map((s) => (
                <>
                    <Button style={{margin:'.25rem'}} onClick={(e) => setShowtimeID(s.showtimeID)}>{s.time}</Button>  
                </>      
            ))} 
            {showtimeID ?
            <>
                <h3>Select your seats</h3>
              
                <Row sm={5} className="g-4">
                    {seats.map((seat) => (
                        <>
                        {console.log(res_Arr)}
                        {res_Arr.includes(seat) ?
                            <Col>
                                <Button value={seat} onClick={handleBookSeat}>{seat}</Button> 
                            </Col>
                        :
                            <Col>
                                <Button disabled>{seat}</Button> 
                            </Col>
                        }
                        </>  
                    ))} 
                </Row>
                {(seatNum !== 0) &&
                    <Row>
                        <h3>Order Details:</h3>
                        <h5>{seatNum}X {title}: ${seatNum*10}</h5>
                        <h5>Which card would you like to use?</h5>
                        {credits.slice(0,3).map((credit) => 
                            <Button style={{margin:"0.25rem"}} onClick={handleShowCheckout}>{credit.nameOnCard} &nbsp;&nbsp;&nbsp; {credit.cardNumber}</Button>
                    )}
                    </Row>
                }
                

            </>
            :     
            null
            }
            
            </>
            :
            null
            }
            {ageList.map((age) => (
            <Form.Group className="mb-3">
                <Form.Label>Add age for seat:</Form.Label>
                <Form.Control type="textarea"/>
            </Form.Group>
            ))}
            </Form>
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
            <Modal.Title>Checkout:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              Ticket Details: <br></br>
              Thank you for buying tickets for {title}! <br></br>
              An email invoice will be sent to you shortly!
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