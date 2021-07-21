let cols = prompt("Wie viele Spalten? ", );
let rows = prompt("Wie viele Reihen? ", );
let myCanvas = document.getElementById("myCanvas");
let ctx = myCanvas.getContext("2d");

let array_field = new Array();
for (i = 0; i < cols; i++) {
    array_field.push(new Array());
    console.log(array_field)
    for (j = 0; j < rows; j++) {
        array_field[i].push(0);
    }  
}

function grid() {
// VERTICAL
    for(i = 1200/cols; i < 1200; i+= (1200 / cols)) {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 800);
        ctx.stroke();
    }
}
// HORIZONTAL
    for(i = 800/rows; i < 800; i+= (800 / rows)) {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(0, i);
        ctx.lineTo(1200, i);
        ctx.stroke();
    }



grid()



