let counter = 0;

function callCounter(){
    console.clear();
    counter += 1;
    console.log(counter);
}

for (let i = 0; i < 100; i++){
    setTimeout(callCounter, 1000);
}