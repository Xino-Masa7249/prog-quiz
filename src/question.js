/**
 * ===============================
 * Quiz Data 命名規則 / Naming Rules
 * ===============================
 * 
 * ID構成:
 *   B = 基本 (Basic)
 *   A = 配列 (Array)
 *   S = 文字列 (String)
 *   N = 数値 / 計算 (Number)
 *   O = オブジェクト (Object)
 *   F = 関数 (Function)
 * 
 * 例:
 *   B1 = 基本文法1問目
 *   A3 = 配列3問目
 * 
 * 各フィールド:
 *   id          : 一意の問題ID（例: "A2"）
 *   question    : 問題文
 *   options     : 選択肢（配列）
 *   answer      : 正答
 * 　category    : 問題カテゴリ名（表示用）
 *   explanation : 解説（省略可）
 * 
 * 今後の拡張予定:
 *   - difficulty（難易度: "easy", "normal", "hard"）
 *   - tags（自由タグ）
 *   - aiNotes（AIが自動で生成・補足するメモ）
 */
export const quizData = [
  {
    id: "B1",
    question: "変数を宣言するキーワードはどれ？",
    options: ["let", "make", "def", "new"],
    answer: "let",
    category: "基本",
    explanation:"変数宣言はletを使います、変数は途中で更新できます。"
  },
  {
    id: "B2",
    question: "定数を宣言するキーワードはどれ？",
    options: ["static", "const", "constant", "define"],
    answer: "const",
    category: "基本",
    explanation:"定数宣言はconstを使います、定数は途中で更新できません。"
  },
{
  id: "B3",
  question: "文字列を数値に変換する関数はどれ？",
  options: ["parseInt()", "toString()", "Number()", "String()"],
  answer: "Number()",
  category: "基本",
  explanation: "`Number()` は引数を数値型に変換します。文字列から整数や小数に変換するときに使えます。"
},
{
  id: "B4",
  question: "数値を文字列に変換するメソッドはどれ？",
  options: ["parseInt()", "Number()", "String()", "toString()"],
  answer: "toString()",
  category: "基本",
  explanation: "`.toString()` は数値を文字列に変換します。"
},
  {
    id: "A1",
    question: "配列の長さを取得するプロパティは？",
    options: [".count", ".length", ".size", ".elements"],
    answer: ".length",
    category: "配列",
    explanation:""
  },
  {
    id: "A2",
    question: "配列の末尾に追加するメソッドは？",
    options: [".join", ".split", ".push", ".unshift"],
    answer: ".push",
    category: "配列",
    explanation:""
  },
  {
    id: "A3",
    question: "配列の先頭に追加するメソッドは？",
    options: [".join", ".split", ".push", ".unshift"],
    answer: ".unshift",
    category: "配列",
    explanation:""
  },
  {
    id: "A4",
    question: "配列の最後を削除するメソッドは？",
    options: [".pop", ".delete", ".shift", ".unshift"],
    answer: ".pop",
    category: "配列",
    explanation:""
  },
  {
    id: "A5",
    question: "配列の先頭を削除するメソッドは？",
    options: [".pop", ".delete", ".shift", ".unshift"],
    answer: ".shift",
    category: "配列",
    explanation:""
  },
  {
    id: "A6",
    question: "位置を指定して配列を追加したり削除できるメソッドは？",
    options: [".control", ".splice", ".replace", ".split"],
    answer: ".splice",
    category: "配列",
    explanation:""
  },
  {
    id: "A7",
    question: "配列要素を展開してくれるスプレッド構文はどれ？",
    options: ["...", ",,,", "||", "??"],
    answer: "...",
    category: "配列",
    explanation:""
  },
  {
    id: "A8",
    question: "配列のすべての要素に同じ処理を行うメソッドは？",
    options: [".map()", ".filter()", ".forEach()", ".reduce()"],
    answer: ".forEach()",
    category: "配列",
    explanation: "`.forEach()` は配列の各要素に対して関数を一度ずつ実行します。新しい配列は返しません。"
},
{
    id: "A9",
    question: "条件を満たす要素だけを抽出するメソッドは？",
    options: [".map()", ".filter()", ".forEach()", ".reduce()"],
    answer: ".filter()",
    category: "配列",
    explanation: "`.filter()` はコールバック関数の戻り値が `true` の要素だけを集めて新しい配列を返します。"
},
{
    id: "A10",
    question: "配列を別の形に変換して新しい配列を作るメソッドは？",
    options: [".map()", ".filter()", ".forEach()", ".reduce()"],
    answer: ".map()",
    category: "配列",
    explanation: "`.map()` は各要素を変換して新しい配列を返します。元の配列は変更されません。"
},
{
  id: "A11",
  question: "配列のすべての要素を1つの値にまとめるメソッドは？",
  options: [".reduce()", ".concat()", ".flat()", ".splice()"],
  answer: ".reduce()",
  category: "配列",
  explanation: "`.reduce()` は配列の全要素を1つの値にまとめます。合計や平均などの集計に使われます。"
},
{
  id: "A12",
  question: "配列を文字列として結合するメソッドは？",
  options: [".concat()", ".join()", ".merge()", ".connect()"],
  answer: ".join()",
  category: "配列",
  explanation: "`.join()` は配列の全要素を1つの文字列に結合します。"
},
{
  id: "A13",
  question: "複数の配列を1つにまとめるメソッドは？",
  options: [".concat()", ".merge()", ".append()", ".combine()"],
  answer: ".concat()",
  category: "配列",
  explanation: "`.concat()` は複数の配列を結合して新しい配列を返します。"
},
{
  id: "S1",
  question: "文字列を特定の区切りで配列に分割するメソッドは？",
  options: [".join()", ".split()", ".slice()", ".splice()"],
  answer: ".split()",
  category: "文字列",
  explanation: "`.split()` は文字列を指定した区切り文字で分割して配列を返します。"
},

{
  id: "N1",
  question: "小数点以下を切り捨てる関数はどれ？",
  options: ["Math.floor()", "Math.ceil()", "Math.round()", "Math.trunc()"],
  answer: "Math.floor()",
  category: "計算",
  explanation: "`Math.floor()` は小数点以下を切り捨てて整数を返します。"
},
{
  id: "N2",
  question: "0〜1未満のランダムな数値を生成する関数は？",
  options: ["Math.random()", "Math.rand()", "Math.randomInt()", "Math.num()"],
  answer: "Math.random()",
  category: "計算",
  explanation: "`Math.random()` は0以上1未満のランダムな数値を返します。"
}
  
];