const puzzleGrid = document.querySelector("#puzzleGrid");

for (let i = 0; i < 25; i++) {
  const cell = document.createElement("input");
  cell.classList.add("cell");

  puzzleGrid.appendChild(cell);
}
