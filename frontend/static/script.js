let A = [0, 0, 0, 0];
let B = [0, 0, 0, 0];
let carry_in = 0;
let code = [0, 0];

function createInputs() {
    for (let i = 3; i >= 0; i--) {
        $('#A').append(`<button id="A${i}" onclick="toggleBit('A', ${i})">0</button>`);
        $('#B').append(`<button id="B${i}" onclick="toggleBit('B', ${i})">0</button>`);
    }
}

function toggleBit(group, index) {
    if (group === 'A') {
        A[index] ^= 1;
        $(`#A${index}`).text(A[index]);
    } else if (group === 'B') {
        B[index] ^= 1;
        $(`#B${index}`).text(B[index]);
    }
    sendData();
}

$('#carry_in').click(function () {
    carry_in ^= 1;
    $(this).text(carry_in);
    sendData();
});

$('#code0').click(function () {
    code[1] ^= 1;
    $(this).text(code[1]);
    sendData();
});

$('#code1').click(function () {
    code[0] ^= 1;
    $(this).text(code[0]);
    sendData();
});

function sendData() {
    $.ajax({
        url: '/calculate/circuit1',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ A, B, carry_in, code }),
        success: function (res) {
            $('#output').text(res.output.join(''));
            $('#carry_out').text(res.carry_out);
        }
    });
}

$(document).ready(function () {
    createInputs();
    sendData();
});
