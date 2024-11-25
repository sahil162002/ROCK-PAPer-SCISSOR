const choices = ["rock", "paper", "scissors"];
const computerScoreEl = document.getElementById("computer-score");
const yourScoreEl = document.getElementById("your-score");
const resultEl = document.getElementById("result");
const restartBtn = document.getElementById("restart");
const rulesBtn = document.getElementById("rules-btn");
const rulesModal = document.getElementById("rules-modal");
const closeRulesBtn = document.getElementById("close-rules");
const celebrationEl = document.getElementById("celebration");

let computerScore = localStorage.getItem("computerScore")
  ? parseInt(localStorage.getItem("computerScore"))
  : 0;
let yourScore = localStorage.getItem("yourScore")
  ? parseInt(localStorage.getItem("yourScore"))
  : 0;

computerScoreEl.textContent = computerScore;
yourScoreEl.textContent = yourScore;

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "tie";
  }
  if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    return "player";
  }
  return "computer";
}

function updateScore(winner) {
  if (winner === "player") {
    yourScore++;
  } else if (winner === "computer") {
    computerScore++;
  }

  localStorage.setItem("yourScore", yourScore);
  localStorage.setItem("computerScore", computerScore);

  computerScoreEl.textContent = computerScore;
  yourScoreEl.textContent = yourScore;

  if (yourScore === 15) {
    resultEl.innerHTML = "<p>🎉 Congratulations! You win the game!</p>";
    celebrationEl.style.display = "block";
    setTimeout(() => (celebrationEl.style.display = "none"), 5000);
  } else if (computerScore === 15) {
    resultEl.innerHTML = "<p>😔 Computer wins the game!</p>";
  }
}

function playGame(playerChoice) {
  const computerChoice = getComputerChoice();
  const winner = determineWinner(playerChoice, computerChoice);

  if (winner === "tie") {
    resultEl.innerHTML = `<p>It's a tie! You both chose ${playerChoice}.</p>`;
  } else if (winner === "player") {
    resultEl.innerHTML = `<p>You win! ${playerChoice} beats ${computerChoice}.</p>`;
  } else {
    resultEl.innerHTML = `<p>You lose! ${computerChoice} beats ${playerChoice}.</p>`;
  }

  updateScore(winner);
}

document.querySelectorAll(".choice").forEach((button) =>
  button.addEventListener("click", (e) => {
    const playerChoice = e.target.dataset.choice;
    playGame(playerChoice);
  })
);

restartBtn.addEventListener("click", () => {
  computerScore = 0;
  yourScore = 0;
  localStorage.setItem("computerScore", 0);
  localStorage.setItem("yourScore", 0);
  computerScoreEl.textContent = 0;
  yourScoreEl.textContent = 0;
  resultEl.innerHTML = "<p>Make your move!</p>";
  celebrationEl.style.display = "none";
});

rulesBtn.addEventListener("click", () => {
  rulesModal.style.display = "block";
});

closeRulesBtn.addEventListener("click", () => {
  rulesModal.style.display = "none";
});
