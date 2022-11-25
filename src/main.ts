import './style.css'

const playingBoard = document.querySelector(".playing-board");
const wrapper = document.querySelector(".wrapper");
const firstAvatar = document.querySelector(".first-avatar");
const secondAvatar = document.querySelector(".second-avatar");
const topBar = document.querySelector(".top-bar");
const playButton = document.querySelector(".play-button");
const randomButtons = document.querySelectorAll(".random-button");
const firstNickname = document.querySelector(".first-nickname-display");
const secondNickname = document.querySelector(".second-nickname-display");
const queryFirstNameInput = document.querySelector(".first-nickname-input");
const querySecondNameInput = document.querySelector(".second-nickname-input");
const firstPoints = document.querySelector(".first-points");
const secondPoints = document.querySelector(".second-points");
const moveCountDisplay = document.querySelector(".move-count");
const inputInRow = document.querySelector(".input-in-row");
const inputSize = document.querySelector(".input-size");
const inputPoints = document.querySelector(".input-points");
const alertBox = document.querySelector(".alert-box");
const queryCountingDown = document.querySelector(".counting-down-field");
const queryMovingField = document.querySelector(".moving-field");
const pointLimit = document.querySelectorAll(".point-limit");
const startingField = document.querySelector(".starting-field");
const endGameAvatar = document.querySelector(".end-avatar-display")
const endGameNickname = document.querySelector(".end-nickname-display")
const firstName = [
  "Bogusław",
  "Bogumił",
  "Bogdan",
  "Borzymir",
  "Borzygniew",
  "Borys",
  "Bożydar",
  "Bolesław",
  "Bronisław",
  "Chwalibog",
  "Ciechosław",
  "Dalibor",
  "Dobromir",
  "Dobrosław",
  "Drogomir",
  "Dobromysł",
  "Gniewomir",
  "Gościwuj",
  "Iwo",
  "Iwosław",
  "Jarosław",
  "Jaromir",
  "Kazimierz",
  "Krzesimir",
  "Ludosław",
  "Ludomir",
  "Lech",
  "Lechosław",
  "Lesław",
  "Mirosław",
  "Miłorad",
  "Miłosz",
  "Mieszko",
  "Milan",
  "Mieczysław",
  "Przemysław",
  "Radzimir",
  "Radomir",
  "Racibor",
  "Radosław",
  "Sławomir",
  "Stanisław",
  "Sławobor",
  "Siemisław",
  "Sobiesław",
  "Sambor",
  "Tomisław",
  "Tadeusz",
  "Władysław",
  "Włodzimierz",
  "Witomysł",
  "Wojciech",
  "Wacław",
  "Wiesław",
  "Zbigniew",
  "Zbyszko",
  "Zlatan",
  "Ziemowit",
  "Ździsław",
];
const secondName = [
  "Adamek",
  "Adam",
  "Adamcio",
  "Anna",
  "Babiarz",
  "Babol",
  "Bachryj",
  "Bal",
  "Balas",
  "Balon",
  "Bałaciński",
  "Barłóg",
  "Bąbel",
  "Bączymorda",
  "Bednarz",
  "Beksa",
  "Bełkot",
  "Bezcipki",
  "Bezcyc",
  "Bezmózg",
  "Bezszyjec",
  "Biały",
  "Biały Polak",
  "Bieg",
  "Bielasty",
  "Bigiel",
  "Bizon",
  "Błachut",
  "Bolączka",
  "Boligłowa",
  "Brzoza",
  "Bubel",
  "Bucior",
  "Burdelski",
  "Burek",
  "Bzdura",
  "Bzibziak",
  "Canibal",
  "Cezary",
  "Cham",
  "Chmura",
  "Chujdus",
  "Chujeba",
  "Chujoman",
  "Chwała",
  "Chwiej",
  "Chyba",
  "Chytry",
  "Ciapciak",
  "Ciąpała",
  "Cichowlas",
  "Cieć",
  "Ciemięga",
  "Ciemniak",
  "Psikutas",
  "Ciołek",
  "Ciota",
  "Głąb",
  "Gruz",
  "Kozak",
];
const firstPointsLeft = document.querySelector(".first-dropdown-points");
const secondPointsLeft = document.querySelector(".second-dropdown-points");
const endRoundQuery = document.querySelector(".end-round");
const endGameQuery = document.querySelector(".end-game");
const drawCircle = `<div class="circle"></div>`;
const drawCross = `<div class="cross"></div>`;
let posArray: string[] = [];
let rows, columns: number;
let posX, posY, turn;
let moveCount = 0;
let winner = null;
let SignsInRowToWin = 3;
let pointsToGlobalWin = 1;
let isMouseDown = false;
let movingTimeout = null;
let playingWith = "other-player";

