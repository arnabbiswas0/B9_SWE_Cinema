import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import MovieCard from './MovieCard';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { movies } from './movieData'; // Import movies

function HomePage() {

    //modal states
    const [showMovieM, setShowMovieM] = useState(false);
    const handleCloseMovieM = () => setShowMovieM(false);
    const handleShowMovieM = () => setShowMovieM(true);
    const [showPromoM, setShowPromoM] = useState(false);
    const handleClosePromoM = () => setShowPromoM(false);
    const handleShowPromoM = () => setShowPromoM(true);
    const [showUserM, setShowUserM] = useState(false);
    const handleCloseUserM = () => setShowUserM(false);
    const handleShowUserM = () => setShowUserM(true);


    return (
        <>
        <Container bg={'dark'}>
            {/* Admin Buttons */}
            {localStorage.getItem("Admin") === "Admin" &&
                <Container style={{ marginTop: "1rem", textAlign: "center" }}>
                    <Button variant="primary" onClick={handleShowMovieM}>Manage Movies</Button>
                    <Button variant="primary" onClick={handleShowPromoM}>Manage Promotions</Button>
                    <Button variant="primary" onClick={handleShowUserM}>Manage Users</Button>
                </Container>
            }

            {/* Search Bar */}
            <Form style={{ margin: '1rem' }}>
                <Form.Control type="search" placeholder="search for a movie" />
            </Form>

            {/* Tabs */}
            <Tabs defaultActiveKey="Currently Playing" fill justify data-bs-theme="dark">
                <Tab eventKey="Currently Playing" title="Currently Playing">
                    <Row sm={1} md={2} lg={3} xl={4} className="g-4" bg={"dark"}>
                        {movies.map((movie) => (
                            <>
                            {movie.getPlaying() &&
                            <Col>
                                <MovieCard title={movie.getTitle()} poster={movie.getPoster()} trailer={movie.getTrailer()} />
                            </Col>
                            }
                            </>
                            
                        ))}
                    </Row>
                </Tab>
                <Tab eventKey="Coming Soon" title="Coming Soon">
                    <Row sm={1} md={2} lg={3} xl={4} className="g-4" bg={"dark"}>
                        {movies.map((movie) => (
                            <>
                            {!movie.getPlaying() &&
                            <Col>
                                <MovieCard title={movie.getTitle()} poster={movie.getPoster()} trailer={movie.getTrailer()} />
                            </Col>
                            }
                            </>
                        ))}
                    </Row>
                </Tab>
            </Tabs>
        </Container>

        //modals for admin use 
        <Modal
        show={showMovieM} 
        onHide={handleCloseMovieM}
        centered
        size={'lg'}
        backdrop="static"
        >
        <Modal.Header closeButton>
            <Modal.Title>Add Movies:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3">
        <Form.Label className='light-text'>Title</Form.Label>
        <Form.Control type="textarea" placeholder="Title" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className='light-text'>Rating</Form.Label>
        <Form.Control type="textarea" placeholder="Rating" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className='light-text'>Poster Link</Form.Label>
        <Form.Control type="textarea" placeholder="Poster Link" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className='light-text'>Price</Form.Label>
        <Form.Control type="textarea" placeholder="Price" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className='light-text'>Trailer</Form.Label>
        <Form.Control type="textarea" placeholder="Trailer" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className='light-text'>is it playing?</Form.Label>
        <Form.Control type="textarea" placeholder="is it playing?" />
      </Form.Group>
      <Button variant="primary">
        Submit
      </Button>
    </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleCloseMovieM}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>


    <Modal
        show={showPromoM} 
        onHide={handleClosePromoM}
        centered
        size={'lg'}
        backdrop="static"
        >
        <Modal.Header closeButton>
            <Modal.Title>Manage Promotions:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3">
        <Form.Label className='light-text'>add a promotion</Form.Label>
        <Form.Control type="textarea" placeholder="promo" />
      </Form.Group>
      <Button variant="primary">
        Submit
      </Button>
    </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleClosePromoM}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>

    <Modal
        show={showUserM} 
        onHide={handleCloseUserM}
        centered
        size={'lg'}
        backdrop="static"
        >
        <Modal.Header closeButton>
            <Modal.Title>Manage Users:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3">
        <Form.Label className='light-text'>add a user</Form.Label>
        <Form.Control type="textarea" placeholder="user" />
      </Form.Group>
      <Button variant="primary">
        Submit
      </Button>
    </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleCloseUserM}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
        
        
        
        </>
    );
}

export default HomePage;
