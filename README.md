## Project 1 - Crossword Puzzle

## Project Description

> Classic newspaper crossword puzzle. User reads hints and fill each cell with a letter in an attempt to get the correct word. Words with the same letter cell can overlap each other.

## Wire Frames

> ![Screen Shot 2021-11-04 at 7 43 25 PM](https://media.git.generalassemb.ly/user/39433/files/86150500-3da7-11ec-8b44-e24ee4742d5c) > ![Screen Shot 2021-11-04 at 7 11 12 PM](https://media.git.generalassemb.ly/user/39433/files/038a4680-3da3-11ec-951a-21aae112bbfa)

## User Stories

As a user I want to:

> 1. Be able to read hints to the words I need to fill in the available spaces
> 1. Be able to insert characters on the cells that are available.
> 1. See a winner message when I get all the guesses correctly

### MVP Goals

- [x] Draw a NxM grid where the words will be placed.
- [x] Display a list of hints for each word on the side of the puzzle.
- [x] User should be able to insert only one character on available cells, but should NOT be able to insert characters inside unavailable cells.
- [x] Assign each available cell with a letter
- [x] Multiple words should be able to use the same cell for the letter they have in common.
- [x] Enumerate starter cell with hint number
- [ ] Check if the sequence of letters correspond to right answer assigned when "Check Answer" button is clicked.
- [ ] Cross out hint when users guesses the right answer after clicking the "Check Answer" button.
- [ ] Display winner message when all guesses are correct

### Stretch Goals

- [ ] Add "Easy", "Normal" and "Hard" difficulties.
- [ ] Remove button to check answers on "Normal" and "Hard" difficulties.
  - [ ] Add "Cheat" option when playing on "Easy" difficulty.
    - [ ] Display answers upside down below the puzzle when "Cheat" button is clicked.
  - [ ] Display correct answers on "Normal" when all the cells are filled.
  - [ ] Give player a "Retry" option and clear all guesses on "Hard" if not all of the answers are correct.
- [ ] Place words randomly inside the puzzle each time the page is loaded.
- [ ] Add "Topics" using API calls to some sort of "Fun Fact API" (if I can find a free one 🤣 ).
