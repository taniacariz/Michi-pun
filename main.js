// form login const
const user = document.getElementById("userLogin");
const pass = document.getElementById("passwordLogin");

if (localStorage.getItem("result")) {
  nextPage();
}

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Escuchando");
  if (user.value === "" || pass.value === "") {
    alert("Por favor, complete todos los campos");
  } else if (user.value.length < 6) {
    alert("El usuario debe tener al menos 6 caracteres");
  } else if (pass.value.length < 6) {
    alert("La contraseña tener al menos 6 caracteres");
  } else if (user.value !== "omicron") {
    alert("Los datos son incorrectos");
  } else if (pass.value !== "omicron") {
    alert("Los datos son incorrectos");
  } else if (user.value === "omicron" && pass.value === "omicron") {
    nextPage();
  }
});

// change page options

function nextPage() {
  document.getElementById("login-container").style.display = "none";
  document.getElementById("game-container").style.display = "block";
}

//array options machine

const listChoices = ["piedra", "papel", "tijera"];
const results = {
  WIN: "Ganaste",
  LOOSE: "Perdiste",
  TIE: "Empate",
};

const stone = "piedra";
const paper = "papel";
const scissors = "tijera";

const WIN = "WIN";
const LOOSE = "LOOSE";
const TIE = "TIE";

const INITIAL_SCORE = 0;
const WIN_VALUE = 100;
const LOOSE_VALUE = 30;
const TIE_VALUE = 0;
const MAX_ROUNDS = 10;
let actualScore = 0;

const userImg = document.getElementById("userImg");
const machineImg = document.getElementById("machineImg");
const optionButtons = document.getElementsByClassName("game-option");

// print values or set if does not exist
if (!localStorage.getItem("result")) {
  localStorage.setItem("result", "[]");
} else {
  printResultList();
  checkIfOver();
}

function changeImageOption(element, option) {
  element.src = `images/${option}.svg`;
}

//clicks btns
Array.from(optionButtons).forEach((o) => {
  o.addEventListener("click", (e) => {
    const option = e.currentTarget.getAttribute("data-option");
    startGame(option);
    changeImageOption(userImg, option);
  });
});

function startGame(userChoise) {
  const machineChoise = Math.floor(Math.random() * listChoices.length);
  const resultMachine = listChoices[machineChoise];
  console.log("Option machine is " + resultMachine);

  changeImageOption(machineImg, resultMachine);

  const result = resultChoice(userChoise, resultMachine);

  document.getElementById("resultText").innerHTML = results[result];
  document.getElementById("score").innerHTML = counterScore(result);

  addToLocalStorage(userChoise, resultMachine, result);
  printResultList();
  checkIfOver();
}

function checkIfOver() {
  // disable buttons when rounds are over
  // o = option
  if (!isPlaying()) {
    Array.from(optionButtons).forEach((o) => {
      o.setAttribute("disabled", true);
    });
  }
}

function resultChoice(userChoise, resultMachine) {
  if (!userChoise) {
    console.error("No hay selección");
    return;
  }
  if (userChoise === resultMachine) {
    console.log("Empate");
    return TIE;
  }
  if (
    (userChoise === stone && resultMachine === paper) ||
    (userChoise === paper && resultMachine === scissors) ||
    (userChoise === scissors && resultMachine === stone)
  ) {
    console.log("Perdiste");
    return LOOSE;
  }
  if (
    (userChoise === stone && resultMachine === scissors) ||
    (userChoise === paper && resultMachine === stone) ||
    (userChoise === scissors && resultMachine === paper)
  ) {
    console.log("Ganaste");
    return WIN;
  }
}

function isPlaying() {
  const rounds = JSON.parse(localStorage.getItem("result")).length;
  return rounds < MAX_ROUNDS;
}

function counterScore(result) {
  if (result === WIN) {
    actualScore += WIN_VALUE;
  } else if (result === LOOSE) {
    actualScore -= LOOSE_VALUE;
  }
  return actualScore;
}

function addToLocalStorage(userOption, machineOption, result) {
  const savedResults = JSON.parse(localStorage.getItem("result"));
  savedResults.push({ userOption, machineOption, result, actualScore });
  localStorage.setItem("result", JSON.stringify(savedResults));
}

function printResultList() {
  const listScore = document.getElementById("list-score");
  listScore.innerHTML = "";
  const result = JSON.parse(localStorage.getItem("result"));
  result.forEach((e) => {
    const newLi = document.createElement("li");
    newLi.appendChild(
      document.createTextNode(
        `${e.userOption} - ${e.machineOption} - ${e.result} - ${e.actualScore}`
      )
    );
    listScore.appendChild(newLi);
  });
}

function closeSession() {
  localStorage.clear();
  window.location.href = "index.html";
}

document
  .getElementById("close-session")
  .addEventListener("click", closeSession);