let players = {
  player_1: {
    ID: 1,
    nickname: `Guest`,
    points: 0,
    sign: String,
  },
  player_2: {
    ID: 2,
    nickname: `Guest`,
    points: 0,
    sign: String,
  },
};

firstPoints.innerHTML = players.player_1.points;
secondPoints.innerHTML = players.player_2.points;
firstPointsLeft.innerHTML = players.player_1.points;
secondPointsLeft.innerHTML = players.player_2.points;


function whoFirst() {
  if (Math.random() >= 0.5) {
    firstAvatar.style.border = "4px rgb(23, 189, 23) solid";
    turn = players.player_1.ID;
    players.player_1.sign = drawCross;
    players.player_2.sign = drawCircle;
  } else {
    secondAvatar.style.border = "4px rgb(23, 189, 23) solid";
    turn = players.player_2.ID;
    players.player_2.sign = drawCross;
    players.player_1.sign = drawCircle;
  }
}
function generatePlayboard() {
  if (rows > 99) {
    rows = 99;
    columns = 99;
  }
  clearPlayboard();

  playingBoard.style.width = `${120 * columns}px`;
  endRoundQuery.style.width = `${120 * columns}px`;
  queryCountingDown.style.width = `${120 * columns}px`;
  queryMovingField.style.width = `${120 * columns}px`;
  endGameQuery.style.width = `${120 * columns}px`;
  for (let i = 0; i < columns; i++) {
    for (let z = 0; z < rows; z++) {
      const square = document.createElement("div");
      square.setAttribute("class", `square`);
      square.setAttribute("x", `${z}`);
      square.setAttribute("y", `${i}`);
      square.setAttribute("clickID", `0`);
      square.addEventListener("click", addSign);
      posArray.push(square);
    }
  }

  posArray.forEach((element) => {
    playingBoard.appendChild(element);
  });
}

function addSign(event) {
  const target = event.currentTarget;
  posX = Number(target.getAttribute("x"));
  posY = Number(target.getAttribute("y"));
  //console.log({ posX, posY });

  if (target.getAttribute("clickID") === "0") {
    window.navigator.vibrate(35);
    moveCount += 1;
    moveCountDisplay.innerHTML = moveCount;
    event.target.classList.remove("square-hover");
    console.log({ playingWith })
    if (turn == players.player_1.ID) {
      target.setAttribute("clickID", players.player_1.ID);
      target.innerHTML = players.player_1.sign;
    } else if (playingWith == "other-player") {
      target.setAttribute("clickID", players.player_2.ID);
      target.innerHTML = players.player_2.sign;
    }
    searchForWinner();
    searchForWinnerDiag();
    if (rows * columns == moveCount) {
      endRoundQuery.style.display = "flex"
    } else if (playingWith == "other-player") changeTurn();
  }
}

function AInaKiju() {
  if (turn == players.player_2.ID) {
    let x = Math.floor(Math.random() * rows)
    let y = Math.floor(Math.random() * columns)
    console.log({ x, y })
  }
}

