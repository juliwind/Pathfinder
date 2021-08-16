class hPoint {
    constructor(x, y, h) {
        this.x = x;
        this.y = y;
        this.h = h;
    }
}
function aStarGetNeighbors(point, field) {
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
                return new hPoint(j, i, 0);
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
    let dist = (point_2.x - point_1.x) + (point_2.y - point_1.y);
    console.log("1x", point_1.x, "2x", point_2.x, "1y", point_1.y, "2y", point_2.y, "dist", dist);
    return dist;
}

function newCheckpoint(point, path, end) {
    let h = manhattenDistance(point, end) //+ path.length - 1;
    point = new hPoint(point.x, point.y, h);
    console.log(point)
    return new Checkpoint(point, path);
}

function queueSort(queue) {
    return quickSort(queue, 0, queue.length - 1);
}
function aStarfindPathFromStart(field, points) {
    let end = points[0];
    let start = points[1];
    let queue = [new Checkpoint(start, [start])];
    let i = 0;
    while (queue.length > 0) {
        queue = queueSort(queue);
        i++
        /*if (i > 4) {
            console.log(queue);
            return checkpoint.path;
        }*/
        let checkpoint = queue.shift();
        if (field[checkpoint.point.x][checkpoint.point.y] == "e")  {
            return checkpoint.path;
        }
        if (field[checkpoint.point.x][checkpoint.point.y] != "x") {
            let neighbors = aStarGetNeighbors(checkpoint.point, field, end);
            for (i = 0; i < neighbors.length; i++){
                let new_path = checkpoint.path.slice();
                new_path.push(neighbors[i]);
                console.log("START");
                //console.log("this neighbor 1", neighbors[i]);
                let new_checkpoint = newCheckpoint(neighbors[i], new_path, end);
                //console.log("this neighbor 2", neighbors[i]);
                console.log("checkpoint at end", new_checkpoint);
                console.log("END");
                queue.push(new_checkpoint);
            }
        }
        field[checkpoint.point.x][checkpoint.point.y] = "x";
    }
    alert("No path found!");
}