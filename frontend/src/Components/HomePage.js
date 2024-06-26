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
import Carousel from 'react-bootstrap/Carousel';
import MovieHandler from './controllers/MovieHandler';
//import { movies } from './movieData'; // Import movies
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
                console.log(res.data);
             })
             .catch((err) =>{
                console.log("Err");
             })
    }, []);
      console.log(data);
    
    //modal states
    const [userData, setUserData] = useState("");
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

    const handleNewMovie = async (event) => {
        event.preventDefault();
        // create new movie object
        const newMovieData = {
            title: event.target.elements[0].value,
            category: event.target.elements[1].value,
            rating: event.target.elements[2].value,
            director: event.target.elements[3].value,
            producer: event.target.elements[4].value,
            cast: event.target.elements[5].value,
            synopsis: event.target.elements[6].value,
            reviews: event.target.elements[7].value,
            poster: event.target.elements[8].value,
            trailer: event.target.elements[9].value,
        };
        console.log(newMovieData);
        // validate for non-empty attibutes
        let allFilled = true;
        for (let i = 0; i < event.target.elements.length-1; i++) {
            if (!event.target.elements[i].value) {
                allFilled = false;
                // console.log(`Element at index ${i} is empty`);
            }
        }
        // if all attributes have values continue to add movie
        if (allFilled) {
            console.log("All elements are filled")
            const movieHandler = new MovieHandler();
            const handled = await movieHandler.createMovie(newMovieData);
            if (handled === 'unavailable') {
                alert("YouTube link INVALID...try again");
            } else {
                console.log("movie added successfully");
            }
        } else {
            //console.log("One or more missing values!")
            alert("One or more missing values!")
        } 
    };
    let Admin;
    useEffect(() => {
        Admin = JSON.parse(localStorage.getItem('user'));
        if (Admin != null) {
            setUserData(Admin.email);
            console.log(Admin.email);
        }
    })
    return (
        <>
        <Container data-bs-theme="dark" style={{hight: "100%",minHeight:"100vh",textAlign: "center"}} >
            {/* Admin Buttons */}
            {userData === "cremley29@gmail.com" &&
                <Container style={{ marginTop: "1rem", textAlign: "center" }}>
                    <Button variant="primary" onClick={handleShowMovieM}>Manage Movies</Button>
                    <Button variant="primary" onClick={handleShowPromoM}>Manage Promotions</Button>
                    <Button variant="primary" onClick={handleShowUserM}>Manage Users</Button>
                </Container>
            }
            <Carousel data-bs-theme="dark" >
                {filteredMovies.map((movie) => (
                <Carousel.Item 
                style = {{marginTop: "3rem", 
                borderRadius:"1rem",
                borderColor:"black",
                height:"35rem",
                backgroundColor: "gray"
            }}
                >
                    <img
                    width = "30%"
                    src={movie.poster}
                    alt="First slide"
                    />
                </Carousel.Item>
                ))}
            </Carousel>

            {/* Search Bar */}
            <Form style={{ margin: '1rem' }}>
                <Form.Control type="search" placeholder="search for a movie" onChange={e => setQuery(e.target.value)} />
            </Form>

            {/* Tabs */}
            <div style={{height: "100%"}}>
            <Tabs defaultActiveKey="Currently Playing" fill justify data-bs-theme="dark">
                <Tab eventKey="Currently Playing" title="Currently Playing">
                        {filteredMovies.length === 0 ? <div class="text-light" style={{justifyContent:"center", alignItems:"center"}}>
                            <h1>Sorry this movie is not available. Try seaching with all caps</h1>
                        </div>
                        :
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
                        }
                </Tab>
                <Tab eventKey="Coming Soon" title="Coming Soon">
                {filteredMovies.length === 0 ? <div class="text-light" style={{justifyContent:"center", alignItems:"center"}}>
                            <h1>Sorry this movie is not available. Try seaching with all caps</h1>
                        </div>
                        :
                        <Row sm={1} md={2} lg={3} xl={4} className="g-4" bg={"dark"}>
                        {filteredMovies.map((movie) => (
                            <>
                            {(movie.isOut === 'false') &&
                            <Col>
                                <MovieCard title={movie.title} poster={movie.poster} trailer={movie.trailer} />
                            </Col>
                            }
                            </>
                            
                        ))} 
                        </Row>
                        }
                </Tab>
            </Tabs>
            </div>
        </Container>

        {/* Model used for Admin */}
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
    <Form onSubmit={handleNewMovie}>
      <Form.Group className="mb-3">
        <Form.Label className='light-text'>Title</Form.Label>
        <Form.Control type="textarea" placeholder="Title" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className='light-text'>Category</Form.Label>
        <Form.Select>
            <option value='Action'>Action</option>
            <option value='Adventure'>Adventure</option>
            <option value='Animation'>Animation</option>
            <option value='Biography'>Biography</option>
            <option value='Comedy'>Comedy</option>
            <option value='Crime'>Crime</option>
            <option value='Documentary'>Documentary</option>
            <option value='Drama'>Drama</option>
            <option value='Family'>Family</option>
            <option value='Fantasy'>Fantasy</option>
            <option value='History'>History</option>
            <option value='Horror'>Horror</option>
            <option value='Music'>Music</option>
            <option value='Musical'>Musical</option>
            <option value='Mystery'>Mystery</option>
            <option value='News'>News</option>
            <option value='Reality-TV'>Reality-TV</option>
            <option value='Romance'>Romance</option>
            <option value='Sci-Fi'>Sci-Fi</option>
            <option value='Sport'>Sport</option>
            <option value='Talk-Show'>Talk-Show</option>
            <option value='Thriller'>Thriller</option>
            <option value='War'>War</option>
            <option value='Western'>Western</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label classname='light-text'>Rating</Form.Label>
        <Form.Select >
            <option value="R">R</option>
            <option value="NC-17">NC-17</option>
            <option value="PG-13">PG-13</option>
            <option value="PG">PG</option>
            <option value="G">G</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className='light-text'>Director</Form.Label>
        <Form.Control type="textarea" placeholder="Director" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className='light-text'>Producer</Form.Label>
        <Form.Control type="textarea" placeholder="Producer" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className='light-text'>Cast</Form.Label>
        <Form.Control type="textarea" placeholder="Cast" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label classname='light-text'>Synopsis</Form.Label>
        <Form.Control type="textarea" placeholder="Synopsis" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label classname='light-text'>Reviews</Form.Label>
        <Form.Control type="textarea" placeholder="Reviews" /> 
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label classname='light-text'>Poster</Form.Label>
        <Form.Control type="textarea" placeHolder="Poster link" />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label classname='light-text'>Trailer</Form.Label>
        <Form.Control type="textarea" placeHolder="Trailer link" />
      </Form.Group>
      <Button variant="primary" type="submit">
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
