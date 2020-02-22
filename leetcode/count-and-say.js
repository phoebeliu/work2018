// var countAndSay = function(n) {
//     var str = '1';
//     for (var i = 1; i < n; i++) {
//         var strArray = str.split('');
//         str = '';
//         var count = 1;
//         // Loop through current nth level line
//         for (var j = 0; j < strArray.length; j++) {
//             // Next digit is different
//             if (strArray[j] !== strArray[j + 1]) {
//                 // Go to next non-matching digit
//                 str += count + strArray[j];
//                 count = 1;
//             } else {
//                 count++;
//             }
//         }
//     }
//     return str;
// };
var countAndSay = function(n) {
    if (n == 1) {
        return '1';
    }
    var initString = '1';
    var cyclyStringArray;
    // cyclyStringArray = initString.split('');
    var countSringNumber = 1;
    var currentString = initString;
    // var tempCountString = '';

    for (var i = 1; i < n; i++) {
        cyclyStringArray = currentString.split('');
        currentString = '';
        for (var j = 0; j < cyclyStringArray.length; j++) {
            if (cyclyStringArray[j] !== cyclyStringArray[j + 1]) {
                currentString = currentString + countSringNumber + cyclyStringArray[j];
                countSringNumber = 1;
                // } else if (cyclyStringArray[j - 1] == undefined) {
                //     tempCountString = '1' + cyclyStringArray[j];
                //     currentString = currentString + tempCountString;
            } else {
                countSringNumber++;
                // tempCountString = countSringNumber + cyclyStringArray[j];
            }
        }
    }
    return currentString;
};
// countAndSay(2);