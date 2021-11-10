const grid = [
  [`R1`, `E2`, `I3`, `D4`, ``],
  [`B5`, `A`, `K`, `U`, ``],
  [`G6`, `R`, `E`, `E`, `N7`],
  [``, `L8`, `E`, `T`, `O`],
  [``, `S9`, `P`, `O`, `T`],
];

const puzzle = document.querySelector(`#puzzle`);
const clues = document.querySelectorAll("li.clue");

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
        const clueNumber = document.createElement(`span`);
        clueNumber.innerText = grid[i][j][1];
        cell.appendChild(clueNumber);

        grid[i][j] = grid[i][j][0];
      }
      cell.classList.add("cell");

      if (grid[i][j - 1] || grid[i][j + 1]) {
        cell.setAttribute(`data-acrossClue`, `across${i + 1}`);
      }
      if (grid[i - 1] || grid[i + 1]) {
        cell.setAttribute(`data-downClue`, `down${j + 1}`);
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
