/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Print how long it took for all 3 promises to resolve.
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

// async function calculateTime() {
//     let startTime = new Date();

//     waitOneSecond();
//     waitTwoSecond();

//     await waitThreeSecond();
//     let endTime = new Date();
//     let elapsedTime = (endTime - startTime)/1000;
//     console.log(`Time taken to resolve all three functions: ${elapsedTime} seconds`);
// }

async function calculateTime() {
    let startTime = new Date();

    let promiseOneSecond = waitOneSecond();
    let promiseTwoSecond = waitTwoSecond();
    let promiseThreeSecond = waitThreeSecond();

    Promise.all([promiseOneSecond, promiseTwoSecond, promiseThreeSecond])
    .then(()=>{
    let endTime = new Date();
    let elapsedTime = (endTime - startTime)/1000;
    console.log(`Time taken to resolve all three functions: ${elapsedTime} seconds`);
});    
}

calculateTime();