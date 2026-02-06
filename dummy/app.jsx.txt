import { useState } from "react";
import MultipleChoiceQuiz from "./components/MultipleChoiceQuiz";
import TextQuiz from "./components/TextQuiz";

function App() {
  const [mode, setMode] = useState(null);

  if (mode === "choice") {
    return (
      <div>
        <button onClick={() => setMode(null)}>← 戻る</button>
        <MultipleChoiceQuiz />
      </div>
    );
  }

  if (mode === "text") {
    return (
      <div>
        <button onClick={() => setMode(null)}>← 戻る</button>
        <TextQuiz />
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      
      <h2>JavaScript学習ツール</h2>

      <p>モードを選択してください</p>

      <button onClick={() => setMode("choice")} style={{ margin: "10px" }}>
        選択式クイズ
      </button>

      <button onClick={() => setMode("text")} style={{ margin: "10px" }}>
        記述式トレーニング
      </button>
    </div>
  );
}

export default App;