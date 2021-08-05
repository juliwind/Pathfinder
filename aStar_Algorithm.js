/*
function initAStar(field) {
    for(i = 0; i < field.length; i++) {
        for(j = 0; j < field[i].length; j++) {
        field[i][j].f = 1;
        //field[i][j].g = 2;
        //field[i][j].h = 3;
        //console.log(field[i][j].f)
        console.log(field)
        }  
    }
}

function euclideanDistance(x1, x2, y1, y2) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2) );
}
class Point {
    constructor(x, y, f, g ,h) {
        this.x = x;
        this.y = y;
        this.f = f;
        this.g = g;
        this.h = h;
    }
}

function getNeighbors(point, field) {
    const neighbors = [];
    let neighbor_north = new Point(point.x, point.y - 1);
    if (neighborValid(neighbor_north, field)) {
        neighbors.push(neighbor_north);
    }
    let neighbor_east = new Point(point.x + 1, point.y);
    if (neighborValid(neighbor_east, field)) {
        neighbors.push(neighbor_east);
    }
    let neighbor_south = new Point(point.x, point.y + 1);
    if (neighborValid(neighbor_south, field)) {
        neighbors.push(neighbor_south);
    }
    let neighbor_west = new Point(point.x - 1, point.y);
    if (neighborValid(neighbor_west, field)) {
        neighbors.push(neighbor_west);
    }
    return neighbors;
}

function neighborValid(point, field) {
    if (point.x >= 0 && point.x < field.length
            && point.y >= 0 && point.y < field[0].length
            && (field[point.x][point.y] == "0" || field[point.x][point.y] == "e")) {
        return true;
    }
    else {
        return false;
    }
}
*/