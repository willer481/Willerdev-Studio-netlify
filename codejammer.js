// Fetch and display a random prompt
fetch('http://localhost:5000/prompts')
  .then(res => res.json())
  .then(prompts => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    document.getElementById("randomPrompt").textContent = randomPrompt;
  });

// Submit a new score
function submitScore(entry) {
  fetch('http://localhost:5000/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry)
  });
}
