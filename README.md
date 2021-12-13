# 2048 CLONE

## About
This is my take on the IOS game 2048. I created this app as a project for my [portfolio](https://philaung96.github.io/) as well as to get myself more practice on frontend, and a basic game logic. I chose to make a clone of this game as I fairly enjoy playing it myself. 

## Tools
- HTML
- CSS
- Javascript
- React.js
- JQuery

## Addition Libraries
- FontAwesome

## Component Tree
- App
    - Game
        - Grid
        - Arrows
        - Instruction

## Pseudocode
- Check user input from keyboard, or a click onto arrow icons
    - If arrow keys are entered or arrow icons are clicked,
        - move the grid accordingly
        - generate a number on empty tile if there is a movement
        - game over if all the tiles are populated, and no movement is possible 
    - If any other key not arrows are pressed, do nothing

### Movement (Right)
- Iterate rows top to bottom
- Iterate cols right to left excluding the first col
    - For each col, check if theres a number on left
        - If there is a number on left
            - Check if current is 0
                - if current is 0, move the number on left to current, and stay at same position
            - If current is not 0, and a number, move the number on left to one position left of current
        - If no number on left, do nothing

### Moving Left, Down, and Up
- Movement to left, down, and up are almost identical to moving right except 
    - on left, check the cols left to right excluding the last, and check whether there is a number on right
    - on down, and up check cols left to right first, then
        - on down, check rows bottom to top excluding the top row, and check for number on top of current
        - on bottom, check rows top to bottom excluding the bottom row, and check for number underneath of current 

## Design Choice

I chose to have the tiles as a 1D array instead of 2D and render them on 2D using CSS Grid. The iteration of tiles are done using 2D structure, thus I converted row and col variables into one D index this way.

```js
const oneDIndex = (row, col) => {
    return row * 4 + col;
};
```
