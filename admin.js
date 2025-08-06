function resetLeaderboard() {
  fetch("https://willerdev-studio-netlify-1.onrender.com/reset", {
    method: "POST",
    headers: {
      "Authorization": "secret123" // Replace with env var or secure token
    }
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("adminStatus").innerText = data.message;
  })
  .catch(err => {
    console.error("Reset failed:", err);
    document.getElementById("adminStatus").innerText = "Reset failed.";
  });
}
