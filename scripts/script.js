'use strict';

const moleGrid = document.getElementById('grid-container');
const startButton = document.getElementById('start-button');
const score = document.getElementById('score');

const gridItems = { mole: '<img src="./images/mole.png">', blood: '<img src="./images/blood.png">' }

let molesWhacked = 0;
let numberOfRounds = 10;
let currentMole = '0';
let results = [];
let startGame;
let isClicked;

const numberOfMoles = 16;

// Variables for performance.now()
let t0;
let t1;

// Reducer function for array reduce() method
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// Arrow functions
const generateRandomNumber = number => Math.floor(Math.random() * number);
const displayGridItem = (elementId, gridItem) => document.getElementById(elementId).innerHTML = gridItem;
const clearGridItem = elementId => document.getElementById(elementId).innerHTML = '';

function beginGame() {
    document.body.removeChild(startButton);
    startGame = setInterval(popUp, 2000)
}

function popUp() {
    if (isClicked === false) {updateScore()}
    // Remove previous mole
    document.getElementById(currentMole).removeEventListener('click', eventHandlerFunction)
    clearGridItem(currentMole)
    // End game when no rounds remaining
    if (numberOfRounds === 0) {
        endGame()
    }
    // Generate random mole
    let moleHole = generateRandomNumber(numberOfMoles).toString();
    currentMole = moleHole
    isClicked = false;
    if (numberOfRounds > 0) {
        // Display random mole and create event listener
        displayGridItem(moleHole, gridItems.mole)
        document.getElementById(moleHole).addEventListener('click', eventHandlerFunction);
    }
    t0 = performance.now(); // Time mole displayed
    numberOfRounds-- // Decrement number of rounds
}

function eventHandlerFunction() {
    // Remove event listener
    document.getElementById(currentMole).removeEventListener('click', eventHandlerFunction)
    isClicked = true;
    t1 = performance.now(); // Time mole removed
    clearGridItem(currentMole) // Remove mole
    displayGridItem(currentMole, gridItems.blood) // Display whacked mole
    updateScore()
}

function updateScore() {
    if (isClicked === true) {
        molesWhacked = molesWhacked + 1
        score.innerHTML = `Mole whacked in ${Math.round(t1 - t0)} milliseconds.`
        results.push(Math.round(t1 - t0));
        console.log(`Mole whacked in ${t1 - t0} milliseconds.`);
    }
    if (isClicked === false) {
        score.innerHTML = `Missed!`
        results.push(2000);
        console.log(`Mole missed 2000 milliseconds.`);
    }
}

function endGame() {

    clearInterval(startGame);

    console.log(results)

    // Spread syntax (...)
    console.log(Math.min(...results))
    console.log(Math.max(...results))

    document.body.removeChild(score);
    document.body.removeChild(moleGrid);

    let totalMolesWhacked = document.createElement('div');
    totalMolesWhacked.id = 'totalMolesWhacked'
    totalMolesWhacked.innerHTML = `You whacked ${molesWhacked} moles`;

    let gameOverImage = document.createElement('div');
    gameOverImage.id = 'gameOverImage'
    gameOverImage.innerHTML = '<img src="./images/grave.png">';

    let displayResults = document.createElement('div');
    displayResults.id = 'results'
    displayResults.innerHTML = `Final Score - ${results.reduce(reducer)} milliseconds`;

    document.body.appendChild(totalMolesWhacked);
    document.body.appendChild(gameOverImage);
    document.body.appendChild(displayResults);
}
