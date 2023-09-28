import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Ratio from 'react-bootstrap/Ratio';
import 'bootstrap/dist/css/bootstrap.min.css';

function MovieCard() {

  const [showTrailer, setShowTrailer] = useState(false);
  const handleCloseTrailer = () => setShowTrailer(false);
  const handleShowTrailer = () => setShowTrailer(true);

  return (
    <> 
    <Card 
        bg={'secondary'}
        text={'light'}
        style={{ width: '18rem', textAlign: 'center', margin: '0.5rem'}} 
    > 
      <Card.Img variant="top" src="https://www.movieposters.com/cdn/shop/products/6cd691e19fffbe57b353cb120deaeb8f_8489d7bf-24ba-4848-9d0f-11f20cb35025_480x.progressive.jpg?v=1573613877" />
      <Card.Body>
        <Card.Title>Star Wars</Card.Title>
        <Button style={{margin: '0.5rem'}}variant="primary" onClick={handleShowTrailer}>watch trailer</Button>
        <Button variant="primary" onClick={handleShowTrailer}>Book Movie</Button>
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
                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/8Qn_spdM5Zg?si=NfOSKmfV8oY-MzMh"></iframe>
            </Ratio>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleCloseTrailer}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
    </>
    );
}

export default MovieCard;