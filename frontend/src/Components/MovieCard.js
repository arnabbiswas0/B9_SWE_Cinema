import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Ratio from 'react-bootstrap/Ratio';
import 'bootstrap/dist/css/bootstrap.min.css';

function MovieCard({title, poster, trailer}) {

  const [showTrailer, setShowTrailer, BookMovie, setBookMovie] = useState(false);
  const handleCloseTrailer = () => setShowTrailer(false);
  const handleShowTrailer = () => setShowTrailer(true);
  const handleCloseBookMovie = () => setBookMovie(false);
  const handleShowBookMovie = () => setBookMovie(true);


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
                <iframe class="embed-responsive-item" src={trailer}></iframe>
            </Ratio>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleCloseBookMovie}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
    </>






    );
           
}

export default MovieCard;