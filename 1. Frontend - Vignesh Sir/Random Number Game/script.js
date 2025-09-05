const numberInput = document.getElementById("numberInput");
const answerText = document.getElementById("answerText");
const scoreText = document.getElementById("scoreText");
let randomNumber = Math.floor(Math.random() * 10) + 1;
let totalScore = 10;

function makeGuess() {
    const userNumber = numberInput.value;
    if (userNumber == randomNumber) {
        answerText.textContent = "You are right!";
        console.log("Correct guess");
        alert("YOU WON THE LOTTERY!");
    } else {
        answerText.textContent = "Wrong! Please try again.";
        totalScore -= 1;
        console.log("Wrong guess");
        alert("Wrong! Try again");
        scoreText.textContent = "Score: " + totalScore;
    }
}
