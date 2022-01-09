//form login const

const user = document.getElementById("userLogin");
const pass = document.getElementById("passwordLogin");

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
    alert("El usuario ingresado no es correcto");
  } else if (pass.value !== "omicron") {
    alert("La contraseña ingresada no es correcta");
  } else if (user.value === "omicron" && pass.value === "omicron") {
    nextPage();
  }
});

//change page options

function nextPage() {
  document.getElementById("login-container").style.display = "none";
  document.getElementById("game-container").style.display = "block";
}

//array options machine

const listChoices = ["piedra", "papel", "tijera"];

//variables

const stone = "piedra";
const paper = "papel";
const scissors = "tijera";

const stoneUser = document.getElementById("piedraUser");
const paperUser = document.getElementById("papelUser");
const scissorsUser = document.getElementById("tijeraUser");

const win = 0;
const lose = 1;
const tie = 2;

//clicks btns

stoneUser.addEventListener("click", () => {
  startGame(stone);
  console.log(stone);
});

paperUser.addEventListener("click", () => {
  startGame(paper);
  console.log(paper);
});

scissorsUser.addEventListener("click", () => {
  startGame(scissors);
  console.log(scissors);
});

function startGame(userChoise) {
  const machineChoise = Math.floor(Math.random() * listChoices.length);
  const resultMachine = listChoices[machineChoise];
  console.log(resultMachine);

  const result = resultChoise(userChoise, resultMachine);
  switch (result) {
    case win:
      document.getElementById("result").innerHTML = "Ganaste";
      break;
    case lose:
      document.getElementById("result").innerHTML = "Perdiste";
      break;
    case tie:
      document.getElementById("result").innerHTML = "Empate";
  }
}

function resultChoise(userChoise, resultMachine) {
  if (userChoise === resultMachine) {
    console.log("Empate");
    return tie;
  }
  if (userChoise === stone && resultMachine === paper) {
    console.log("Perdiste");
    return lose;
  }
  if (userChoise === stone && resultMachine === scissors) {
    console.log("Ganaste");
    return win;
  }
  if (userChoise === paper && resultMachine === scissors) {
    console.log("Perdiste");
    return lose;
  }
  if (userChoise === paper && resultMachine === stone) {
    console.log("Ganaste");
    return win;
  }
  if (userChoise === scissors && resultMachine === paper) {
    console.log("Ganaste");
    return win;
  }
  if (userChoise === scissors && resultMachine === stone) {
    console.log("Perdiste");
    return lose;
  }
}
