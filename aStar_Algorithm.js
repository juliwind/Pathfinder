class hPoint {
    constructor(x, y, h) {
        this.x = x;
        this.y = y;
        this.h = h;
    }
}
function aStarGetNeighbors(point, field, end) {
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

function findEnd(field) {
    for (i = 0; i < field.length; i++) {
        for (j = 0; j < field[0].length; j++) {
            if (field[i][j] == "e") {
                return new hPoint(i, j, 0);
            }
        }
    }
    alert("No end found!")
}

function findStartAndEnd(field) {
    let end = findEnd(field);
    return_array = new Array(end)
    for (i = 0; i < field.length; i++) {
        for (j = 0; j < field[0].length; j++) {
            if (field[i][j] == "s") {
                let start = new Point(i, j);
                return_array.push(start);
                return return_array;
            }
        }
    }
    alert("No start found!");
}

function findPathWithAStar(field) {
    return aStarfindPathFromStart(field, findStartAndEnd(field));
}

function manhattenDistance(point_1, point_2) {
    let dist = (point_2.x - point_1.x) + (point_2.y - point_1.y)
    return dist;
}

function newCheckpoint(point, path, end) {
    let f = manhattenDistance(point, end) + path.length;
    point = new hPoint(point.x, point.y, f);
    return new Checkpoint(point, path)
}

function queueSort(queue) {
    return quickSort(queue, 0, queue.length - 1);
}
function aStarfindPathFromStart(field, points) {
    let end = points[0];
    let start = points[1];
    let queue = [new Checkpoint(start, [start])];
    while (queue.length > 0) {
        queue = queueSort(queue);
        //console.log(queue);
        let checkpoint = queue.shift();
        if (field[checkpoint.point.x][checkpoint.point.y] == "e")  {
            return checkpoint.path;
        }
        let neighbors = aStarGetNeighbors(checkpoint.point, field, end);
        for (i = 0; i < neighbors.length; i++){
            let new_path = checkpoint.path.slice();
            new_path.push(neighbors[i]);
            let new_checkpoint = newCheckpoint(neighbors[i], new_path, end);
            queue.push(new_checkpoint);
        }
        field[checkpoint.point.x][checkpoint.point.y] = "x";
    }
    alert("No path found!");
}