// js is a single threaded programming language but it have context switching behaviour 

// function sumofn(n){
//     let sum = 0;
//     for (let x = 1; x < n ; x++){
//         sum = sum + x;
//     }
//     return sum;
// }
// function sumof100(){
//     console.log(sumofn(5));
// }
// setTimeout(sumof100,1000);
// console.log("Hello");

function add(a,b){
    return a+b;
}
function sub(a,b){
    return a-b;
}
function sum(a,b,fn){
    // val = fn(a,b)
    val2 = fn(a,b)
    return val2
}
console.log(sum(5,6,sub))








