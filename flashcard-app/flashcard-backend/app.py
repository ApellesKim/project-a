from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import re
import nltk
from collections import Counter
import random

# Ensure required nltk resources are downloaded
nltk.download('punkt_tab')

app = Flask(__name__)
CORS(app)

# Sample vocabulary list
VOCAB_LIST = [
    {"word": "resilient", "definition": "able to recover quickly"},
    {"word": "meticulous", "definition": "showing great attention to detail"},
    {"word": "adept", "definition": "very skilled"},
    {"word": "ephemeral", "definition": "lasting for a very short time"},
    {"word": "candid", "definition": "truthful and straightforward"},
    {"word": "pragmatic", "definition": "dealing with things practically"},
    {"word": "tenacious", "definition": "not giving up easily"},
    {"word": "ubiquitous", "definition": "present everywhere"},
    {"word": "vex", "definition": "to annoy or worry someone"},
    {"word": "zealous", "definition": "having strong enthusiasm"},
    {"word": "lucid", "definition": "expressed clearly"},
    {"word": "esoteric", "definition": "understood by only a small group"},
    {"word": "altruistic", "definition": "selflessly concerned for others"},
]




@app.route('/')
def home():
    return jsonify({"message": "Flask server is running!"})

@app.route('/vocab', methods=['GET'])
def get_vocab():
    random_vocab = random.sample(VOCAB_LIST, 10)  # Select 10 random words
    return jsonify(random_vocab)


@app.route('/scrape', methods=['POST'])
def scrape_article():
    data = request.get_json()
    url = data.get('url')
    
    if not url:
        return jsonify({"error": "URL is required"}), 400

    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()  # Raise an error for bad responses (4xx, 5xx)
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Request failed: {str(e)}"}), 500
    
    try:
        soup = BeautifulSoup(response.content, 'html.parser')
        text = soup.get_text()
        words = extract_vocabulary(text)
        return jsonify({"words": words})
    except Exception as e:
        return jsonify({"error": f"Parsing failed: {str(e)}"}), 500


def extract_vocabulary(text):
    """Extracts meaningful words from the text, removing common words and non-alphabetic characters."""
    words = nltk.word_tokenize(text)
    words = [word.lower() for word in words if word.isalpha()]
    common_words = set(nltk.corpus.stopwords.words('english')) if nltk.download('stopwords') else set()
    filtered_words = [word for word in words if word not in common_words]
    word_freq = Counter(filtered_words)
    return [word for word, _ in word_freq.most_common(10)]

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
