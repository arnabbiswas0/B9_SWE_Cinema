import { useState, useEffect } from 'react';
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
import axios from "axios";

function HomePage() {

    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");

    const getSearch = (query, movies) => {
        if (!query) {
            return movies
        }
            return movies.filter(movie => movie.title.includes(query))
    
    }

    const filteredMovies = getSearch(query, data);

    useEffect(()=> {
        axios.get('http://localhost:8000/api/movies')
             .then((res) => {
                setData(res.data);
             })
             .catch((err) =>{
                console.log("Err");
             })
    }, []);
      console.log(data);
    
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

    const Users = ["Bob", "Rob", "Dob"];
    const Promos = ["promo1", "Promo2", "Promo3"];


    return (
        <>
        <Container data-bs-theme="dark">
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
                <Form.Control type="search" placeholder="search for a movie" onChange={e => setQuery(e.target.value)} />
            </Form>

            {/* Tabs */}
            <Tabs defaultActiveKey="Currently Playing" fill justify data-bs-theme="dark">
                <Tab eventKey="Currently Playing" title="Currently Playing">
                    <Row sm={1} md={2} lg={3} xl={4} className="g-4" bg={"dark"}>
                        {filteredMovies.map((movie) => (
                            <>
                            {(movie.isOut === 'true') &&
                            <Col>
                                <MovieCard title={movie.title} poster={movie.poster} trailer={movie.trailer} />
                            </Col>
                            }
                            </>
                            
                        ))}
                    </Row>
                </Tab>
                <Tab eventKey="Coming Soon" title="Coming Soon">
                    <Row sm={1} md={2} lg={3} xl={4} className="g-4" bg={"dark"}>
                        {filteredMovies.map((movie) => (
                            <>
                            {(movie['isOut'] === 'false') &&
                            <Col>
                                <MovieCard title={movie['title']} poster={movie['poster']} trailer={movie['trailer']} />
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
        size={'md'}
        backdrop="static"
        style={{textAlign: "center"}}
        >
        <Modal.Header closeButton>
            <Modal.Title>Manage Promotions:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3">
        <Form.Label >add a promotion</Form.Label>
        <Form.Control type="textarea" placeholder="promo" />
      </Form.Group>
      <Button variant="primary">
        Add Promo
      </Button>
      <br></br>
      <br></br>
      {Promos.map((promo,index) => 
            <>
            Promotion: {promo}
            <Button  size ={"sm"} variant="primary"> Delete User </Button>
            <br></br>
            <br></br>
            </>
      )}
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
        size={'sm'}
        backdrop="static"
        style={{textAlign: "center"}}
        >
        <Modal.Header closeButton>
            <Modal.Title>Manage Users:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      {Users.map((user,index) => 
            <>
            User: {user}
            <Button  size ={"sm"} variant="primary"> Delete User </Button>
            <br></br>
            <br></br>
            </>
      )}
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