function changeTurn() {
  if (turn === players.player_1.ID) {
    turn = players.player_2.ID;
    if (!winner) {
      firstAvatar.style.border = "";
      secondAvatar.style.border = "3px rgb(23, 189, 23) solid";
    }
  } else {
    turn = players.player_1.ID;
    if (!winner) {
      secondAvatar.style.border = "";
      firstAvatar.style.border = "3px rgb(23, 189, 23) solid";
    }
  }
}
function searchForWinner() {
  let searchingSquare;
  let ptsToWinRows = 0;
  let ptsToWinCols = 0;
  const squaresToHighlight = [];
  for (let i = 0; i < columns; i++) {
    searchingSquare = posArray.find(
      (square) =>
        square.getAttribute("x") == posX && square.getAttribute("y") == i
    );
    if (searchingSquare.getAttribute("clickID") == turn) {
      ptsToWinCols += 1;
      squaresToHighlight.push(searchingSquare);
      if (ptsToWinCols == SignsInRowToWin) {
        winner = turn;
        pointsDisplay();
        if (inputPoints.value == players.player_1.points || inputPoints.value == players.player_2.points) {
          endGame()
        } else {
          endRoundQuery.style.display = "flex";
        }
      }
    } else {
      squaresToHighlight.pop(searchingSquare);
      ptsToWinCols = 0;
    }
    if (winner) {
      squaresToHighlight.forEach(
        (square) => (square.style.backgroundColor = "green")
      );
      break;
    }
  }
  for (let i = 0; i < rows; i++) {
    searchingSquare = posArray.find(
      (square) =>
        square.getAttribute("y") == posY && square.getAttribute("x") == i
    );
    if (searchingSquare.getAttribute("clickID") == turn) {
      ptsToWinRows += 1;
      squaresToHighlight.push(searchingSquare);
      if (ptsToWinRows == SignsInRowToWin) {
        winner = turn;
        pointsDisplay();
        if (inputPoints.value == players.player_1.points || inputPoints.value == players.player_2.points) {
          endGame()
        } else {
          endRoundQuery.style.display = "flex";
        }
      }
    } else {
      squaresToHighlight.pop(searchingSquare);
      ptsToWinRows = 0;
    }
    if (winner) {
      squaresToHighlight.forEach(
        (square) => (square.style.backgroundColor = "green")
      );
      break;
    }
  }
}
function searchForWinnerDiag() {
  let searchingSquare;
  let ptsToWinY_1 = 0;
  let ptsToWinY_2 = 0;
  let ptsToWinY_3 = 0;
  let ptsToWinY_4 = 0;
  const squaresToHighlight = [];
  for (let i = 0; i < columns; i++) {
    searchingSquare = posArray.find(
      (square) =>
        square.getAttribute("x") == posX + i &&
        square.getAttribute("y") == posY + i
    );
    if (!searchingSquare) continue;
    if (searchingSquare.getAttribute("clickID") == turn) {
      ptsToWinY_1 += 1;
      squaresToHighlight.push(searchingSquare);
      if (ptsToWinY_1 == SignsInRowToWin) {
        winner = turn;
        pointsDisplay();
        if (inputPoints.value == players.player_1.points || inputPoints.value == players.player_2.points) {
          endGame()
        } else {
          endRoundQuery.style.display = "flex";
        }
      }
    } else {
      squaresToHighlight.pop(searchingSquare);
      ptsToWinY_1 = 0;
    }
    if (winner) {
      squaresToHighlight.forEach(
        (square) => (square.style.backgroundColor = "green")
      );
      break;
    }
  }
  for (let i = 0; i < columns; i++) {
    searchingSquare = posArray.find(
      (square) =>
        square.getAttribute("x") == posX - i &&
        square.getAttribute("y") == posY - i
    );
    if (!searchingSquare) continue;
    if (searchingSquare.getAttribute("clickID") == turn) {
      ptsToWinY_2 += 1;
      squaresToHighlight.push(searchingSquare);
      if (ptsToWinY_2 == SignsInRowToWin) {
        winner = turn;
        pointsDisplay();
        if (inputPoints.value == players.player_1.points || inputPoints.value == players.player_2.points) {
          endGame()
        } else {
          endRoundQuery.style.display = "flex";
        }
      }
    } else {
      squaresToHighlight.pop(searchingSquare);
      ptsToWinY_2 = 0;
    }
    if (winner) {
      squaresToHighlight.forEach(
        (square) => (square.style.backgroundColor = "green")
      );
      break;
    }
  }
  for (let i = 0; i < columns; i++) {
    searchingSquare = posArray.find(
      (square) =>
        square.getAttribute("x") == posX + i &&
        square.getAttribute("y") == posY - i
    );
    if (!searchingSquare) continue;
    if (searchingSquare.getAttribute("clickID") == turn) {
      ptsToWinY_3 += 1;
      squaresToHighlight.push(searchingSquare);
      if (ptsToWinY_3 == SignsInRowToWin) {
        winner = turn;
        pointsDisplay();
        if (inputPoints.value == players.player_1.points || inputPoints.value == players.player_2.points) {
          endGame()
        } else {
          endRoundQuery.style.display = "flex";
        }
      }
    } else {
      squaresToHighlight.pop(searchingSquare);
      ptsToWinY_3 = 0;
    }
    if (winner) {
      squaresToHighlight.forEach(
        (square) => (square.style.backgroundColor = "green")
      );
      break;
    }
  }
  for (let i = 0; i < columns; i++) {
    searchingSquare = posArray.find(
      (square) =>
        square.getAttribute("x") == posX - i &&
        square.getAttribute("y") == posY + i
    );
    if (!searchingSquare) continue;
    if (searchingSquare.getAttribute("clickID") == turn) {
      ptsToWinY_4 += 1;
      squaresToHighlight.push(searchingSquare);
      if (ptsToWinY_4 == SignsInRowToWin) {
        winner = turn;
        pointsDisplay();
        if (inputPoints.value == players.player_1.points || inputPoints.value == players.player_2.points) {
          endGame()
        } else {
          endRoundQuery.style.display = "flex";
        }
      }
    } else {
      squaresToHighlight.pop(searchingSquare);
      ptsToWinY_4 = 0;
    }
    if (winner) {
      squaresToHighlight.forEach(
        (square) => (square.style.backgroundColor = "green")
      );
      break;
    }
  }
}

