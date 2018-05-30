//https://leetcode.com/problems/two-sum/description/
// Given an array of integers, return indices of the two numbers such that they add up to a specific target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// Example:

// Given nums = [2, 7, 11, 15], target = 9,

// Because nums[0] + nums[1] = 2 + 7 = 9,
// return [0, 1].
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// var twoSum = function(nums, target) {
//     var i,j,results;
//     results = [];
//     for(j=0;j < nums.length - 1;j++){
//         for(i=j;i < nums.length - 1;i++){
//             if(nums[j] + nums[i+1] == target){
//                 results.push(j);
//                 results.push(i+1);
//                 return results;
//             };
//         }
//     }
// };
// var twoSum = function(nums, target) {
//     var ret = [];
//     var exist = {};
//     for(var i = 0; i < nums.length; i++){
//         if(typeof(exist[target - nums[i]]) !== 'undefined'){
//             ret.push(exist[target - nums[i]]);
//             ret.push(i);
//         }
        
//         exist[nums[i]] = i;
//     }
//     console.log(exist);
//     return ret
// };
// var twoSum = function(nums, target) {
//     var ans = [];
//     var exist = {};
    
//     for (var i = 0; i < nums.length; i++){
//         if (typeof(exist[target-nums[i]]) !== 'undefined'){
//             return [exist[target - nums[i]], i];
//         }
//         exist[nums[i]] = i;
//     }
//   };

// var twoSum = function(nums, target) {
//     var result = [];
//     nums.forEach(function(num, i) {
//       var diff = target - num;
//       var k = nums.indexOf(diff);
//       if (k > -1 && k !== i) {
//          result[0] = i;
//          result[1] = k;
//          return true;
//       };
//     })
//     return result;
//   }

var twoSum = function(nums, target) {
    var i,j,results;
    results = [];
    for(j=0;j < nums.length;j++){
        var key = nums.indexOf(target - nums[j]);
        if(key!==j && key>-1){
            results.push(key);
            results.push(j);
            return results;
        };
    };
};

var nums = [2, 7, 11, 15],
     target = 9;
console.log(twoSum(nums, target));