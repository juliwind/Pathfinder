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