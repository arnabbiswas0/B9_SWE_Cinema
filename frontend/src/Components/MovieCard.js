import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Ratio from 'react-bootstrap/Ratio';
import 'bootstrap/dist/css/bootstrap.min.css';

  

function MovieCard({title, poster, trailer}) {

  const [showTrailer, setShowTrailer] = useState(false);
  const [BookMovie, setBookMovie] = useState(false);
  const [Checkout, setCheckout] = useState(false);
  const handleCloseTrailer = () => setShowTrailer(false);
  const handleShowTrailer = () => setShowTrailer(true);
  const handleCloseBookMovie = () => setBookMovie(false);
  const handleShowBookMovie = () => setBookMovie(true);
  const handleShowCheckout = () => setCheckout(true);
  const handleCloseCheckout = () => setCheckout(false);

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
        size={'lg'}
        backdrop="static"
    >
        <Modal.Header closeButton>
            <Modal.Title>Booking:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Ratio aspectRatio="16x9">
            <div>
            <label for="bookingtime">Select Date and Time: </label>
            <input type="datetime-local" id="Time" name="bookingtime"></input>
            <Button style={{margin: '0.5rem'}} variant="primary" onClick={handleShowCheckout}>
                Checkout
            </Button>
            </div>
            </Ratio>
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
        size={'lg'}
        backdrop="static"
    >
        <Modal.Header closeButton>
            <Modal.Title>Checkout:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Ratio aspectRatio="16x9">
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
            </Ratio>
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