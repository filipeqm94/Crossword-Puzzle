const grid = [
  [`R1`, `E2`, `I3`, `D4`, ``],
  [`B5`, `A`, `K`, `U`, ``],
  [`G6`, `R`, `E`, `E`, `N7`],
  [``, `L8`, `E`, `T`, `O`],
  [``, `S9`, `P`, `O`, `T`],
];

const puzzle = document.querySelector(`#puzzle`);
const checkButton = document.querySelector("#checkButton");
const clues = document.querySelectorAll("li.clue");

const winnerModal = document.querySelector("#modal");

const cells = [];

let currentCell;

const rows = grid.length;
const columns = grid[0].length;

puzzle.style.gridTemplate = `repeat(${rows}, 74px) / repeat(${columns}, 74px)`;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    const cell = document.createElement(`div`);

    if (grid[i][j] !== ``) {
      if (grid[i][j].length > 1) {
        const clueNumber = document.createElement(`sup`);
        clueNumber.textContent = grid[i][j][1];
        clueNumber.classList.add(`clueNumber`);

        cell.appendChild(clueNumber);

        grid[i][j] = grid[i][j][0];
      }
      cell.classList.add("cell");

      const letter = document.createElement("span");
      letter.classList.add("letter");

      cell.appendChild(letter);

      if (grid[i][j - 1] || grid[i][j + 1]) {
        cell.setAttribute(`data-across-clue`, `across${i + 1}`);
      }
      if (grid[i - 1] || grid[i + 1]) {
        cell.setAttribute(`data-down-clue`, `down${j + 1}`);
      }

      cell.setAttribute(`id`, `${i}-${j}`);

      //set directionals
      //up
      if (grid[i - 1] && grid[i - 1][j] !== ``) {
        cell.setAttribute(`data-up`, `${i - 1}-${j}`);
      }
      //right
      if (grid[i][j + 1]) {
        cell.setAttribute(`data-right`, `${i}-${j + 1}`);
      }
      //down
      if (grid[i + 1] && grid[i + 1][j] !== ``) {
        cell.setAttribute(`data-down`, `${i + 1}-${j}`);
      }
      //left
      if (grid[i][j - 1]) {
        cell.setAttribute(`data-left`, `${i}-${j - 1}`);
      }

      cells.push(cell);
    } else {
      cell.classList.add("disabled");
    }

    puzzle.appendChild(cell);
  }
}

currentCell = cells[0];

function keyEvents(event) {
  const key = event.code;
  currentCellLetter = currentCell.querySelector(`.letter`);

  showDirections();

  if (key.includes(`Key`)) {
    currentCellLetter.textContent = key.replace(`Key`, ``);

    currentCellLetter.style.color = `black`;

    if (currentCell.dataset.right) {
      currentCell = document.getElementById(`${currentCell.dataset.right}`);
      showDirections();
    } else if (currentCell.dataset.down) {
      currentCell = document.getElementById(`${currentCell.dataset.down}`);
      showDirections();
    }
  }

  if (key === `Backspace` || key === `Delete`) {
    currentCellLetter.textContent = ``;
  }

  if (key === `ArrowUp` && currentCell.dataset.up) {
    currentCell = document.getElementById(`${currentCell.dataset.up}`);
    showDirections();
  } else if (key === `ArrowRight` && currentCell.dataset.right) {
    currentCell = document.getElementById(`${currentCell.dataset.right}`);
    showDirections();
  } else if (key === `ArrowDown` && currentCell.dataset.down) {
    currentCell = document.getElementById(`${currentCell.dataset.down}`);
    showDirections();
  } else if (key === `ArrowLeft` && currentCell.dataset.left) {
    currentCell = document.getElementById(`${currentCell.dataset.left}`);
    showDirections();
  }
}

function showDirections() {
  const acrossClue = currentCell.dataset.acrossClue;
  const downClue = currentCell.dataset.downClue;

  cells.forEach((cell) => {
    if (
      cell.dataset.acrossClue === acrossClue ||
      cell.dataset.downClue === downClue
    ) {
      cell.style.backgroundColor = `yellow`;
    } else {
      cell.style.backgroundColor = `#fff`;
    }
  });

  currentCell.style.backgroundColor = "lightblue";
}

function checkAnswers() {
  const rightGuesses = [];

  cells.forEach((cell) => {
    const [posX, posY] = cell.id.split("-");
    const answer = grid[+posX][+posY];
    const letter = cell.querySelector(".letter");

    if (answer === letter.textContent) {
      letter.style.color = `green`;
      rightGuesses.push(cell);
    } else {
      letter.style.color = `red`;
    }
  });

  if (rightGuesses.length === cells.length) {
    winnerModal.style.display = "flex";
  }
}

function changeByClick(event) {
  const parentNode = event.target.parentNode;

  if ([...parentNode.classList].includes(`cell`)) {
    currentCell = parentNode;
    showDirections();
  } else {
    currentCell = event.target;
    showDirections();
  }
}

cells.forEach((cell) => cell.addEventListener(`click`, changeByClick));

document.addEventListener(`keydown`, keyEvents);
checkButton.addEventListener(`click`, checkAnswers);

showDirections();
