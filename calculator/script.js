let expression = '';
let lastAnswer = '';
const expressionDisplay = document.getElementById('expression');
const resultDisplay = document.getElementById('result');

// Append a value to the expression
function append(value) {
  if (value === '±') {
    if (expression) {
      expression = `-1*(${expression})`;
    }
  } else {
    expression += value;
  }
  expressionDisplay.textContent = expression;
}

// Delete the last character
function delChar() {
  expression = expression.slice(0, -1);
  expressionDisplay.textContent = expression || '0';
}

// Clear everything
function clearAll() {
  expression = '';
  resultDisplay.textContent = '0';
  expressionDisplay.textContent = '0';
}

// Evaluate the expression
function calculate() {
  try {
    const replacedExpr = expression
      .replace(/x/g, '*')
      .replace(/÷/g, '/')
      .replace(/√/g, 'Math.sqrt(');

    const result = eval(replacedExpr);
    resultDisplay.textContent = result;
    lastAnswer = result;
  } catch {
    resultDisplay.textContent = 'Error';
  }
}

// Use previous answer
function useAns() {
  expression += lastAnswer;
  expressionDisplay.textContent = expression;
}
