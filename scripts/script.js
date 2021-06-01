'use strict';

const moleGrid = document.getElementById('grid-container');
const startButton = document.getElementById('start-button');
const score = document.getElementById('score');
const hiScoreTime = document.getElementById('hi-score-time');
const hiScoreMole = document.getElementById('hi-score-mole');

const finalScores = document.getElementById('final-scores');
const totalMolesWhacked = document.getElementById('totalMolesWhacked');
const gameOverImage = document.getElementById('gameOverImage');
const displayResults = document.getElementById('results');
const continueButton = document.getElementById('continue');

const gridItems = { mole: '<img src="./images/mole.png">', blood: '<img src="./images/blood.png">' }

let moleId = document.getElementById('0');
let molesWhacked = 0;
let numberOfRounds = 10;
let results = [];
let startGame;
let isClicked;
let bestTime = 20000;
let bestMole = 2000;

const numberOfMoles = 18;

// Variables for performance.now()
let t0;
let t1;

// Reducer function for array reduce() method
const reducer = (accumulator, currentValue) => accumulator + currentValue;

const arrSum = arr => arr.reduce(reducer) // Return the sum of all values in an array
const arrAvg = arr => arr.reduce(reducer) / arr.length // Return the average of all values in an array

const arrMin = arr => Math.min(...arr) // Return the minimum value in an array using spread syntax (...)
const arrMax = arr => Math.max(...arr) // Return the maximum value in an array using spread syntax (...)

const randomNumber = number => Math.floor(Math.random() * number); // Generate random number

// Arrow functions
const randomGridId = () => moleId = document.getElementById(randomNumber(numberOfMoles).toString());
const setInnerHTML = (elementId, content) => elementId.innerHTML = content;
const clearContent = elementId => elementId.innerHTML = '';

function displayMole() {
    setInnerHTML(moleId, gridItems.mole) // Display mole
    moleId.addEventListener('click', eventHandlerFunction); // Create event listener
    t0 = performance.now(); // Time mole displayed
}

function removeMole() {
    moleId.removeEventListener('click', eventHandlerFunction) // Remove previous mole event listener
    clearContent(moleId) // Remove previous mole image
}

function gameStart() {
    startButton.style.visibility = 'hidden';
    clearContent(score)
    startGame = setInterval(popUp, 2000)
}

function popUp() {
    if (isClicked === false) {updateScore()}
    removeMole()
    if (numberOfRounds === 0) {gameOver()} // End game when no rounds remaining
    randomGridId() // Random grid id for mole
    isClicked = false;
    if (numberOfRounds > 0) {displayMole()}
    numberOfRounds-- // Decrement number of rounds
}

function eventHandlerFunction() {
    removeMole()
    isClicked = true;
    t1 = performance.now(); // Time mole removed
    setInnerHTML(moleId, gridItems.blood) // Display whacked mole
    updateScore()
}

function updateScore() {
    if (isClicked === true) {
        molesWhacked = molesWhacked + 1
        score.innerHTML = `Mole whacked in ${Math.round(t1 - t0)} milliseconds.`
        results.push(Math.round(t1 - t0));
        console.log(`Mole whacked in ${t1 - t0} milliseconds.`);
        if (Math.round(t1 - t0) < bestMole) {
            bestMole = Math.round(t1 - t0)
            setInnerHTML(hiScoreMole, `${bestMole} milliseconds`)
        } 
    }
    if (isClicked === false) {
        score.innerHTML = `Missed! Penalty 2000 milliseconds`
        results.push(2000);
        console.log(`Mole missed 2000 milliseconds.`);
    }
}

function gameOver() {

    clearInterval(startGame);

    console.log(results)

    console.log(arrSum(results))
    console.log(arrAvg(results))
    console.log(arrMin(results))
    console.log(arrMax(results))

    if (arrSum(results) < bestTime) {bestTime = arrSum(results)} // Check for new best time
    if (arrMin(results) < bestMole) {bestMole = arrMin(results)} // Check for new best mole

    totalMolesWhacked.innerHTML = `You whacked ${molesWhacked} moles`;
    gameOverImage.innerHTML = '<img src="./images/grave.png">';
    displayResults.innerHTML = `Final Score - ${results.reduce(reducer)} milliseconds`;
    continueButton.innerHTML = `Continue`;

    finalScores.style.visibility = 'visible';

    setInnerHTML(hiScoreTime, `${bestTime} milliseconds`)
    setInnerHTML(hiScoreMole, `${bestMole} milliseconds`)

}

function continueGame() {

    //clearContent(finalScores)

    moleId = document.getElementById('0');
    molesWhacked = 0;
    numberOfRounds = 10;
    results = [];
    startGame;
    isClicked = true;

    setInnerHTML(score, 'Click start to whack those pesky moles!')

    finalScores.style.visibility = 'hidden';
    
    startButton.style.visibility = 'visible';

}

// Display high scores at the start of the game
setInnerHTML(hiScoreTime, `${bestTime} milliseconds`)
setInnerHTML(hiScoreMole, `${bestMole} milliseconds`)
