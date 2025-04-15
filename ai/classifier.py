from flask import Flask, request, jsonify
app = Flask(__name__)
@app.route('/classify', methods=['POST'])
def classify():
    text = request.json.get('text', '')
    return jsonify({'classification': 'Fire' if 'fire' in text.lower() else 'Other'})
if __name__ == '__main__':
    app.run(port=5001)