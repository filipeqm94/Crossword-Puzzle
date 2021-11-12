// puzzle grid
const grid = [
  [`R1`, `E2`, `I3`, `D4`, ``],
  [`B5`, `A`, `K`, `U`, ``],
  [`G6`, `R`, `E`, `E`, `N7`],
  [``, `L8`, `E`, `T`, `O`],
  [``, `S9`, `P`, `O`, `T`],
];

// variables
// const
const puzzle = document.querySelector(`#puzzle`);
const checkButton = document.querySelector("#checkButton");
const clues = document.querySelectorAll("li.clue");
const winnerModal = document.querySelector(`#modal`);
const resetButton = document.querySelector(`#gameReset`);

const cells = [];

const rows = grid.length;
const columns = grid[0].length;

//changeables
let currentCell;

//functions
//arrowkey navigation
function keyEvents(event) {
  //grab key event
  const key = event.code;
  currentCellLetter = currentCell.querySelector(`.letter`);

  showDirections();

  if (key.includes(`Key`)) {
    //set letter to key pressed
    currentCellLetter.textContent = key.replace(`Key`, ``);

    //set colot back to black if color was different (for when user changes the their guess after pressing check answer)
    currentCellLetter.style.color = `black`;

    //auto move current cell to the next one after it has been populated
    if (currentCell.dataset.right) {
      currentCell = document.getElementById(`${currentCell.dataset.right}`);
      showDirections();
    }
    // else if (currentCell.dataset.down) {
    //   currentCell = document.getElementById(`${currentCell.dataset.down}`);
    //   showDirections();
    // }
  } else if (key === `Backspace` || key === `Delete`) {
    //delete leter if backspace or delete are pressed
    currentCellLetter.textContent = ``;
  } else if (key === `ArrowUp` && currentCell.dataset.up) {
    //checks if cell has directional and move current cell to specified direction
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

//format the board to show the across and down
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

//check answers
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

  //cross out corret clues
  //across
  const acrosses = [
    autoFilter(`across`, 1),
    autoFilter(`across`, 2),
    autoFilter(`across`, 3),
    autoFilter(`across`, 4),
    autoFilter(`across`, 5),
  ];

  const acrossCompare = [];

  for (let i = 0; i < acrosses.length; i++) {
    acrossCompare.push(
      acrosses[i].filter((cell) => {
        const [posX, posY] = cell.id.split("-");
        const answer = grid[+posX][+posY];
        const letter = cell.querySelector(".letter");

        if (answer === letter.textContent) {
          return cell;
        }
      })
    );
  }

  for (let i = 0; i < acrosses.length; i++) {
    const clue = [...clues].filter(
      (clue) => clue.dataset.clue === `across${i + 1}`
    )[0];

    if (acrossCompare[i].length === acrosses[i].length) {
      clue.classList.add(`complete`);
    } else {
      clue.classList.remove(`complete`);
    }
  }

  //down
  const downs = [
    autoFilter(`down`, 1),
    autoFilter(`down`, 2),
    autoFilter(`down`, 3),
    autoFilter(`down`, 4),
    autoFilter(`down`, 5),
  ];

  const downCompare = [];

  for (let i = 0; i < downs.length; i++) {
    downCompare.push(
      downs[i].filter((cell) => {
        const [posX, posY] = cell.id.split("-");
        const answer = grid[+posX][+posY];
        const letter = cell.querySelector(".letter");

        if (answer === letter.textContent) {
          return cell;
        }
      })
    );
  }

  for (let i = 0; i < downs.length; i++) {
    const clue = [...clues].filter(
      (clue) => clue.dataset.clue === `down${i + 1}`
    )[0];

    if (downCompare[i].length === downs[i].length) {
      clue.classList.add(`complete`);
    } else {
      clue.classList.remove(`complete`);
    }
  }
}

//filter function
function autoFilter(direc, num) {
  let direction = ``;
  switch (direc) {
    case `across`: {
      direction = direc;
    }
    case `down`: {
      direction = direc;
    }
  }

  return [...cells].filter(
    (cell) => cell.dataset[`${direction}Clue`] === `${direction}${num}`
  );
}

//reset functionality
function resetGame() {
  cells.forEach((cell) => {
    cell.querySelector(`.letter`).textContent = ``;
  });

  clues.forEach((clue) => {
    clue.classList.remove(`complete`);
  });

  winnerModal.style.display = `none`;

  currentCell = cells[0];
  showDirections();
}

//change curremt cell by click
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

//script
//add grid template to board
puzzle.style.gridTemplate = `repeat(${rows}, 74px) / repeat(${columns}, 74px)`;

//adding letter + disabled cells
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    //create cell
    const cell = document.createElement(`div`);

    //add proprierties to valid cells
    if (grid[i][j] !== ``) {
      //checks if cell has a number associated with it
      if (grid[i][j].length > 1) {
        //add clue number to cell
        const clueNumber = document.createElement(`sup`);
        clueNumber.textContent = grid[i][j][1];
        clueNumber.classList.add(`clueNumber`);

        cell.appendChild(clueNumber);

        //separate number and letter
        grid[i][j] = grid[i][j][0];
      }
      cell.classList.add("cell");

      //create letter span
      const letter = document.createElement("span");
      letter.classList.add("letter");

      cell.appendChild(letter);

      //adds across clue attribute to cells that have at least one valid cell next to it
      if (grid[i][j - 1] || grid[i][j + 1]) {
        cell.setAttribute(`data-across-clue`, `across${i + 1}`);
      }
      //adds down clue attribute to cells that have at least one valid cell above or below it
      if (grid[i - 1] || grid[i + 1]) {
        cell.setAttribute(`data-down-clue`, `down${j + 1}`);
      }

      //git it their id associated with the position on the grid
      cell.setAttribute(`id`, `${i}-${j}`);

      //set directionals data to cells if they have cells around them
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

//set current cell to the first cell in the grid
currentCell = cells[0];

cells.forEach((cell) => cell.addEventListener(`click`, changeByClick));

document.addEventListener(`keydown`, keyEvents);
checkButton.addEventListener(`click`, checkAnswers);

resetButton.addEventListener(`click`, resetGame);

showDirections();
