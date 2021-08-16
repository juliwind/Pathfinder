
function quicksortChange(array, left, right) {
    let pivot = array[Math.floor((right + left) / 2)].point.h;
    while (left <= right) {
        while (array[left].point.h < pivot) {
            left++;
        }
        while (array[right].point.h > pivot) {
            right--;
        }
        if (left <= right) {
            let a = array[left].point.h;
            let b = array[right].point.h;
            array[left].point.h = b;
            array[right].point.h = a;
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