from flask import Flask, render_template, request, jsonify
from alu.alu1 import calculate_alu1


app = Flask(__name__, template_folder='../frontend/templates', static_folder='../frontend/static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate/circuit1', methods=['POST'])
def calculate():
    data = request.json
    result, carry_out = calculate_alu1(data)
    return jsonify({'output': result[::-1], 'carry_out': carry_out})  

if __name__ == '__main__':
    app.run(debug=True)
