
function convertTemperature() {
    const value = parseFloat(document.getElementById('inputValue').value);
    const from = document.getElementById('fromUnit').value;
    const to = document.getElementById('toUnit').value;
    let result = 0;

    if (isNaN(value)) {
      document.getElementById('result').textContent = 'Please enter a valid number';
      return;
    }

    if (from === to) {
      result = value;
    } else {
      let celsius;

      // Convert input to Celsius
      if (from === 'celsius') {
        celsius = value;
      } else if (from === 'fahrenheit') {
        celsius = (value - 32) * 5 / 9;
      } else if (from === 'kelvin') {
        celsius = value - 273.15;
      }

      // Convert from Celsius to desired unit
      if (to === 'celsius') {
        result = celsius;
      } else if (to === 'fahrenheit') {
        result = (celsius * 9 / 5) + 32;
      } else if (to === 'kelvin') {
        result = celsius + 273.15;
      }
    }

    let unitSymbol = '';
    if (to === 'celsius') unitSymbol = '°C';
    else if (to === 'fahrenheit') unitSymbol = '°F';
    else if (to === 'kelvin') unitSymbol = 'K';

    document.getElementById('result').textContent = `${result.toFixed(2)} ${unitSymbol}`;
  }
