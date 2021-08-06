class Point {
    constructor(x, y, f, h, g) {
        this.x = x;
        this.y = y;
        this.g = g; // h + f
        this.h = h; // node --> goal
        this.f = f; // start --> node 
    }
}
function aStarSearchFromStart(start, end, field) {
    const queue_open = [];
    const queue_close = [];
    const start_scores = calculateScores(start, start, end);
    let start_node = new Point(start.x, start.y, start_scores[1], start_scores[2], start_scores[3])
    queue_open.push(start_node)
    while (queue_open.length > 0) {
        let current_node = null;
        for (i = 0; i < queue_open.length; i++) {
            let compare_node = queue_open[i];
            if (compare_node.f < current_node.f) {
                current_node = compare_node;
            }
        }
        if (current_node.x == end.x && current_node.y == end.y) {
            return current_node;
        }
        const neighbors = getNeighbors(current_node, field);
        let lowest_g = null;
        for (i = 0; i < neighbors.length; i++) {
            let neighbor_score = calculateScores(neighbors[i].point, start, end);
            let neighbor = new Point(neighbors[i].point.x, neighbors[i].point.y, 
                    neighbor_score[1], neighbor_score[2], neighbor_score[3])
            if (neighbor.g < lowest_g) {
                lowest_g = neighbor.g;
            }
            
        }
    }
} 
function calculateScores(node, start, end) {
    let f = euclideanDistance(start.x, start.y, node.x, node.y);
    let h = euclideanDistance(node.x, node.y, end.x, end.y);
    let g = f + h;
    const array_return = [f, h, g];
    return array_return;
}
function euclideanDistance (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2) );
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
