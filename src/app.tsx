//クイズデータ型定義 
export interface QuizOption {
  text : string;
  isCorrect : boolean;
}
//定義
export interface QuizItem{
  id : string
  question : string;
  answer : string
  options : QuizOption[];
  explanation?: string | undefined; // string か undefined か、そもそも存在しないかのすべてを許容することで拡張性を確保する
  tags?: string[];     
  keyWords?: string[]; 
}

//データ読み込み・インポート
import { useState } from "react";
import MultipleChoiceQuiz from "./multipleChoiceQuiz"
import quizDataRaw from "./quizData.json" with { type : "json" };
import TextQuiz from "./TextQuiz";

//型適用
const quizData = quizDataRaw as QuizItem[];

function App() {
  //モード管理
  const [mode, setMode] = useState<"choice" | "text"| null > (null);

  //選択クイズ
  if (mode === "choice") {
    return (
      <div>
        <MultipleChoiceQuiz quizData={quizData} onBack={() => setMode(null)}>
          ←戻る
        </MultipleChoiceQuiz>
      </div>
    );
  }
  // 記述式トレーニング
  if (mode === "text") {
    return (
      <div>
        <TextQuiz quizData={quizData} onBack={() => setMode(null)}>
          ←戻る
        </TextQuiz>
      </div>
    );
  }
  // メニュー画面
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