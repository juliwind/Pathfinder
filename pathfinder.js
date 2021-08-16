let canvas = document.getElementById("canvasPlayground");
let ctx = canvas.getContext("2d");
let cols = 15;
let rows = 10;
let field = new Array();
let screen_height = canvas.height;
let screen_width = canvas.width;
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
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
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
                    ctx.moveTo((j + 1) * (screen_width / cols) - (screen_width / cols), (i + 1) * (screen_height / rows) - (screen_height / rows));
                    ctx.lineTo((j + 1) * (screen_width / cols), (i + 1) * (screen_height / rows));
                    ctx.moveTo((j + 1) * (screen_width / cols) - (screen_width / cols), (i + 1) * (screen_height / rows));
                    ctx.lineTo((j + 1) * (screen_width / cols), (i + 1) * (screen_height / rows) - (screen_height / rows));
                    ctx.stroke();
                    break;
                case "e":
                    ctx.beginPath();
                    ctx.strokeStyle = 'red';
                    ctx.lineWidth = 3;
                    ctx.moveTo((j + 1) * (screen_width / cols) - (screen_width / cols), (i + 1) * (screen_height / rows) - (screen_height / rows));
                    ctx.lineTo((j + 1) * (screen_width / cols), (i + 1) * (screen_height / rows));
                    ctx.moveTo((j + 1) * (screen_width / cols) - (screen_width / cols), (i + 1) * (screen_height / rows));
                    ctx.lineTo((j + 1) * (screen_width / cols), (i + 1) * (screen_height / rows) - (screen_height / rows));
                    ctx.stroke();
                    break;
                case "b":
                    fillRect(j, i, "black");
                    break;
                case "p":
                    fillRect(j, i, "green");
                    break;
                case "x":
                    fillRect(j, i, "blue");
                    break;
            }
        }  
    }
    //switch 
}
function startSearchBFS() {
    path = findPathWithBFS(field);
    for (i = 0; i < path.length; i++) { 
        field[path[i].x][path[i].y] = "p";
    }
    console.log("path: ", path)
    draw();
}
function startSearchAStar() {
    path = findPathWithAStar(field);
    for (i = 0; i < path.length; i++) { 
       field[path[i].x][path[i].y] = "p";
    }
    console.log("path: ", path)
    draw();
}

function fillRect(x, y, color) {
    ctx.beginPath;
    ctx.fillStyle = color;
    ctx.fillRect(x * (screen_width / cols) + 1, y * (screen_height / rows) + 1, screen_width / cols - 2, screen_height / rows - 2);
}
function getCell(x, y) {
    for(i = 0; i < screen_height; i+= (screen_height / rows)) {
        if (y > i + 157 && y < i + (screen_height / rows) + 157) {
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
    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            if (field[i][j] == "s") {
                field[i][j] = "0";
            }
        }  
    }
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
    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            if (field[i][j] == "e") {
                field[i][j] = "0";
            }
        }  
    }
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
/*
TODO: Mit fabi hitbox kästen
*/