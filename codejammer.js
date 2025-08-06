console.log("codejammer.js loaded");

function generateChallenge() {
  const challenges = [
    "Print a triangle of stars",
    "Create a countdown timer",
    "Draw a smiley face in ASCII",
    "Add a twist to a basic calculator"
  ];
  const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
  document.getElementById("challengeText").innerText = randomChallenge;
}

function submitScore() {
  const player = document.getElementById("playerName").value;
  const prompt = document.getElementById("challengeText").innerText;
  const code = document.getElementById("codeInput").value;

  if (!player || !code) {
    document.getElementById("submissionStatus").innerText = "Please enter your name and code before submitting.";
    return;
  }

fetch("https://willerdev-studio-netlify-1.onrender.com/submit", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ name: player, challenge: prompt, code })
})

  .then(response => response.json())
  .then(data => {
    document.getElementById("submissionStatus").innerText = data.message || "Submitted!";
  })
  .catch(error => {
    console.error("Error submitting:", error);
    document.getElementById("submissionStatus").innerText = "Submission failed.";
  });
}

function loadLeaderboard() {
  fetch("https://willerdev-studio-netlify-1.onrender.com/leaderboard")
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById("leaderboardTable");
      table.innerHTML = "<tr><th>Player</th><th>Prompt</th><th>Code</th></tr>";
      data.forEach(entry => {
        const row = `<tr>
          <td>${entry.name}</td>
          <td>${entry.challenge}</td>
          <td><pre>${entry.code}</pre></td>
        </tr>`;
        table.innerHTML += row;
      });
    });
}

// Load leaderboard on page load
window.onload = loadLeaderboard;