function pointsDisplay() {
  if (winner == 1) {
    players.player_1.points += 1;
    firstPoints.innerHTML = players.player_1.points;
    firstPointsLeft.innerHTML = players.player_1.points;
  } else {
    players.player_2.points += 1;
    secondPoints.innerHTML = players.player_2.points;
    secondPointsLeft.innerHTML = players.player_2.points;
  }
}

function startTheGame() {
  if (buttonsInsideInput[1].getAttribute("clicked") === "false") { playingWith = "other-player" } else {
    playingWith = "bot"
  }
  if (endGameQuery.style.display == "flex") {
    endGameQuery.style.display = "none";
    players.player_1.points = 0;
    firstPoints.innerHTML = players.player_1.points
    firstPointsLeft.innerHTML = players.player_1.points
    players.player_2.points = 0;
    secondPoints.innerHTML = players.player_2.points
    secondPointsLeft.innerHTML = players.player_2.points
    moveCountDisplay.innerHTML = 0;
    firstAvatar.style.border = "";
    secondAvatar.style.border = "";
  }
  pointLimit.forEach((number) => number.innerHTML = inputPoints.value)
  if (inputInRow.value < 3 || inputInRow.value > 99) {
    if (inputSize.value <= 5 && inputSize.value >= 3) {
      SignsInRowToWin = inputSize.value
    } else SignsInRowToWin = 5;
  }
  if (queryFirstNameInput.value) players.player_1.nickname = queryFirstNameInput.value;
  if (querySecondNameInput.value) players.player_2.nickname = querySecondNameInput.value;

  firstNickname.innerHTML = players.player_1.nickname;
  secondNickname.innerHTML = players.player_2.nickname;

  SignsInRowToWin = inputInRow.value;
  if (queryFirstNameInput.value)
    players.player_1.nickname = queryFirstNameInput.value;
  if (querySecondNameInput.value)
    players.player_2.nickname = querySecondNameInput.value;

  let id;
  clearInterval(id);
  id = setInterval(countingDown, 1000);
  let num = 3;
  function countingDown() {
    queryCountingDown.style.display = "flex"
    if (num >= 0) {
      queryCountingDown.innerHTML = num;
      num--;
    } else {
      clearInterval(id);
      whoFirst();
      queryCountingDown.style.display = "none";
    }
  }
  countingDown();
  startingFieldAnim();

}
function randomNickname(e) {
  let FirstRanNum = Math.floor(Math.random() * 59);
  let SecRanNum = Math.floor(Math.random() * 59);
  if (e.target.getAttribute("id") == "1") {
    players.player_1.nickname = `${firstName[FirstRanNum]} ${secondName[SecRanNum]}`;
    queryFirstNameInput.value = players.player_1.nickname;
  } else {
    players.player_2.nickname = `${firstName[FirstRanNum]} ${secondName[SecRanNum]}`;
    querySecondNameInput.value = players.player_2.nickname;

  }
}
function endGame() {
  endGameQuery.style.display = "flex"
  if (winner == 1) {
    endGameAvatar.style.background = `url("images/first.png") no-repeat center `
    endGameNickname.innerHTML = players.player_1.nickname
    endGameAvatar.style.backgroundSize = "80px"
  } else {
    endGameAvatar.style.background = `url("images/second.png") no-repeat center `
    endGameNickname.innerHTML = players.player_2.nickname
    endGameAvatar.style.backgroundSize = "80px"
  }
}
function endRound() {
  moveCount = 0;
  moveCountDisplay.innerHTML = moveCount;
  clearPlayboard();
  window.navigator.vibrate(35);
  firstAvatar.style.border = "";
  secondAvatar.style.border = "";
  endRoundQuery.style.display = "none";
  generatePlayboard();
  whoFirst();
  winner = null;
}
function clearPlayboard() {
  posArray.forEach((element) => {
    playingBoard.removeChild(element);
  });
  posArray = [];
}

