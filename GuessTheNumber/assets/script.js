document.addEventListener('DOMContentLoaded', () => {
    // Game state variables
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    let guessCount = 0;
    const maxGuesses = 10;
    let previousGuesses = [];
    
    // DOM elements
    const guessInput = document.querySelector('.guessField');
    const guessSubmit = document.querySelector('.guessSubmit');
    const guessesDisplay = document.querySelector('.guesses');
    const lastResultDisplay = document.querySelector('.lastResult');
    const lowOrHiDisplay = document.querySelector('.lowOrHi');
    
    // Initialize game
    function initGame() {
        guessInput.value = '';
        lastResultDisplay.textContent = maxGuesses;
        guessesDisplay.textContent = '';
        lowOrHiDisplay.textContent = '';
        guessInput.focus();
    }
    
    // Check the user's guess
    function checkGuess() {
        const userGuess = Number(guessInput.value);
        
        // Input validation
        if (!userGuess || userGuess < 1 || userGuess > 100) {
            lowOrHiDisplay.textContent = 'Please enter a valid number between 1 and 100';
            lowOrHiDisplay.style.color = '#d9534f';
            guessInput.value = '';
            return;
        }
        
        guessCount++;
        previousGuesses.push(userGuess);
        
        // Update UI
        guessesDisplay.textContent = previousGuesses.join(', ');
        lastResultDisplay.textContent = maxGuesses - guessCount;
        
        // Check if guess is correct
        if (userGuess === randomNumber) {
            endGame(true);
            return;
        }
        
        // Check if game over
        if (guessCount >= maxGuesses) {
            endGame(false);
            return;
        }
        
        // Provide feedback
        if (userGuess < randomNumber) {
            lowOrHiDisplay.textContent = 'Too low! Try a higher number.';
            lowOrHiDisplay.style.color = '#5bc0de';
        } else {
            lowOrHiDisplay.textContent = 'Too high! Try a lower number.';
            lowOrHiDisplay.style.color = '#5bc0de';
        }
        
        // Clear input and focus for next guess
        guessInput.value = '';
        guessInput.focus();
    }
    
    // End game handler
    function endGame(isWin) {
        guessInput.disabled = true;
        guessSubmit.disabled = true;
        
        if (isWin) {
            lowOrHiDisplay.textContent = `Congratulations! You guessed the number ${randomNumber} in ${guessCount} tries!`;
            lowOrHiDisplay.style.color = '#5cb85c';
            animateWin();
        } else {
            lowOrHiDisplay.textContent = `Game over! The number was ${randomNumber}.`;
            lowOrHiDisplay.style.color = '#d9534f';
        }
        
        // Add reset button
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Play Again';
        resetButton.className = 'resetButton';
        resetButton.addEventListener('click', resetGame);
        lowOrHiDisplay.insertAdjacentElement('afterend', resetButton);
    }
    
    // Reset game
    function resetGame() {
        // Reset game state
        randomNumber = Math.floor(Math.random() * 100) + 1;
        guessCount = 0;
        previousGuesses = [];
        
        // Reset UI
        guessInput.disabled = false;
        guessSubmit.disabled = false;
        document.querySelector('.resetButton')?.remove();
        initGame();
    }
    
    // Simple win animation
    function animateWin() {
        const element = lowOrHiDisplay;
        element.style.transform = 'scale(1.1)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Event listeners
    guessSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        checkGuess();
    });
    
    guessInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            checkGuess();
        }
    });
    
    // Initialize game on load
    initGame();
});