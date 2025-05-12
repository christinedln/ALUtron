def calculate_alu1(data):
    A = data['A']
    B = data['B']
    carry_in = int(data['carry_in'])
    code = ''.join(map(str, data['code']))

    result = [0] * 4
    carry = carry_in

    for i in range(4):
        a = A[i]
        b = B[i]
        if code in ['10', '11']:  # ADD
            total = a + b + carry
            result[i] = total % 2
            carry = total // 2

        elif code == '00':  # AND
            result[i] = a & b
            carry = 0  # AND doesn't generate carry

        elif code == '01':
            result[i] = a | b
            carry = 0

        else:
            result = [0, 0, 0, 0]
            carry = 0

    return result, carry  # Only return data
