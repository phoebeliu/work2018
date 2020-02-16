// // 1
// if (s.length === 0) return true
// if (s.length === 1) return false
// if (s.length % 2 !== 0) return false

// const dictionary = {
//     '}': '{',
//     ')': '(',
//     ']': '['
// }
// const stack = []

// for (let i = 0; i < s.length; i++) {
//     const currChar = s[i]
//     const lastChar = stack[stack.length - 1]
//     const delChar = dictionary[currChar]

//     if (delChar) {
//         // 2
//         if (delChar === lastChar) {
//             stack.pop()
//         } else {
//             return false
//         }
//     } else {
//         stack.push(currChar)
//     }
// }

// // 3
// return !stack.length

// var isValid = function(s) {
//     let stack = [];
//     let close = ["}", ")", "]"]
//     for (let i = 0; i < s.length; i++) {
//         if (s[i] == "{" || s[i] == "(" || s[i] == "[") {
//             stack.push(s[i]);
//         } else if (stack[stack.length - 1] == "(" && s[i] == ")" || stack[stack.length - 1] == "[" && s[i] == "]" || stack[stack.length - 1] == "{" && s[i] == "}") {
//             stack.pop();
//         } else if (stack.length == 0 && close.indexOf(s[i]) != -1) {
//             return false;
//         } else {
//             return false;
//         }

//     };
//     return stack.length == 0;
// };
var isValid = function(s) {
    if (s.length == 0) return true;
    if (s.length % 2 !== 0) return false;
    let arrayTemp = [];
    const arrayExample = { '(': ')', '{': '}', '[': ']' };
    for (let i = 0; i <= s.length; i++) {
        if (s[i] == '(' || s[i] == '{' || s[i] == '[') {
            arrayTemp.push(arrayExample[s[i]]);
        } else if (s[i] == arrayTemp[arrayTemp.length - 1]) {
            arrayTemp.pop();
        }
    }
    return arrayTemp.length == 0;
};