import "./App.css";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import weborigo from "./assets/logo/weborigo.png";
import img from "./assets/imgs/animals.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import like from "./assets/icons/like.png";
import dislike from "./assets/icons/dislike.png";

import { getAllQuizzes } from "./services/DataService.ts";

function App() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [correctGuesses, setCorrectGuesses] = useState<number[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState<number[]>([]);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [currentQuiz, setCurrentQuiz] = useState<any | null>(null);
  const [end, setEnd] = useState(false);

  const fetchQuizzes = async () => {
    try {
      const data = await getAllQuizzes();
      setQuizzes(data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (quizzes.length > 0) {
      getRandomWord();
    }
  }, [quizzes, correctGuesses, wrongGuesses, end, currentQuiz]);

  const getRandomWord = () => {
    if (quizzes.length === 0) return;

    let randomIndex;
    const availableQuizzes = quizzes.filter(
      (quiz) => !correctGuesses.includes(Number(quiz.id))
    );

    if (availableQuizzes.length === 0) {
      setEnd(true);
      return;
    }

    randomIndex = Math.floor(Math.random() * availableQuizzes.length);
    const nextQuiz = availableQuizzes[randomIndex];

    setCurrentQuiz(nextQuiz);
  };

  function restart() {
    setCorrectGuesses([]);
    setWrongGuesses([]);
    setUserAnswer("");
    setEnd(false);
  }

  const handleSubmit = (event: React.FormEvent | null) => {
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
  };

  return (
    <Container className="app">
      <img src={weborigo} alt="weborigo" id="logo" />
      <Container className="card">
        <Col className="cardContent">
          <Row className="mobileView">
            <Row className="score">
              <Col className="rightWrapper">
                <img src={like} alt="right" />
                {correctGuesses.length} / {quizzes.length}
              </Col>
              <Col className="wrongWrapper">
                <img src={dislike} alt="wrong" />
                {wrongGuesses.length} / {quizzes.length}
              </Col>
            </Row>
          </Row>
          <Row className="quizImage">
            <img src={img} alt="quiz image" />
          </Row>

          <Row className="formRow">
            <Form className="form" onSubmit={handleSubmit}>
              {!end ? (
                <Form.Label>
                  {currentQuiz ? currentQuiz.english : ""}
                </Form.Label>
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
                  {correctGuesses.length} / {quizzes.length}
                </span>
              </Col>
              <Col className="wrongWrapper">
                <img src={dislike} alt="wrong" />
                <span>
                  {wrongGuesses.length} / {quizzes.length}
                </span>
              </Col>
            </Row>
          </Row>
        </Col>
      </Container>
    </Container>
  );
}

export default App;
