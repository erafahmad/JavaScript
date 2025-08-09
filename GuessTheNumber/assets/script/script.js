document.addEventListener('DOMContentLoaded', function() {
    // Generate a random number between 1 and 100
    let randomNumber = Math.floor(Math.random() * 100) + 1;

    const submit = document.querySelector('#subt');
    const userInput = document.querySelector('#guessField');
    const guessSlot = document.querySelector('.guesses');
    const remaining = document.querySelector('.lastResult');
    const lowOrHi = document.querySelector('.lowOrHi');
    const resultParas = document.querySelector('.resultParas');

    const p = document.createElement('p');

    let prevGuess = [];
    let numGuess = 1;
    let playGame = true;

    if (playGame) {
        submit.addEventListener('click', function(e) {
            e.preventDefault();
            const guess = parseInt(userInput.value);
            validateGuess(guess);
        });
    }

    function validateGuess(guess) {
        if (isNaN(guess)) {
            alert('Please enter a valid number between 1 and 100.');
        } else if (guess < 1) {
            alert('Please enter a number greater than 0.');
        } else if (guess > 100) {
            alert('Please enter a number less than 100.');
        } else {
            prevGuess.push(guess);
            if (numGuess >= 10) {
                displayGuess(guess);
                displayMessage(`Game Over! The number was ${randomNumber}.`);
                endGame();
            } else {
                displayGuess(guess);
                checkGuess(guess);
            }
        }
    }

    function checkGuess(guess) {
        if (guess === randomNumber) {
            displayMessage(`Congratulations! ${guess} is the correct number!`);
            endGame();
        } else if (guess < randomNumber) {
            displayMessage(`${guess} is too low!`);
        } else {
            displayMessage(`${guess} is too high!`);
        }
    }

    function displayGuess(guess) {
        userInput.value = '';
        guessSlot.textContent += `${guess} `;
        numGuess++;
        remaining.textContent = `${11 - numGuess}`;
    }

    function displayMessage(message) {
        lowOrHi.innerHTML = `<h2>${message}</h2>`;
    }

    function endGame() {
        userInput.value = '';
        userInput.setAttribute('disabled', '');
        p.classList.add('button');
        p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
        resultParas.appendChild(p);
        playGame = false;
        newGame();
    }

    function newGame() {
        const newGameButton = document.querySelector('#newGame');
        newGameButton.addEventListener('click', function(e) {
            randomNumber = Math.floor(Math.random() * 100) + 1;
            prevGuess = [];
            numGuess = 1;
            guessSlot.textContent = '';
            remaining.textContent = '10';
            userInput.removeAttribute('disabled');
            resultParas.removeChild(p);
            lowOrHi.textContent = '';
            playGame = true;
        });
    }
});