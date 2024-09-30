function BFSfindPathFromStart(field, start) {
    const queue = [new Checkpoint(start, [start])];
    while (queue.length > 0) {
        let checkpoint = queue.shift();
        if (field[checkpoint.point.y][checkpoint.point.x] == "e")  {
            return checkpoint.path;
        }
        let neighbors = getNeighbors(checkpoint.point, field);
        if (field[checkpoint.point.y][checkpoint.point.x] != "x")  {
            for (let i = 0; i < neighbors.length; i++){
                let new_path = checkpoint.path.slice();
                new_path.push(neighbors[i]);
                let new_checkpoint = new Checkpoint(neighbors[i], new_path);
                queue.push(new_checkpoint);
            }
        }
        field[checkpoint.point.y][checkpoint.point.x] = "x";
    }
    alert("No path found!");
}

function findPathWithBFS(field) {
    return BFSfindPathFromStart(field, findStart(field));
}

function findStart(field) {
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[0].length; j++) {
            if (field[i][j] == "s") {
                return new Point(j, i);
            }
        }
    }
    alert("No start found!");
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
    if (point.y >= 0 && point.y < field.length &&
        point.x >= 0 && point.x < field[0].length &&
        (field[point.y][point.x] == "0" || field[point.y][point.x] == "e")) {

        return true;
    }
    else {
        return false;
    }
}


class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Checkpoint {
    constructor(point, path) {
        this.point = point;
        this.path = path;
    } 
}
