// var removeDuplicates = function(nums) {
//     for (var i = 0; i < nums.length - 1;) {
//         if (nums[i] === nums[i + 1]) {
//             nums.splice(i, 1);
//             continue;
//         }
//         i++;
//     }
//     return nums.length;
// };
// var removeDuplicates = function(nums) {
//     var newArray = [];
//     for (var i = 0; i < nums.length; i++) {
//         if (newArray.indexOf(nums[i]) == -1) {
//             newArray.push(nums[i]);
//         }
//     }
//     return newArray;
// };
var removeDuplicates = function(nums) {
    var newArray = [];
    for (var i = 0; i < nums.length; i++) {
        if (newArray.indexOf(nums[i]) != -1) {
            nums.slice(nums[i], 1);
        }
    }
    return nums;
};
// var removeDuplicates = function(nums) {
//     if(nums.length <= 1) {
//         return nums.length;
//     }
//     var k = 1;
//     for(var i = 1; i < nums.length; i++) {
//         if(nums[i] != nums[i-1]){
//             nums[k++] = nums[i];
//         }
//     }
//     return k;
// };