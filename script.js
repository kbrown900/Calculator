let display = document.getElementById('display');
let historyDisplay = document.getElementById('history');
let history = [];

function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function calculate() {
  try {
    const result = eval(display.value);
    display.value = result;
    addToHistory(display.value);
  } catch (error) {
    display.value = 'Error';
  }
}

function addToHistory(calculation) {
  history.push(calculation);
  updateHistoryDisplay();
}

function updateHistoryDisplay() {
  historyDisplay.innerHTML = '';
  history.forEach((calculation, index) => {
    const historyItem = document.createElement('div');
    historyItem.textContent = `${index + 1}. ${calculation}`;
    historyDisplay.appendChild(historyItem);
  });
}
function toggleTheme(theme) {
    const body = document.body;
  
    if (theme === 'dark') {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  }
  