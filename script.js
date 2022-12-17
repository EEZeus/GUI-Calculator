const globalBtns = document.querySelectorAll('.global')

let output = ''
let result = document.querySelector('.result')

const equal = document.querySelector('#eq')
const del = document.querySelector('#Del')

const operators = {
    '+': (x, y) => x + y,
    '.': (x, y) => x * y,
    '-': (x, y) => x - y,
    '/': (x, y) => x / y,
    '%': (x, y) => x % y,
    'sqrt': (x) => Math.sqrt(x)
}

for (let i = 0; i < globalBtns.length; i++) {

    globalBtns[i].addEventListener('click', function (e) {
        if (globalBtns[i].getAttribute('class').includes('number')) {
            output += globalBtns[i].defaultValue;
        } else {
            output += ' ' + globalBtns[i].defaultValue + ' ';
        }
        result.value = output;
    })
}

del.addEventListener('click', function (e) {
    output = output.substring(0, output.length - 1)
    result.value = output;
})

equal.addEventListener('click', function (e) {
    let expArr = output.split(' ')
    while (expArr.includes('sqrt')) {
        let opIndex = expArr.findIndex(element => element === 'sqrt')
        let result = operators.sqrt(expArr[opIndex + 1])
        let newArr = []
        for (let i = 0; i < expArr.length; i++) {
            if (i === opIndex) {
                newArr.push(result)
            }
            else if (i === opIndex + 1) {
                continue
            }
            else {
                newArr.push(expArr[i])
            }
        }
        let tempIndex = expArr.length
        for (let i = 0 ; i<tempIndex;i++) {
            expArr.pop()
        }

        for (let i = 0; i < newArr.length; i++) {
            expArr.push(newArr[i])
        }
    }
    console.log(expArr)
})

