const puzzleGrid = document.querySelector("#puzzleGrid");
const checkAnswer = document.querySelector("#checkAnswers");
const hints = document.querySelector("#hints");
const winnerModal = document.querySelector(`#winnerModal`);
const resetGame = document.querySelector("#resetGame");

const answers = {
  answer1: [
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
  ],
  answer2: [
    [2, 4],
    [3, 4],
    [4, 4],
    [5, 4],
    [6, 4],
  ],
  answer3: [
    [0, 7],
    [1, 7],
    [2, 7],
    [3, 7],
    [4, 7],
  ],
  answer4: [
    [2, 6],
    [2, 7],
    [2, 8],
    [2, 9],
  ],
  answer5: [
    [4, 2],
    [4, 3],
    [4, 4],
    [4, 5],
    [4, 6],
    [4, 7],
  ],
};

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

//check answer
function answerCheck() {
  const rightAnswers = [];

  puzzleGrid.childNodes.forEach((row) => {
    for (let i = 0; i < row.childNodes.length; i++) {
      if (
        row.childNodes[i].dataset.letter ===
        row.childNodes[i].value.toLowerCase()
      ) {
        row.childNodes[i].style.border = "3px solid green";
        row.childNodes[i].style.backgroundColor = "#00ff0050";
        rightAnswers.push(row.childNodes[i]);
      }
    }
  });

  crossOut();

  if (rightAnswers.length === 21) {
    winnerModal.style.display = "block";
  }
}

//reset
function reset() {
  winnerModal.style.display = "none";
  puzzleGrid.childNodes.forEach((row) => {
    for (let i = 0; i < row.childNodes.length; i++) {
      row.childNodes[i].value = ``;
      row.childNodes[i].style.border = "1px solid black";
      if (![...row.childNodes[i].classList].includes("disabled")) {
        row.childNodes[i].style.backgroundColor = "white";
      }
    }
  });

  for (let i = 1; i <= 5; i++) {
    document.querySelector(`#hint${i}`).style.textDecoration = "none";
    document.querySelector(`#hint${i}`).style.color = "black";
  }
}

function simplified(i, j) {
  return (
    puzzleGrid.childNodes[i].childNodes[j].dataset.letter ===
    puzzleGrid.childNodes[i].childNodes[j].value.toLowerCase()
  );
}

function crossOut() {
  const answer1 = answers.answer1.map((pos) => {
    return simplified(pos[0], pos[1]);
  });

  const answer2 = answers.answer2.map((pos) => {
    return simplified(pos[0], pos[1]);
  });

  const answer3 = answers.answer3.map((pos) => {
    return simplified(pos[0], pos[1]);
  });

  const answer4 = answers.answer4.map((pos) => {
    return simplified(pos[0], pos[1]);
  });

  const answer5 = answers.answer5.map((pos) => {
    return simplified(pos[0], pos[1]);
  });

  if (!answer1.includes(false)) {
    document.querySelector("#hint1").style.textDecoration = "line-through";
    document.querySelector("#hint1").style.color = "darkgray";
  }
  if (!answer2.includes(false)) {
    document.querySelector("#hint2").style.textDecoration = "line-through";
    document.querySelector("#hint2").style.color = "darkgray";
  }
  if (!answer3.includes(false)) {
    document.querySelector("#hint3").style.textDecoration = "line-through";
    document.querySelector("#hint3").style.color = "darkgray";
  }
  if (!answer4.includes(false)) {
    document.querySelector("#hint4").style.textDecoration = "line-through";
    document.querySelector("#hint4").style.color = "darkgray";
  }
  if (!answer5.includes(false)) {
    document.querySelector("#hint5").style.textDecoration = "line-through";
    document.querySelector("#hint5").style.color = "darkgray";
  }
}

checkAnswer.addEventListener("click", answerCheck);
resetGame.addEventListener("click", reset);
