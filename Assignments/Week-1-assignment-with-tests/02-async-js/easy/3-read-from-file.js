const fs = require('fs');


function readFile(err, data){
    if (err){
        console.log("Unable to read the file");
    }
    else{
        console.log(data);
    }
}

fs.readFile('data.txt', 'utf-8', readFile);

console.log("hello");
console.log("1");
console.log("hi");
console.log("again");

function dummy(){
    console.log("here find me");
}

setTimeout(dummy, 2);


