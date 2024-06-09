
    const display = document.getElementById('display');
    let displayValue = '0';
    let expression = '';
    let firstOperand = null;
    let waitingForSecondOperand = false;
    let operator = null;

    function updateDisplay() {
      display.innerText = expression || displayValue;
    }

    function clearDisplay() {
      displayValue = '0';
      expression = '';
      firstOperand = null;
      waitingForSecondOperand = false;
      operator = null;
      updateDisplay();
    }

    function deleteLast() {
        displayValue = displayValue.slice(0, -1);
        if (displayValue === '') {
          displayValue = '0';
        }
        expression = expression.slice(0, -1); // Remove the last character from the expression string
        updateDisplay();
      }
      

      function appendNumber(number) {
        if (waitingForSecondOperand) {
          displayValue = number.toString();
          expression += number;
          waitingForSecondOperand = false;
        } else {
          displayValue = displayValue === '0' ? number.toString() : displayValue + number;
          expression += number;
        }
        updateDisplay();
      }
      

    function appendOperator(nextOperator) {
      const inputValue = parseFloat(displayValue);

      if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        expression = expression.slice(0, -1) + nextOperator;
        updateDisplay();
        return;
      }

      if (firstOperand === null && !isNaN(inputValue)) {
        firstOperand = inputValue;
      } else if (operator) {
        const result = performCalculation(firstOperand, inputValue, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
      }

      waitingForSecondOperand = true;
      operator = nextOperator;
      expression += nextOperator;
      updateDisplay();
    }

    function performCalculation(firstOperand, secondOperand, operator) {
      switch (operator) {
        case '+':
          return firstOperand + secondOperand;
        case '-':
          return firstOperand - secondOperand;
        case '*':
          return firstOperand * secondOperand;
        case '/':
          return secondOperand !== 0 ? firstOperand / secondOperand : 'Error';
        default:
          return secondOperand;
      }
    }

    function calculateResult() {
      if (operator && !waitingForSecondOperand) {
        const inputValue = parseFloat(displayValue);
        const result = performCalculation(firstOperand, inputValue, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
        expression = displayValue;
        updateDisplay();
      }
    }

    updateDisplay();
