//データ読み込み
import { useState } from "react";
// 親(App.tsx)で定義されたQuizItem型を拡張して利用 
import type { QuizItem } from "./app"; //app.jsxにexportがあったから違う原因かも

// 将来のLLM拡張を見越したインターフェース定義
interface MultipleChoiceQuizProps {
  quizData: QuizItem[];
  onBack: () => void;
  children: React.ReactNode; // 「← 戻る」などのラベル 
}

// 回答結果の型（LLM解説の表示をサポート）
interface QuizResult {
  id: string;
  question: string;
  selected: string;
  correct: string;
  isCorrect: boolean;
  explanation?: string | undefined; // LLMによる解説
  tags?: string[];     
  keyWords?: string[]; 
}

function MultipleChoiceQuiz({ quizData,onBack,children } : MultipleChoiceQuizProps) {
//定義
  const [quiz, setQuiz] = useState<QuizItem[]>([]);// このように <型名[]> と書くことで、「この配列にはクイズデータ（または結果データ）が入ります」とTypeScriptに教えることができる。
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<QuizResult[]>([]);//上と一緒でデータ追加のための回避処理
  const [showResult, setShowResult] = useState(false);
  const [numQuestions, setNumQuestions] = useState(10); // デフォルト10問
  const [error, setError] = useState(""); // エラーメッセージ用

//シャッフル機能
  function shuffle(array: QuizItem[]):QuizItem[] {  //ここは引数 array は QuizItem の配列であるという指定とこの関数が最終的に返す値（戻り値）も QuizItem の配列であるという指定。これによって、クイズデータ以外を誤って混ぜてしまうミスを防いでいる
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i]!, arr[j]!] = [arr[j]!, arr[i]!];  //シャッフルのような「明らかに値が存在することが数学的に保証されているループ内」で、いちいち if 文（型ガード）を書くとコードが複雑になりすぎます。そのため、こうした箇所では ! (非nullアサーション)を使って記述をスッキリさせるのが一般的。
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
    const handleAnswer = (selectedOptionText: string) => {// noUncheckedIndexedAccess への対応：存在チェック
    const current = quiz[currentQuestion];
    if (!current) return; //ここでcurrentじゃなかったら処理終了

    const correct = current.answer;//ここはcurrentから持ってくるようにしたんだね
    const isCorrect = selectedOptionText === correct; //選択した文字と正解が一致しているかという結果が変数に格納される
    setResults((prev) => [
      ...prev,
       {
        id: current.id,
        question: current.question,
        selected: selectedOptionText,
        correct: correct,
        isCorrect: isCorrect,
        explanation: current.explanation // LLM拡張フィールド、app.jsxで定義必要
       }
    ]);
  //正解数をカウント
    if (isCorrect) { 
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


  //スタート画面（将来的にスタイルは分割する）
  if (quiz.length === 0) {
  return (
    //コンテナクラスにしたんだよね
    <div className="container"> {/* 一般的に「コンテナ」は、コンテンツをひとまとめにするための**外枠（器）**の役割を果たします。現在のプロジェクトでは、クイズ画面全体を囲う箱として機能しており、背景色やフォント設定などが適用される範囲を指定している */}  

    <button onClick={onBack} style={{ marginBottom: "20px" }}>{children}</button>{/* 「明確な役割分担」として定義した onBack プロパティ */}
    
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>JavaScriptクイズ</h1>
      <p>出題数を入力してください（最大{quizData.length}問）</p>
       <label>  {/* ここのlabelはフォーム要素（今回の場合は input）に対して「何を入力する場所か」というラベル（見出し）を付けるためのタグ*/} 
        出題数:{/*最大は元データの数*/}
        <input
          type="number"
          value={numQuestions}
          onChange={(e) => setNumQuestions(Number(e.target.value))}
          min="1"
          max={quizData.length}  
          style={{ marginLeft: "10px", width: "50px" }}
        
        /> </label>
        <br />
         <button onClick={startQuiz} style={{ marginLeft: "10px" }}>クイズ開始</button>
        {error && (
          <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
        )}
    </div> 

    </div>
    );
  }
  //リザルト画面
  if (showResult) {
    return (
        <div className="container" style={{ textAlign: "center", marginTop: "50px" }}>{/*container クラスを適用*/}
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
            {/* 【重要】ロードマップにある AI解説 (explanation) を表示 [2] */}
            {r.explanation && (
              <p style={{ fontSize: "0.9em", color: "#aaa", fontStyle: "italic", marginTop: "5px" }}>
                💡 解説: {r.explanation}
                </p>
            )}
          </li>
        ))}
      </ul>

        <button onClick={restartQuiz}>もう一度挑戦</button>{/* ここはonclick */}
      </div>
    );
  }

//回答画面
  return (
    <div className="container" style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>JavaScriptクイズ</h2>
      <p>
        問題 {currentQuestion + 1} / {quiz.length}
      </p>

      <h3>{question.question}</h3>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option.text)}
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