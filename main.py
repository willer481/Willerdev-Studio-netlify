from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to access backend

leaderboard = []

@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    leaderboard.append({
        "name": data["name"],
        "challenge": data["challenge"],
        "code": data["code"]
    })
    return jsonify({"status": "success"}), 200

@app.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    return jsonify(leaderboard)
