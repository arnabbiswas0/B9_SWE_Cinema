import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import MovieCard from './MovieCard';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage () {
    return (
        <Container bg={'dark'}>
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
                            <MovieCard/>
                        </Col>
                        ))}
                    </Row>
                </Tab>
                <Tab eventKey="Coming Soon" title="Coming Soon">
                    <MovieCard/>
                </Tab>
            </Tabs>
        </Container>
      );

}

export default HomePage;