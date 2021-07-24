let canvas = document.getElementById("canvasPlayground");
let ctx = canvas.getContext("2d");
let cols = 15;
let rows = 10;
let field = new Array();
let screen_height = 800;
let screen_width = 1200;
let cellX = null;
let cellY = null;
let loopEnd_start = false;
let loopEnd_end = false;
let loopEnd_barriers = false;
let barrier_counter = 0;
let barrier_loop = null;

setup();

function setup() {
    for (i = 0; i < rows; i++) {
        field.push(new Array());
        for (j = 0; j < cols; j++) {
            field[i].push("0");
        }  
    }
    draw();
}

function grid() {
    // VERTICAL
    for(i = screen_width / cols; i < screen_width; i+= (screen_width / cols)) {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(i, 0);
        ctx.lineTo(i, screen_height);
        ctx.stroke();
    }
    
    // HORIZONTAL
    for(i = screen_height / rows; i < screen_height; i+= (screen_height / rows)) {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(0, i);
        ctx.lineTo(screen_width, i);
        ctx.stroke();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grid();
    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            switch (field[i][j]) {
                case "s":
                    ctx.beginPath();
                    ctx.strokeStyle = 'blue';
                    ctx.lineWidth = 3;
                    ctx.moveTo(j * (1200 / cols) - (1200 / cols), i * (800 / rows) - (800 / rows));
                    ctx.lineTo(j * (1200 / cols), i * (800 / rows));
                    ctx.moveTo(j * (1200 / cols) - (1200 / cols), i * (800 / rows));
                    ctx.lineTo(j * (1200 / cols), i * (800 / rows) - (800 / rows));
                    ctx.stroke();
            }
        }  
    }
    //switch 

    console.log(field);
}
function getCell(x, y, ) {
    for(i = 0; i < screen_height; i+= (screen_height / rows)) {
        if (y > i + 186 && y < i + (screen_height / rows) + 186) {
            cellY = i / (screen_height / rows);
        }
    }
    for (j = 0; j < screen_width; j+= (screen_width / cols)) {
        if (x > j + 10 && x < j + (screen_width / cols) + 10) {
            cellX = j / (screen_width / cols);
        }
    }
}

//STARTPOINT
function setStartpoint() {
    if (!loopEnd_start) {
        document.getElementById('start').classList.add("buttonActiv");
        canvas.addEventListener("click", onClickStartpoint);
        setTimeout(setStartpoint);
    }
}
function onClickStartpoint(e) {
    getCell(e.clientX, e.clientY);
    if (cellX != null && cellY != null) { 
        field[cellY][cellX] = "s";
        draw();
    }

    loopEnd_start = true;
    canvas.removeEventListener("click", onClickStartpoint);
    document.getElementById('start').classList.remove("buttonActiv");
}
function setStartpointTrue() {
    loopEnd_start = false;
}


function setRects() {
    field = new Array();
    cols = prompt("Number of columns: ", );
    rows = prompt("Number of rows: ", );
    setup();
}
//ENDPOINT
function setEndpoint() {
    if (!loopEnd_end) {
        document.getElementById('end').classList.add("buttonActiv");
        canvas.addEventListener("click", onClickEndpoint);
        setTimeout(setEndpoint);
    }
}
function onClickEndpoint(e) {
    getCell(e.clientX, e.clientY);
    if (cellX != null && cellY != null) { 
        field[cellY][cellX] = "e";
        draw();
    }

    loopEnd_end = true;
    canvas.removeEventListener("click", onClickEndpoint);
    document.getElementById('end').classList.remove("buttonActiv");
}
function setEndpointTrue() {
    loopEnd_end = false;
}

//BARRIERS
function barriers() {
    if (!loopEnd_barriers) {
        document.getElementById('barriers').classList.add("buttonActiv");
        canvas.addEventListener("mousedown", onClickBarriers);
        barrier_loop = setTimeout(barriers);
    }
}
function onClickBarriers(e) {
    getCell(e.clientX, e.clientY);
    if (cellX != null && cellY != null) { 
        if (field[cellY][cellX] == "0") {
            field[cellY][cellX] = "b";
        }
        else if (field[cellY][cellX] == "b") {
            field[cellY][cellX] = "0";
        }
        draw();
    }
}
function barriersCounter() {
    barrier_counter++;
    if (barrier_counter % 2 == 0) {
        barriersEnd();
        clearTimeout(barrier_loop);
    } 
    else {
        barriers();
    }
}
function barriersEnd() {
    canvas.removeEventListener("mousedown", onClickBarriers);
    document.getElementById('barriers').classList.remove("buttonActiv");
}