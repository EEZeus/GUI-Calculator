class Calculator {


    constructor() {
        this.displayMessage = ''
        this.display = document.querySelector('.result')
        this.numberBtns = document.querySelectorAll('.number')
        this.operationBtns = document.querySelectorAll('.operation')
        this.equalBtn = document.querySelector('.equal')
        this.deleteBtn = document.querySelector('.delete')
    }

    delete() {
        this.displayMessage = this.displayMessage.substring(0, this.displayMessage.length - 1);
        this.updateDisplay()
    }

    append(event) {
        this.displayMessage += event.target.value
        this.updateDisplay()
    }

    ParseToArray(displayMessage) {
        let arr = []
        let str = ''
        for (let i = 0; i < displayMessage.length; i++) {
            if (displayMessage[i] < '0' && displayMessage[i] != '.') {
                if (str.length > 0)
                    arr.push(str)
                arr.push(displayMessage[i])
                str = ''
            } else {
                str += displayMessage[i]
            }
            if (i === displayMessage.length - 1) {
                arr.push(str)
            }
        }
        return arr
    }
    prec(c) {
        if (c == 'sqrt')
            return 3;
        else if (c == '/' || c == '*' || c == '%')
            return 2;
        else if (c == '+' || c == '-')
            return 1;
        else
            return -1;
    }
    isOperator(op) {
        if (op == '+' || op == '-' ||
            op == '%' || op == '*' ||
            op == '/' || op == '(' ||
            op == ')' || op == 'sqrt') {
            return true;
        }
        else
            return false;
    }
    infixToPostfix(infixArr) {
        let postfixArr = []
        let stack = []
        for (let item of infixArr) {
            if (!this.isOperator(item)) {
                postfixArr.push(item)
            } else if (item === '(') {
                stack.push(item)
            } else if (item === ')') {
                while (stack[stack.length - 1] !== '(') {
                    postfixArr.push(stack.pop())
                }
                stack.pop()
            } else if (this.isOperator(item)) {
                if (stack.lenght > 0) {
                    if (prec(stack[stack.length - 1]) >= this.prec(item)) {
                        postfixArr.push(stack.pop())
                        stack.push(item)
                    }
                } else {
                    stack.push(item)
                }
            }
        }
        while (stack.length > 0) {
            postfixArr.push(stack.pop())
        }
        return postfixArr
    }

    computePostfix(postfix) {
        const operators = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '*': (a, b) => a * b,
            '/': (a, b) => a / b,
            '%': (a, b) => a % b,
        }
        let stack = []
        postfix.forEach((item) => {
            if (!this.isOperator(item)) {
                stack.push(item)
            } else {
                console.log < (item)
                let second = stack.pop()
                let first = stack.pop()
                stack.push(operators[item](+first, +second))
            }
        })
        return stack.pop()
    }

    compute(event) {
        let arr = this.ParseToArray(this.displayMessage);
        let postfixEx = this.infixToPostfix(arr)
        let result = this.computePostfix(postfixEx)
        this.displayMessage = String(result)
        this.updateDisplay()
    }

    updateDisplay() {
        this.display.setAttribute('value', this.displayMessage)
    }

}

let c = new Calculator()

c.deleteBtn.addEventListener('click', (e) => {
    c.delete(e)
})
c.equalBtn.addEventListener('click', (e) => {
    c.compute(e)
})
for (let i = 0; i < c.numberBtns.length; i++) {
    c.numberBtns[i].addEventListener('click', (e) => {
        c.append(e)
    })
}

for (let i = 0; i < c.operationBtns.length; i++) {
    c.operationBtns[i].addEventListener('click', (e) => {
        c.append(e)
    })
}
