import "./App.css";
import { Col, Container, Row } from "react-bootstrap";
import weborigo from "./assets/logo/weborigo.png";
import img from "./assets/imgs/animals.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import like from "./assets/icons/like.png";
import dislike from "./assets/icons/dislike.png";

function App() {
  return (
    <Container className="app">
      <img src={weborigo} alt="weborigo" id="logo" />
      <Container className="card">
        <Col className="cardContent">
          <Row className="mobileView">
            <Row className="score">
              <Col className="rightWrapper">
                <img src={like} alt="right" />
                <span>4 / 20</span>
              </Col>
              <Col className="wrongWrapper">
                <img src={dislike} alt="wrong" />
                <span>16 / 20</span>
              </Col>
            </Row>
          </Row>
          <Row className="quizImage">
            <img src={img} alt="quiz image" />
          </Row>

          <Row className="formRow">
            <Form className="form">
              <Form.Label>happy</Form.Label>
              <Form.Control type="text" className="input" />
              <Button variant="primary" type="submit" className="button">
                Let's see
              </Button>
            </Form>
          </Row>
          <Row className="desktopView">
            <Row className="score">
              <Col className="rightWrapper">
                <img src={like} alt="right" />
                <span>4 / 20</span>
              </Col>
              <Col className="wrongWrapper">
                <img src={dislike} alt="wrong" />
                <span>16 / 20</span>
              </Col>
            </Row>
          </Row>
        </Col>
      </Container>
    </Container>
  );
}

export default App;
