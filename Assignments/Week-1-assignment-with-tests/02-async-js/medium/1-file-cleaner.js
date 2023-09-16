const { error } = require('console');
const fs = require('fs');

function cleanData(err,data){
    if (err){
        console.log("Unable to read file");
        return;
    }
    let ans = "";
    var dataArray = data.split(" ");
    for (let i = 0; i < dataArray.length; i++){
        if (dataArray[i]){
            ans += dataArray[i];
            ans += " ";        }
    }
    fs.writeFile('data.txt', ans, (err)=>{});
}
fs.readFile('data.txt', 'utf-8', cleanData);
