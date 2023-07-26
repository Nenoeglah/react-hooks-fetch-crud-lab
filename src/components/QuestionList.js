


import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questionsData, setQuestionsData] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  function fetchQuestions() {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestionsData(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }

  function deleteList(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        const newQD = questionsData.filter((list) => list.id !== id);
        setQuestionsData(newQD);
      })
      .catch((error) => console.error("Error deleting question:", error));
  }

  const question = questionsData.map((d) => (
    <QuestionItem question={d} key={d.id} deletF={deleteList} />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{question}</ul>
    </section>
  );
}

export default QuestionList;