function onLoad() {
  moveCountDisplay.innerHTML = moveCount;
  generatePlayboard(rows = 3, columns = 3);
  developerMode();
}

function validateInputs() {
  const firstElement = alertBox.querySelector(`div[id="1"]`)
  const secondElement = alertBox.querySelector(`div[id="2"]`)
  const thirdElement = alertBox.querySelector(`div[id="3"]`)
  const fourthElement = alertBox.querySelector(`div[id="4"]`)

  let firstValidation = true;
  let secondValidation = true;
  let thirdValidation = true;
  let fourthValidation = true;
  inputPoints.value = Math.floor(inputPoints.value)
  if (inputPoints.value < 3 || inputPoints.value > 99) {
    firstValidation = false;
    playButton.disabled = true;
    inputPoints.style.borderImage = 'linear-gradient(rgb(209, 26, 26), rgb(194, 52, 24)) 1';
    const alertContent = document.createTextNode('Points are must be set between 3 and 99.');
    const alertElement = document.createElement('div');
    alertElement.setAttribute('id', '1');
    alertElement.append(alertContent);
    alertBox.append(alertElement);
    setTimeout(() => {
      alertElement.remove();
    }, 8000);

  } else {
    firstElement?.remove(firstElement);
    firstValidation = true;
    inputPoints.style.borderImage = "linear-gradient(rgb(26, 209, 47), rgb(24, 128, 194)) 1"
  }

  inputSize.value = Math.floor(inputSize.value);
  if (inputSize.value < 3 || inputSize.value > 99) {

    secondValidation = false;
    playButton.disabled = true;
    inputSize.style.borderImage = "linear-gradient(rgb(209, 26, 26), rgb(194, 52, 24)) 1"
    const alertContent = document.createTextNode('Size must be set between 3 and 99.');
    const alertElement = document.createElement('div');
    alertElement.setAttribute('id', '3');
    alertElement.append(alertContent);
    alertBox.append(alertElement);
    setTimeout(() => {
      alertElement.remove();
    }, 8000);
  } else {
    thirdElement?.remove(thirdElement);
    secondValidation = true;
    inputSize.style.borderImage = "linear-gradient(rgb(26, 209, 47), rgb(24, 128, 194)) 1"
  }
  inputInRow.disabled = false;
  columns = inputSize.value;
  rows = inputSize.value;
  generatePlayboard();
  buttonsInsideInput[2].style.backgroundColor = "rgb(64, 64, 64)";
  buttonsInsideInput[2].style.color = "white";
  buttonsInsideInput[2].setAttribute("clicked", "false");

  if (inputSize.value <= 5) {
    inputInRow.disabled = true; inputInRow.value = inputSize.value;
  }
  if (inputSize.value >= 5) {
    if (inputInRow.value < 5) inputInRow.value = 5;
    inputInRow.setAttribute("min", "5");
    inputInRow.setAttribute("max", inputSize.value);
  }
  if (inputSize.value == 3) {
    inputInRow.disabled = true;
    buttonsInsideInput[2].style.background = "rgb(209, 209, 209)";
    buttonsInsideInput[2].style.color = "black";
    buttonsInsideInput[2].setAttribute("clicked", "true");
  }

  inputInRow.value = Math.floor(inputInRow.value)
  if (inputInRow.value < 3 && inputInRow.value > 99) {
    thirdValidation = false;
    playButton.disabled = true;
    inputInRow.style.borderImage = 'linear-gradient(rgb(209, 26, 26), rgb(194, 52, 24)) 1';
    const alertContent = document.createTextNode('In-row field must be set between 3 and 99.');
    const alertElement = document.createElement('div');
    alertElement.setAttribute('id', '2');
    alertElement.append(alertContent);
    alertBox.append(alertElement);
    setTimeout(() => {
      alertElement.remove();
    }, 8000);
  } else {
    secondElement?.remove(secondElement);
    thirdValidation = true;
    inputInRow.style.borderImage = "linear-gradient(rgb(26, 209, 47), rgb(24, 128, 194)) 1"
  }

  let numberInRow = Number(inputInRow.value)
  let numberSize = Number(inputSize.value)

  if (numberInRow > numberSize) {
    fourthValidation = false;
    playButton.disabled = true;
    inputInRow.style.borderImage = 'linear-gradient(rgb(209, 26, 26), rgb(194, 52, 24)) 1';
    const alertContent = document.createTextNode("In-row field can't be greater than Size value.");
    const alertElement = document.createElement('div');
    alertElement.setAttribute('id', '4');
    alertElement.append(alertContent);
    alertBox.append(alertElement);
    setTimeout(() => {
      alertElement.remove();
    }, 8000);
  } else {
    fourthElement?.remove(fourthElement);
    fourthValidation = true;
    inputInRow.style.borderImage = "linear-gradient(rgb(26, 209, 47), rgb(24, 128, 194)) 1"
  }

  if (firstValidation && secondValidation && thirdValidation && fourthValidation) playButton.disabled = false;
}
//============================EVENTS============================//

