const fs = require('fs');

let string = "Hello";
fs.writeFile('data2.txt', string, (err) => {
    if (err){
        console.log("Unable to write to file");
        return;
    }   
    console.log("File written successfully");
});