from flask import Flask, request, jsonify, redirect
from flask_cors import CORS
from url_shortener import URLShortener

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

url_shortener = URLShortener()

@app.route('/', methods=['GET'])
def index():
    return "Welcome to the URL Shortener API"

# Route to handle URL shortening
@app.route('/shorten', methods=['POST'])
def shorten_url():
    try:
        # Parse JSON data sent from the frontend
        data = request.json
        long_url = data.get('longUrl')
        ttl = data.get('ttl')
        if not long_url:
            return jsonify({'error': 'No URL provided'}), 400

        # Generate a short URL
        if long_url.endswith('/'):
            long_url = long_url[:-1]
        short_url = url_shortener.shorten_url(long_url, ttl)
        return jsonify({'shortUrl': short_url}), 201
    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 500

# Route to handle redirection
@app.route('/<int:id>', methods=['GET'])
def redirect_url(id):
    try:
        
        # The ID should match the stored short URL key
        short_url = f"http://localhost:5000/{id}"
        
        if short_url:
            long_url = url_shortener.redirect_url(short_url)
            return redirect(long_url)
        else:
            return jsonify({'error': 'URL not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to handle access count retrieval
@app.route('/access_count', methods=['POST'])
def access_count():
    try:
        # Parse JSON data sent from the frontend
        data = request.json
        
        _url = data.get('shortUrl')
        
        if not _url:
            return jsonify({'error': 'No URL provided'}), 400

        # Generate a short URL
        access_count = url_shortener.get_access_count(_url)
        return jsonify({'access_count': access_count}), 201
    except Exception as e:
        
        print(str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
