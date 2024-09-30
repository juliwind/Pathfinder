"use strict";

let canvas = document.getElementById("canvasPlayground");
let ctx = canvas.getContext("2d");
let cols = 15;
let rows = 10;
let field = [];
let screen_height = canvas.height;
let screen_width = canvas.width;
let cellX = null;
let cellY = null;
let barrier_counter = 0;
let barrier_loop = null;
let settingStartpoint = false;
let settingEndpoint = false;

setup();

function setup() {
    field = [];
    for (let i = 0; i < rows; i++) {
        field.push([]);
        for (let j = 0; j < cols; j++) {
            field[i].push("0");
        }  
    }
    draw();
}

function grid() {
    for(let i = screen_width / cols; i < screen_width; i += (screen_width / cols)) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        ctx.moveTo(i, 0);
        ctx.lineTo(i, screen_height);
        ctx.stroke();
    }

    for(let i = screen_height / rows; i < screen_height; i += (screen_height / rows)) {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.moveTo(0, i);
        ctx.lineTo(screen_width, i);
        ctx.stroke();
    }
}

function clearField() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            field[i][j] = "0";
        }
    }
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grid();

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            switch (field[i][j]) {
                case "s":
                    ctx.beginPath();
                    ctx.strokeStyle = 'blue';
                    ctx.lineWidth = 3;
                    ctx.moveTo(j * (screen_width / cols), i * (screen_height / rows));
                    ctx.lineTo((j + 1) * (screen_width / cols), (i + 1) * (screen_height / rows));
                    ctx.moveTo((j + 1) * (screen_width / cols), i * (screen_height / rows));
                    ctx.lineTo(j * (screen_width / cols), (i + 1) * (screen_height / rows));
                    ctx.stroke();
                    break;
                case "e":
                    ctx.beginPath();
                    ctx.strokeStyle = 'red';
                    ctx.lineWidth = 3;
                    ctx.moveTo(j * (screen_width / cols), i * (screen_height / rows));
                    ctx.lineTo((j + 1) * (screen_width / cols), (i + 1) * (screen_height / rows));
                    ctx.moveTo((j + 1) * (screen_width / cols), i * (screen_height / rows));
                    ctx.lineTo(j * (screen_width / cols), (i + 1) * (screen_height / rows));
                    ctx.stroke();
                    break;
                case "b":
                    fillRect(i, j, "black");
                    break;
                case "p":
                    fillRect(i, j, "green");
                    break;
                case "x":
                    fillRect(i, j, "blue");
                    break;
            }
        }  
    }
}

function startSearchBFS() {
    const path = findPathWithBFS(field);
    if (path) {
        for (let i = 0; i < path.length; i++) { 
            field[path[i].y][path[i].x] = "p";
        }
        console.log("path: ", path);
        draw();
    }
}

function startSearchAStar() {
    const path = findPathWithAStar(field);
    if (path) {
        for (let i = 0; i < path.length; i++) { 
            field[path[i].y][path[i].x] = "p";
        }
        console.log("path: ", path);
        draw();
    }
}

function fillRect(y, x, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x * (screen_width / cols) + 1, y * (screen_height / rows) + 1, (screen_width / cols) - 2, (screen_height / rows) - 2);
}

function getCell(x, y) {
    const canvasRect = canvas.getBoundingClientRect();
    const relativeX = x - canvasRect.left;
    const relativeY = y - canvasRect.top;

    cellX = Math.floor(relativeX / (screen_width / cols));
    cellY = Math.floor(relativeY / (screen_height / rows));

    if (cellX < 0 || cellX >= cols || cellY < 0 || cellY >= rows) {
        cellX = null;
        cellY = null;
    }
}

function setStartpoint() {
    if (!settingStartpoint) {
        settingStartpoint = true;
        document.getElementById('start').classList.add("buttonActiv");
        canvas.addEventListener("click", onClickStartpoint);
    }
}

function onClickStartpoint(e) {
    console.log("onClickStartpoint triggered");

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (field[i][j] == "s") {
                field[i][j] = "0";
            }
        }
    }

    getCell(e.clientX, e.clientY);
    if (cellX !== null && cellY !== null) { 
        field[cellY][cellX] = "s";
        draw();
        console.log(`Startpunkt gesetzt bei y: ${cellY}, x: ${cellX}`);
        console.log("Aktuelles Field Array:", field);
    }

    settingStartpoint = false;
    canvas.removeEventListener("click", onClickStartpoint);
    document.getElementById('start').classList.remove("buttonActiv");
}

function setEndpoint() {
    if (!settingEndpoint) {
        settingEndpoint = true;
        document.getElementById('end').classList.add("buttonActiv");
        canvas.addEventListener("click", onClickEndpoint);
    }
}

function onClickEndpoint(e) {
    console.log("onClickEndpoint triggered");

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (field[i][j] == "e") {
                field[i][j] = "0";
            }
        }
    }

    getCell(e.clientX, e.clientY);
    if (cellX !== null && cellY !== null) { 
        field[cellY][cellX] = "e";
        draw();
        console.log(`Endpunkt gesetzt bei y: ${cellY}, x: ${cellX}`);
        console.log("Aktuelles Field Array:", field);
    }

    settingEndpoint = false;
    canvas.removeEventListener("click", onClickEndpoint);
    document.getElementById('end').classList.remove("buttonActiv");
}

function setRects() {
    field = [];
    cols = parseInt(prompt("Number of columns: ", "15"));
    rows = parseInt(prompt("Number of rows: ", "10"));
    if (isNaN(cols) || isNaN(rows) || cols <= 0 || rows <= 0) {
        alert("Bitte geben Sie gültige Zahlen für Spalten und Reihen ein.");
        return;
    }
    setup();
}

function barriers() {
    if (!settingEndpoint) {
        document.getElementById('barriers').classList.add("buttonActiv");
        canvas.addEventListener("mousedown", onClickBarriers);
        barrier_loop = setTimeout(barriers, 100);
    }
}

function onClickBarriers(e) {
    getCell(e.clientX, e.clientY);
    if (cellX !== null && cellY !== null) { 
        if (field[cellY][cellX] == "0") {
            field[cellY][cellX] = "b";
        }
        else {
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

function generateMaze() {
    field = mazeStart(field);
    draw();
}
