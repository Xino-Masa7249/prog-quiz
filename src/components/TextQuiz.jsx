import { useState } from "react";

function TextQuiz() {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const correctAnswer = "JavaScript"; // 仮の答え

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const restart = () => {
    setInput("");
    setSubmitted(false);
  };

  if (submitted) {
    const isCorrect = input.trim() === correctAnswer;

    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>記述式トレーニング</h2>

        <p>
          あなたの回答：{input}<br />
          {isCorrect ? (
            <span style={{ color: "green" }}>✅ 正解！</span>
          ) : (
            <span style={{ color: "red" }}>
              ❌ 不正解（正解：{correctAnswer}）
            </span>
          )}
        </p>

        <button onClick={restart}>もう一度</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>記述式トレーニング</h2>

      <p>次の質問に答えてください：</p>
      <p>「JavaScript とは何ですか？」</p>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: "10px", width: "200px" }}
      />

      <div>
        <button onClick={handleSubmit} style={{ marginTop: "20px" }}>
          回答する
        </button>
      </div>
    </div>
  );
}

export default TextQuiz;