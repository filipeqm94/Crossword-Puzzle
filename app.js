const puzzleGrid = document.querySelector("#puzzleGrid");

//create a loop to create the amount of rows needed for the puzzle board
for (let i = 0; i < 7; i++) {
  //create row
  const row = document.createElement("div");
  row.classList.add("row"); // add .row styles to row
  //create a loop for the amount of columns each row will have
  for (let j = 0; j < 10; j++) {
    //create column
    const column = document.createElement("input");

    column.setAttribute("maxlength", "1"); //add limit to input
    column.classList.add("cell"); //add .cell styles to column

    //add data set with the value of the letter to cells that will be available
    addDataSet(i, j, column);

    //disable cells with no data set
    if (!column.dataset.letter) {
      column.classList.add("disabled");
    }

    //append column to row
    row.appendChild(column);
  }
  //append row to grid
  puzzleGrid.appendChild(row);
}

function addDataSet(i, j, element) {
  //hello
  if (i === 3 && j === 0) {
    element.setAttribute("data-letter", "h");
    element.setAttribute("placeholder", "1");
  } else if (i === 3 && j === 1) {
    element.setAttribute("data-letter", "e");
  } else if (i === 3 && j === 2) {
    element.setAttribute("data-letter", "l");
  } else if (i === 3 && j === 3) {
    element.setAttribute("data-letter", "l");
  } else if (i === 3 && j === 4) {
    element.setAttribute("data-letter", "o");
  }

  //world
  else if (i === 2 && j === 4) {
    element.setAttribute("data-letter", "w");
    element.setAttribute("placeholder", "2");
  } else if (i === 4 && j === 4) {
    element.setAttribute("data-letter", "r");
  } else if (i === 5 && j === 4) {
    element.setAttribute("data-letter", "l");
  } else if (i === 6 && j === 4) {
    element.setAttribute("data-letter", "d");
  }

  //react
  else if (i === 0 && j === 7) {
    element.setAttribute("data-letter", "r");
    element.setAttribute("placeholder", "3");
  } else if (i === 1 && j === 7) {
    element.setAttribute("data-letter", "e");
  } else if (i === 2 && j === 7) {
    element.setAttribute("data-letter", "a");
  } else if (i === 3 && j === 7) {
    element.setAttribute("data-letter", "c");
  } else if (i === 4 && j === 7) {
    element.setAttribute("data-letter", "t");
  }

  //java
  else if (i === 2 && j === 6) {
    element.setAttribute("data-letter", "j");
    element.setAttribute("placeholder", "4");
  } else if (i === 2 && j === 8) {
    element.setAttribute("data-letter", "v");
  } else if (i === 2 && j === 9) {
    element.setAttribute("data-letter", "a");
  }

  //script
  else if (i === 4 && j === 2) {
    element.setAttribute("data-letter", "s");
    element.setAttribute("placeholder", "5");
  } else if (i === 4 && j === 3) {
    element.setAttribute("data-letter", "c");
  } else if (i === 4 && j === 5) {
    element.setAttribute("data-letter", "i");
  } else if (i === 4 && j === 6) {
    element.setAttribute("data-letter", "p");
  }
}
