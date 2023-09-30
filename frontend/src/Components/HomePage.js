import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import MovieCard from './MovieCard';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Movie from './models/Movie';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage () {

    const star = new Movie(
        "Star wars",
        "PG-13",
        15,
        "https://www.movieposters.com/cdn/shop/products/6cd691e19fffbe57b353cb120deaeb8f_8489d7bf-24ba-4848-9d0f-11f20cb35025_480x.progressive.jpg?v=1573613877",
        "https://www.youtube.com/embed/8Qn_spdM5Zg?si=NfOSKmfV8oY-MzMh",
        true
    )

    const star2 = new Movie(
        "Coming soon test",
        "PG-13",
        15,
        "https://www.movieposters.com/cdn/shop/products/6cd691e19fffbe57b353cb120deaeb8f_8489d7bf-24ba-4848-9d0f-11f20cb35025_480x.progressive.jpg?v=1573613877",
        "https://www.youtube.com/embed/8Qn_spdM5Zg?si=NfOSKmfV8oY-MzMh",
        false
    )

    return (
        <Container bg={'dark'}>

            {localStorage.getItem("Admin")==="Admin" &&
                <Container 
                style={{ marginTop: "1rem",
                    textAlign: "center"}} 
                >
                <Button variant="primary" >Manage Movies</Button>
                <Button variant="primary" >Manage Promotions</Button>
                <Button variant="primary" >Manage Users</Button>
                </Container>
            }

            <Form style={{margin: '1rem'}}>
            <Form.Control type="search" placeholder="search for a movie" />
            </Form>

            <Tabs
                defaultActiveKey="Curently Playing"
                fill
                justify
                data-bs-theme="dark"
            >
                <Tab eventKey="Curently Playing" title="Curently Playing">
                    <Row sm={1} md={2} lg={3} xl={4} className="g-4" bg={"dark"}>
                        {Array.from({ length: 5 }).map((_, idx) => (
                        <Col key={idx} >
                            {star.getPlaying() && <MovieCard title={star.getTitle()} poster={star.getPoster()} trailer={star.getTrailer()}/>}
                        </Col>
                        ))}
                    </Row>
                </Tab>
                <Tab eventKey="Coming Soon" title="Coming Soon">
                    <Row sm={1} md={2} lg={3} xl={4} className="g-4" bg={"dark"}>
                        {Array.from({ length: 5 }).map((_, idx) => (
                        <Col key={idx} >
                            {!star2.getPlaying() && <MovieCard title={star2.getTitle()} poster={star2.getPoster()} trailer={star2.getTrailer()}/>}
                        </Col>
                        ))}
                    </Row>
                </Tab>
            </Tabs>
        </Container>
      );

}

export default HomePage;