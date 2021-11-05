const puzzleGrid = document.querySelector("#puzzleGrid");

for (let i = 0; i < 25; i++) {
  const cell = document.createElement("input");
  //temporary
  if (i > 5) {
    cell.setAttribute("maxlength", "1");
  } else {
    cell.setAttribute("disabled", true);
    cell.style.backgroundColor = "black";
  }
  //temporary
  cell.classList.add("cell");

  puzzleGrid.appendChild(cell);
}
