let display = document.getElementById('display');
let historyDisplay = document.getElementById('history');
let history = [];
let settingsMenu = document.getElementById('settingsMenu');

//shows the values typed/clicked to the display
function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

// Listen for keyboard events
document.addEventListener('keydown', handleKeyPress);

// Function to handle key presses
function handleKeyPress(event) {
  const key = event.key;
  // Map keyboard keys to calculator functions
  switch (key) {
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '0':
    case '.':
      appendToDisplay(key);
      break;
    case '+':
    case '-':
    case '*':
    case '/':
      appendToDisplay(key);
      break;
    case 'Enter':
      calculate();
      break;
    case 'Escape':
      clearDisplay();
      break;
    case 'Backspace':
      // Optionally, you can handle backspace to remove the last digit
      // Remove the next line if you don't want this behavior
      display.value = display.value.slice(0, -1);
      break;
    default:
      // Handle other keys if needed
      break;
  }
}

function calculate() {
  try {
    // Split the display value based on operators
    const calculation = display.value.match(/(\d+\.?\d*|[+\-*\/%])/g);
    console.log('Calculation Array:', calculation);

    // Loop through the calculation array to handle percentages
    for (let i = 1; i < calculation.length; i += 2) {
      if (calculation[i] === '%') {
        // Calculate the percentage and update the array
        const numIndex = i - 1;
        const num = parseFloat(calculation[numIndex]);
        const percentage = num / 100;
        calculation.splice(numIndex, 3, percentage.toString());
        i -= 2; // Adjust the loop index for the removed elements
      }
    }

    // Perform the calculation using the selected operator
    const operator = calculation.find(token => /[+\-*\/%]/.test(token));
    console.log('Operator:', operator);

    // Check if an operator is found
    if (!operator) {
      throw new Error('No operator found for calculation.');
    }

    // Get the index of the operator in the calculation array
    const operatorIndex = calculation.indexOf(operator);

    // Get the numbers before and after the operator
    const num1 = parseFloat(calculation.slice(0, operatorIndex).join(''));
    const num2 = parseFloat(calculation.slice(operatorIndex + 1).join(''));

    // Perform the calculation
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
        result = num1 / num2;
        break;
      default:
        throw new Error('Invalid operator.');
    }

    // Call addToHistory with both expression and result
    addToHistory(display.value, result);

    // Update the display
    display.value = result;
  } catch (error) {
    console.error('Calculation error:', error.message);
    display.value = 'Error';
  }
}





//adds to history array
function addToHistory(expression, result) {
  // Store the full expression in the history array before updating the display
  history.push({ expression, result });
  updateHistoryDisplay();
}

//updates the history display with the history array
function updateHistoryDisplay() {
  console.log('updateHistoryDisplay called');
  historyDisplay.innerHTML = '';
  history.forEach((entry, index) => {
    const historyItem = document.createElement('div');
    historyItem.textContent = `${index + 1}. ${entry.expression} = ${entry.result}`;
    historyDisplay.appendChild(historyItem);
  });
}


function clearHistory() {
  // Clear the history array
  history = [];
  // Update the display
  updateHistoryDisplay();
}

//toggles the theme of the app between light/dark
function toggleTheme(theme) {
  const body = document.body;

  if (theme === 'dark') {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }

  closeSettings();
}

//shows settings menu upper right
function toggleSettings() {
  settingsMenu.classList.toggle('visible');
}

//hides settings menu upper right
function closeSettings() {
  settingsMenu.classList.remove('visible');
}

function backspace() {
  // Remove the last character from the display
  display.value = display.value.slice(0, -1);
}