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