playButton.addEventListener("click", startTheGame);

endRoundQuery.addEventListener("click", endRound);

const buttonsInsideInput = document.querySelectorAll(".input-section button");
buttonsInsideInput.forEach((button) => {
  button.addEventListener("mousedown", (event) => {
    if (event.currentTarget == buttonsInsideInput[0]) {
      event.currentTarget.style.background = "rgb(209, 209, 209)";
      event.currentTarget.style.color = "black";
      event.currentTarget.setAttribute("clicked", "true");
      buttonsInsideInput[1].style.backgroundColor = "rgb(64, 64, 64)";
      buttonsInsideInput[1].style.color = "white";
      buttonsInsideInput[1].setAttribute("clicked", "false");
    }
    if (event.currentTarget == buttonsInsideInput[1]) {
      event.currentTarget.style.background = "rgb(209, 209, 209)";
      event.currentTarget.style.color = "black";
      event.currentTarget.setAttribute("clicked", "true");
      buttonsInsideInput[0].style.backgroundColor = "rgb(64, 64, 64)";
      buttonsInsideInput[0].style.color = "white";
      buttonsInsideInput[0].setAttribute("clicked", "false");
    }
    if (event.currentTarget == buttonsInsideInput[2]) {
      rows = 3;
      columns = 3;
      inputSize.value = 3;
      SignsInRowToWin = 3;
      inputInRow.value = 3;
      inputInRow.disabled = true;
      playButton.disabled = false;
      generatePlayboard();
      event.currentTarget.style.background = "rgb(209, 209, 209)";
      event.currentTarget.style.color = "black";
      event.currentTarget.setAttribute("clicked", "true");
      buttonsInsideInput[3].style.backgroundColor = "rgb(64, 64, 64)";
      buttonsInsideInput[3].style.color = "white";
      buttonsInsideInput[3].setAttribute("clicked", "false");
    }
    if (event.currentTarget == buttonsInsideInput[3]) {
      inputInRow.disabled = false;
      inputInRow.setAttribute("min", "5");
      generatePlayboard();
      event.currentTarget.style.background = "rgb(209, 209, 209)";
      event.currentTarget.style.color = "black";
      event.currentTarget.setAttribute("clicked", "true");
      buttonsInsideInput[2].style.backgroundColor = "rgb(64, 64, 64)";
      buttonsInsideInput[2].style.color = "white";
      buttonsInsideInput[2].setAttribute("clicked", "false");
    }
  });
});
randomButtons.forEach((button) => {
  button.addEventListener("click", randomNickname);
});
wrapper.addEventListener(`wheel`, zoomBoard);

