from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

@app.route('/scrape', methods=['POST'])
def scrape_article():
    url = request.json.get('url')
    if not url:
        return jsonify({"error": "URL is required"}), 400

    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')
        text = soup.get_text()
        # Here, you can add text processing (e.g., NLP) to extract vocabulary.
        words = text.split()[:10]  # Just a basic split for demo purposes
        return jsonify({"words": words})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)