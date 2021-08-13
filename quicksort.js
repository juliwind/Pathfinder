
function quicksortChange(array, left, right) {
    let pivot = array[Math.floor((right + left) / 2)].point.x;
    while (left <= right) {
        while (array[left].point.x < pivot) {
            left++;
        }
        while (array[right].point.x > pivot) {
            right--;
        }
        if (left <= right) {
            let a = array[left].point.x;
            let b = array[right].point.x;
            array[left].point.x = b;
            array[right].point.x = a;
            left++;
            right--;
        }
    }
    return left;
}

function quickSort(array, left, right) {
    if (array.length > 1) {
        let operator = quicksortChange(array, left, right);
        if (left < operator - 1) {
            quickSort(array, left, operator - 1);
        }
        if (right > operator) {
            quickSort(array, operator, right);
        }
    }
    return array;
}