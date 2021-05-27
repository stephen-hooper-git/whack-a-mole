'use strict';

const moleGrid = document.getElementById('grid-container');
const startButton = document.getElementById('start-button');
const score = document.getElementById('score');
const hiScoreTime = document.getElementById('hi-score-time');
const hiScoreMole = document.getElementById('hi-score-mole');
const finalScores = document.getElementById('final-scores');

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

// Arrow functions
const randomNumber = number => Math.floor(Math.random() * number);
const randomMole = () => moleId = document.getElementById(randomNumber(numberOfMoles).toString());
const setInnerHTML = (elementId, content) => elementId.innerHTML = content;
const clearContent = elementId => elementId.innerHTML = '';

// Reducer function for array reduce() method
const reducer = (accumulator, currentValue) => accumulator + currentValue;

const arrSum = arr => arr.reduce(reducer) // Return the sum of all values in an array
const arrAvg = arr => arr.reduce(reducer) / arr.length // Return the average of all values in an array

const arrMin = arr => Math.min(...arr) // Return the minimum value in an array using spread syntax (...)
const arrMax = arr => Math.max(...arr) // Return the maximum value in an array using spread syntax (...)

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
    console.log(t0)
    numberOfRounds-- // Decrement number of rounds
}

function eventHandlerFunction() {
    moleId.removeEventListener('click', eventHandlerFunction) // Remove event listener
    isClicked = true;
    t1 = performance.now(); // Time mole removed
    console.log(t1)
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

    console.log(`Min - ${arrMin(results)}`)
    console.log(`Max - ${arrMax(results)}`)
    console.log(`Sum - ${arrSum(results)}`)
    console.log(`Avg - ${arrAvg(results)}`)

    if (results.reduce(reducer) < bestTime) {
        bestTime = results.reduce(reducer)
    }

    if (Math.min(...results) < bestMole) {
        bestMole = Math.min(...results)
    }

    console.log(bestTime)
    console.log(bestMole)

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

    setInnerHTML(hiScoreTime, `${bestTime} milliseconds`)
    setInnerHTML(hiScoreMole, `${bestMole} milliseconds`)

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

// Display high scores at the start of the game
setInnerHTML(hiScoreTime, `${bestTime} milliseconds`)
setInnerHTML(hiScoreMole, `${bestMole} milliseconds`)
