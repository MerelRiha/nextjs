const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Route to perform calculation
app.post('/calculate', (req, res) => {
  const { num1, num2, operator } = req.body;

  if (num1 === undefined || num2 === undefined || !operator) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  let result;

  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num2 !== 0 ? num1 / num2 : 'Cannot divide by zero';
      break;
    default:
      return res.status(400).json({ error: 'Invalid operator' });
  }

  res.json({ result });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
