from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from alu.alu import calculate_alu

app = Flask(__name__)
CORS(app)

@app.route('/calculate/circuit', methods=['POST'])
def calculate_circuit():
    data = request.json
    alu_output = calculate_alu(data)
    
    if "error" in alu_output:
        return jsonify(alu_output), 400

    result = alu_output["result"]

    return jsonify({
        "output": result,
        "carry_out": alu_output["carry_out"]
    })

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
