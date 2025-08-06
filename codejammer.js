function generateChallenge() {
  const challenges = [
    "Make this print a triangle of stars",
    "Turn this into a countdown timer",
    "Make this draw a smiley face in ASCII",
    "Add a twist to this basic calculator"
  ];
  const random = challenges[Math.floor(Math.random() * challenges.length)];
  document.getElementById("challengeText").innerText = random;
}

function submitScore() {
  const name = document.getElementById("playerName").value;
  const code = document.getElementById("codeInput").value;
  const challenge = document.getElementById("challengeText").innerText;

  if (!name || !code || !challenge) {
    document.getElementById("submissionStatus").innerText = "Please fill in all fields.";
    return;
  }

  fetch("https://willerdev-studio-netlify-1.onrender.com/submit", { ... })
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, code, challenge })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("submissionStatus").innerText = "✅ Submitted!";
    loadLeaderboard(); // Refresh leaderboard
  })
  .catch(err => {
    document.getElementById("submissionStatus").innerText = "❌ Submission failed.";
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

