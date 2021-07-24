
let canvas_pg = document.getElementById("canvasPlayground");
let ctx_pg = canvas_pg.getContext("2d");
let loopEnd_start = false;
let loopEnd_end = false;
let loopEnd_place_barriers = false;
let loopEnd_delete_barriers = false;
let startX = null;
let startY = null;
let endX = null;
let endY = null;
let place_barrierX = null;
let place_barrierY = null;
let delete_barrierX = null;
let delete_barrierY = null;
let array_field = new Array();
let cols = 15;
let rows = 10;
let place_barrier_counter = 0;
let place_barrier_loop = null;
let delete_barrier_counter = 0;
let delete_barrier_loop = null;

setup()
function setup() {
    grid()

    for (i = 0; i < rows; i++) {
        array_field.push(new Array());
        for (j = 0; j < cols; j++) {
            array_field[i].push("0");
        }  
    }
    console.log("cols: ", cols);
    console.log("rows: ", rows);
    console.log("field: ", array_field);
}

function startSearch() {
    path = findPath(array_field);
    for (i = 0; i < path.length; i++) {
        fillRect(path[i].x + 1, path[i].y + 1, "green");
    }
    console.log("path: ", path)
}

function setRects() {
    ctx_pg.clearRect(0, 0, canvas_pg.width, canvas_pg.height);
    array_field = new Array()
    cols = prompt("Number of columns: ", );
    rows = prompt("Number of rows: ", );

    setup();
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

//STARTPOINT
function setStartpoint() {
    if (!loopEnd_start) {
        document.getElementById('start').classList.add("buttonActiv");
        canvas_pg.addEventListener("click", onClickStartpoint);
        setTimeout(setStartpoint);
    }
}

function setStartpointTrue() {
    loopEnd_start = false
    fillRect(startX, startY, "white");
}

function fillRect(x, y, color) {
    ctx_pg.beginPath();
    ctx_pg.fillStyle = color;
    ctx_pg.fillRect(x * (1200 / cols) - (1200 / cols) + 1, y * (800 / rows) - (800 / rows) + 1, 1200 / cols - 2, 800 / rows - 2);
    ctx_pg.stroke();

}

function onClickStartpoint(e) {
    for(i = 0; i < 1200; i+= (1200 / cols)) {
        if (e.clientX > i + 10 && e.clientX < i + (1200 / cols) + 10) {
            startX = i / (1200 / cols) + 1
            console.log(startX, "x")
        }
    }
    for (j = 0; j < 800; j+= (800 / rows)) {
        if (e.clientY > j + 140 && e.clientY < j + (800 / rows) + 140) {
            startY = j / (800 / rows) + 1
            console.log(startY, "y")
        }
    }
    ctx_pg.beginPath();
    ctx_pg.strokeStyle = 'blue';
    ctx_pg.lineWidth = 3;
    ctx_pg.moveTo(startX * (1200 / cols) - (1200 / cols), startY * (800 / rows) - (800 / rows));
    ctx_pg.lineTo(startX * (1200 / cols), startY * (800 / rows));
    ctx_pg.moveTo(startX * (1200 / cols) - (1200 / cols), startY * (800 / rows));
    ctx_pg.lineTo(startX * (1200 / cols), startY * (800 / rows) - (800 / rows));
    ctx_pg.stroke();
    array_field[startY - 1][startX - 1] = "s";

    loopEnd_start = true;
    canvas_pg.removeEventListener("click", onClickStartpoint);
    document.getElementById('start').classList.remove("buttonActiv");
}

//ENDPOINT
function setEndpoint() {
    if (!loopEnd_end) {
        document.getElementById('end').classList.add("buttonActiv");
        canvas_pg.addEventListener("click", onClickEndpoint);
        setTimeout(setEndpoint);
    }
}

function setEndpointTrue() {
    loopEnd_end = false
    ctx_pg.beginPath();
    ctx_pg.fillStyle = "white"
    ctx_pg.fillRect(endX * (1200 / cols) - (1200 / cols) + 1, endY * (800 / rows) - (800 / rows) + 1, 1200 / cols - 2, 800 / rows - 2);
    ctx_pg.stroke();
}

function onClickEndpoint(e) {
    for(i = 0; i < 1200; i+= (1200 / cols)) {
        if (e.clientX > i + 10 && e.clientX < i + (1200 / cols) + 10) {
            endX = i / (1200 / cols) + 1
        }
    }
    for (j = 0; j < 800; j+= (800 / rows)) {
        if (e.clientY > j + 140 && e.clientY < j + (800 / rows) + 140) {
            endY = j / (800 / rows) + 1
        }
    }
    ctx_pg.beginPath();
    ctx_pg.strokeStyle = 'red';
    ctx_pg.lineWidth = 3;
    ctx_pg.moveTo(endX * (1200 / cols) - (1200 / cols), endY * (800 / rows) - (800 / rows));
    ctx_pg.lineTo(endX * (1200 / cols), endY * (800 / rows));
    ctx_pg.moveTo(endX * (1200 / cols) - (1200 / cols), endY * (800 / rows));
    ctx_pg.lineTo(endX * (1200 / cols), endY * (800 / rows) - (800 / rows));
    ctx_pg.stroke();

    console.log("x: ", endX, "y: ", endY);
    array_field[endY - 1][endX - 1] = "e";

    loopEnd_end = true;
    canvas_pg.removeEventListener("click", onClickEndpoint);
    document.getElementById('end').classList.remove("buttonActiv");
}

//PLACE BARRIERS
function placeBarriers() {
    if (!loopEnd_place_barriers) {
        document.getElementById('placeBarriers').classList.add("buttonActiv");
        canvas_pg.addEventListener("mousedown", onClickPlaceBarriers);
        place_barrier_loop = setTimeout(placeBarriers);
    }
}

function onClickPlaceBarriers(e) {
    for(i = 0; i < 1200; i+= (1200 / cols)) {
        if (e.clientX > i + 10 && e.clientX < i + (1200 / cols) + 10) {
            place_barrierX = i / (1200 / cols) + 1
        }
    }
    for (j = 0; j < 800; j+= (800 / rows)) {
        if (e.clientY > j + 140 && e.clientY < j + (800 / rows) + 140) {
            place_barrierY = j / (800 / rows) + 1
        }
    }

    ctx_pg.beginPath();
    ctx_pg.fillStyle = "black";
    ctx_pg.fillRect(place_barrierX * (1200 / cols) - (1200 / cols) + 1, place_barrierY * (800 / rows) - (800 / rows) + 1, 1200 / cols - 2, 800 / rows - 2);
    ctx_pg.stroke();
    array_field[place_barrierY - 1][place_barrierX - 1] = "b";
}

function placeBarriersCounter() {
    place_barrier_counter++
    if (place_barrier_counter % 2 == 0) {
        placeBarriersEnd();
        clearTimeout(place_barrier_loop);

    }
    else {
        placeBarriers();

    }
}
function placeBarriersEnd() {
    canvas_pg.removeEventListener("mousedown", onClickPlaceBarriers);
    document.getElementById('placeBarriers').classList.remove("buttonActiv");

}

//DELETE BARRIERS
function deleteBarriers() {
    if (!loopEnd_delete_barriers) {
        document.getElementById('deleteBarriers').classList.add("buttonActiv");
        canvas_pg.addEventListener("mousedown", onClickDeleteBarriers);
        delete_barrier_loop = setTimeout(deleteBarriers);
    }
}

function onClickDeleteBarriers(e) {
    for(i = 0; i < 1200; i+= (1200 / cols)) {
        if (e.clientX > i + 10 && e.clientX < i + (1200 / cols) + 10) {
            delete_barrierX = i / (1200 / cols) + 1
        }
    }
    for (j = 0; j < 800; j+= (800 / rows)) {
        if (e.clientY > j + 140 && e.clientY < j + (800 / rows) + 140) {
            delete_barrierY = j / (800 / rows) + 1
        }
    }

    ctx_pg.beginPath();
    ctx_pg.fillStyle = "white";
    ctx_pg.fillRect(delete_barrierX * (1200 / cols) - (1200 / cols) + 1, delete_barrierY * (800 / rows) - (800 / rows) + 1, 1200 / cols - 2, 800 / rows - 2);
    ctx_pg.stroke();
    array_field[delete_barrierY - 1][delete_barrierX - 1] = "0";
}

function deleteBarriersCounter() {
    delete_barrier_counter++
    if (delete_barrier_counter % 2 == 0) {
        deleteBarriersEnd();
        clearTimeout(delete_barrier_loop);
    }
    else {
        deleteBarriers();
    }
}
function deleteBarriersEnd() {
    canvas_pg.removeEventListener("mousedown", onClickDeleteBarriers);
    document.getElementById('deleteBarriers').classList.remove("buttonActiv");

}

/*
*/