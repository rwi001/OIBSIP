let expressionDisplay = document.getElementById('expression');
let resultDisplay = document.getElementById('result');
let currentExpression = '';
let lastAnswer = '';

function append(value) {
  if (currentExpression === '0') currentExpression = '';
  if (value === '√') {
    currentExpression += 'Math.sqrt(';  // √ becomes Math.sqrt(
  } else {
    currentExpression += value;
  }
  expressionDisplay.textContent = currentExpression;
}

function delChar() {
  currentExpression = currentExpression.slice(0, -1);
  expressionDisplay.textContent = currentExpression || '0';
}

function clearAll() {
  currentExpression = '';
  resultDisplay.textContent = '';
  expressionDisplay.textContent = '0';
}

function calculate() {
  try {
    let result = eval(currentExpression.replace(/x/g, '*').replace(/÷/g, '/'));
    resultDisplay.textContent = result;
    lastAnswer = result;
  } catch {
    resultDisplay.textContent = 'Error';
  }
}

function useAns() {
  currentExpression += lastAnswer;
  expressionDisplay.textContent = currentExpression;
}