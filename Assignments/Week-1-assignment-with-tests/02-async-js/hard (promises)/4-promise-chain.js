/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Print out the time it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function waitOneSecond() {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log("Resolved 1 second promise");
            resolve();
        }, 1000);
    });
}

function waitTwoSecond() {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log("Resolved 2 second promise");
            resolve();
        }, 2000);
        
    });
}

function waitThreeSecond() {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log("Resolved 3 second promise");
            resolve();
        }, 3000);
    });
}

async function calculateTime() {
    let startTime = new Date();

    await waitOneSecond();
    await waitTwoSecond();
    await waitThreeSecond();

    let endTime = new Date();
    let elapsedTime = (endTime - startTime)/1000;
    console.log(`Time taken to resolve all three functions: ${elapsedTime} seconds`);
   
}

calculateTime();