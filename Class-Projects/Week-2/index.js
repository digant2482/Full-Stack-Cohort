const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json());

function calculateSum(counter){
    var total = 0;
    for (let i = 1; i<= counter; i++){
        total += i;
    }
    return total;
}

function handleFirstRequest(req, res){
    const counter = req.query.counter;
    var calculatedSum = calculateSum(counter);
    var answerObject = {
        sum : calculatedSum,
    }
    res.send(answerObject);
   
}

function getPage(req,res){
    res.sendFile(__dirname + "/index.html");
}
app.get('/', getPage);
app.get('/handleSum', handleFirstRequest);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})