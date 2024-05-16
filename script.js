// script.js
document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector(".container");
    const words = document.querySelector('.words');
    const wordContainer = document.getElementById('word-container');
    const hintContainer = document.getElementById('hint');
    let incorrectGuesses = 0;
    let correctGuess = 0;
    let manimg = document.querySelector('.manimg');
    let arr = ["head.png", "b.png", "h1.png", "h2.png", "l1.png", "end.png"];
    let word = "";
    let hint = "";

    // Function to create dashes for the word
    function createDashes(word) {
        wordContainer.innerHTML = ''; // Clear any previous content
        for (let i = 0; i < word.length; i++) {
            const dash = document.createElement('div');
            dash.classList.add('letter');
            wordContainer.appendChild(dash);
        }
    }

    // Function to start the game
    window.startGame = function() {
        word = document.getElementById('word-input').value.toLowerCase();
        hint = document.getElementById('hint-input').value;

        if (!word || !hint) {
            alert('Please enter both a word and a hint.');
            return;
        }

        createDashes(word);
        hintContainer.innerText = `Hint: ${hint}`;
        
        document.getElementById('input-container').classList.add('hidden');
        document.getElementById('game-container').classList.remove('hidden');
    };

    document.addEventListener('keypress', (event) => {
        if (document.getElementById('game-container').classList.contains('hidden')) {
            return;
        }

        words.innerHTML += ` ${event.key}`;
        const letter = event.key.toLowerCase();

        if (word.includes(letter) && incorrectGuesses < 6) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === letter) {
                    wordContainer.children[i].textContent = letter;
                    correctGuess++;
                }
            }
        } else {
            if (incorrectGuesses < 6) {
                manimg.src = arr[incorrectGuesses];
                incorrectGuesses++;
            } else if (incorrectGuesses == 6) {
                main.style.backgroundColor = "red";
                document.getElementById('end-container').classList.remove('hidden');
                document.getElementById('game-container').classList.add('hidden');
                document.querySelector('.status').innerText="You Lost"
            }
        }

        if (correctGuess == word.length) {
            main.style.backgroundColor = "green";
            document.getElementById('end-container').classList.remove('hidden');
            document.getElementById('game-container').classList.add('hidden');
            document.querySelector('.status').innerText="You Won"
        }
    });
});
