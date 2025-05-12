from flask import Flask, request, jsonify

app = Flask(__name__)

def valid_binary_check(s):  # checks if string is 4-digit and just 0,1
    return isinstance(s, str) and len(s) == 4 and all(c in '01' for c in s)

def valid_select_check(s):  # same as above but 2-digit
    return isinstance(s, str) and len(s) == 2 and all(c in '01' for c in s)

def binary_to_list(binary_str):
    return [int(bit) for bit in binary_str]       #  this and

def list_to_binary(bit_list):
    return ''.join(str(bit) for bit in bit_list)  # this converts bits "1010" to [1,0,1,0] for operation to "1010" after operation  

@app.route('/alu/circuit2', methods=['POST'])
def circuit2_operation():
    data = request.get_json()

    a_str = data.get("a", "")
    b_str = data.get("b", "")
    carry_in = data.get("carry_in", 0)
    select_str = data.get("select", "")

    if not valid_binary_check(a_str):
        return jsonify({"error": "Input 'a' must be a 4-digit binary string"}), 400
    
    if not valid_binary_check(b_str):
        return jsonify({"error": "Input 'b' must be a 4-digit binary string"}), 400

    if not valid_select_check(select_str):
        return jsonify({"error": "Input 'select' must be a 2-digit binary string"}), 400

    try:
        carry_in = int(carry_in)
    except ValueError:
        return jsonify({"error": "'carry_in' must be int"}), 400

    if carry_in not in (0, 1):
        return jsonify({"error": "'carry_in' must be 0 or 1"}), 400

    operation = int(select_str, 2) # convert op from str to int

    if operation not in (0, 1, 2):
        return jsonify({"error": "'select' must be 0, 1, or 2"}), 400

    input_a = binary_to_list(a_str)
    input_b = binary_to_list(b_str)

    result = [0] * 4
    carry_out = 0

    if operation == 0: # AND op
        result = [bit1 & bit2 for bit1, bit2 in zip(input_a, input_b)] # this turns 2 inputs into 1 output like [1,0,1,0] & [1,1,0,0] = [(1,1), (0,1), (1,0), (0,0)] then evaluates

    elif operation == 1: # 0R op
        result = [bit1 | bit2 for bit1, bit2 in zip(input_a, input_b)] # same but only need one 1 to be 1 during eval 

    elif operation == 2: # ADD op + carry
        carry = carry_in
        for i in reversed(range(4)): # addition starting from rightmost bit
            bit1 = input_a[i]
            bit2 = input_b[i]

            sum_bit = bit1 ^ bit2 ^ carry
            carry = (bit1 & bit2) | (carry & (bit1 ^ bit2))

            result[i] = sum_bit

        carry_out = carry

    return jsonify({
        "result": list_to_binary(result),
        "carry_out": carry_out if operation == 2 else None
    })

if __name__ == '__main__':
    app.run(debug=True)
