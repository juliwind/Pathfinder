function initAStar(field) {
    for(i = 0; i < field.length; i++) {
        for(j = 0; j < field[i].length; j++) {
        field[i][j].f = 1;
        //field[i][j].g = 2;
        //field[i][j].h = 3;
        //console.log(field[i][j].f)
        console.log(field)
        }  
    }
}

function euclideanDistance(x1, x2, y1, y2) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2) );
}
class Point {
    constructor(x, y, f, g ,h) {
        this.x = x;
        this.y = y;
        this.f = f;
        this.g = g;
        this.h = h;
    }
}

    