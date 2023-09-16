/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 */

function sleep (seconds) {
    let start = Date.now();
    while ((Date.now() - start)/1000 < seconds){}
}

console.log("Before waiting");
sleep(1);
console.log("After waiting");