//データ読み込み
import { useState } from "react";
import  quizData  from "../quizData.json";

function MultipleChoiceQuiz() {
//定義
  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [numQuestions, setNumQuestions] = useState(10); // デフォルト10問
  const [error, setError] = useState(""); // エラーメッセージ用

//シャッフル機能
  function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  return arr;
  }
//シャッフルして問題を出題
  function startQuiz() {
   //エラー処理
     if (numQuestions < 1 || numQuestions > quizData.length) {
      setError(`1〜${quizData.length}の範囲で入力してください`);
      return;
    }

    const shuffled = shuffle(quizData);
    const questionsToUse = Number(numQuestions) || 10 //numQuestions が NaN の場合は 10 にする
    setQuiz(shuffled.slice(0, questionsToUse));
    setCurrentQuestion(0);
    setScore(0);
    setResults([]);
    setShowResult(false);
    setError("");
}
//回答処理
  const handleAnswer = (selectedOption) => {
    const current = quiz[currentQuestion];
    const correct = quiz[currentQuestion].answer;
    setResults((prev) => [
      ...prev,
       {
        id: current.id,
        question: current.question,
        selected: selectedOption,
        correct: correct,
        isCorrect: selectedOption === correct
       }
    ]);
  //正解数をカウント
    if (selectedOption === correct) {
        setScore((prev) => prev + 1);
    }
  //次へ
    const next = currentQuestion + 1;
    if (next < quiz.length) {
      setCurrentQuestion(next);
    } else {
      setShowResult(true);
    }
  };
  //リスタート
  const restartQuiz = () => {
    setQuiz([]);
    setCurrentQuestion(0);
    setScore(0);
    setResults([]);
    setShowResult(false);
    setNumQuestions(10);
  };

  // 現在の問題（安全策として空オブジェクトをデフォルトに）
  const question = quiz[currentQuestion] || { 
    question: "",
    options: [], 
    answer: "" 
  };


  //スタート画面
  if (quiz.length === 0) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>JavaScriptクイズ</h2>
      <p>出題数を入力してください（最大{quizData.length}問）</p>
       <label>
        出題数:
        <input
          type="number"
          value={numQuestions}
          onChange={(e) => setNumQuestions(Number(e.target.value))}
          min="1"
          max={quizData.length} // 最大は元データの数
          style={{ marginLeft: "10px", width: "50px" }}
        />
        </label>
        <br />
        <button onClick={() => startQuiz()}>
          クイズ開始
        </button>
        {error && (
          <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
        )}
    </div>
    );
  }
  //リザルト画面
  if (showResult) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>結果発表</h2>
        <p>
          あなたのスコア：{score} / {quiz.length}
        </p>

        <h3>詳細結果</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {results.map((r, index) => (
            <li key={index} style={{ marginBottom: "20px" }}>
              <strong>
                {r.id}. {r.question}
              </strong>
            <p>
              あなたの回答：{r.selected}  
              {r.isCorrect ? (
                <span style={{ color: "green" }}> ✅ 正解</span>
              ) : (
                <span style={{ color: "red" }}>
                   ❌ 不正解（正解：{r.correct}）
              </span>
              )}
            </p>
          </li>
        ))}
      </ul>

        <button onClick={restartQuiz}>もう一度挑戦</button>
      </div>
    );
  }

//回答画面
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>JavaScriptクイズ</h2>
      <p>
        問題 {currentQuestion + 1} / {quiz.length}
      </p>

      <h3>{question.question}</h3>
      
      <div>
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            style={{
              margin: "5px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MultipleChoiceQuiz;