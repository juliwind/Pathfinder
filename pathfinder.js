let cols = prompt("Number of columns: ", );
let rows = prompt("Number of rows: ", );
let canvas_pg = document.getElementById("canvasPlayground");
let ctx_pg = canvas_pg.getContext("2d");
let loopEnd_start = false;
let startX = null;
let startY = null;

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

// HORIZONTAL
    for(i = 800/rows; i < 800; i+= (800 / rows)) {
        ctx_pg.beginPath();
        ctx_pg.strokeStyle = 'black';
        ctx_pg.moveTo(0, i);
        ctx_pg.lineTo(1200, i);
        ctx_pg.stroke();
    }
}

function setStartpoint() {
    if (!loopEnd_start) {
        document.getElementById('start').classList.add("buttonActiv");
        canvas_pg.addEventListener("click", onClickStartpoint);
        setTimeout(setStartpoint);
    }
}

function onClickStartpoint(e) {
    for(i = 0; i < 1200; i+= (1200 / cols)) {
        if (e.clientX > i + 10 && e.clientX < i + (1200 / cols) + 10) {
            //console.log("cols: ", i / (1200 / cols))
        }
    }

    for (j = 0; j < 800; j+= (800 / rows)) {
        if (e.clientY > j + 185 && e.clientY < j + (800 / rows) + 185) {
            console.log("rows: ", j / (800 / rows))
        }
    }
}
grid()

/*
-10
*/

