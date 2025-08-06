function resetLeaderboard() {
  fetch("https://willerdev-studio-netlify-1.onrender.com/reset", {
    method: "POST",
    headers: {
      "Authorization": "secret123" // Replace with a secure token later
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Reset failed");
    }
    return response.json();
  })
  .then(data => {
    document.getElementById("adminStatus").innerText = data.message || "Leaderboard reset!";
  })
  .catch(error => {
    console.error("Error:", error);
    document.getElementById("adminStatus").innerText = "Reset failed. Check backend.";
  });
}
