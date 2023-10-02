import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import MovieCard from './MovieCard';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { movies } from './movieData'; // Import movies

function HomePage() {

    return (
        <Container bg={'dark'}>
            {/* Admin Buttons */}
            {localStorage.getItem("Admin") === "Admin" &&
                <Container style={{ marginTop: "1rem", textAlign: "center" }}>
                    <Button variant="primary">Manage Movies</Button>
                    <Button variant="primary">Manage Promotions</Button>
                    <Button variant="primary">Manage Users</Button>
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
                        {movies.map((movie, idx) => (
                            <Col key={idx}>
                                {movie.getPlaying() && <MovieCard title={movie.getTitle()} poster={movie.getPoster()} trailer={movie.getTrailer()} />}
                            </Col>
                        ))}
                    </Row>
                </Tab>
                <Tab eventKey="Coming Soon" title="Coming Soon">
                    <Row sm={1} md={2} lg={3} xl={4} className="g-4" bg={"dark"}>
                        {movies.map((movie, idx) => (
                            <Col key={idx}>
                                {!movie.getPlaying() && <MovieCard title={movie.getTitle()} poster={movie.getPoster()} trailer={movie.getTrailer()} />}
                            </Col>
                        ))}
                    </Row>
                </Tab>
            </Tabs>
        </Container>
    );
}

export default HomePage;
