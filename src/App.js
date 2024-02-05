import { useState } from "react";
import axios from "axios";
import "./App.css";

const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

function App() {
  const [expression, setExpression] = useState("");
  const [ans, setAns] = useState();
  const handleExpressionChange = (e) => {
    setExpression(e.target.value);
  };
  const appendExpression = (expression) => {
    setExpression((prev) => (prev += "" + expression));
  };

  const handleButtonClick = async () => {
    console.log(expression);
    await calculate();
  };

  const calculate = async () => {
    axios
      .post("http://localhost:8000/calculate", { expression })
      .then((res) => {
        if (res.status === 200) {
          setAns(res.data);
          setExpression(res.data);
        }
      });
  };

  const handleKeyDown = async (e) => {
    console.log(e.keyCode);
    if (e.keyCode >= 48 && e.keyCode >= 58) {
      setExpression((prev) => (prev += "" + (e.keyCode % 48)));
    } else if (e.keyCode === 13) {
      await calculate();
    }
  };
  return (
    <div className="App" onKeyDown={handleKeyDown}>
      <input value={expression} onChange={handleExpressionChange} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {buttons.map((button) => (
          <button onClick={() => appendExpression(button)}>{button}</button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => appendExpression("+")}>+</button>
        <button onClick={() => appendExpression("-")}>-</button>
        <button onClick={() => appendExpression("*")}>*</button>
        <button onClick={() => appendExpression("/")}>/</button>
      </div>
      <button onClick={handleButtonClick}>Get anshwer (=)</button>
      <h1>Answer is - {ans}</h1>
    </div>
  );
}

export default App;
