
function quicksortChange(heu_array, array, left, right) {
    let pivot   = heu_array[Math.floor((right + left) / 2)]
    while (left <= right) {
        while (heu_array[left] < pivot) {
            left++;
        }
        while (heu_array[right] > pivot) {
            right--;
        }
        if (left <= right) {
            let a = heu_array[left];
            let b = heu_array[right];
            heu_array[left] = b;
            heu_array[right] = a;
            let c = array[left];
            let d = array[right];
            array[left] = d;
            array[right] = c;
            left++;
            right--;
        }
    }
    return left;
}

function quickSort(heu_array, array, left, right) {
    if (array.length > 1) {
        let operator = quicksortChange(heu_array, array, left, right);
        if (left < operator - 1) {
            quickSort(heu_array, array, left, operator - 1);
        }
        if (right > operator) {
            quickSort(heu_array, array, operator, right);
        }
    }
    return array;
}