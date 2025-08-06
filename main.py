import random
import time

prompts = [
    "Make this print a triangle of stars",
    "Turn this into a countdown timer",
    "Make this draw a smiley face in ASCII",
    "Add a twist to this basic calculator",
]

def start_codejammer():
    prompt = random.choice(prompts)
    print(f"🧠 Your challenge: {prompt}")
    print("⏳ You have 30 seconds. Type your code below:")

    start_time = time.time()
    user_code = []
    while time.time() - start_time < 30:
        try:
            line = input()
            user_code.append(line)
        except KeyboardInterrupt:
            break

    print("\n✅ Time's up! Here's what you wrote:")
    print("\n".join(user_code))

    # Save to file (optional)
    with open("submissions.txt", "a") as f:
        f.write(f"\n---\nPrompt: {prompt}\n")
        f.write("\n".join(user_code))
        f.write("\n---\n")

start_codejammer()
