from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Allow requests only from your Netlify frontend
CORS(app, origins=["https://willerdev-studio-page.netlify.app"])

# In-memory leaderboard
leaderboard = []

@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    if not data or not all(k in data for k in ("name", "challenge", "code")):
        return jsonify({"status": "error", "message": "Invalid submission data"}), 400

    leaderboard.append({
        "name": data["name"],
        "challenge": data["challenge"],
        "code": data["code"]
    })

    print(f"New submission: {data['name']} - {data['challenge']}")
    return jsonify({"status": "success"}), 200

@app.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    return jsonify(leaderboard), 200

@app.route('/reset', methods=['POST'])
def reset_leaderboard():
    auth = request.headers.get("Authorization")
    if auth != "secret123":
        print("Unauthorized reset attempt")
        return jsonify({"message": "Unauthorized"}), 403

    leaderboard.clear()
    print("Leaderboard has been reset")
    return jsonify({"message": "Leaderboard successfully reset."}), 200

if __name__ == '__main__':
    app.run()
