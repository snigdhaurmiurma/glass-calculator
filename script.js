const display = document.getElementById("display");
const historyText = document.getElementById("history");
const buttons = document.querySelectorAll(".btn");

let currentInput = "0";
let previousCalculation = "";

function updateDisplay() {
  display.value = currentInput;
  historyText.textContent = previousCalculation;
}

function appendValue(value) {
  if (currentInput === "0" && value !== ".") {
    currentInput = value;
  } else {
    currentInput += value;
  }
}

function clearAll() {
  currentInput = "0";
  previousCalculation = "";
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  if (currentInput === "") {
    currentInput = "0";
  }
}

function calculate() {
  try {
    const expression = currentInput.replace(/%/g, "/100");
    const result = eval(expression);

    if (result === undefined || isNaN(result)) {
      currentInput = "Error";
    } else {
      previousCalculation = currentInput + " =";
      currentInput = parseFloat(result.toFixed(10)).toString();
    }
  } catch (error) {
    currentInput = "Error";
  }
}

function handleInput(value) {
  if (currentInput === "Error" && value !== "AC") {
    currentInput = "0";
  }

  if (value === "AC") {
    clearAll();
  } else if (value === "DEL") {
    deleteLast();
  } else if (value === "=") {
    calculate();
  } else {
    appendValue(value);
  }

  updateDisplay();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.add("pressed");

    setTimeout(() => {
      button.classList.remove("pressed");
    }, 120);

    handleInput(button.dataset.value);
  });
});

document.addEventListener("keydown", (e) => {
  const key = e.key;
  const validKeys = "0123456789+-*/.%";

  if (validKeys.includes(key)) {
    handleInput(key);
    animateKey(key);
  } else if (key === "Enter") {
    e.preventDefault();
    handleInput("=");
    animateKey("=");
  } else if (key === "Backspace") {
    handleInput("DEL");
    animateKey("DEL");
  } else if (key === "Escape") {
    handleInput("AC");
    animateKey("AC");
  }
});

function animateKey(value) {
  buttons.forEach((button) => {
    if (button.dataset.value === value) {
      button.classList.add("pressed");

      setTimeout(() => {
        button.classList.remove("pressed");
      }, 120);
    }
  });
}

updateDisplay();