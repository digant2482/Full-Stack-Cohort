let counter = 0;
function callCounter(){
    counter += 1;
    console.log(counter);
}

setInterval(callCounter, 1000);

callCounter();
callCounter();
callCounter();
callCounter();