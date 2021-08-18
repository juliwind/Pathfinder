
function quicksortChange(array, left, right) {
    let pivot = array[Math.floor((right + left) / 2)].h;

    while (left <= right) {
        while (array[left].h < pivot) {
            left++;
        }
        while (array[right].h > pivot) {
            right--;
        }
        if (left <= right) {
            let tmp = array[left];
            array[left] = array[right];
            array[right] = tmp;
            /*
            let a = array[left].h;
            let b = array[right].h;
            array[left].h = b;
            array[right].h = a;
            */
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