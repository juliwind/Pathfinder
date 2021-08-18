function BFSfindPathFromStart(field, start) {
    const queue = [new Checkpoint(start, [start])];
    while (queue.length > 0) {
        console.log(queue)
        let checkpoint = queue.shift();
        if (field[checkpoint.point.x][checkpoint.point.y] == "e")  {
            return checkpoint.path;
        }
        let neighbors = getNeighbors(checkpoint.point, field);
        if (field[checkpoint.point.x][checkpoint.point.y] != "x")  {
            for (i = 0; i < neighbors.length; i++){
                let new_path = checkpoint.path.slice();
                new_path.push(neighbors[i]);
                let new_checkpoint = new Checkpoint(neighbors[i], new_path);
                queue.push(new_checkpoint);
            }
        }
        field[checkpoint.point.x][checkpoint.point.y] = "x";
    }
    alert("No path found!");
}

function findPathWithBFS(field) {
    return BFSfindPathFromStart(field, findStart(field));
}

function findStart(field) {
    for (i = 0; i < field.length; i++) {
        for (j = 0; j < field[0].length; j++) {
            if (field[i][j] == "s") {
                return new Point(i, j);
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
    if (point.x >= 0 && point.x < field.length &&
        point.y >= 0 && point.y < field[0].length &&
        (field[point.x][point.y] == "0" || field[point.x][point.y] == "e")) {

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
