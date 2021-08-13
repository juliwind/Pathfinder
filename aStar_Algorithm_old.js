class aStarPoint {
    constructor(x, y, h) {
        this.x = x;
        this.y = y;
        this.h = h;
    }
}

function heuristic(point1, point2) {
    //manhatten distance
    let dist = (point1.x - point2.x) + (point1.y - point2.y);
    return dist;
}

function fScore(start, end) {
    let heur = (start, end);
    return g + h;
}

function heuristicField(field, start, end) {
    let heu_field = new Array();
    for (i = 0; i < field.length; i++) {
        heu_field.push(new Array());
        for (j = 0; j < field[0].length; j++) {
            let heu_field_point = new Point(i, j);
            let f = fScore(heu_field_point, end);
            heu_field[i].push(f);
        }
    }
    return heu_field;
}

function sortQueue(field, queue) {
    let sorted_queue = []
    for(i = 0; i < queue.length; i++) {
        sorted_queue.push(field[queue[i].point.x][queue[i].point.y])
    }
    sorted_queue = quickSort(sorted_queue, queue, 0, queue.length - 1);
    return sorted_queue;
}

function aStarfindPathFromStart(field, points) {
    let start = points[0];
    let end = points[1];
    let heu_field = heuristicField(field, start, end);
    let queue = [new Checkpoint(start, [start])]
    //queue = [(Checkpoint, heuristic)]
    while (queue.length > 0) {
        console.log("queue", queue, "field", field);
        queue = sortQueue(heu_field, queue);
        let checkpoint = queue.shift();
        if (field[checkpoint.point.x][checkpoint.point.y] == "e") {
            return checkpoint.path;
        }
        let neighbors = getNeighbors(checkpoint.point, field);
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

function findPathWithAStar(field) {
    return aStarfindPathFromStart(field, findStartAndEnd(field));
}

function findStartAndEnd(field) {
    let return_array = [];
    for (i = 0; i < field.length; i++) {
        for (j = 0; j < field[0].length; j++) {
            if (field[i][j] == "s") {
                return_array.splice(0, 0, new Point(i, j));
            }
            if (field[i][j] == "e") {
                return_array.splice(1, 0, new Point(i, j));
            }
        }
    }
    return return_array;
}

/*
g = start -> x
h = target -> x
f = g + h
*/
