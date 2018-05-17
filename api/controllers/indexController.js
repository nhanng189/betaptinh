'use strict'
let isNumber = (str) => {
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

let convertStrToNumber = (str) => {
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

exports.loadpage = (req, res) => {
    res.render('index', (err, html) => {
        if (err) {
            res.status(404).send('404 Not found');
            return;
        }
        res.status(200).send(html);
    })
}

exports.sum = (req, res) => {
    if (typeof req.body.number_one === 'undefined' ||
        typeof req.body.number_two === 'undefined') {
        res.status(400).json({ result: 'input invalid' });
        return;
    }

    let numberOne = req.body.number_one
    let numberTwo = req.body.number_two;
    numberOne = convertStrToNumber(numberOne);
    numberTwo = convertStrToNumber(numberTwo);
    if (!isNumber(numberOne) || !isNumber(numberTwo)) {
        res.status(400).json({ result: 'input invalid' });
        return;
    }

    res.status(200).json({ result: parseFloat(numberOne) + parseFloat(numberTwo) });
}

exports.sub = (req, res) => {
    if (typeof req.body.number_one === 'undefined' ||
        typeof req.body.number_two === 'undefined') {
        res.status(400).json({ result: 'input invalid' });
        return;
    }

    let numberOne = req.body.number_one
    let numberTwo = req.body.number_two;
    numberOne = convertStrToNumber(numberOne);
    numberTwo = convertStrToNumber(numberTwo);
    if (!isNumber(numberOne) || !isNumber(numberTwo)) {
        res.status(400).json({ result: 'input invalid' });
        return;
    }
    res.status(200).json({ result: parseFloat(numberOne) - parseFloat(numberTwo) });
}

exports.multi = (req, res) => {
    if (typeof req.body.number_one === 'undefined' ||
        typeof req.body.number_two === 'undefined') {
        res.status(400).json({ result: 'input invalid' });
        return;
    }

    let numberOne = req.body.number_one
    let numberTwo = req.body.number_two;
    numberOne = convertStrToNumber(numberOne);
    numberTwo = convertStrToNumber(numberTwo);
    if (!isNumber(numberOne) || !isNumber(numberTwo)) {
        res.status(400).json({ result: 'input invalid' });
        return;
    }
    res.status(200).json({ result: parseFloat(numberOne) * parseFloat(numberTwo) });
}

exports.div = (req, res) => {
    if (typeof req.body.number_one === 'undefined' ||
        typeof req.body.number_two === 'undefined') {
        res.status(400).json({ result: 'input invalid' });
        return;
    }

    let numberOne = req.body.number_one
    let numberTwo = req.body.number_two;
    numberOne = convertStrToNumber(numberOne);
    numberTwo = convertStrToNumber(numberTwo);
    if (!isNumber(numberOne) || !isNumber(numberTwo) || numberTwo === "0") {
        res.status(400).json({ result: 'input invalid' });
        return;
    }
    res.status(200).json({ result: parseFloat(numberOne) / parseFloat(numberTwo) });
}

