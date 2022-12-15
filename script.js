const globalBtns = document.querySelectorAll('.global')

let output = ''
let result = document.querySelector('.result')

const equal = document.querySelector('#eq')
const del = document.querySelector('#Del')

const operators={
    '+':(x,y)=>x+y,
    '.':(x,y)=>x*y,
    '-':(x,y)=>x-y,
    '/':(x,y)=>x/y,
    '%':(x,y)=>x%y,
    'sqrt':(x)=>sqrt(x)
}

for(let i = 0 ;i<globalBtns.length;i++){

    globalBtns[i].addEventListener('click',function(e){
        if(globalBtns[i].getAttribute('class').includes('number')){
            output+=globalBtns[i].defaultValue;
        }else{
            output+=' '+globalBtns[i].defaultValue+' ';
        }
        result.value = output;
    })
}

del.addEventListener('click',function(e){
    output = output.substring(0,output.length-1)
    result.value = output;
})

equal.addEventListener('click',function(e){
   let expArr = output.split(' ')
   
})

