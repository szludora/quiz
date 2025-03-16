import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import like from "../assets/icons/like.png";
import dislike from "../assets/icons/dislike.png";
import { Images, noPhoto } from "../data/Images";
import "../styles/Card.css";

export default function Card(props: any) {
  const [correctGuesses, setCorrectGuesses] = useState<number[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState<number[]>([]);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [currentQuiz, setCurrentQuiz] = useState<any | null>(null);
  const [end, setEnd] = useState(false);
  const [images, setImages] = useState<any>([]);

  useEffect(() => {
    if (Images.length > 0) {
      getImg();
    }
  }, []);

  useEffect(() => {
    if (props.quizzes.length > 0) {
      getRandomWord();
    }
  }, [props.quizzes, correctGuesses, wrongGuesses, end, currentQuiz]);

  function getImg() {
    let list: any[] = images.map((element: any) => element.path);
    setImages(list);
  }

  function getRandomWord() {
    if (props.quizzes.length === 0) return;

    let randomIndex;
    const availableQuizzes = props.quizzes.filter(
      (quiz: any) => !correctGuesses.includes(Number(quiz.id))
    );

    if (availableQuizzes.length === 0) {
      setEnd(true);
      return;
    }

    randomIndex = Math.floor(Math.random() * availableQuizzes.length);
    const nextQuiz = availableQuizzes[randomIndex];

    setCurrentQuiz(nextQuiz);
  }

  function restart() {
    setCorrectGuesses([]);
    setWrongGuesses([]);
    setUserAnswer("");
    setEnd(false);
  }

  function handleSubmit(event: React.FormEvent | null) {
    if (event) {
      event.preventDefault();
    }
    if (
      currentQuiz &&
      userAnswer &&
      userAnswer.toLowerCase() === currentQuiz.serbian.toLowerCase()
    ) {
      if (!correctGuesses.includes(currentQuiz.id)) {
        setCorrectGuesses((prev) => [...prev, currentQuiz.id]);
        if (wrongGuesses.includes(currentQuiz.id)) {
          setWrongGuesses((prev) => prev.filter((id) => id !== currentQuiz.id));
        }
      }
    } else {
      if (currentQuiz && !wrongGuesses.includes(currentQuiz.id)) {
        setWrongGuesses((prev) => [...prev, currentQuiz.id]);
      }
    }
    setUserAnswer("");
    getRandomWord();
    if (end) {
      restart();
    }
  }

  return (
    <Container className="card">
      <Col className="cardContent">
        <Row className="mobileView">
          <Row className="score">
            <Col className="rightWrapper">
              <img src={like} alt="right" />
              <span>
                {correctGuesses.length} / {props.quizzes.length}
              </span>
            </Col>
            <Col className="wrongWrapper">
              <img src={dislike} alt="wrong" />
              <span>
                {wrongGuesses.length} / {props.quizzes.length}
              </span>
            </Col>
          </Row>
        </Row>
        <Row className="quizImage">
          <img
            src={currentQuiz ? Images[currentQuiz.id - 1] : noPhoto}
            alt="quiz image"
          />
        </Row>

        <Row className="formRow">
          <Form className="form" onSubmit={handleSubmit}>
            {!end ? (
              <Form.Label>{currentQuiz ? currentQuiz.english : ""}</Form.Label>
            ) : (
              <Form.Label>Good job, you win!</Form.Label>
            )}
            <Form.Control
              type="text"
              className="input"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
            <Button variant="primary" type="submit" className="button">
              {end ? "Restart" : "Let's see"}
            </Button>
          </Form>
        </Row>
        <Row className="desktopView">
          <Row className="score">
            <Col className="rightWrapper">
              <img src={like} alt="right" />
              <span>
                {correctGuesses.length} / {props.quizzes.length}
              </span>
            </Col>
            <Col className="wrongWrapper">
              <img src={dislike} alt="wrong" />
              <span>
                {wrongGuesses.length} / {props.quizzes.length}
              </span>
            </Col>
          </Row>
        </Row>
      </Col>
    </Container>
  );
}
