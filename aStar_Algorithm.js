class AStarCheckpoint {
    constructor(x, y, h, path) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.path = path;
    } 
}
class AStarPoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function AStarGetNeighbors(point, field) {
    const neighbors = [];

    let neighbor_north = new AStarPoint(point.x, point.y - 1);
    if (AStarNeighborValid(neighbor_north, field)) {
        neighbors.push(neighbor_north);
    }

    let neighbor_east = new AStarPoint(point.x + 1, point.y);
    if (AStarNeighborValid(neighbor_east, field)) {
        neighbors.push(neighbor_east);
    }

    let neighbor_south = new AStarPoint(point.x, point.y + 1);
    if (AStarNeighborValid(neighbor_south, field)) {
        neighbors.push(neighbor_south);
    }

    let neighbor_west = new AStarPoint(point.x - 1, point.y);
    if (AStarNeighborValid(neighbor_west, field)) {
        neighbors.push(neighbor_west);
    }
    return neighbors;
}

function AStarNeighborValid(point, field) {
    if (point.x >= 0 && point.x < field.length &&
        point.y >= 0 && point.y < field[0].length &&
        (field[point.x][point.y] == "0" || field[point.x][point.y] == "e")) {

        return true;
    }
    else {
        return false;
    }
}

function findEnd(field) {
    for (i = 0; i < field.length; i++) {
        for (j = 0; j < field[0].length; j++) {
            if (field[i][j] == "e") {
                return new AStarPoint(j, i);
            }
        }
    }
    alert("No end found!")
}

function findStartAndEnd(field) {
    let end = findEnd(field);
    let return_array = new Array(end)
    for (i = 0; i < field.length; i++) {
        for (j = 0; j < field[0].length; j++) {
            if (field[i][j] == "s") {
                let start = new AStarPoint(j, i);
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
    let dist = Math.abs(point_2.x - point_1.x) + Math.abs(point_2.y - point_1.y);
    console.log("Manhatten dist:", point_1, point_2, dist);
    return dist;
}

function newCheckpoint(point, path, end) {
    let heuristic = manhattenDistance(point, end);
    return new AStarCheckpoint(point.x, point.y, heuristic, path);
}

function queueSort(queue) {
    return quickSort(queue, 0, queue.length - 1);
}

function aStarfindPathFromStart(field, points) {
    let end = points[0];
    let start = points[1];
    console.log("START:", start, "END:", end);
    let queue = [new AStarCheckpoint(start.x, start.y, Number.POSITIVE_INFINITY, [start])];

    while (queue.length > 0) {
        console.log("\n\n\n");
        console.log("BEFORE SORT:", JSON.parse(JSON.stringify(queue)));
        queue = queueSort(queue);
        console.log("AFTER SORT:", JSON.parse(JSON.stringify(queue)));

        let curr_point = queue.shift();
        console.log("CURR POINT:", curr_point);

        /*
        if (field[curr_point.x][curr_point.y] == "e")  {
            return curr_point.path;
        }*/

        if (curr_point.x == end.x && curr_point.y == end.y) {
            return curr_point.path;
        }

        if (field[curr_point.x][curr_point.y] != "x") {
            let neighbors = AStarGetNeighbors(curr_point, field);

            for (let i = 0; i < neighbors.length; i++) {
                let new_path = curr_point.path.slice();
                new_path.push(neighbors[i]);
            
                let new_checkpoint = newCheckpoint(neighbors[i], new_path, end);
                queue.push(new_checkpoint);
            }
        }

        field[curr_point.x][curr_point.y] = "x";
    }
    alert("No path found!");
}