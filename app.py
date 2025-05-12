from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

# 4BIT ALU 1 CJ AND LIZA
@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    A = data['A']
    B = data['B']
    carry_in = int(data['carry_in'])
    code = ''.join(map(str, data['code']))

    result = [0] * 4
    carry = carry_in

    if code in ['10', '11']: 
        for i in range(4):
            a = A[i]
            b = B[i]
            total = a + b + carry
            result[i] = total % 2
            carry = total // 2
    else:
        result = [0, 0, 0, 0]
        carry = 0

    return jsonify({'output': result[::-1], 'carry_out': carry}) 

if __name__ == '__main__':
    app.run(debug=True)