function zoomBoard(event) {
  event.preventDefault();
  scale += event.deltaY * -0.001;
  scale = Math.min(Math.max(0.125, scale), 5);
  playingBoard.style.transform = `scale(${scale})`;
}
let scale = 1;

function onDrag({ movementX, movementY }) {
  if (!isMouseDown) return;

  let getStyle = window.getComputedStyle(playingBoard);
  let left = parseInt(getStyle.left);
  let top = parseInt(getStyle.top);
  playingBoard.style.left = `${left + movementX}px`;
  playingBoard.style.top = `${top + movementY}px`;
}
playingBoard.addEventListener("mousedown", () => {
  isMouseDown = true;
  movingTimeout = setTimeout(() => {
    queryMovingField.style.display = "flex";
    playingBoard.addEventListener("mousemove", onDrag);
  }, 120);
});
document.addEventListener("mouseup", () => {
  isMouseDown = false;
  clearTimeout(movingTimeout);
  queryMovingField.style.display = "none";
  playingBoard.removeEventListener("mousemove", onDrag);
});

inputPoints.addEventListener("change", validateInputs)
inputInRow.addEventListener("change", validateInputs)

inputSize.addEventListener("change", validateInputs);
endGameQuery.addEventListener("click", () => {
  startingField.style.visibility = "visible"
  startingField.style.opacity = 1;
  endRound()
})

let consoleString = "";
let developerCache, developer;

