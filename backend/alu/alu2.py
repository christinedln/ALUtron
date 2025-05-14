def calculate_alu2(data):
    def valid_binary_check(s):   # checks if string is 4-digit and just 0,1
        return isinstance(s, str) and len(s) == 4 and all(c in '01' for c in s)

    def valid_select_check(s):  # check is now for 2 or 3-digit binary
        return isinstance(s, str) and 2 <= len(s) <= 3 and all(c in '01' for c in s)

    def binary_to_list(binary_str):                      #  this and
        return [int(bit) for bit in binary_str]

    def list_to_binary(bit_list):
        return ''.join(str(bit) for bit in bit_list)    # this converts bits "1010" to [1,0,1,0] for operation to "1010" after operation  

    a_str = data.get("a", "")
    b_str = data.get("b", "")
    carry_in = data.get("carry_in", 0)
    select_str = data.get("select", "")

    if not valid_binary_check(a_str):
        return {"error": "Input 'a' must be a 4-digit binary string"}

    if not valid_binary_check(b_str):
        return {"error": "Input 'b' must be a 4-digit binary string"}

    if not valid_select_check(select_str):
        return {"error": "Input 'select' must be a 2-digit binary string"}

    try:
        carry_in = int(carry_in)
    except ValueError:
        return {"error": "'carry_in' must be an integer"}

    if carry_in not in (0, 1):
        return {"error": "'carry_in' must be 0 or 1"}

    operation = int(select_str, 2)

    if operation not in (0, 1, 2, 3, 4):
        return {"error": "'select' must be 00 (AND), 01 (OR), 10 (ADD), 11 (SUB), 100 (NOT)"}

    input_a = binary_to_list(a_str)
    input_b = binary_to_list(b_str)
    result = [0] * 4
    carry_out = 0

    if operation == 0:  # AND op
        result = [a & b for a, b in zip(input_a, input_b)]

    elif operation == 1:  # OR op
        result = [a | b for a, b in zip(input_a, input_b)]

    elif operation == 2:  # ADD with carry op
        carry = carry_in
        for i in reversed(range(4)):
            a = input_a[i]
            b = input_b[i]
            sum_bit = a ^ b ^ carry
            carry = (a & b) | (carry & (a ^ b))
            result[i] = sum_bit
        carry_out = carry

    elif operation == 3:  # SUB op (a - b = a + (inverted b + 1))
        b_inverted = [1 - b for b in input_b] 
        carry_in = 1 
        result = [0] * 4
        for i in reversed(range(4)):
            a_bit = input_a[i]
            b_bit = b_inverted[i]
            sum_bit = a_bit ^ b_bit ^ carry_in
            carry_out = (a_bit & b_bit) | (carry_in & (a_bit ^ b_bit))
            result[i] = sum_bit
            carry_in = carry_out
        carry_out = carry_in  


    elif operation == 4:  # NOT op
        result = [1 - a for a in input_a]
        carry_out = None  
    
    else:
        return {"error": "Invalid 'select' code. Allowed are: 000 (AND), 001 (OR), 010 (ADD), 011 (SUB), 100 (NOT)"}
    
    return {
        "result": list_to_binary(result),
        "carry_out": carry_out if operation in (2, 3) else None  
    }
