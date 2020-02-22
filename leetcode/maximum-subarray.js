function maxSubArray(nums) {
    var inputArray = nums;
    var initValue = inputArray[0];
    var maxValue = initValue;
    if (inputArray.length == 0) {
        return 0;
    }
    if (inputArray.length == 1) {
        return initValue;
    }
    for (let i = 1; i < inputArray.length; i++) {
        var element = inputArray[i];
        if ((element + initValue) > element) {
            initValue = element + initValue;
        } else {
            initValue = element;
        }
        if (initValue > maxValue) {
            maxValue = initValue;
        }
    };
    return maxValue;
}