import "./App.css";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import weborigo from "./assets/logo/weborigo.png";

import { getAllQuizzes } from "./services/DataService.ts";
import Card from "./components/Card.tsx";

function App() {
  const [quizzes, setQuizzes] = useState<any[]>([]);

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

  return (
    <Container className="app">
      <img src={weborigo} alt="weborigo" id="logo" />
      <Card quizzes={quizzes} />
    </Container>
  );
}

export default App;
