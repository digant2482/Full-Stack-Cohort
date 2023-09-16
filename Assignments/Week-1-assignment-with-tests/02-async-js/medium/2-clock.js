function printCurrentTime(){
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    let formattedTime24 = `${hours}:${minutes}:${seconds}`;
    console.log(formattedTime24);

    let ampm = 'AM';
    if (date.getHours() > 12){
        hours = (date.getHours() % 12).toString().padStart(2, '0');
        ampm = 'PM';
    }
 
    let formattedTime12 = `${hours}:${minutes}:${seconds} ${ampm}`;
    console.log(formattedTime12);
}

function printTime(){
    console.clear();
    printCurrentTime();
}

setInterval(printTime, 1000);