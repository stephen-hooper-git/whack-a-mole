'use strict';

const moleGrid = document.getElementById('grid-container');
const startButton = document.getElementById('start-button');
const score = document.getElementById('score');
const finalScores = document.getElementById('final-scores');

const gridItems = { mole: '<img src="./images/mole.png">', blood: '<img src="./images/blood.png">' }

let moleId = document.getElementById('0');
let molesWhacked = 0;
let numberOfRounds = 10;
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
const randomNumber = number => Math.floor(Math.random() * number);
const randomMole = () => moleId = document.getElementById(randomNumber(numberOfMoles).toString());
const setInnerHTML = (elementId, content) => elementId.innerHTML = content;
const clearContent = elementId => elementId.innerHTML = '';

function gameStart() {
    startButton.style.visibility = 'hidden';
    clearContent(score)
    startGame = setInterval(popUp, 2000)
}

function popUp() {
    if (isClicked === false) {updateScore()}
    // Remove previous mole
    moleId.removeEventListener('click', eventHandlerFunction)
    clearContent(moleId)
    // End game when no rounds remaining
    if (numberOfRounds === 0) {
        gameOver()
    }
    randomMole() // Random grid item for mole
    isClicked = false;
    if (numberOfRounds > 0) {
        setInnerHTML(moleId, gridItems.mole) // Display mole
        moleId.addEventListener('click', eventHandlerFunction); // Create event listener
    }
    t0 = performance.now(); // Time mole displayed
    numberOfRounds-- // Decrement number of rounds
}

function eventHandlerFunction() {
    moleId.removeEventListener('click', eventHandlerFunction) // Remove event listener
    isClicked = true;
    t1 = performance.now(); // Time mole removed
    clearContent(moleId) // Remove mole
    setInnerHTML(moleId, gridItems.blood) // Display whacked mole
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

function gameOver() {

    clearInterval(startGame);

    console.log(results)

    // Spread syntax (...)
    console.log(Math.min(...results))
    console.log(Math.max(...results))

    let totalMolesWhacked = document.createElement('div');
    totalMolesWhacked.id = 'totalMolesWhacked'
    totalMolesWhacked.innerHTML = `You whacked ${molesWhacked} moles`;

    let gameOverImage = document.createElement('div');
    gameOverImage.id = 'gameOverImage'
    gameOverImage.innerHTML = '<img src="./images/grave.png">';

    let displayResults = document.createElement('div');
    displayResults.id = 'results'
    displayResults.innerHTML = `Final Score - ${results.reduce(reducer)} milliseconds`;

    let continueButton = document.createElement('button');
    continueButton.id = 'continue'
    continueButton.innerHTML = `Continue`;

    continueButton.setAttribute('onclick', 'continueGame()');

    finalScores.appendChild(totalMolesWhacked);
    finalScores.appendChild(gameOverImage);
    finalScores.appendChild(displayResults);
    finalScores.appendChild(continueButton);

    finalScores.style.visibility = 'visible';

}

function continueGame() {

    clearContent(finalScores)

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
