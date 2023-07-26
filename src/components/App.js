import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [serverData, setServerData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setServerData(data));
  }, []);

  function addQuestion(newQuestion) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((data) => {
        // Update the serverData with the new question from the response
        setServerData([...serverData, data]);
        // Switch to the List page after adding the question
        setPage("List");
      })
      .catch((error) => console.error("Error adding question:", error));
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm addQ={addQuestion} />
      ) : (
        <QuestionList questions={serverData} />
      )}
    </main>
  );
}

export default App;
