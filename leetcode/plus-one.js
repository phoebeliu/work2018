/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    if (digits.length <= 0) {
        return;
    }

    function isNine(item) {
        return item == 9;
    }

    function isTen(item) {
        return item == 10;
    }

    // function dealNum(index, arrayInput) {
    //     if (arrayInput[index]) {
    //         arrayInput[index]++;
    //         // } else if (arrayInput[index] == undefined) {
    //         //     arrayInput.unshift(1);
    //         // }
    //         // return arrayInput;
    //     }
    if (!isNine(digits[digits.length - 1])) {
        digits[digits.length - 1]++;
        return digits;
    }
    if (isNine(digits[digits.length - 1]) && digits.length == 1) {
        return [1, 0];
    }
    digits[digits.length - 1]++;
    cycle: for (let i = 0; i < digits.length - 1; i++) {
        // if (isNine(digits[digits.length - 1 - i])) {
        //     digits[digits.length - 1 - i] = 0;
        //     // digits = dealNum(digits.length - 2 - i, digits);
        //     digits[digits.length - 2 - i]++;
        // } else if (isTen(digits[digits.length - 1 - i])) {
        //     digits[digits.length - 1 - i] = 0;
        //     // digits = dealNum(digits.length - 2 - i, digits);
        //     digits[digits.length - 2 - i]++;
        // } else {
        //     break cycle;
        // }
        if (isTen(digits[digits.length - 1 - i])) {
            digits[digits.length - 1 - i] = 0;
            // digits = dealNum(digits.length - 2 - i, digits);
            digits[digits.length - 2 - i]++;
        } else {
            break cycle;
        }
    }
    if (isTen(digits[0])) {
        digits[0] = 0;
        digits.unshift(1);
    }
    return digits;
};
plusOne([2, 4, 9, 3, 9]);

var plusOne = function(digits) {
    if (digits.length <= 0) {
        return;
    }
    if (digits[digits.length - 1] < 9) {
        digits[digits.length - 1]++;
        return digits;
    }
    if (digits == [9]) {
        return [1, 0];
    }
    digits[digits.length - 1]++;
    cycle: for (let i = 0; i < digits.length - 1; i++) {
        if (digits[digits.length - 1 - i] == 10) {
            digits[digits.length - 1 - i] = 0;
            digits[digits.length - 2 - i]++;
        } else {
            break cycle;
        }
    }
    if (digits[0] == 10) {
        digits[0] = 0;
        digits.unshift(1);
    }
    return digits;
};