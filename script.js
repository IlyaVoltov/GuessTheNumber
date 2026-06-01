// Объект игры с использованием ES6
const game = {
    secretNumber: null,
    attempts: 0,
    maxAttempts: 10,

    startGame() {
        this.secretNumber = Math.floor(Math.random() * 100) + 1;
        this.attempts = 0;

        this.updateAttemptsDisplay();

        const messageContainer = document.getElementById('message-container');
        messageContainer.textContent = '';
        messageContainer.style.display = 'none';
        messageContainer.className = 'message';

        document.getElementById('reset-btn').style.display = 'none';
        document.getElementById('submit-btn').disabled = false;
        document.getElementById('guess').disabled = false;
        document.getElementById('guess').value = '';

        console.log(`Загаданное число: ${this.secretNumber}`);
    },

    checkGuess(userGuess) {
        this.attempts += 1;
        this.updateAttemptsDisplay();

        if (userGuess < this.secretNumber) {
            return `Загаданное число больше! Попыток осталось: ${this.maxAttempts - this.attempts}`;
        }

        if (userGuess > this.secretNumber) {
            return `Загаданное число меньше! Попыток осталось: ${this.maxAttempts - this.attempts}`;
        }

        return `Поздравляем, вы угадали число ${this.secretNumber} за ${this.attempts} попыток! 🎉`;
    },

    displayMessage(message, type = 'normal') {
        const messageContainer = document.getElementById('message-container');
        messageContainer.textContent = message;
        messageContainer.style.display = 'block';
        messageContainer.className = 'message';

        if (type === 'success') {
            messageContainer.classList.add('success');
        } else if (type === 'error') {
            messageContainer.classList.add('error');
        }
    },

    updateAttemptsDisplay() {
        const attemptsElement = document.getElementById('attempts-count');
        attemptsElement.textContent = this.maxAttempts - this.attempts;
    },

    endGame() {
        document.getElementById('submit-btn').disabled = true;
        document.getElementById('guess').disabled = true;
        document.getElementById('reset-btn').style.display = 'inline-block';
    }
};

// Инициализация игры при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-btn');
    const resetButton = document.getElementById('reset-btn');

    game.startGame();

    submitButton.addEventListener('click', () => {
        const userGuess = parseInt(document.getElementById('guess').value, 10);

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            game.displayMessage('Пожалуйста, введите число от 1 до 100!', 'error');
            return;
        }

        let result = game.checkGuess(userGuess);
        let messageType = 'normal';

        if (result.includes('Поздравляем')) {
            messageType = 'success';
            game.endGame();
        } else if (game.attempts >= game.maxAttempts) {
            messageType = 'error';
            result = `К сожалению, вы не угадали! Загаданное число было ${game.secretNumber}. Попробуйте снова.`;
            game.endGame();
        }

        game.displayMessage(result, messageType);
    });

    resetButton.addEventListener('click', () => {
        game.startGame();
    });
});
