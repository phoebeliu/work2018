/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    var resultData;
    if (needle.length == 0) { return 0; }
    if (haystack.length == 0) { return -1; }
    outer:
        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i] == needle[0]) {
                resultData = i;
                inner:
                    for (var p = 0; p < needle.length; p++) {
                        if (haystack[i + p] !== needle[p]) {
                            continue outer;
                        }
                    }
                return resultData;
            }
        }
    return -1;
};
// var strStr = function(haystack, needle) {
//     if (needle==='') { return 0; }
//     if (haystack===null || needle===null) { return -1; }
//     haystack_loop: for (var i=0; i <= haystack.length - needle.length; i++) {
//         // Avoid looping needle if first letter doesn't match
//         if (haystack.charAt(i) === needle.charAt(0)) {
//             for (var j = 1; j < needle.length; j++) {
//                 if (haystack.charAt(i + j) !== needle.charAt(j)) {
//                     continue haystack_loop;
//                 }
//             }
//             return i;
//         }
//     }
//     return -1;
// };
strStr("mississippi", "issip");