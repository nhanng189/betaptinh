function delalarm() {
    document.getElementById("alarm").innerText = "";
}

function convertStrToNumber(str) {
    let count = 0;
    let tmpNega = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) == '-')
            tmpNega++;
        if (str.charAt(i) == '+' || str.charAt(i) == '-')
            count++;
        else break;
    }
    str = str.toString().substring(count, str.length);
    if (tmpNega % 2 != 0)
        str = '-' + str;
    return str;
}

function isNumber(str) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) == '+' || str.charAt(i) == '-')
            count++;
        else break;
    }
    str = str.substring(count, str.length);
    count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) == '.') {
            count++;
        }
        if ((str.charAt(i) < '0' || str.charAt(i) > '9'))
            return false;
    }
    if (count > 1)
        return false;
    return !isNaN(Number.parseFloat(str));
}

function focusout1() {
    let numberOne = document.getElementById("input1").value;
    if (!isNumber(numberOne)) {
        document.getElementById("alarm").innerText = "Số thứ nhất có giá trị không hợp lệ";
        return false;
    }
    return true;
}

function focusout2() {
    let numberTwo = document.getElementById("input2").value;
    if (!isNumber(numberTwo)) {
        document.getElementById("alarm").innerText = "Số thứ 2 có giá trị không hợp lệ";
        return false;
    }
    return true;
}

async function callServer(operation, number_1, number_2) {
    let dataSend = {
        number_one: number_1,
        number_two: number_2
    }
    let myUrl = "/operation/";
    switch (operation) {
        case '+':
            myUrl += 'sum';
            break;
        case '-':
            myUrl += 'sub';
            break;
        case '*':
            myUrl += 'multi';
            break;
        case '/':
            myUrl += 'div';
            break;
    }
    let result;
    try {
        await $.ajax({
            type: 'POST',
            data: dataSend,
            url: myUrl,
            dataType: 'JSON'
        }).done((response) => {
            result = response['result'];
        })
    }
    catch (Err) {
        return false;
    }

    return result;
}


async function tinh() {
    let checkSum = document.getElementById("radioCong").checked;
    let checkSub = document.getElementById("radioTru").checked;
    let checkMuti = document.getElementById("radioNhan").checked;
    let checkDiv = document.getElementById("radioChia").checked;
    if (!checkSum && !checkSub && !checkMuti && !checkDiv) {
        document.getElementById("alarm").innerText = "Bạn chưa chọn phép tính";
        return;
    }
    else {
        document.getElementById("alarm").innerText = "";
    }
    if (!focusout1()) return;
    if (!focusout2()) return;
    let numberOne = document.getElementById("input1").value;
    let numberTwo = document.getElementById("input2").value;
    numberOne = convertStrToNumber(numberOne);
    numberOne = parseFloat(numberOne);
    numberTwo = convertStrToNumber(numberTwo);
    numberTwo = parseFloat(numberTwo);
    if (checkSum) {
        result = await callServer('+', numberOne, numberTwo);
    }
    else if (checkSub) {
        result = await callServer('-', numberOne, numberTwo);
    }
    else if (checkMuti) {
        result = await callServer('*', numberOne, numberTwo);
    }
    else  {
        if (numberTwo == 0) {
            document.getElementById("alarm").innerText = "Số thứ hai không hợp lệ";
            document.getElementById("ketqua").value = "";
            return;
        }
        else {
            document.getElementById("alarm").innerText = "";
        }
        result = await callServer('/', numberOne, numberTwo);
    }
    if (result === false) {
        document.getElementById("alarm").innerText = "Error";
        return;
    }
    document.getElementById("ketqua").value = result;
}