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

function escapeHTML(str) {
  return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
}

function clearFields() {
  document.getElementById("playerName").value = "";
  document.getElementById("codeInput").value = "";
  document.getElementById("challengeText").innerText = "";
  document.getElementById("submissionStatus").innerText = "";
}

function submitScore() {
  const player = document.getElementById("playerName").value.trim();
  const prompt = document.getElementById("challengeText").innerText.trim();
  const code = document.getElementById("codeInput").value.trim();

  if (!player || !code || !prompt) {
    document.getElementById("submissionStatus").innerText = "Please fill in all fields before submitting.";
    return;
  }

  // Check for duplicate name
  fetch("https://willerdev-studio-netlify-1.onrender.com/leaderboard")
    .then(res => res.json())
    .then(data => {
      const nameExists = data.some(entry => entry.name.toLowerCase() === player.toLowerCase());
      if (nameExists) {
        document.getElementById("submissionStatus").innerText = "This name has already been used. Please choose another.";
        return;
      }

      // Proceed with submission
      fetch("https://willerdev-studio-netlify-1.onrender.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: player, challenge: prompt, code })
      })
        .then(response => response.json())
        .then(data => {
          document.getElementById("submissionStatus").innerText = data.message || "Submitted!";
          loadLeaderboard(); // Refresh leaderboard
        })
        .catch(error => {
          console.error("Error submitting:", error);
          document.getElementById("submissionStatus").innerText = "Submission failed.";
        });
    });
}


function loadLeaderboard() {
  fetch("https://willerdev-studio-netlify-1.onrender.com/leaderboard")
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById("leaderboardTable");
      table.innerHTML = ""; // Clear previous rows

      data.forEach(entry => {
        const row = `<tr>
          <td>${escapeHTML(entry.name)}</td>
          <td>${escapeHTML(entry.challenge)}</td>
          <td><pre>${escapeHTML(entry.code)}</pre></td>
        </tr>`;
        table.innerHTML += row;
      });
    });
}

// Load leaderboard on page load
window.onload = loadLeaderboard;

