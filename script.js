//class based calculator implement
/*
UI elements 

1.number buttons
2.operation buttons
3.equals button
4.delete button
5.operands text element (if needed)

methods:
1.delete
2.appendNumber
3.chooseOperation
4.compute
5.update display

*/
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
        this.displayMessage = this.displayMessage.substring(0,this.displayMessage.length-1);
        this.updateDisplay()
    }

    append(event) {
        this.displayMessage += event.target.value
        this.updateDisplay()
    }

    prec(c) {
        if(c == 'sqrt')
            return 3;
        else if(c == '/' || c=='.')
            return 2;
        else if(c == '+' || c == '-')
            return 1;
        else
            return -1;
    }

     infixToPostfix(s) {
 
        let st = []; //For stack operations, we are using C++ built in stack
        let result = "";
 
        for(let i = 0; i < s.length; i++) {
            let c = s[i];
 
            // If the scanned character is
            // an operand, add it to output string.
            if((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9'))
                result += c;
 
            // If the scanned character is an
            // ‘(‘, push it to the stack.
            else if(c == '(')
                st.push('(');
 
            // If the scanned character is an ‘)’,
            // pop and to output string from the stack
            // until an ‘(‘ is encountered.
            else if(c == ')') {
                while(st[st.length - 1] != '(')
                {
                    result += st[st.length - 1];
                    st.pop();
                }
                st.pop();
            }
 
            //If an operator is scanned
            else {
                while(st.length != 0 && this.prec(s[i]) <= this.prec(st[st.length - 1])) {
                    result += st[st.length - 1];
                    st.pop();
                }
                st.push(c);
            }
        }
 
        // Pop all the remaining elements from the stack
        while(st.length != 0) {
            result += st[st.length - 1];
            st.pop();
        }
        
        return result
    }

    compute(event) {
        let postfixEx = this.infixToPostfix(this.displayMessage)
        console.log(postfixEx)
    }

    updateDisplay() {
        this.display.setAttribute('value', this.displayMessage)
    }

}
let c = new Calculator()

c.deleteBtn.addEventListener('click',(e)=>{
    c.delete(e)
})
c.equalBtn.addEventListener('click',(e)=>{
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
