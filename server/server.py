from flask import Flask, request, jsonify
import os
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DATA_FILE = 'data.json'

@app.route('/save-name', methods=['POST'])
def save_name():
    if not request.json:
        return jsonify({'error': 'Bad request'}), 400
    
    data_to_save = {
        'name': request.json.get('name', ''),
        'age': request.json.get('age', ''),
        'height': request.json.get('height', '')
    }
    
    if not os.path.isfile(DATA_FILE):
        data = []
    else:
        with open(DATA_FILE, 'r') as file:
            data = json.load(file)
    
    data.append(data_to_save)
    
    with open(DATA_FILE, 'w') as file:
        json.dump(data, file, indent=4)
    
    return jsonify({'message': 'Data saved successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
