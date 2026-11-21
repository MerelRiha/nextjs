import { useState } from "react";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operator, setOperator] = useState("+");
  const [result, setResult] = useState(null);

  const handleCalculate = async () => {
    try {
      const res = await fetch("http://localhost:5000/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          num1: Number(num1),
          num2: Number(num2),
          operator
        })
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      console.error(err);
      setResult("Error calculating");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1>Simple MERN Calculator</h1>

      <input
        type="number"
        placeholder="Number 1"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />

      <select
        value={operator}
        onChange={(e) => setOperator(e.target.value)}
        style={{ margin: "0 10px" }}
      >
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>

      <input
        type="number"
        placeholder="Number 2"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />

      <br /><br />

      <button onClick={handleCalculate}>Calculate</button>

      {result !== null && <h2>Result: {result}</h2>}
    </div>
  );
}

export default App;