window.addEventListener("keydown", (event) => {
  const consolePopup = document.querySelector(".console-popup");
  if (event.key == "`") {
    if (consolePopup.style.visibility == "visible") {
      consolePopup.style.visibility = "hidden";
    } else {
      consolePopup.style.visibility = "visible";
    }
  }
  if (consolePopup.style.visibility == "visible") {
    if (event.keyCode >= 49 && event.keyCode <= 90) {
      consoleString += event.key
      consolePopup.innerHTML = consoleString
    }
    if (event.key == "Enter" && consoleString.length > 0) {
      let commandSucceed = false;
      if (consoleString == "developer") {
        commandSucceed = true;
        developer = localStorage['developer'];
        if (developer == "true") {
          localStorage['developer'] = `false`
          const spanTextResponse = document.createElement("span")
          const textResponse = document.createTextNode("Developer mode is toggled OFF.");
          spanTextResponse.append(textResponse);
          consolePopup.append(spanTextResponse);
        } else {
          localStorage['developer'] = `true`
          const spanTextResponse = document.createElement("span")
          const textResponse = document.createTextNode("Developer mode is toggled ON.");
          spanTextResponse.append(textResponse);
          consolePopup.append(spanTextResponse);
        }
        consoleString = "";
        developerMode()
      }
      if (consoleString == "kremowka") {
        commandSucceed = true;
        const spanTextResponse = document.createElement("span")
        const textResponse = document.createTextNode("2137.");
        spanTextResponse.append(textResponse);
        consolePopup.append(spanTextResponse);
        kremowka();
        consoleString = "";
      }
      if (!commandSucceed) {
        const spanTextResponse = document.createElement("span")
        const textResponse = document.createTextNode("Unknown command.");
        spanTextResponse.append(textResponse);
        consolePopup.append(spanTextResponse)
        consoleString = "";
      }
    }
    if (event.key == "Backspace") {
      consoleString = consoleString.slice(0, -1)
      consolePopup.innerHTML = consoleString
    }
  }
})
function developerMode() {
  const countingDown = document.querySelector(".counting-down-field")
  developer = localStorage['developer']
  if (developer == "true") {
    startingField.style.visibility = "hidden"
    countingDown.style.visibility = "hidden"
    whoFirst();
  } else {
    startingField.style.visibility = "visible"
    countingDown.style.visibility = "visible"
  }
  console.log({ turn })
}
function kremowka() {
  const barkaTRAP = new Audio('audio/barkaTRAP.mp3')
  barkaTRAP.volume = 0.2;
  barkaTRAP.play();
  const kremowkaDiv = document.createElement("div")
  kremowkaDiv.setAttribute("class", "kremowka");
  document.body.prepend(kremowkaDiv);

  let id = null;
  let top = -30;

  clearInterval(id);
  id = setInterval(frame, 20);
  function frame() {
    if (top > 100) {
      clearInterval(id);
      document.body.removeChild(kremowkaDiv);
    } else {
      top += 0.5;
      kremowkaDiv.style.top = `${top}vh`;
    }
  }
}

//========================ANIMATIONS========================//

function startingFieldAnim() {
  let id = null;
  let opacity = 100;

  clearInterval(id);
  id = setInterval(frame, 7);
  function frame() {
    if (opacity == 0) {
      clearInterval(id);
      startingField.style.visibility = "hidden";
    } else {
      opacity--;
      startingField.style.opacity = `${opacity}%`;
    }
  }
}
playingBoard.addEventListener("mouseover", ghostSign);
function ghostSign(event) {
  if (event.target.getAttribute("clickID") == "0" && !winner) {
    if (turn == players.player_1.ID) {
      event.target.innerHTML = players.player_1.sign;
    } else {
      event.target.innerHTML = players.player_2.sign;
    }
    event.target.classList.add("square-hover");
    let id = null;
    let opacity = 100;
  }

  playingBoard.addEventListener("mouseout", (event) => {
    if (event.target.getAttribute("clickID") == "0") {
      event.target.innerHTML = "";
    }
    if (!winner) {
      event.target.classList.remove("square-hover");
      endRoundQuery.style.background = "rgba(0, 0, 0, 0.302)";
    }
  });
}