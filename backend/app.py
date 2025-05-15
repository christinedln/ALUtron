from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from alu.alu1 import calculate_alu1
from alu.alu2 import calculate_alu2

app = Flask(__name__, template_folder='../frontend/templates', static_folder='../frontend/static')
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate/circuit1', methods=['POST'])
def calculate_circuit1():
    data = request.json
    result, carry_out = calculate_alu1(data)
    return jsonify({'output': result[::-1], 'carry_out': carry_out})

@app.route('/calculate/circuit2', methods=['POST'])
def calculate_circuit2():
    data = request.json
    alu_output = calculate_alu2(data)
    
    if "error" in alu_output:
        return jsonify(alu_output), 400

    result = alu_output["result"]

    return jsonify({
        "output": result,
        "carry_out": alu_output["carry_out"]
    })

if __name__ == '__main__':
    app.run(debug=True)
