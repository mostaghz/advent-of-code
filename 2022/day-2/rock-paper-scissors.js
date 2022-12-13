// PART 1

let sampleInput = `A Y
B X
C Z`;

/*
A is rock
B is paper
C is scissors

X is rock (1 point)
Y is paper (2 points)
Z is scissors (3 points)
*/

let sumReducer = (sum, num) => sum + num;

// write a function to get the game score and move score of a game
let sampleGame = 'A Y';

// // use when testing in the browser... sampleInput on 59 is now puzzleInput
const summonPuzzleInput = async (day) => {
    let response = await fetch("https://adventofcode.com/2022/day/2/input");
    let responseText = await response.text();
    return responseText.trim();
};

let puzzleInput = await summonPuzzleInput();


// look up tables - simpler than lots of if else statements
let gameValues = {
    A: {X: 3, Y: 6, Z: 0},
    B: {X: 0, Y: 3, Z: 6},
    C: {X: 6, Y: 0, Z: 3}
};

let moveValues = {X: 1, Y: 2, Z: 3};

let getTheScore = (game) => {
    // destructuring and more direct assignment
    let [opponentMove, yourMove] = game.split(" ");

    // get the game score (win, lose, or draw)
    let gameScore = gameValues[opponentMove][yourMove];

    // get the move score
    let moveScore = moveValues[yourMove];

    // add them up
    return gameScore + moveScore;

    // property value shorthand - use with objects when key and value are the same (used before look up table happened)
    // return { opponentMove, yourMove}
};

// get the scores of all the games
let games = puzzleInput.split("\n");
let scores = games.map(getTheScore);

// add them all up
let totalScore = scores.reduce(sumReducer, 0);


// PART 2

/*
X is lose
Y is draw
Z is win
*/

// more look up tables
let requiredMoves = {
    A: {X: "S", Y: "R", Z: "P"},
    B: {X: "R", Y: "P", Z: "S"},
    C: {X: "P", Y: "S", Z: "R"}
};

let actualMoveValues = {R: 1, P: 2, S: 3};

let actualGameValues = {X: 0, Y: 3, Z: 6};

let getTheActualScore = (game) => {
    let [opponentMove, gameOutcome] = game.split(" ");

    // find which move needs to be played
    let yourMove = requiredMoves[opponentMove][gameOutcome];

    // get the game score
    let gameScore = actualGameValues[gameOutcome];

    // get the move score
    let moveScore = actualMoveValues[yourMove];

    // add them up
    return gameScore + moveScore
};

let actualScores = games.map(getTheActualScore);
let actualTotalScore = actualScores.reduce(sumReducer, 0)

console.log(actualTotalScore)

// browser console shows 11475 for part 1
// browser console shows 16862 for part 2