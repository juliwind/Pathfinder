class hPoint {
    constructor(x, y, h) {
        this.x = x;
        this.y = y;
        this.h = h;
    }
}
function aStarGetNeighbors(point, field, end) {
    const neighbors = [];
    let neighbor_north_point = new Point(point.x, point.y - 1);
    let h = heuristic(neighbor_north_point, end);
    let neighbor_north = new hPoint(point.x, point.y - 1, h);
    if (neighborValid(neighbor_north, field)) {
        neighbors.push(neighbor_north);
    }
    let neighbor_east_point = new Point(point.x + 1, point.y);
    let h = heuristic(neighbor_east_point, end)
    let neighbor_east = new hPoint(point.x + 1, point.y, h);
    if (neighborValid(neighbor_east, field)) {
        neighbors.push(neighbor_east);
    }
    let neighbor_south_point = new Point(point.x, point.y + 1);
    let h = heuristic(neighbor_south_point, end);
    let neighbor_south = new hPoint(point.x, point.y + 1, h);
    if (neighborValid(neighbor_south, field)) {
        neighbors.push(neighbor_south);
    }
    let neighbor_west_point = new Point(point.x - 1, point.y);
    let h = heuristic(neighbor_west_point, h)
    let neighbor_west = new hPoint(point.x - 1, point.y, h);
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

function aStarFindStartAndEnd(field) {
    let end = findEnd(field);
    return_array = new Array(end)
    for (i = 0; i < field.length; i++) {
        for (j = 0; j < field[0].length; j++) {
            if (field[i][j] == "s") {
                let start_XY = new Point(i, j);
                let h = heuristic(start_XY, end);
                let start = new hPoint(i, j, h);
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

function manhattenDistance(point1, point2) {
    let dist = (point1.x - point2.x) + (point1.y - point2.y);
    return dist;
}

function heuristic(point, end) {
    let h = manhattenDistance(point, end);
    return h;
}

function aStarfindPathFromStart(field, points) {
    let end = points[0];
    let start = points[1];
    const queue = [new Checkpoint(start, [start])];
    while (queue.length > 0) {
        console.log(queue)
        let checkpoint = queue.shift();
        if (field[checkpoint.point.x][checkpoint.point.y] == "e")  {
            return checkpoint.path;
        }
        let neighbors = aStarGetNeighbors(checkpoint.point, field);
        for (i = 0; i < neighbors.length; i++){
            let new_path = checkpoint.path.slice();
            new_path.push(neighbors[i]);
            let new_checkpoint = new Checkpoint(neighbors[i], new_path);
            queue.push(new_checkpoint);
        }
        field[checkpoint.point.x][checkpoint.point.y] = "x";
    }
    alert("No path found!");
}