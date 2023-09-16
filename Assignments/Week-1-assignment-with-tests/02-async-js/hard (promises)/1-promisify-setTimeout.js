/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/
function sum(a, b){
    return a + b;
}

function wait(n) {
    return new Promise((abc)=>{
        setTimeout(()=>{
            console.log('Wait ended');
            abc(sum(5,7));
        }, n*1000);
    });
}

wait(1).then((message)=>{
    console.log(message);
});