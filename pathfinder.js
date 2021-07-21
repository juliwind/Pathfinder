let cols = prompt("Wie viele Spalten? ", );
let rows = prompt("Wie viele Reihen? ", );
let canvas_pg = document.getElementById("canvasPlayground");
let ctx_pg = canvas_pg.getContext("2d");

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
        ctx_pg.beginPath();
        ctx_pg.strokeStyle = 'black';
        ctx_pg.moveTo(i, 0);
        ctx_pg.lineTo(i, 800);
        ctx_pg.stroke();
    }
}
// HORIZONTAL
    for(i = 800/rows; i < 800; i+= (800 / rows)) {
        ctx_pg.beginPath();
        ctx_pg.strokeStyle = 'black';
        ctx_pg.moveTo(0, i);
        ctx_pg.lineTo(1200, i);
        ctx_pg.stroke();
    }



grid()



